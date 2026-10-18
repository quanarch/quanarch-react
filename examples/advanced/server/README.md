# server

A small Node.js API with no dependencies. `data/db.json` stands in for a
database with three tables:

- `users`: who can sign in (passwords are stored as salted SHA-256 hashes).
- `permissions`: what each user may do, one row per permission.
- `quans`: the quans the server knows, how each is delivered (`api` or `sse`),
  where its build lives, its version, its SHA-256 hash and whether it is active.
- `invoices`, `stock_items`, `reports`, `metrics`: the data each quan asks for.

| Route | |
| --- | --- |
| `POST /api/auth/login` | `{ username, password }` → `{ token, user }` |
| `GET /api/auth/me` | the signed-in user |
| `POST /api/auth/logout` | ends the session |
| `GET /api/quans` | the user's active quans delivered over the API |
| `GET /api/quans/stream?token=` | the user's active quans delivered over SSE, pushed again on every change |
| `GET /api/billing/invoices`, `POST /api/billing/invoices/export` | billing's data (`billing:read`, `billing:export`) |
| `GET /api/inventory/items`, `POST /api/inventory/restock` | inventory's data (`inventory:read`, `inventory:write`) |
| `GET /api/reports`, `POST /api/reports/summary` | reports' data (`reports:read`) |
| `GET /api/analytics/metrics`, `POST /api/analytics/refresh` | analytics' data (`analytics:read`) |

Every data route checks the caller's permission and answers 403 without it.

`src/` follows the same split as the quanar: `config`, `db`, `router`, `routes`,
`services` and `utils`.
