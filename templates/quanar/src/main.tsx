import * as React from 'react';
import * as JsxRuntime from 'react/jsx-runtime';
import * as ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import * as Quanarch from '@quanarch/react';
import { App } from './App';
import './styles.css';

// Quans use this quanar's React instead of bundling their own.
Quanarch.shareModules({
  react: React,
  'react/jsx-runtime': JsxRuntime,
  'react-dom': ReactDOM,
  '@quanarch/react': Quanarch,
});

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
