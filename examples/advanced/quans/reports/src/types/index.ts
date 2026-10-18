export interface Report {
  id: string;
  title: string;
  period: string;
  owner: string;
}

export interface Viewer {
  name: string;
  canAct: boolean;
}

/** What the server answers to an action. */
export interface ActionResult {
  message: string;
}
