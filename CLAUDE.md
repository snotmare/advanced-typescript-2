# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A standalone demo/teaching project of advanced TypeScript language features (not an application). Each `src/*.ts` file is a self-contained lesson covering one language feature, split into `//#region` blocks with a paired `test*()` export per concept. `src/index.ts` imports every lesson module and has commented-out calls to each `test*()` function — uncomment a line to run that specific demo.

Themes running through the examples (decorators, SQL generator, taboo words) are Harry Potter references and a "House points" system — this is intentional and consistent, not incidental naming.

## Commands

- `npm run init` — install dependencies
- `npm start` — run `src/index.ts` directly via `tsx watch` (no build step needed; picks up file changes automatically)
- `npm run watch` — run `tsc --watch` to type-check/emit continuously into `dist/`
- `npm run lint` — run ESLint over all `.ts` files

There is no test suite and no build/typecheck one-shot script — use `npm run watch` for compilation, or run `tsc` directly for a single check. `npm start` is the standard way to actually execute code and see output.

## Architecture

- `src/index.ts` — entry point; imports the four lesson modules and (normally) leaves all demo calls commented out. To exercise a feature, uncomment the relevant `Module.testX()` line here.
- `src/declaration-merging.ts` — interface+interface, interface+class, class+namespace, and prototype-extension merging examples.
- `src/decorators.ts` — method, parameter, and class decorators, plus a `reflect-metadata`-based SQL generator example. Requires `experimentalDecorators` + `emitDecoratorMetadata` (already set in `tsconfig.json`) and the `reflect-metadata` import at the top of the file.
- `src/function-overloading.ts` — progressively more complex ways to get precise return types from a shared implementation: no overloading, conditional-type-based overloading, function signature overloading, and combinations with options objects and callback arguments.
- `src/template-strings.ts` — template literal types: basic interpolation, built-in string manipulation types (`Uppercase`, etc.), literal unions composed via templates, overloaded template-typed function parameters, and tagged templates.
- `src/utils/constructor.ts` — shared `Constructor<T>` type alias used by the class-decorator example.

Each module is independent; there's no shared runtime state or app-wide config to understand beyond `tsconfig.json`/`.eslintrc.json`.

## TypeScript configuration notes

- ESM throughout (`"type": "module"` in `package.json`, `"module": "nodenext"`) — internal imports use explicit `.js` extensions (e.g. `import ... from './utils/constructor.js'`) even though the source is `.ts`.
- `strict`, `noUncheckedIndexedAccess`, and `exactOptionalPropertyTypes` are all on — new code should satisfy these rather than relaxing them.
- `experimentalDecorators` and `emitDecoratorMetadata` are enabled specifically to support `src/decorators.ts`; don't remove them.
- `rootDir` is `src`, `outDir` is `dist`; `dist/` is committed output from `tsc`, not hand-edited.

## Linting notes

- Single quotes, semicolons required, 1TBS brace style — matches the existing `.eslintrc.json` rules; don't reformat to a different style.
- `no-explicit-any` is off and `any` is used deliberately in a few generic/decorator signatures (e.g. `Constructor<T>`) — don't "fix" these away.
- `*.spec.ts` files are ignored by ESLint (there are none currently, but the pattern is already excluded).
