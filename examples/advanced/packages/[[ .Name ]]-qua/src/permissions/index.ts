import { getQuanarCore } from '../state';

/** Whether the signed-in user has a permission. */
export function hasPermission(permission: string): boolean {
  return getQuanarCore().hasPermission(permission);
}
