#!/usr/bin/env python3
"""Safely unpack the checked-in airstraf.ing source archive."""
from __future__ import annotations

import hashlib
import json
import os
from pathlib import Path, PurePosixPath
import shutil
import stat
import zipfile

ARCHIVE = Path("airstraf.ing-source.zip")
DEST = Path("source")
MANIFEST = Path("archive-manifest.json")
MAX_TOTAL = 300 * 1024 * 1024
MAX_SINGLE = 90 * 1024 * 1024
MAX_FILES = 5000


def digest(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as file:
        for part in iter(lambda: file.read(1024 * 1024), b""):
            h.update(part)
    return h.hexdigest()


def main() -> None:
    if not ARCHIVE.is_file():
        raise SystemExit(f"Missing source archive: {ARCHIVE}")
    root = DEST.resolve()
    if DEST.exists():
        shutil.rmtree(DEST)
    DEST.mkdir(parents=True)
    seen: set[str] = set()
    total = 0
    entries = []

    try:
        with zipfile.ZipFile(ARCHIVE) as archive:
            infos = archive.infolist()
            for info in infos:
                # Normalize ZIP paths independently of the host OS.
                raw = info.filename.replace("\\", "/")
                path = PurePosixPath(raw)
                if (not raw or path.is_absolute() or
                    any(part in ("", ".", "..") for part in raw.split("/") if part) or
                    ":" in path.parts[0] or "\x00" in raw):
                    raise ValueError(f"Unsafe ZIP member: {raw!r}")
                if info.is_dir():
                    continue
                mode = (info.external_attr >> 16) & 0o170000
                if mode == stat.S_IFLNK:
                    raise ValueError(f"Symlink in ZIP is not permitted: {raw!r}")
                rel = path.as_posix()
                if rel in seen:
                    raise ValueError(f"Duplicate ZIP path: {raw!r}")
                seen.add(rel)
                if len(seen) > MAX_FILES:
                    raise ValueError("Archive exceeds maximum file count")
                total += info.file_size
                if info.file_size > MAX_SINGLE or total > MAX_TOTAL:
                    raise ValueError("Archive uncompressed size exceeds configured limit")
                target = DEST.joinpath(*path.parts)
                if not target.resolve().is_relative_to(root):
                    raise ValueError(f"Archive escapes destination: {raw!r}")
                target.parent.mkdir(parents=True, exist_ok=True)
                with archive.open(info) as src, target.open("wb") as dst:
                    # Do not rely on untrusted size metadata alone.
                    copied = 0
                    while chunk := src.read(1024 * 1024):
                        copied += len(chunk)
                        if copied > info.file_size or copied > MAX_SINGLE:
                            raise ValueError(f"Uncompressed size mismatch: {raw!r}")
                        dst.write(chunk)
                entries.append({
                    "path": rel,
                    "bytes": target.stat().st_size,
                    "sha256": digest(target),
                })
    except Exception:
        shutil.rmtree(DEST, ignore_errors=True)
        raise

    entries.sort(key=lambda file: file["path"])
    output = {
        "archive": ARCHIVE.name,
        "archive_sha256": digest(ARCHIVE),
        "file_count": len(entries),
        "total_uncompressed_bytes": sum(item["bytes"] for item in entries),
        "files": entries,
    }
    MANIFEST.write_text(json.dumps(output, indent=2) + "\n", encoding="utf-8")
    print(f"Extracted {len(entries)} files ({total:,} bytes) into {DEST}/")
    for entry in entries[:80]:
        print(f"  {entry['bytes']:>10}  {entry['path']}")
    if len(entries) > 80:
        print(f"  ...and {len(entries) - 80} more (see {MANIFEST})")


if __name__ == "__main__":
    main()
