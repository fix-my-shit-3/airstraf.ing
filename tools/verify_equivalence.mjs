// Compare ASTs after canonicalizing lexical names. Properties, literals, operators,
// imports, exports and control flow must remain equivalent after renaming.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {parse} from '@babel/parser';
import traverseModule from '@babel/traverse';
import generatorModule from '@babel/generator';
const traverse=traverseModule.default, generate=generatorModule.default;
function canonical(code){
 const ast=parse(code,{sourceType:'unambiguous',allowReturnOutsideFunction:true,allowAwaitOutsideFunction:true,plugins:['jsx']});
 const bindings=[];const seen=new Set();
 traverse(ast,{Scope(p){for(const binding of Object.values(p.scope.bindings)){
  if(!seen.has(binding)){seen.add(binding);bindings.push(binding);}
 }}});
 // Declaration order rather than name/object-key order makes this independent of renames.
 bindings.sort((a,b)=>a.identifier.start-b.identifier.start);
 const names=new Map(bindings.map((binding,index)=>[binding,`__equivalence_binding_${index}__`]));
 const declarations=new Map(bindings.map(binding=>[binding.identifier,binding]));
 const edits=[];
 traverse(ast,{Identifier(p){
   if(!p.isReferencedIdentifier() && !p.isBindingIdentifier())return;
   const parent=p.parent;
   if((p.key==='key' && !parent.computed) ||
      (p.key==='property' && !parent.computed) ||
      p.key==='label' || p.key==='imported' || p.key==='exported')return;
   const binding=declarations.get(p.node) || p.scope.getBinding(p.node.name);
   if(names.has(binding))edits.push([p.node,names.get(binding)]);
 }});
 for(const [node,name] of edits)node.name=name;
 const normalized=parse(generate(ast,{comments:false,minified:true}).code,{sourceType:'unambiguous',allowReturnOutsideFunction:true,allowAwaitOutsideFunction:true,plugins:['jsx']});
 return JSON.stringify(normalized,(key,value)=>['start','end','loc','extra','leadingComments','trailingComments','innerComments','comments'].includes(key)?undefined:value);
}
for(const file of JSON.parse(fs.readFileSync('dist/report.json')).files){
 const a=canonical(fs.readFileSync('dist/readable/'+file.file,'utf8'));
 const b=canonical(fs.readFileSync('source/'+file.file,'utf8'));
 if(a!==b){let i=0;while(a[i]===b[i])i++;throw Error(file.file+' at '+i+'\nReadable: '+a.slice(i-100,i+200)+'\nOriginal: '+b.slice(i-100,i+200));}

}
console.log('PASS: lexical-normalized AST equivalence across all 75 files');
