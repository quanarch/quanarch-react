import { QuanHost, quaKey } from '@quanarch/react';
import { plugs } from '../../core';
import type { LoadedQuan } from '../../types';
import { ErrorMessage } from '../error-message';

export interface QuanViewProps {
  quan: LoadedQuan;
}

/** Hosts one quan with the quas this quanar plugs in. */
export function QuanView({ quan }: QuanViewProps) {
  if (quan.error) return <ErrorMessage message={quan.error} />;
  if (!quan.module) return null;

  return (
    <QuanHost
      key={quan.name}
      quan={quan.module}
      plugs={plugs}
      fallback={(missing) => (
        <ErrorMessage
          message={`${quan.name} needs ${missing.map(quaKey).join(', ')}, which this quanar does not plug in.`}
        />
      )}
    />
  );
}
