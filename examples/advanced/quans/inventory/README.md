# inventory

A quan of the example, delivered as **sse**. It cannot run on its
own: the quanar loads it and it reaches the quanar only through the qua
(`http`, `getUser`, `hasPermission`, `increment`, `navigate`, `notify`).

Its data comes from the server: `src/api` calls `http.get` and `http.post` from the qua
(/inventory/items, /inventory/restock), and the quanar's axios client sends them with the
user's token. The quan never calls fetch or axios itself.

`src/` follows the quanar's rules: values in `constants` (including `api` endpoints), settings in `config`,
the quan's work in `services`, `hooks` that only call services (context and
provider in the same file), and `pages` that only use hooks and components.
It uses the quanar's `qa-*` classes and brings no CSS of its own.
