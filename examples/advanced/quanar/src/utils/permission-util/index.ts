import type { User } from '../../types';

/** Whether the user holds every permission in required. */
export function canAccess(user: User | null, required: string[]): boolean {
  return !!user && required.every((p) => user.permissions.includes(p));
}
