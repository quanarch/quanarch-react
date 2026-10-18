import { getQuanarCore } from '../state';
import type { QuanUser } from '../types';

/** The signed-in user, or null. */
export function getUser(): QuanUser | null {
  return getQuanarCore().getUser();
}
