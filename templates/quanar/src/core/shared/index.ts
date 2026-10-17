import * as React from 'react';
import * as JsxRuntime from 'react/jsx-runtime';
import * as ReactDOM from 'react-dom';
import * as Quanarch from '@quanarch/react';

/** Shares this quanar's React with the quans it loads, so they do not bundle their own. */
export function shareQuanarModules() {
  Quanarch.shareModules({
    react: React,
    'react/jsx-runtime': JsxRuntime,
    'react-dom': ReactDOM,
    '@quanarch/react': Quanarch,
  });
}
