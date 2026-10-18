import { quansApi } from '../../api';
import { STATIC_QUANS } from '../../config';
import { HashMismatchError, authManager, loadQuan, openEventStream } from '../../core';
import { useQuanStore } from '../../store';
import type { QuanDelivery, QuanSource, User } from '../../types';
import { canAccess, errorMessage } from '../../utils';
import { notificationService } from '../notification-service';

let closeStream: (() => void) | null = null;

async function load(source: QuanSource): Promise<void> {
  const store = useQuanStore.getState();
  store.upsert({ source, status: 'loading', verified: null });
  try {
    const { manifest, verified } = await loadQuan(source);
    useQuanStore.getState().patch(source.name, { status: 'loaded', manifest, verified, loadedAt: new Date().toISOString() });
  } catch (error) {
    const verified = error instanceof HashMismatchError ? false : null;
    useQuanStore.getState().patch(source.name, { status: 'error', verified, error: errorMessage(error) });
  }
}

function unload(name: string): void {
  useQuanStore.getState().entries[name]?.manifest?.onUnmount?.();
  useQuanStore.getState().remove(name);
}

/** Brings the quans of one delivery in line with a fresh list: new or changed ones load, missing ones go. */
function sync(delivery: QuanDelivery, list: QuanSource[]): void {
  const { entries } = useQuanStore.getState();
  const incoming = new Map(list.map((s) => [s.name, s]));
  for (const entry of Object.values(entries)) {
    if (entry.source.delivery === delivery && !incoming.has(entry.source.name)) {
      unload(entry.source.name);
      notificationService.notify(`${entry.source.displayName} was withdrawn by the server`, 'info');
    }
  }
  for (const source of list) {
    const current = entries[source.name];
    if (!current || current.source.hash !== source.hash || current.source.url !== source.url) void load(source);
  }
}

export const quanService = {
  getState: () => useQuanStore.getState(),
  subscribe: (listener: () => void) => useQuanStore.subscribe(listener),

  /** Loads every quan this user may have, from the config, the API and the SSE stream. */
  async start(user: User): Promise<void> {
    quanService.stop();

    STATIC_QUANS.filter((source) => canAccess(user, source.permissions)).forEach((source) => void load(source));

    try {
      sync('api', await quansApi.getQuans());
    } catch (error) {
      notificationService.notify(`Could not list quans: ${errorMessage(error)}`, 'error');
    }

    const token = authManager.getToken();
    if (token) {
      closeStream = openEventStream<QuanSource[]>(quansApi.streamUrl(token), 'quans', (list) => sync('sse', list));
    }
  },

  /** Unloads every quan and closes the stream, as on sign-out. */
  stop(): void {
    closeStream?.();
    closeStream = null;
    Object.keys(useQuanStore.getState().entries).forEach(unload);
  },
};
