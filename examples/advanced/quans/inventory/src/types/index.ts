export interface StockItem {
  sku: string;
  name: string;
  warehouse: string;
  stock: number;
  reorderAt: number;
}

export interface Viewer {
  name: string;
  canAct: boolean;
}

/** What the server answers to an action. */
export interface ActionResult {
  message: string;
}
