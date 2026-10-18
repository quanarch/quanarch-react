import type { QuanDelivery } from '../../types';

export interface DeliveryInfo {
  title: string;
  summary: string;
  steps: string[];
}

/** How each kind of quan reaches the quanar, as told on its page. */
export const DELIVERIES: Record<QuanDelivery, DeliveryInfo> = {
  api: {
    title: 'Loaded through the API',
    summary: 'Registered in the server\'s quans table and listed by the server when the quanar asks.',
    steps: [
      'After sign-in the quanar calls GET /api/quans with the user\'s token.',
      'The server answers with the active quans this user may load, and nothing else.',
      'The quanar fetches the build from the artifact store and computes its SHA-256.',
      'The hash must match the one the build wrote into the quans table, or the quan is refused.',
      'The verified code runs, and the quan\'s manifest is read from window.',
    ],
  },
  sse: {
    title: 'Pushed over Server-Sent Events',
    summary: 'Registered in the server\'s quans table and pushed to the quanar as soon as the table changes.',
    steps: [
      'After sign-in the quanar opens GET /api/quans/stream, an EventSource that stays open.',
      'The server sends the active quans this user may load, and sends them again whenever db.json changes.',
      'The quanar fetches each new build from the artifact store and checks its SHA-256 against the quans table.',
      'Quans that disappear from the list are removed at once, without a reload.',
      'Try it: set "active": false for this quan in server/data/db.json.',
    ],
  },
  public: {
    title: 'Served from the quanar\'s public folder',
    summary: 'Unknown to the server: built into quanar/public and listed in the quanar\'s config.',
    steps: [
      'The build writes the quan to quanar/public/quans, so the quanar serves it itself.',
      'src/config/static-quans lists it with the permission it needs.',
      'The quanar hides it from users without that permission; the check runs in the browser and only shapes the interface.',
      'There is no hash to compare against, so the file is not verified.',
    ],
  },
  artifacts: {
    title: 'Loaded straight from the artifact store',
    summary: 'Unknown to the server: its build lives in the artifact store and the quanar loads it by URL.',
    steps: [
      'The build writes the quan to artifacts/quans/<name>/<version>.',
      'src/config/static-quans lists its URL; the server is never asked.',
      'The quanar hides it from users without its permission; the check runs in the browser.',
      'There is no hash to compare against, so the file is not verified.',
    ],
  },
};
