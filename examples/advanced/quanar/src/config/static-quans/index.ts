import type { QuanSource } from '../../types';
import { appConfig } from '../app-config';

/** Quans the server does not know about: the quanar finds them here. */
export const STATIC_QUANS: QuanSource[] = [
  {
    name: 'reports',
    displayName: 'Reports',
    description: 'Monthly reports, served from the quanar\'s public folder.',
    url: '/quans/reports/reports.js',
    version: '1.0.0',
    hash: '',
    delivery: 'public',
    permissions: ['reports:read'],
  },
  {
    name: 'analytics',
    displayName: 'Analytics',
    description: 'Traffic and conversion, loaded straight from the artifact store.',
    url: `${appConfig.artifactsUrl}/quans/analytics/1.0.0/analytics.js`,
    version: '1.0.0',
    hash: '',
    delivery: 'artifacts',
    permissions: ['analytics:read'],
  },
];
