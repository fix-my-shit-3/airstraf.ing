// Reviewed correspondence with three@0.186.0/src/renderers/WebGLRenderer.js.
import fs from 'node:fs';import {parse}from'@babel/parser';import tm from'@babel/traverse';import gm from'@babel/generator';import * as t from '@babel/types';
const traverse=tm.default,generate=gm.default,file='dist/readable/airstraf.ing/assets/three-Bi9Yyrpt.js';
const tree=parse(fs.readFileSync(file,'utf8'),{sourceType:'module'}),reserved=new Set(),audit=[];
let program,constructor;
traverse(tree,{Program(p){program=p;},Identifier(p){if(p.isReferencedIdentifier()||p.isBindingIdentifier())reserved.add(p.node.name);},ClassMethod(p){if(p.node.kind==='constructor'&&p.parentPath.parentPath.parentPath.node.id?.name==='WebGLRenderer')constructor=p;}});
if(!constructor)throw Error('Expected WebGLRenderer constructor');
function rename(binding,name,evidence){if(!binding||binding.identifier.name===name)return;const oldName=binding.identifier.name;let safe=name,i=2;while(reserved.has(safe))safe=name+'_'+i++;reserved.add(safe);binding.scope.rename(oldName,safe);audit.push({oldName,newName:safe,line:binding.identifier.loc?.start.line,evidence});}
const helpers={Ml:'WebGLCapabilities',Kf:'WebGLState',Xf:'WebGLTextures',kl:'WebGLEnvironments',Bl:'WebGLBindingStates',Df:'WebGLPrograms',nd:'WebGLMaterials',wl:'WebGLBackground',Yf:'WebGLShadowMap',id:'WebGLUniformsGroups',Xl:'WebGLOutput',$f:'WebXRManager'};
for(const [old,name] of Object.entries(helpers))rename(program.scope.getBinding(old),name,'Verified r186 initGLContext/renderer subsystem construction');
const locals={v:'contextAlpha',I:'rendererOutputBufferType',uniqueItems:'integerFormats',_uniqueItems:'unsignedTypes',uint32Values:'uintClearColor',int32Values:'intClearColor',x:'objectPosition',D:'currentRenderList',L:'currentRenderState',T:'renderListStack',U:'renderStateStack',F:'outputPass',G:'rendererInstance',O:'isContextLost',H:'nodesHandler',k:'scratchFramebuffer',V:'sourceFramebuffer',W:'destinationFramebuffer',q:'currentActiveCubeFace',J:'currentActiveMipmapLevel',z:'currentRenderTarget',Y:'currentMaterialId',K:'currentCamera',X:'currentViewport',j:'currentScissor',Z:'currentScissorTest',$:'currentClearColor',tt:'currentClearAlpha',et:'canvasWidth',nt:'canvasHeight',it:'pixelRatio',st:'opaqueSort',rt:'transparentSort',ot:'viewport',at:'scissor',ht:'scissorTest',ct:'frustum',At:'clippingEnabled',lt:'localClippingEnabled',ut:'projectionScreenMatrix',ft:'scratchVector3',dt:'scratchVector4',gt:'emptyScene',pt:'renderBackground',mt:'getTargetPixelRatio',vt:'extensions',Et:'capabilities',It:'glState',Ct:'renderInfo',_t:'properties',wt:'textures',Bt:'environments',St:'attributes',Mt:'geometries',yt:'objects',Qt:'programCache',Dt:'materials',Lt:'renderLists',Tt:'renderStates',Nt:'clipping',Rt:'shadowMap',bt:'background',Ut:'morphTargets',Pt:'bufferRenderer',Ft:'indexedBufferRenderer',Gt:'glUtils',Ot:'bindingStates',Ht:'uniformGroups',kt:'gl',Wt:'getContext',qt:'initGLContext',_eventTarget:'xrManager',zt:'onContextLost',Yt:'onContextRestore',Kt:'onContextCreationError',Xt:'onMaterialDispose',jt:'prepareMaterial',Zt:'animationFrameCallback',$t:'onXrSessionStart',ee:'onXrSessionEnd',ne:'animation',ie:'projectObject',se:'renderScene',oe:'renderTransmissionPass',ce:'renderObjects',Ae:'renderObject',le:'getProgram',ue:'getUniformList',fe:'updateCommonMaterialProperties',de:'getReadableState'};
const references={};
for(const [old,name] of Object.entries(locals)){
 const b=constructor.scope.getOwnBinding(old);if(!b)continue;references[name]=b.path;rename(b,name,'Reviewed r186 WebGLRenderer lexical state/helper');
}
const signatures={onMaterialDispose:['event'],prepareMaterial:['material','scene','camera','object'],renderTransmissionPass:['opaqueObjects','transmissiveObjects','scene','camera'],renderObject:['object','scene','camera','geometry','material','group'],getProgram:['material','scene','object']};
for(const [name,params] of Object.entries(signatures)){
 const p=references[name];if(!p?.isFunctionDeclaration()||p.node.params.length!==params.length)throw Error('Renderer helper changed: '+name);
 p.node.params.forEach((param,i)=>{if(t.isIdentifier(param))rename(p.scope.getOwnBinding(param.name),params[i],'Reviewed r186 '+name+' parameter '+i);});
}
// Named property reads provide concrete local roles inside the render pipeline.
const seen=new Set();constructor.traverse({Scope(p){for(const b of Object.values(p.scope.bindings)){
 if(seen.has(b)||!/^[_$a-zA-Z]{1,3}$/.test(b.identifier.name))continue;seen.add(b);
 const n=b.path.node;if(n.type==='VariableDeclarator'&&t.isMemberExpression(n.init)&&!n.init.computed&&n.init.property.name?.length>3){
  rename(b,n.init.property.name,'Direct renderer property read .'+n.init.property.name);
 }
}}});
fs.writeFileSync(file,generate(tree,{comments:true}).code+'\n');
fs.writeFileSync('dist/webgl-renderer-renames.json',JSON.stringify({reference:'three@0.186.0/src/renderers/WebGLRenderer.js',renames:audit},null,2)+'\n');
console.log(`WebGLRenderer core: ${audit.length} state/helper renames`);
