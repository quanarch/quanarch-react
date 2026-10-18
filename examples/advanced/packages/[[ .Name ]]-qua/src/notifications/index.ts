import { getQuanarCore } from '../state';
import type { NoticeKind } from '../types';

/** Shows a short message in the quanar. */
export function notify(message: string, kind: NoticeKind = 'info'): void {
  getQuanarCore().notify(message, kind);
}
