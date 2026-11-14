import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {instrumentRender} from '../tools/instrument_render.mjs';
function setup(){const context=vm.createContext({console:{warn(){}},performance:{now:()=>1}});vm.runInContext(fs.readFileSync('extension/render-hook.js','utf8'),context);return context.__AIRSTRAF_RENDER__;}
test('render hook preserves receiver, arguments, return values, and errors',()=>{
 const hook=setup(),scene={},camera={},error=new Error('original');
 const renderer={render(sceneArg,cameraArg){assert.equal(this,renderer);assert.equal(sceneArg,scene);assert.equal(cameraArg,camera);return 42;}};
 hook.registerRenderer(renderer);hook.registerRenderer(renderer);
 assert.equal(renderer.render(scene,camera),42);assert.equal(hook.getState().renderCalls,1);assert.equal(hook.getState().camera,camera);
 const failing={render(){throw error;}};hook.registerRenderer(failing);assert.throws(()=>failing.render(),e=>e===error);
});
test('frame subscribers are isolated and uninstall restores own/prototype methods',()=>{
 const hook=setup();let observed=0;
 const prototype={frame(){return 'frame';}},game=Object.create(prototype),original=prototype.frame;
 hook.registerGame(game);const stop=hook.onFrame(()=>observed++);hook.onFrame(()=>{throw Error('observer');});
 assert.equal(game.frame(),'frame');assert.equal(observed,1);assert.equal(hook.getState().frames,1);
 stop();game.frame();assert.equal(observed,1);hook.setEnabled(false);game.frame();assert.equal(hook.getState().frames,2);
 hook.uninstall();assert.equal(game.frame,original);assert.equal(Object.hasOwn(game,'frame'),false);
});
test('packaging registers only verified constructors; hook bootstrap is idempotent',()=>{
 const context=vm.createContext({console:{warn(){}},performance:{now:()=>1}});
 for(const [file,name,body] of [
  ['airstraf.ing/assets/three-Bi9Yyrpt.js','WebGLRenderer','this.render=function(){return 7;}'],
  ['airstraf.ing/assets/c-DRieNrHJ.js','GameRenderer','this.frame=function(){return 8;}']]){
  const input=`var ${name}=class {constructor(){${body}}}; globalThis.instance=new ${name}();`;
  vm.runInContext(instrumentRender(file,input),context);
 }
 assert.equal(context.instance.frame(),8);assert.equal(context.__AIRSTRAF_RENDER__.getState().frames,1);
 assert.throws(()=>instrumentRender('airstraf.ing/assets/three-Bi9Yyrpt.js','const wrong=1;'),/Missing verified/);
});
