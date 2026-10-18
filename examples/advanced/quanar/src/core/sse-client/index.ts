/**
 * Opens a Server-Sent Events stream and calls onData with each parsed message
 * of the given event. EventSource reconnects by itself. Returns a function that closes it.
 */
export function openEventStream<T>(url: string, event: string, onData: (data: T) => void, onError?: () => void): () => void {
  const source = new EventSource(url);
  source.addEventListener(event, (message) => onData(JSON.parse((message as MessageEvent<string>).data) as T));
  if (onError) source.onerror = onError;
  return () => source.close();
}
