# Figify - Figma plugin starter template

A minimal typesafe Figma plugin starter template using Preact and TailwindCSS bundled with Vite.

> PRs are welcome

## Features

- Modern - Uses Preact and TailwindCSS
- Customizable - Can be easily switched to preferred stack thanks to Vite
- Utilities included - Messaging to Figma window with type-safty and function like calls (not parent.postMessage)
- Type-safey - From manifest to plugin actions and UI

## Usage

To get started, install dependencies start development server:

```bash
pnpm install
pnpm dev
```

- Go to Figma desktop app and open the plugin and choose development tab.
- Click on the `+` button and choose `Import plugin from manifest` and locate the `manifest.json` file in the `dist` folder of the project.

- Building UI for the plugin can be done in `src/ui/**` directory.
- To do some actions to the Figma main window, firstly, need to declare actions in `src/plugin/index.ts` or declare in separate files and imported to it and then call them from the UI using the `Figma` utility.
- For hot reload, please enable hot reload in the Figma desktop app. (Plugins > Development > Hot reload plugin)

For example:

```tsx
import { Figma } from '@/ui/utils/figma';

<button onClick={() => Figma.createRects(10)}>Do some work</button>;
```
