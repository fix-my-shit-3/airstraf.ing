/* No eval or injected page scripts: Firefox replaces the network response body. */
(async () => {
  const repo = 'fix-my-shit-3/airstraf.ing';
  const hash = async bytes => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),
    b=>b.toString(16).padStart(2,'0')).join('');
  const canonical = raw => {const url=new URL(raw);url.search='';url.hash='';return url.href;};
  const title = text => browser.browserAction.setTitle({title:'airstraf.ing: '+text});
  let active = new Map(), revision = '', updating = false;
  async function fetchChecked(url) {
    const response=await fetch(url,{cache:'no-store',credentials:'omit',signal:AbortSignal.timeout(30000)});
    if(!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);
    return response;
  }
  async function loadSet(base) {
    const manifest=await (await fetchChecked(base+'replacements.json')).json();
    if(manifest.version!==1 || !Array.isArray(manifest.files) || !manifest.files.length || manifest.files.length>1000)
      throw new Error('Invalid replacement index');
    const next=new Map();
    for(const entry of manifest.files) {
      const url=new URL(entry.url);
      if(url.origin!=='https://airstraf.ing' || !/\.m?js$/.test(url.pathname) ||
        !/^files\/[a-f0-9]{64}\.js$/.test(entry.replacementPath) ||
        !/^[a-f0-9]{64}$/.test(entry.sha256) || !/^[a-f0-9]{64}$/.test(entry.replacementSha256) ||
        !Number.isSafeInteger(entry.bytes) || entry.bytes<0 || entry.bytes>35*1024*1024 || next.has(entry.url))
        throw new Error('Invalid replacement entry');
      const previous=active.get(entry.url);
      const bytes=previous?.replacementSha256===entry.replacementSha256 ? previous.code :
        new Uint8Array(await (await fetchChecked(base+entry.replacementPath)).arrayBuffer());
      if(await hash(bytes)!==entry.replacementSha256) throw new Error('Replacement checksum mismatch');
      next.set(entry.url,{...entry,code:bytes});
    }
    active=next; // Atomic: failed downloads never discard a working set.
    title(`${active.size} replacements ready; reload the game`);
  }
  browser.webRequest.onBeforeRequest.addListener(details=>{
    const entry=active.get(canonical(details.url));
    if(!entry) return;
    const filter=browser.webRequest.filterResponseData(details.requestId);
    let chunks=[],size=0,bypass=false;
    filter.ondata=event=>{
      if(bypass){filter.write(event.data);return;}
      chunks.push(new Uint8Array(event.data));size+=event.data.byteLength;
      if(size>entry.bytes){for(const chunk of chunks)filter.write(chunk);chunks=[];bypass=true;}
    };
    filter.onstop=async()=>{
      try {
        if(bypass)return;
        const original=new Uint8Array(size);let offset=0;
        for(const chunk of chunks){original.set(chunk,offset);offset+=chunk.length;}
        if(size===entry.bytes && await hash(original)===entry.sha256){
          filter.write(entry.code);
          console.info('[airstraf replacement]',details.url);
        }else{
          filter.write(original);
          console.warn('[airstraf replacement] Changed live file; left untouched:',details.url);
        }
      }catch(error){for(const chunk of chunks)filter.write(chunk);console.warn(error);}
      finally{filter.close();}
    };
    filter.onerror=()=>console.warn('[airstraf replacement] Filter error:',filter.error);
  },{urls:['https://airstraf.ing/*'],types:['script']},['blocking']);
  async function update(){
    if(updating)return;updating=true;
    try{
      const commit=await (await fetchChecked(`https://api.github.com/repos/${repo}/commits/main`)).json();
      if(!/^[a-f0-9]{40}$/.test(commit.sha))throw new Error('Invalid commit');
      if(commit.sha===revision)return;
      await loadSet(`https://raw.githubusercontent.com/${repo}/${commit.sha}/dist/firefox/`);
      revision=commit.sha;
      console.info('[airstraf replacement] Updated to',revision);
    }catch(error){console.warn('[airstraf replacement] Keeping previous files:',error.message);}
    finally{updating=false;}
  }
  browser.alarms.onAlarm.addListener(alarm=>{if(alarm.name==='github-update')void update();});
  browser.browserAction.onClicked.addListener(update);
  try{await loadSet(browser.runtime.getURL(''));}catch(error){console.warn(error);}
  browser.alarms.create('github-update',{periodInMinutes:15});
  await update();
})();
