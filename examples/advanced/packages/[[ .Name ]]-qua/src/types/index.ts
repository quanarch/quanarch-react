/** The signed-in user, as quans see them. */
export interface QuanUser {
  id: number;
  username: string;
  name: string;
  permissions: string[];
}

export type NoticeKind = 'info' | 'success' | 'error';

/**
 * HTTP requests to the server, made by the quanar's client: it adds the base
 * URL and the user's token. Paths are relative to the server's /api.
 */
export interface HttpClient {
  get: <T = unknown>(url: string) => Promise<T>;
  post: <T = unknown>(url: string, body?: unknown) => Promise<T>;
  put: <T = unknown>(url: string, body?: unknown) => Promise<T>;
  patch: <T = unknown>(url: string, body?: unknown) => Promise<T>;
  delete: <T = unknown>(url: string) => Promise<T>;
}

/**
 * Everything the quanar provides. The quanar implements this interface and
 * hands it over with init(); quans only call the functions next to it.
 */
export interface QuanarCore {
  /** The quanar's HTTP client. Quans never call fetch or axios themselves. */
  http: HttpClient;
  /** Returns value + 1. The quanar counts, the quan only asks. */
  increment: (value: number) => number;
  /** The signed-in user, or null. */
  getUser: () => QuanUser | null;
  /** Whether the signed-in user has a permission. */
  hasPermission: (permission: string) => boolean;
  /** Moves the quanar to an absolute path. */
  navigate: (path: string) => void;
  /** Shows a short message in the quanar. */
  notify: (message: string, kind?: NoticeKind) => void;
}

/** A page of a quan. */
export interface QuanRoute {
  /** Absolute path, starting with the quan's name: /billing, /billing/:id */
  path: string;
  // The page component; its type belongs to the UI framework, not to the contract.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any;
  /** Permission required to open the page. */
  permission?: string;
}

/** What a quan tells the quanar about itself. Every quan exports one. */
export interface QuanManifest {
  name: string;
  version: string;
  displayName?: string;
  description?: string;
  routes: QuanRoute[];
  permissions: string[];
  onMount?: () => void | Promise<void>;
  onUnmount?: () => void;
}
