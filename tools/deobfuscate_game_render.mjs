import fs from 'node:fs';
import {parse} from '@babel/parser';
import traverseModule from '@babel/traverse';
import generatorModule from '@babel/generator';
import * as t from '@babel/types';
const traverse=traverseModule.default,generate=generatorModule.default;
const file='c-DRieNrHJ.js',root='dist/readable/airstraf.ing/assets';
const ast=parse(fs.readFileSync(`${root}/${file}`,'utf8'),{sourceType:'module'});
const audit=[],aliases={
 $_6lu:'setRenderScale',$_kn1:'setResolutionMultiplier',$_731:'effectivePixelRatio',$_3ni:'cappedRenderScale',
 $_6wb:'computeResolutionLimit',$_p2q:'setCameraFarPlane',$_5hd:'setColorProfile',$_7cw:'applyPostProfile',
 $_51n:'resizeWebGpu',$_7il:'getModelPoolCounts',$_299:'backendName',$_72l:'getWebGpuStats',$_6ps:'openWebGpu',
 $_1ag:'attachWebGpu',$_1sh:'detachWebGpu',$_3jg:'getBackendBindings',$_6x89:'collectShadowCasters',
 $_4uq:'updateWorldResolution',$_11o:'computeOverscanScale',$_48ut:'resizeWorldTargets',$_1uk:'setCameraStretch',
 $_qcp:'updateResamplingUniforms',$_o23:'setStretchPixels',$_513:'projectWorldPointIntoViewmodelSpace',
 $_1dk:'preloadActorRigs',$_1vq:'restoreGpuResources',$_37z:'supportsParallelShaderCompile',
 $_5tm:'preloadRareModels',$_540:'beginSettling',$_7kt:'activePrimer',$_3u9:'countPendingCharacters',
 $_2ck:'createCharacterLoadPriority',$_6ne:'collectVisibleCharacterMeshes',$_39b:'recordCharacterLoadFailure',
 $_52t:'getVisibleCharacterPosition',$_1ee:'getVisibleCharacterMount',$_32e:'preloadCurrentWeaponProjectile',
 $_vpe:'activeFirstPersonView',$_64e:'updateChargeEffect',$_4y6:'setForcedSpeedLines',$_5xj:'triggerNuke',
 $_45m:'armNuke',$_z5l:'clearTransientEffects',$_134:'spawnEffect',
 $_6ht:'firstPersonMotionState',$_3fd:'characterAnimationState',$_66a:'firstPersonRoot',$_597:'postFrameState',
 $_2ob7:'paniniProjectionScratch',$_5uk:'worldResolutionScale',$_72r:'configuredFov',$_385:'activeWorldTarget',
 $_6aj:'requestedRenderScale',$_4tx:'maximumRenderScale',$_7m9:'colorProfile',$_70g:'profileDirty',
 $_6jqb:'orbitCenter',$_3ry:'modelsReady',$_2ba:'debugPlayerState',$_3kw:'projectileScratch',$_19i:'projectileCount',
 $_d12:'removeAbsentCharacter',$_310:'collectProjectile',$_7nj:'webGlGpuTimer',$_b6o:'webGpuTimer',
 $_7n7:'activeGpuTimer',$_147:'resolutionMultiplier',$_18j:'mapPostProfile',$_4aa:'renderLocalCharacter',
 $_1s7:'characterLodController',$_73c:'firstPersonController',$_1rv:'firstPersonParticles',
 $_319:'barrelEffects',$_3y9:'nukeLightEffect',$_5cdw:'cameraShake',$_3zm:'beamEffects',
 $_59t:'interpolatedPoseProvider',$_7mi:'movementPoseProvider',$_1ka:'aliveProvider',$_2qq:'debugPoseProvider',
 $_2he:'emoteProvider',$_403:'deathPoseProvider',$_47k:'extraShadowCasters',$_fpe:'contextStatusCallback'
};
const reserved=new Set();traverse(ast,{Identifier(p){if(p.isReferencedIdentifier()||p.isBindingIdentifier())reserved.add(p.node.name);}});
function rename(binding,name,evidence){if(!binding||binding.identifier.name===name)return;const oldName=binding.identifier.name;let safe=name,i=2;while(reserved.has(safe))safe=name+'_'+i++;reserved.add(safe);binding.scope.rename(oldName,safe);audit.push({file,oldName,newName:safe,line:binding.identifier.loc?.start.line,evidence});}
let program,renderer;traverse(ast,{Program(p){program=p;},VariableDeclarator(p){if(p.node.id.name==='yI')renderer=p.get('init');}});
if(!renderer?.isClassExpression())throw Error('Expected archived GameRenderer class');
for(const [oldName,name] of Object.entries({yI:'GameRenderer',rI:'createWebGlContextAttributes',hI:'WebGlUnavailableError',lI:'retryWebGlInitialization',cI:'getMaterialTransparencyFlags',uI:'emptyDebugPlayers',fI:'renderScratchVector',dI:'beamPoints',AI:'beamNormals',pI:'chargePosition',mI:'weaponEffectOffset',vI:'deathPosePitch'}))rename(program.scope.getBinding(oldName),name,'Reviewed render-controller usage');
const signatures={constructor:['canvas','options'],$_6lu:['renderScale'],$_kn1:['resolutionMultiplier'],$_6wb:['width','height'],$_p2q:['farPlane'],$_5hd:['profile','forceRefresh'],$_7cw:['profileOverrides'],$_51n:['gpuBackend'],$_1ag:['gpuBackend'],$_1sh:['reason'],$_1uk:['stretch'],drawStill:['camera','target'],gradeStill:['target','outputTarget'],$_o23:['enabled'],$_513:['worldPoint'],loadMap:['mapData','runtimeMap'],prepare:['playerCapacity','onProgress'],$_2ck:['character'],$_39b:['character','assetKind','error'],pend:['character','promise'],$_52t:['playerId'],$_1ee:['playerId'],setDynamic:['nodeId','matrix','visible'],setWeapon:['weaponId'],setFov:['fovDegrees'],predictedShot:['hits','weaponId','shotSequence'],laser:['origin','segments','showTracer','showImpact'],$_64e:['charge'],arrowEnd:['shot'],shot:['shot','isLocal','wasPredicted','showLocalEffects'],bulletHoles:['enabled'],$_75y:['enabled'],$_4y6:['enabled'],$_5xj:['timestamp','position'],$_45m:['timestamp'],wallKick:['playerId'],explosion:['explosion'],frame:['timestamp','localPlayer','predictedState','players','projectiles','yaw','pitch','playing','aiming','inputState','externalView']};
for(const member of renderer.get('body.body')){
 const key=member.node.key?.name;
 if(aliases[key])t.addComment(member.node,'leading',' '+aliases[key]+' (original property key retained for compatibility) ');
 if(member.isClassMethod()){
  const names=signatures[key];if(names)member.node.params.forEach((param,index)=>{
   const id=t.isAssignmentPattern(param)?param.left:param;if(t.isIdentifier(id)&&names[index])rename(member.scope.getOwnBinding(id.name),names[index],'Reviewed GameRenderer.'+key+' argument '+index);
  });
  if(key==='frame'){
   const locals={p:'elapsedSeconds',m:'deltaSeconds',w:'localPlayerAlive',g:'externalFirstPersonView',v:'fieldOfView',y:'projectionElements',M:'presentIds',S:'debugPlayers',b:'debugState',_:'projectileList',k:'flashActive',x:'flashExposure',F:'gradingTarget',C:'postRequested',I:'paniniTarget',P:'standaloneFlash',B:'postFrameState',L:'compositeTarget',E:'worldRenderTarget',R:'paniniProjection',D:'postOutput'};
   for(const [old,name] of Object.entries(locals))rename(member.scope.getOwnBinding(old),name,'Reviewed frame render pipeline');
   member.traverse({ForStatement(p){
    const body=p.get('body');if(!body.isBlockStatement())return;
    const b=body.scope.getOwnBinding('h');if(!b?.path.isVariableDeclarator()||!t.isCallExpression(b.path.node.init)||!t.isMemberExpression(b.path.node.init.callee)||b.path.node.init.callee.property.name!=='get')return;
    for(const [old,name] of Object.entries({i:'playerState',o:'hideLocalPlayer',h:'character',l:'alive',c:'deathPose',u:'isLocalPlayer',f:'interpolatedPose',p:'renderPose',w:'modelScale',g:'holderVisible',v:'withinLodRange',y:'movementState',b:'characterYaw',_:'characterPitch'}))rename(body.scope.getOwnBinding(old),name,'Reviewed per-player render loop');
   }});
  }
 }
}
// Constructor assignments expose the roles of renderer components directly.
renderer.traverse({AssignmentExpression(p){const {left,right}=p.node;
 if(!t.isMemberExpression(left)||!t.isThisExpression(left.object)||!t.isIdentifier(left.property)||!t.isNewExpression(right)||!t.isIdentifier(right.callee))return;
 const names={renderer:'WebGLRenderer',freeze:'FrameFreezeCapture',grading:'ColorGradingPass',post:'PostProcessingPipeline',panini:'PaniniProjectionPass',programs:'ShaderProgramCache',primer:'ShaderPrimer',prelink:'ShaderPrelinker',soft:'SoftTransparencyRenderer',pool:'CharacterModelPool',ragdolls:'RagdollRenderer',killFx:'KillEffectRenderer',reserve:'CharacterModelReserve',courseGhost:'CourseGhostRenderer',spectatorCams:'SpectatorCameraRenderer',contextLoss:'WebGlContextRecovery'};
 const name=names[left.property.name];if(name)rename(p.scope.getBinding(right.callee.name),name,'GameRenderer constructor assignment .'+left.property.name);
}});
// Restore straightforward local roles throughout the controller, including callbacks.
const getProp=node=>t.isMemberExpression(node)&&!node.computed&&t.isIdentifier(node.property)?node.property.name:null;
const seen=new Set();renderer.traverse({Scope(p){for(const binding of Object.values(p.scope.bindings)){
 if(seen.has(binding)||!/^[_$a-zA-Z]{1,3}$/.test(binding.identifier.name))continue;seen.add(binding);
 const decl=binding.path;
 if(decl.isVariableDeclarator()){
  const prop=getProp(decl.node.init);const name=aliases[prop] || (prop&&/^[a-z][a-zA-Z]{3,}$/.test(prop)?prop:null);
  if(name)rename(binding,name,'Direct property value .'+prop);
 }
}}});
const exports={};for(const n of ast.program.body)if(t.isExportNamedDeclaration(n))for(const s of n.specifiers)if(t.isExportSpecifier(s))exports[s.exported.name]=s.local.name;
fs.writeFileSync(`${root}/${file}`,generate(ast,{comments:true}).code+'\n');
for(const name of fs.readdirSync(root).filter(x=>x.endsWith('.js')&&x!==file)){
 const tree=parse(fs.readFileSync(`${root}/${name}`,'utf8'),{sourceType:'module'});let changed=false;
 traverse(tree,{ImportDeclaration(p){if(p.node.source.value!=='./'+file)return;for(const spec of p.node.specifiers){
  if(!t.isImportSpecifier(spec)||exports[spec.imported.name]!=='GameRenderer')continue;
  p.scope.rename(spec.local.name,p.scope.generateUidIdentifier('GameRenderer').name);changed=true;
 }}});if(changed)fs.writeFileSync(`${root}/${name}`,generate(tree,{comments:true}).code+'\n');
}
fs.writeFileSync('dist/game-render-renames.json',JSON.stringify({file,renames:audit,propertyDescriptions:aliases},null,2)+'\n');
console.log(`Game render controller: ${audit.length} reviewed lexical renames; ${Object.keys(aliases).length} property descriptions`);
