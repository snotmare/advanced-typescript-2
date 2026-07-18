# Advanced TypeScript 2

A collection of self-contained demos covering advanced TypeScript language features: declaration merging, decorators, function overloading, and template literal types.

## Prerequisites

- [Node.js](https://nodejs.org/) (with npm)

## Installation

```
npm run init
```

This runs `npm i` to install dependencies.

## Running the demos

```
npm start
```

This runs `src/index.ts` directly via `tsx watch`, so it recompiles and reruns automatically when files change.

By default, [src/index.ts](src/index.ts) doesn't call any of the demo functions. To try one out, open the file and uncomment the line for the demo you want to run, e.g.:

```ts
// DeclarationMerging.testInterfaces();
```

becomes:

```ts
DeclarationMerging.testInterfaces();
```

Save the file and the output will print to the console.

## Other commands

```
npm run watch
```

Runs `tsc --watch` to type-check the project and emit compiled output continuously into `dist/`.

```
npm run lint
```

Runs ESLint over all `.ts` files.
