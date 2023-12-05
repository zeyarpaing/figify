# figma-plugin-vite-preact

A minimal Figma plugin starter template using Preact and TailwindCSS bundled wiht Vite.

> PRs are welcome

## Features

- Modern - Uses Preact and TailwindCSS
- Customizable - Can be easily develop with your own stack
- Fast - Uses Vite for fast development and production builds
- Utilities included - Messaging to figma window with typesafty and function like calls (not parent.postMessage)
- Hot Reload - Hot reload figma after file changes in development - watch mode (only works on Mac)

## Usage

Building UI for the plugin can be done in `src/ui/**` directory.
To do some actions to the Figma main window, firstly, need to declare actions in `src/controller/index.ts` and then call them from the UI using the `Figma` utility.

For example:

```tsx
import { Figma } from '@/ui/utils/figma';

<button onClick={() => Figma.createRects(10)}>Do some work</button>;
```
