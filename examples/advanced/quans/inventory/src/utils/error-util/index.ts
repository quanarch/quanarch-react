/** The server's message when it sent one, otherwise the error's own. */
export function errorMessage(error: unknown): string {
  const data = (error as { response?: { data?: { error?: string } } })?.response?.data;
  if (data?.error) return data.error;
  return error instanceof Error ? error.message : String(error);
}
