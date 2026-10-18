export interface Invoice {
  id: string;
  customer: string;
  amount: number;
  status: 'paid' | 'open' | 'overdue';
}

export interface Viewer {
  name: string;
  canAct: boolean;
}

/** What the server answers to an action. */
export interface ActionResult {
  message: string;
}
