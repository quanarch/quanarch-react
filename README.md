<p align="center">
  <img src="https://raw.githubusercontent.com/quanarch/quanarch/main/.github/assets/logo.png" alt="Quanarch" width="96">
</p>

<h1 align="center">Quanarch for React</h1>

<p align="center">
  The React + TypeScript stack for <a href="https://quanarch.org">Quanarch</a>.
</p>

This repository is the `react-ts` stack: the templates `qu` uses to create a
project, a quanar, a quan or a qua in React and TypeScript.

## Quick start

```sh
qu          # choose project, React · TypeScript, then name the parts
```

A project is created with its three parts already wired:

```
acme/
├── packages/acme-qua/   qua: QuanarCore interface, init(), increment()
├── quanar/              quanar: shares React and the qua on window, plugs its core in, loads quans
└── quans/billing/       quan: manifest (name, version, routes, permissions) and a counter page
```

Run it in two terminals:

```sh
cd acme/quans/billing && npm run watch    # builds the quan and serves it on port 4001
cd acme/quanar && npm run dev             # http://localhost:5173
```

The counter belongs to the quan, but the quan never counts: it calls
`increment` on the qua and the quanar's core answers.

## Templates

| Template | What it holds |
| --- | --- |
| `templates/project` | The project root: `conf.qu`, a README and `packages/README.md`. |
| `templates/qua` | The contract: `QuanarCore`, `QuanManifest`, `init()` and one call, `increment()`. |
| `templates/quanar` | The host: header and sidebar, a local page, the quan loader and the qua's core. |
| `templates/quan` | A quan: its manifest and empty folders for api, components, config, constants, hooks, langs, pages, services, store, types and utils. |

CI creates a project from these templates with the engine's generator and
builds every part.

## License

Created by [Can Berk Coşar](https://berkcosar.com) and developed at
[Relteco](https://relteco.com). Licensed under the [Apache License, Version 2.0](LICENSE).
See [NOTICE](NOTICE).
