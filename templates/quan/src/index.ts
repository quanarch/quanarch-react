import { defineQuan } from '@quanarch/react';
import { App } from './app';
import { QUAN_NAME } from './constants';
import { quas } from './core';

export default defineQuan({
  name: QUAN_NAME,
  quas,
  component: App,
});
