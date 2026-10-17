/**
 * Everything the quanar provides. The quanar implements this interface and
 * hands it over with init(); quans never see it directly.
 */
export interface QuanarCore {
  /** Returns value + 1. The quanar does the counting, not the quan. */
  increment: (value: number) => number;
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

/** A menu entry a quan offers to the quanar. */
export interface QuanMenuItem {
  label: string;
  translations?: Record<string, string>;
  path?: string;
  icon?: string;
  permission?: string;
  children?: QuanMenuItem[];
}

/** What a quan tells the quanar about itself. Every quan exports one. */
export interface QuanManifest {
  name: string;
  version: string;
  routes: QuanRoute[];
  permissions: string[];
  displayName?: string;
  description?: string;
  icon?: string;
  menuItems?: QuanMenuItem[];
  onMount?: () => void | Promise<void>;
  onUnmount?: () => void;
}
