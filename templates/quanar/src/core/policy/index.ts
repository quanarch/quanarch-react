/**
 * Decides which quans this user receives. A quan left out is never loaded, so
 * its code never reaches the browser.
 *
 * This runs in the browser, so it shapes what is shown but protects nothing on
 * its own. For real protection, let the loader's source decide: a server that
 * lists and serves only the quans a user is allowed to have.
 */
export function selectQuans(available: string[]): string[] {
  return available;
}
