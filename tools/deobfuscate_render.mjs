/** Recover lexical render names from Three.js r186 and verified game call sites.
 * Matching changes names only. Runtime hooks are a separate packaging step.
 */
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {parse} from '@babel/parser';
import traverseModule from '@babel/traverse';
import generatorModule from '@babel/generator';
import * as t from '@babel/types';
import {minify} from 'terser';
const traverse=traverseModule.default, generate=generatorModule.default;
const ROOT='dist/readable/airstraf.ing/assets';
const ENGINE='three-Bi9Yyrpt.js';
const ast=parse(fs.readFileSync(`${ROOT}/${ENGINE}`,'utf8'),{sourceType:'module'});
let program;traverse(ast,{Program(p){program=p;}});
const audit=[];
const reservedByProgram=new WeakMap();
function rename(binding,name,evidence,file=ENGINE){
 if(!binding || !t.isValidIdentifier(name) || binding.identifier.name===name)return;
 const oldName=binding.identifier.name;
 let root=binding.scope;while(root.parent)root=root.parent;
 let reserved=reservedByProgram.get(root);
 if(!reserved){reserved=new Set();root.path.traverse({Identifier(p){if(p.isReferencedIdentifier()||p.isBindingIdentifier())reserved.add(p.node.name);}});reservedByProgram.set(root,reserved);}
 let safe=name,index=2;while(reserved.has(safe))safe=name+'_'+index++;
 reserved.add(safe);
 binding.scope.rename(oldName,safe);
 audit.push({file,oldName,newName:safe,line:binding.identifier.loc?.start.line,evidence});
}
// The shipped export namespace is an authoritative symbol table, not a guess.
const symbols=new Map();
traverse(ast,{ObjectProperty(p){
 if(!p.node.computed && t.isIdentifier(p.node.key) && t.isArrowFunctionExpression(p.node.value) && t.isIdentifier(p.node.value.body)){
  const binding=p.scope.getBinding(p.node.value.body.name);
  if(binding?.scope===program.scope)symbols.set(p.node.value.body.name,p.node.key.name);
 }
}});
for(const [old,name] of symbols)rename(program.scope.getBinding(old),name,'Shipped Three.js namespace export');
// References include unbundled WebGL helpers and GLTF/controls shipped in the same chunk.
const referenceFiles=[];
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
 const p=path.join(dir,entry.name);if(entry.isDirectory())walk(p);else if(p.endsWith('.js'))referenceFiles.push(p);
}}
walk('node_modules/three/src');
for(const name of ['loaders/GLTFLoader.js','controls/OrbitControls.js'])referenceFiles.push('node_modules/three/examples/jsm/'+name);
const refs=[];
for(const file of referenceFiles){
 const source=fs.readFileSync(file,'utf8');
 const tree=parse(source,{sourceType:'module'});
 traverse(tree,{Function(p){if(p.node.body?.type==='BlockStatement')refs.push({node:p.node,file,scope:p.scope, label:label(p)});}});
}
function label(p){
 const parts=[];
 for(let q=p;q;q=q.parentPath){
  if(q.isClassMethod()||q.isObjectMethod())parts.unshift(q.node.key.name || q.node.key.value || '?');
  else if(q.isClass())parts.unshift(q.node.id?.name || q.parentPath?.node?.id?.name || '?');
  else if(q.isFunctionDeclaration())parts.unshift(q.node.id?.name || '?');
  else if(q.isFunctionExpression()||q.isArrowFunctionExpression()){
   const parent=q.parentPath;
   if(parent?.isAssignmentExpression() && t.isMemberExpression(parent.node.left))parts.unshift('member:'+parent.node.left.property.name);
   else if(parent?.isObjectProperty())parts.unshift(parent.node.key.name || parent.node.key.value || '?');
   else if(parent?.isVariableDeclarator())parts.unshift(parent.node.id.name || '?');
  }
 }
 return parts.join('/');
}
function wrapper(node){
 const cloned=t.cloneNode(node,true);cloned.leadingComments=null;cloned.trailingComments=null;
 if(t.isClassMethod(cloned)||t.isObjectMethod(cloned)){
  const method=t.classMethod(cloned.kind==='constructor'?'constructor':'method',t.identifier(cloned.kind==='constructor'?'constructor':'match'),cloned.params,cloned.body,false,false,cloned.generator,cloned.async);
  return generate(t.file(t.program([t.classDeclaration(t.identifier('MatchClass'),t.identifier('BaseClass'),t.classBody([method])),t.expressionStatement(t.assignmentExpression('=',t.memberExpression(t.identifier('globalThis'),t.identifier('match')),t.identifier('MatchClass')))])),{comments:false}).code;
 }
 const fn=t.functionExpression(null,cloned.params,cloned.body,cloned.generator,cloned.async);
 return generate(t.assignmentExpression('=',t.memberExpression(t.identifier('globalThis'),t.identifier('match')),fn),{comments:false}).code;
}
function canonical(code){
 const tree=parse(code,{sourceType:'module'});let root;
 traverse(tree,{Function(p){if(!root)root=p;}});
 if(!root)return null;
 const bindings=[],seen=new Set();
 root.traverse({Scope(p){for(const b of Object.values(p.scope.bindings))if(!seen.has(b)){seen.add(b);bindings.push(b);}}});
 for(const b of Object.values(root.scope.bindings))if(!seen.has(b)){seen.add(b);bindings.push(b);}
 bindings.sort((a,b)=>a.identifier.start-b.identifier.start);
 const names=new Map(bindings.map((b,i)=>[b,'binding'+i]));
 const declarations=new Map(bindings.map(b=>[b.identifier,b]));
 const externals=new Map(),edits=[];
 root.traverse({Identifier(p){
  if(!p.isReferencedIdentifier()&&!p.isBindingIdentifier())return;
  if((p.key==='key'||p.key==='property')&&!p.parent.computed || ['label','imported','exported'].includes(p.key))return;
  const b=declarations.get(p.node)||p.scope.getBinding(p.node.name);
  let name=names.get(b);
  if(!name){if(!externals.has(p.node.name))externals.set(p.node.name,'external'+externals.size);name=externals.get(p.node.name);}
  edits.push([p.node,name]);
 }});
 const rootBindings=Object.values(root.scope.bindings).map(b=>({name:b.identifier.name,key:names.get(b)}));
 for(const [node,name] of edits)node.name=name;
 // Reparse to normalize parentheses, shorthand and raw literal spellings.
 const normalized=parse(generate(root.node,{comments:false,minified:true}).code.startsWith('function') ? '('+generate(root.node,{comments:false,minified:true}).code+')' : wrapper(root.node),{sourceType:'module'});
 const json=JSON.stringify(normalized,(key,value)=>['start','end','loc','extra','leadingComments','trailingComments','innerComments','comments'].includes(key)?undefined:value);
 return {hash:createHash('sha256').update(json).digest('hex'),rootBindings};
}
async function fingerprint(node){
 try{
 const code=wrapper(node);
 const result=await minify(code,{mangle:false,compress:{passes:2},format:{comments:false}});
 return canonical(result.code);
 }catch{return null;}
}
const index=new Map();
for(const ref of refs){
 const sig=await fingerprint(ref.node);if(!sig)continue;
 if(!index.has(sig.hash))index.set(sig.hash,[]);
 index.get(sig.hash).push({...ref,...sig});
}
// Name recursive class-expression bindings from the verified enclosing class name.
traverse(ast,{ClassExpression(p){
 const outer=p.parentPath.isVariableDeclarator()?p.parentPath.node.id.name:null;
 if(p.node.id && outer && outer.length>3)rename(p.scope.getOwnBinding(p.node.id.name),outer+'Class','Named recursive class binding');
}});
const targets=[];traverse(ast,{Function(p){if(p.node.body?.type==='BlockStatement')targets.push(p);}});
let matched=0;const unmatched=[];
for(const target of targets){
 const sig=await fingerprint(target.node);const candidates=sig ? index.get(sig.hash)||[] : [];
 const scoped=candidates.filter(c=>c.label===label(target));
 const choices=scoped.length?scoped:candidates;
 if(!choices.length){unmatched.push({label:label(target),line:target.node.loc?.start.line});continue;}
 const proposals=[];
 for(const local of sig.rootBindings){
  const names=new Set(choices.map(c=>c.rootBindings.find(b=>b.key===local.key)?.name).filter(Boolean));
  if(names.size===1){const name=[...names][0];if(name!=='MatchClass'&&name!=='BaseClass')proposals.push({binding:target.scope.bindings[local.name],name});}
 }
 for(const proposal of proposals)rename(proposal.binding,proposal.name,'Exact normalized function match: '+choices[0].file+' '+choices[0].label);
 matched++;
}
// Recover top-level helper function names from uniquely matching official functions.
for(const target of targets){
 const holder=target.isFunctionDeclaration()?target.node.id:target.parentPath.isVariableDeclarator()?target.parentPath.node.id:null;
 if(!holder||target.parentPath.scope!==program.scope && target.scope.parent!==program.scope)continue;
 const sig=await fingerprint(target.node);const choices=sig?index.get(sig.hash)||[]:[];
 const names=new Set(choices.filter(c=>c.node.type==='FunctionDeclaration').map(c=>c.node.id?.name).filter(Boolean));
 if(names.size===1)rename(program.scope.getBinding(holder.name),[...names][0],'Exact normalized upstream helper function');
}
const exports={};for(const node of ast.program.body)if(t.isExportNamedDeclaration(node))for(const s of node.specifiers)if(t.isExportSpecifier(s))exports[s.exported.name]=s.local.name;
fs.writeFileSync(`${ROOT}/${ENGINE}`,generate(ast,{comments:true}).code+'\n');
// Propagate restored imported names without touching public export keys.
for(const file of fs.readdirSync(ROOT).filter(f=>f.endsWith('.js')&&f!==ENGINE)){
 const tree=parse(fs.readFileSync(`${ROOT}/${file}`,'utf8'),{sourceType:'module'});
 let changed=false;
 traverse(tree,{ImportDeclaration(p){if(p.node.source.value!=='./'+ENGINE)return;
  for(const s of p.node.specifiers)if(t.isImportSpecifier(s)){
   const name=exports[s.imported.name];if(name&&name.length>3&&s.local.name!==name){rename(p.scope.getBinding(s.local.name),name,'Resolved Three.js import',file);changed=true;}
  }
 }});
 if(changed)fs.writeFileSync(`${ROOT}/${file}`,generate(tree,{comments:true}).code+'\n');
}
fs.writeFileSync('dist/render-renames.json',JSON.stringify({threeRevision:'186',reference:'three@0.186.0',matchedFunctions:matched,totalFunctions:targets.length,renames:audit,unmatched},null,2)+'\n');
console.log(JSON.stringify({renderRenames:audit.length,matchedFunctions:matched,totalFunctions:targets.length,unmatched:unmatched.length}));
