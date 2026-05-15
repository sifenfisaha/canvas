# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server with HMR
- `npm run build` — type-check (`tsc -b`) then produce a production build
- `npm run lint` — run ESLint over the repo
- `npm run preview` — serve the production build locally

No test runner is configured.

## Stack

React 19 + TypeScript + Vite, with the React Compiler enabled via `@rolldown/plugin-babel` + `babel-plugin-react-compiler` (see `vite.config.ts`). Drawing uses `konva` + `react-konva`. State is in Zustand stores. Styling is Tailwind v4 wired through `@tailwindcss/vite` (no `tailwind.config.*` — utility classes only).

## Architecture

The app is a single-page Konva drawing canvas. The codebase splits into a framework-agnostic **`src/core/`** layer (no React, no Konva) and a React/Konva UI layer that consumes it.

**Core domain — `src/core/`**
- `shapes/types.ts` — the `Shape` discriminated union plus `Point` and `DrawStyle` input types. Includes `ShapeType` and `ShapeOfType<T>` helpers used by the registries.
- `shapes/factory.ts` — `shapeFactories`, a `Record<ShapeType, (pos, style) => Shape>` registry that constructs a fresh draft for each shape kind. `createDraft(toolId, pos, style)` is the dispatcher — returns `null` for non-drawing tools (`select`, `pen`, `text`, `eraser`).
- `shapes/update.ts` — `shapeUpdaters` (keyed by `shape.type`) plus the `updateShape(shape, pos)` dispatcher that resizes a draft from a new pointer position. The single `as` cast inside `updateShape` is safe by construction (the registry key is `shape.type`).
- `tools/types.ts` — the `ToolId` string-literal union (drawing tools + the no-op UI tools).

**Tool state — `src/store/useToolStore.ts`**
Holds the currently active tool, color, and stroke width. Sidebar writes; the drawing hook reads. Adding a new tool means extending `ToolId` in `src/core/tools/types.ts` and adding an entry to the `tools` array in `src/components/Sidebar.tsx`.

**Shape state — `src/store/useShapesStore.ts`**
Two slots: `shapes` (committed) and `draft` (the shape currently being drawn). Lifecycle: `setDraft` on mousedown → mutate `draft` on mousemove → `commitDraft` on mouseup moves the draft into `shapes` and clears it. Shapes are immutable once committed (no edit/delete API yet).

**Drawing — `src/hooks/useDrawing.ts`**
Owns the pointer handlers attached to the `Stage` in `src/components/Canvas.tsx`. The hook is thin: mousedown calls `createDraft(activeTool, pos, style)` and stores the result; mousemove calls `updateShape(draft, pos)`; mouseup commits. All shape-specific math lives in `core/shapes/`.

**Rendering — `src/components/shapes/`**
`Canvas.tsx` renders `shapes.map(ShapeRenderer)` plus the in-progress `draft` inside one `<Layer>`. `ShapeRenderer.tsx` is a discriminated-union switch on `shape.type` that delegates to one `<Type>Shape.tsx` component per kind.

### Adding a new shape

1. Add the interface to `src/core/shapes/types.ts` and include it in the `Shape` union.
2. Add a factory entry to `shapeFactories` in `src/core/shapes/factory.ts` and an updater entry to `shapeUpdaters` in `src/core/shapes/update.ts`. TypeScript will fail compilation until both registries are exhaustive over `ShapeType`.
3. Add the matching `ToolId` literal to `src/core/tools/types.ts` and a sidebar entry in `Sidebar.tsx` (tool id must equal the shape `type` string — that's the contract `createDraft` relies on).
4. Add a `<Name>Shape.tsx` renderer under `src/components/shapes/` and route to it from `ShapeRenderer.tsx`.

### Conventions worth knowing

- The `core/` layer must not import from React, Konva, Zustand, or any UI module — it's the boundary that keeps shape math testable in isolation.
- Fill is derived from the active color with an `33` alpha suffix (see `fillFrom` in `core/shapes/factory.ts`) for filled shapes; line uses only stroke; arrow uses both.
- IDs come from `crypto.randomUUID()` inside the factories.
- Zustand selectors are used per-field (`useStore((s) => s.field)`) rather than destructuring the whole store, to keep re-renders narrow — match this pattern.
- The `Stage` is sized once from `window.innerWidth/Height` and does not respond to resizes.
