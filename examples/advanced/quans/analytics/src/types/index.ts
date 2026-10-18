export interface Metric {
  label: string;
  value: number;
  change: number;
}

export interface Viewer {
  name: string;
  canAct: boolean;
}

/** What the server answers to an action. */
export interface ActionResult {
  message: string;
}
