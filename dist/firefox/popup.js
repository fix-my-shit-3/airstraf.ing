const $ = id => document.getElementById(id);
let tabId, gameTab = false, pending = false;
const time = value => value ? new Date(value).toLocaleString() : 'Never';
function render(s) {
  $('ready').textContent=s.ready;$('replaced').textContent=s.replaced;$('skipped').textContent=s.skipped;
  $('state').textContent=s.ready ? 'Ready to replace matching game scripts' : 'Loading replacement files…';
  $('version').textContent=s.version;$('revision').textContent=s.revision ? s.revision.slice(0,12) : 'Bundled files';
  $('checked').textContent=time(s.lastChecked);$('updated').textContent=time(s.lastUpdated);
  $('update-status').textContent=s.updating ? (s.downloadProgress ? `Verifying files: ${s.downloadProgress.done} / ${s.downloadProgress.total}` : 'Checking GitHub…') : s.updateMessage;
  $('error').hidden=!s.lastError;$('error').textContent=s.lastError;
  $('download').disabled=s.updating || pending;$('download').textContent=s.updating ? 'Downloading…' : '↓ Download latest';
  $('reload').disabled=!gameTab || !s.ready || s.updating;
  $('file-count').textContent=`(${s.files.length})`;
  $('files').replaceChildren(...s.files.map(file=>{
    const li=document.createElement('li');li.className=file.result==='replaced'?'ok':'skip';
    const name=document.createElement('span');name.textContent=`${file.result==='replaced'?'✓':'–'} ${new URL(file.url).pathname}`;
    const reason=document.createElement('small');reason.textContent=file.reason || 'Readable response delivered';
    li.append(name,reason);return li;
  }));
}
async function refresh(){render(await browser.runtime.sendMessage({type:'status',tabId}));}
function showError(error){$('error').hidden=false;$('error').textContent=error.message;}
$('download').addEventListener('click',async()=>{
 pending=true;$('download').disabled=true;
 try{render(await browser.runtime.sendMessage({type:'download-latest',tabId}));}
 catch(error){showError(error);}finally{pending=false;await refresh().catch(showError);}
});
$('reload').addEventListener('click',async()=>{
 try{await browser.tabs.reload(tabId,{bypassCache:true});window.close();}catch(error){showError(error);}
});
(async()=>{
 const [tab]=await browser.tabs.query({active:true,currentWindow:true});tabId=tab?.id;
 gameTab=!!tab?.url?.startsWith('https://airstraf.ing/');
 if(!gameTab)$('tab-note').textContent='Open airstraf.ing in this tab to see replacement activity.';
 await refresh();setInterval(()=>refresh().catch(showError),1000);
})().catch(showError);
