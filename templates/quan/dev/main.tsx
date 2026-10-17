import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QuanHost } from '@quanarch/react';
import quan from '../src';
import { plugs } from './plugs';

// The development quanar: hosts this quan alone, with stand-in quas, so it can
// be built without a real quanar.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QuanHost quan={quan} plugs={plugs} />
  </StrictMode>,
);
