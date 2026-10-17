# @quanarch/react

The [Quanarch](https://quanarch.org) contract for React.

This package holds only what a quanar and its quans must agree on. How quans are
loaded, where they come from and who receives them stays in your own code.

```ts
// qua: the contract
export interface QuaA { getUser(): Promise<User> }
export const quaA = defineQua<QuaA>('qua-a', '1');

// quan: declares what it uses
export default defineQuan({ name: 'billing', quas: [quaA], component: Billing });
function Billing() {
  const qua = useQua(quaA);
  // ...
}

// quanar: plugs in the implementations and hosts the quan
<QuanHost quan={quan} plugs={[plug(quaA, { getUser })]} />
```

| Export | Used by | Purpose |
| --- | --- | --- |
| `defineQua` | qua | Declares a qua with a name and version. |
| `defineQuan` | quan | Declares a quan and the quas it uses. |
| `useQua` | quan | Returns the quanar's implementation of a declared qua. |
| `QuanHost`, `plug` | quanar | Renders a quan with exactly the quas it declared. |
| `QuanLoader`, `importQuan` | quanar | The shape of a loader, and a helper to import a built quan. |
| `shareModules` | quanar | Shares React and this package with loaded quans. |
| `quan()` from `@quanarch/react/vite` | quan | Builds a quan as one ES module that uses the quanar's React. |

Projects created with `qu new --stack react-ts` are already set up with it.

Licensed under the Apache License, Version 2.0.
