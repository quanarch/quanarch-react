import { isAxiosError } from 'axios';

/** A readable message for anything thrown, including the server's own error text. */
export function errorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const serverMessage = (error.response?.data as { error?: string } | undefined)?.error;
    return serverMessage ?? error.message;
  }
  return error instanceof Error ? error.message : String(error);
}
