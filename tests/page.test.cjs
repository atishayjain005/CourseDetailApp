const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const babel = require('next/dist/compiled/babel/core');
const React = require('react');
const {create, act} = require('react-test-renderer');
const root = path.resolve(__dirname, '..');
const originalJs = require.extensions['.js'];
function compile(module, filename) {
  if (filename.startsWith(path.join(root,'pages')) || filename.startsWith(path.join(root,'components'))) {
    const {code} = babel.transformFileSync(filename, {presets:[require.resolve('next/babel')],
      plugins:[require.resolve('next/dist/compiled/babel/plugin-transform-modules-commonjs')], babelrc:false, configFile:false});
    module._compile(babel.transformSync(code, {plugins:[require.resolve('next/dist/compiled/babel/plugin-transform-modules-commonjs')], babelrc:false, configFile:false}).code,filename);
  } else originalJs(module,filename);
}
require.extensions['.jsx'] = compile;
require.extensions['.js'] = compile;
const Home = require('../pages/index.js').default;
const Navbar = require('../components/Navbar.jsx').default;
const Main = require('../components/Main.jsx').default;
const Details = require('../components/Details.jsx').default;
test('page preserves successful courses, prevents duplicate pending submissions and recovers after failure', async () => {
  const originalFetch = global.fetch;
  let view;
  let resolveRequest;
  let calls = 0;
  try {
    global.fetch = () => {calls++; return new Promise(resolve => {resolveRequest = resolve;});};
    await act(async()=>{view = create(React.createElement(Home));});
    const navbar = () => view.root.findByType(Navbar);
    let request;
    act(()=>{request=navbar().props.onAdd(); navbar().props.onAdd();});
    assert.equal(calls,1);
    assert.equal(navbar().props.pending,true);
    await act(async()=>{resolveRequest({ok:true,json:async()=>({data:{categoryName:'Test course',categoryDescription:'Test description',status:1}})}); await request;});
    assert.equal(view.root.findByType(Main).props.courses.length,1);
    assert.equal(navbar().props.pending,false);
    await act(async()=>{view.root.findByType(Details).props.onChange('query','missing');});
    assert.equal(view.root.findByType(Main).props.courses.length,0);
    await act(async()=>{view.root.findByType(Details).props.onReset();});
    assert.equal(view.root.findByType(Main).props.courses.length,1);
    global.fetch=async()=>{throw new Error('offline');};
    await act(async()=>{await navbar().props.onAdd();});
    assert.equal(view.root.findAllByProps({role:'alert'}).length,1);
    assert.equal(view.root.findByType(Main).props.courses.length,1);
    assert.equal(navbar().props.pending,false);
    global.fetch=async()=>({ok:true,json:async()=>({data:{categoryName:'Second',categoryDescription:'Second test',status:0}})});
    await act(async()=>{await navbar().props.onAdd();});
    const courses=view.root.findByType(Main).props.courses;
    assert.equal(courses.length,2);
    assert.notEqual(courses[0].localId,courses[1].localId);
    assert.equal(view.root.findAllByProps({role:'alert'}).length,0);
  } finally {if(view) act(()=>view.unmount());global.fetch=originalFetch;}
});
