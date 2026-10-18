import { getQuanarCore } from '../state';

/** Moves the quanar to an absolute path, for example /billing. */
export function navigate(path: string): void {
  getQuanarCore().navigate(path);
}
