import fs from 'node:fs';
import {parse} from '@babel/parser';
import traverseModule from '@babel/traverse';
const traverse=traverseModule.default;
const targets = new Map([
 ['airstraf.ing/assets/three-Bi9Yyrpt.js', {className:'WebGLRenderer',method:'registerRenderer'}],
 ['airstraf.ing/assets/c-DRieNrHJ.js', {className:'GameRenderer',method:'registerGame'}]
]);
export function instrumentRender(file,code){
 const target=targets.get(file);if(!target)return code;
 const ast=parse(code,{sourceType:'module'});let insertAt=null;
 traverse(ast,{VariableDeclarator(p){
  if(p.node.id.name!==target.className || p.node.init?.type!=='ClassExpression')return;
  const constructor=p.node.init.body.body.find(n=>n.type==='ClassMethod'&&n.kind==='constructor');
  if(constructor){if(insertAt!==null)throw Error('Ambiguous hook target '+file);insertAt=constructor.body.end-1;}
 }});
 if(insertAt===null)throw Error('Missing verified hook target '+file);
 const registration=`\n/* Register diagnostics after renderer construction. */\ntry { globalThis.__AIRSTRAF_RENDER__?.${target.method}(this); } catch (hookError) { console.warn('[airstraf render hook]', hookError); }\n`;
 const bootstrap=fs.readFileSync('extension/render-hook.js','utf8');
 return bootstrap+'\n'+code.slice(0,insertAt)+registration+code.slice(insertAt);
}
