import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
const out = 'dist/firefox';
fs.mkdirSync(`${out}/files`, {recursive:true});
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const files = JSON.parse(fs.readFileSync('dist/report.json')).files.filter(f => f.status === 'mapped');
const entries = [];
for (const file of files) {
  if (!file.file.startsWith('airstraf.ing/')) continue;
  const source = fs.readFileSync(path.join('source', file.file));
  const replacement = fs.readFileSync(path.join('dist/readable', file.file));
  const replacementSha256 = digest(replacement);
  const replacementPath = `files/${replacementSha256}.js`;
  fs.writeFileSync(`${out}/${replacementPath}`,replacement);
  entries.push({url:'https://' + file.file, bytes:source.length, sha256:digest(source),
    replacementPath, replacementSha256});
}
fs.writeFileSync(`${out}/manifest.json`,JSON.stringify({manifest_version:2,
  name:'airstraf.ing readable replacement',version:'1.0.0',
  description:'Replace matching live scripts with readable code; update replacement files from GitHub.',
  browser_specific_settings:{gecko:{id:'airstraf-replacement@local.invalid',strict_min_version:'102.0'}},
  permissions:['webRequest','webRequestBlocking','alarms','https://airstraf.ing/*',
    'https://raw.githubusercontent.com/*','https://api.github.com/*'],
  browser_action:{default_title:'airstraf.ing replacement: starting'},
  background:{scripts:['background.js']}},null,2)+'\n');
fs.copyFileSync('extension/background.js',`${out}/background.js`);
fs.writeFileSync(`${out}/replacements.json`,JSON.stringify({version:1,files:entries},null,2)+'\n');
console.log(`Packaged ${entries.length} readable Firefox replacements`);
