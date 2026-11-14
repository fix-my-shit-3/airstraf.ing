// Public method argument names from the exact r186 class interface.
import fs from 'node:fs';import path from 'node:path';
import {parse} from '@babel/parser';import tm from '@babel/traverse';import gm from '@babel/generator';import * as t from '@babel/types';
const traverse=tm.default,generate=gm.default,file='dist/readable/airstraf.ing/assets/three-Bi9Yyrpt.js';
const signatures=new Map();
function owner(p){const c=p.findParent(q=>q.isClass());if(!c)return null;return c.parentPath.isVariableDeclarator()?c.parentPath.node.id.name:c.node.id?.name;}
function methodKey(p){if(p.isClassMethod()&&!p.node.computed)return p.node.key.name;const a=p.parentPath;if(a?.isAssignmentExpression()&&t.isMemberExpression(a.node.left)&&t.isThisExpression(a.node.left.object)&&!a.node.left.computed)return 'member:'+a.node.left.property.name;return null;}
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):e.name.endsWith('.js')?[path.join(dir,e.name)]:[]);}
for(const sourceFile of walk('node_modules/three/src')){
 const tree=parse(fs.readFileSync(sourceFile,'utf8'),{sourceType:'module'});
 traverse(tree,{Function(p){const c=owner(p),key=methodKey(p);if(c&&key)signatures.set(c+'/'+key,{params:p.node.params,sourceFile});}});
}
const tree=parse(fs.readFileSync(file,'utf8'),{sourceType:'module'}),reserved=new Set(),audit=[];
traverse(tree,{Identifier(p){if(p.isReferencedIdentifier()||p.isBindingIdentifier())reserved.add(p.node.name);}});
function rename(binding,name,evidence){if(!binding||binding.identifier.name===name||!t.isValidIdentifier(name))return;
 // Names already recovered by exact matching take priority over ABI-level hints.
 if(binding.identifier.name.length>3&&!/^[_$a-zA-Z]{1,3}_\d+$/.test(binding.identifier.name))return;
 const oldName=binding.identifier.name;let safe=name,i=2;while(reserved.has(safe))safe=name+'_'+i++;reserved.add(safe);binding.scope.rename(oldName,safe);
 audit.push({oldName,newName:safe,line:binding.identifier.loc?.start.line,evidence});
}
traverse(tree,{Function(p){
 const c=owner(p),key=methodKey(p),signature=signatures.get(c+'/'+key);
 if(!signature||signature.params.length!==p.node.params.length)return;
 p.node.params.forEach((param,index)=>{
  const src=signature.params[index];const left=t.isAssignmentPattern(param)?param.left:param;
  const right=t.isAssignmentPattern(src)?src.left:src;
  if(t.isIdentifier(left)&&t.isIdentifier(right))rename(p.scope.getOwnBinding(left.name),right.name,`Three.js r186 public signature ${c}.${key}, parameter ${index}`);
 });
}});
// Explicit object properties in constructor destructuring and state assignments.
traverse(tree,{ObjectProperty(p){if(!p.parentPath.isObjectPattern()||p.node.computed)return;
 const name=p.node.key.name;const value=t.isAssignmentPattern(p.node.value)?p.node.value.left:p.node.value;
 if(name&&t.isIdentifier(value))rename(p.scope.getBinding(value.name),name,'Named destructuring property '+name);
},AssignmentExpression(p){const {left,right}=p.node;
 if(t.isMemberExpression(left)&&t.isThisExpression(left.object)&&!left.computed&&t.isIdentifier(right)){
  const key=left.property.name;if(key?.length>3)rename(p.scope.getBinding(right.name),key,'Assigned to this.'+key);
 }
}});
fs.writeFileSync(file,generate(tree,{comments:true}).code+'\n');
fs.writeFileSync('dist/render-signatures.json',JSON.stringify({reference:'three@0.186.0',renames:audit},null,2)+'\n');
console.log(`Restored ${audit.length} additional render signature/property bindings`);
