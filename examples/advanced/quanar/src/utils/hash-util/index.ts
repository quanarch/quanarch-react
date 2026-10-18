/** SHA-256 of a text, as lowercase hex. */
export async function sha256Hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
}

/** The first characters of a hash, enough to tell two apart. */
export function shortHash(hash: string): string {
  return hash ? `${hash.slice(0, 12)}…` : '—';
}
