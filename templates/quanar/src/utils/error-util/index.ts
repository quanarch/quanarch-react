/** Turns anything thrown into a readable message. */
export function toMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
