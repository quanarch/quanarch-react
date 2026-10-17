import { getQuanarCore } from '../state';

/** Asks the quanar to add one to value. */
export function increment(value: number): number {
  return getQuanarCore().increment(value);
}
