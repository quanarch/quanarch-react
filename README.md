<p align="center">
  <img src="https://raw.githubusercontent.com/quanarch/quanarch/main/.github/assets/logo.png" alt="Quanarch" width="96">
</p>

<h1 align="center">Quanarch for React</h1>

<p align="center">
  The React + TypeScript stack for <a href="https://quanarch.org">Quanarch</a>.
</p>

This repository holds two things:

- **The `react-ts` stack**: templates for a qua, a quanar and a quan, used by
  [`qu`](https://github.com/quanarch/quanarch).
- **[`@quanarch/react`](packages/react)**: the contract a quanar and its quans share.

## Quick start

```sh
qu new qua qua-a --stack react-ts
qu new quanar main --stack react-ts --qua ./qua-a
qu new quan billing --stack react-ts --qua ./qua-a

cd billing
npm run dev                         # work on the quan in its development quanar
npm run build
npm run deliver -- ../main          # hand the build to the quanar

cd ../main
npm run dev                         # the quanar loads billing and plugs in qua-a
```

## What goes where

Quanarch prescribes the contract, never the mechanism.

| | Lives in | Why |
| --- | --- | --- |
| How a qua, a quan and a loader look | `@quanarch/react` | A quanar and its quans are built apart and must agree. |
| Where quans are loaded from | the quanar's `src/loader/` | Only the quanar decides. Swap the static loader for a URL, an API, a database or object storage. |
| Which quans a user receives | the quanar's `src/policy.ts` and your servers | A decision for each system. |
| How each qua works | the quanar's `src/plugs.ts` | The quanar implements, quans only call. |

A built quan is a single ES module. It does not bundle React: it uses the
quanar's copy, shared through `shareModules`.

## Development

```sh
cd packages/react && npm install && npm test
QU=/path/to/qu scripts/e2e.sh       # generate, build and run all three templates
```

## License

Created by [Can Berk Coşar](https://berkcosar.com) and developed at
[Relteco](https://relteco.com). Licensed under the [Apache License, Version 2.0](LICENSE).
See [NOTICE](NOTICE).
