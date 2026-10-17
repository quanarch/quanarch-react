import type { QuanModule } from '@quanarch/react';

/** A quan the loader was asked for: its module, or why it could not be loaded. */
export interface LoadedQuan {
  name: string;
  module?: QuanModule;
  error?: string;
}
