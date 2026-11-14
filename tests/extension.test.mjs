import assert from 'node:assert/strict';
import {test} from 'node:test';
import vm from 'node:vm';
import fs from 'node:fs';
import {webcrypto,createHash} from 'node:crypto';
const script=fs.readFileSync('extension/background.js','utf8');
const sha=b=>createHash('sha256').update(b).digest('hex');
const original=Buffer.from('let a=1;'),replacement=Buffer.from('let readableValue=1;');
const entry={url:'https://airstraf.ing/assets/test.js',bytes:original.length,sha256:sha(original),
 replacementPath:`files/${sha(replacement)}.js`,replacementSha256:sha(replacement)};
async function setup(remoteFailure=false){
 let callback,filter,click,alarm,closed,finish;
 const output=[];const requests=[];
 const remoteCode=Buffer.from('let updatedValue=1;');
 const remoteEntry={...entry,replacementPath:`files/${sha(remoteCode)}.js`,replacementSha256:sha(remoteCode)};
 let remoteEnabled=false;
 const context={TextEncoder,Uint8Array,URL,AbortSignal,crypto:webcrypto,console:{info(){},warn(){}},
 fetch:async url=>{
  requests.push(url);const local=url.startsWith('moz-extension:');
  if(!local&&!remoteEnabled)throw Error('offline');
  if(url.includes('/commits/'))return {ok:true,json:async()=>({sha:'a'.repeat(40)})};
  if(url.endsWith('replacements.json'))return {ok:true,json:async()=>({version:1,files:[local?entry:remoteEntry]})};
  return {ok:true,arrayBuffer:async()=>Uint8Array.from(local?replacement:remoteFailure?original:remoteCode).buffer};
 },browser:{runtime:{getURL:p=>'moz-extension://test/'+p},
 browserAction:{setTitle(){},onClicked:{addListener:fn=>click=fn}},
 alarms:{create(){},onAlarm:{addListener:fn=>alarm=fn}},
 webRequest:{onBeforeRequest:{addListener:fn=>callback=fn},filterResponseData:()=>filter={
 write:bytes=>output.push(Buffer.from(bytes)),close:()=>finish()}}}};
 await vm.runInNewContext(script,context);await new Promise(setImmediate);
 return {requests,async update(){remoteEnabled=true;await click();},
 async intercept(input,url=entry.url){
  output.length=0;filter=null;closed=new Promise(r=>finish=r);callback({url,requestId:'1'});
  if(!filter)return null;
  for(const part of [input.subarray(0,3),input.subarray(3)])filter.ondata({data:Uint8Array.from(part).buffer});
  await filter.onstop();await closed;return Buffer.concat(output);
 }};
}
test('matching live response is replaced with readable code',async()=>{
 const env=await setup();assert.deepEqual(await env.intercept(original,entry.url+'?v=1'),replacement);
});
test('changed bytes and larger bodies are returned unmodified',async()=>{
 const env=await setup();for(const str of ['let a=2;','let a=200;']){
 const input=Buffer.from(str);assert.deepEqual(await env.intercept(input),input);}
 assert.equal(await env.intercept(original,'https://airstraf.ing/unknown.js'),null);
});
test('GitHub updates are pinned to a commit and used on subsequent requests',async()=>{
 const env=await setup();await env.update();
 assert.equal((await env.intercept(original)).toString(),'let updatedValue=1;');
 assert.ok(env.requests.some(url=>url.includes('/'+'a'.repeat(40)+'/dist/firefox/files/')));
});
test('invalid GitHub download retains the working replacement set',async()=>{
 const env=await setup(true);await env.update();assert.deepEqual(await env.intercept(original),replacement);
});
test('all packaged replacement checksums match; no map artifacts remain',()=>{
 const manifest=JSON.parse(fs.readFileSync('dist/firefox/replacements.json'));
 assert.equal(manifest.files.length,75);
 for(const e of manifest.files){
 assert.equal(sha(fs.readFileSync('source/'+e.url.slice(8))),e.sha256);
 assert.equal(sha(fs.readFileSync('dist/firefox/'+e.replacementPath)),e.replacementSha256);}
 for(const p of ['dist/maps','dist/instrumented','dist/site-map.json'])assert.equal(fs.existsSync(p),false);
});
