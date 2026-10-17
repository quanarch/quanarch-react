import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import {
  defineQua, defineQuan, isQuanModule, missingQuas, plug, quaKey, QuanHost, useQua, shareModules, SHARED_GLOBAL,
} from '../dist/index.js';

const quaA = defineQua('qua-a', '1');
const quaB = defineQua('qua-b', '2');

function Greeting() {
  return createElement('p', null, `hello ${useQua(quaA).name()}`);
}
const quan = defineQuan({ name: 'billing', quas: [quaA], component: Greeting });

test('defineQua validates names and versions', () => {
  assert.equal(quaKey(quaA), 'qua-a@1');
  assert.throws(() => defineQua('QuaA', '1'), /kebab-case/);
  assert.throws(() => defineQua('qua-a', ''), /needs a version/);
});

test('defineQuan produces a recognisable module', () => {
  assert.equal(quan.quanarch, 1);
  assert.ok(isQuanModule(quan));
  assert.ok(!isQuanModule({ name: 'x' }));
  assert.ok(!isQuanModule(null));
});

test('QuanHost gives a quan exactly the quas it declared', () => {
  const html = renderToString(createElement(QuanHost, {
    quan,
    plugs: [plug(quaA, { name: () => 'ada' }), plug(quaB, {})],
  }));
  assert.match(html, /hello ada/);
});

test('undeclared quas stay out of reach', () => {
  function Sneaky() {
    useQua(quaB);
    return null;
  }
  const sneaky = defineQuan({ name: 'sneaky', quas: [quaA], component: Sneaky });
  assert.throws(
    () => renderToString(createElement(QuanHost, { quan: sneaky, plugs: [plug(quaA, {}), plug(quaB, {})] })),
    /qua-b@2 is not plugged in/,
  );
});

test('missing quas are reported or rendered as a fallback', () => {
  assert.deepEqual(missingQuas(quan, []).map(quaKey), ['qua-a@1']);
  assert.throws(() => renderToString(createElement(QuanHost, { quan, plugs: [] })), /needs qua-a@1/);
  const html = renderToString(createElement(QuanHost, {
    quan, plugs: [], fallback: (missing) => createElement('i', null, `missing ${missing.map(quaKey)}`),
  }));
  assert.match(html, /missing qua-a@1/);
});

test('versions must match', () => {
  const quaA2 = defineQua('qua-a', '2');
  assert.deepEqual(missingQuas(quan, [plug(quaA2, {})]).map(quaKey), ['qua-a@1']);
});

test('useQua outside a quanar fails clearly', () => {
  assert.throws(() => renderToString(createElement(Greeting)), /outside a quanar/);
});

test('shareModules publishes on the shared global', () => {
  shareModules({ react: 1, 'react/jsx-runtime': 2, 'react-dom': 3, '@quanarch/react': 4 });
  assert.equal(globalThis[SHARED_GLOBAL].react, 1);
  assert.ok(Object.isFrozen(globalThis[SHARED_GLOBAL]));
});
