import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { shareQuanarModules } from './core';
import { App } from './app';
import './assets/styles/index.css';

// Before any quan is loaded: quans use this quanar's React.
shareQuanarModules();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
