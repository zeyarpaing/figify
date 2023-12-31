import { UserConfig, Plugin, createLogger } from 'vite';
import { OutputChunk, OutputAsset } from 'rollup';
import { writeFile, existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';

const regScript = (fileName: string) =>
  new RegExp(`<script([^>]*?) src="[./]*${fileName}"([^>]*)></script>`);
const regCss = (fileName: string) => new RegExp(`<link[^>]*? href="[./]*${fileName}"[^>]*?>`);

export function replaceScript(html: string, scriptFilename: string, scriptCode: string): string {
  const preloadMarker = /"__VITE_PRELOAD__"/g;
  const newCode = scriptCode.replace(preloadMarker, 'void 0');
  return html
    .replace(
      regScript(scriptFilename),
      (_, beforeSrc, afterSrc) => `<script${beforeSrc}${afterSrc}>\n${newCode}\n</script>`
    )
    .replace(
      /(<script type="module" crossorigin>\s*)\(function(?: polyfill)?\(\)\s*\{[\s\S]*?\}\)\(\);/,
      '<script type="module">\n'
    );
}

export function replaceCss(html: string, scriptFilename: string, scriptCode: string): string {
  return html.replace(regCss(scriptFilename), `<style>\n${scriptCode}\n</style>`);
}

const informIgnored = (filename: string) => console.info(`Asset ignored inlining: ${filename}`);

function ensureDirectory(filePath: string) {
  const dir = dirname(filePath);
  if (existsSync(dir)) {
    return;
  }
  ensureDirectory(dir);
  mkdirSync(dir);
}
/**
 *  @description
 * This is modified version of `vite-plugin-singlefile`
 * https://github.com/richardtallent/vite-plugin-singlefile
 * This plugin will bundle all assets into a single HTML file. Manifest.json will be copied to the dist folder.
 */
export function bundlePlugin(): Plugin {
  return {
    name: 'vite:singlefile',
    config: _defaultConfig,
    enforce: 'post',
    generateBundle: (_, bundle) => {
      const jsExtensionTest = /\.[mc]?js$/;
      const htmlFiles = Object.keys(bundle).filter((i) => i.endsWith('.html'));
      const cssAssets = Object.keys(bundle).filter((i) => i.endsWith('.css'));
      const jsAssets = Object.keys(bundle).filter((i) => jsExtensionTest.test(i));
      const bundlesToDelete = [] as string[];
      for (const name of htmlFiles) {
        const htmlChunk = bundle[name] as OutputAsset;
        let replacedHtml = htmlChunk.source as string;
        for (const jsName of jsAssets) {
          const jsChunk = bundle[jsName] as OutputChunk;
          if (jsChunk.code != null && regScript(jsName).test(replacedHtml)) {
            bundlesToDelete.push(jsName);
            replacedHtml = replaceScript(replacedHtml, jsChunk.fileName, jsChunk.code);
          } else {
            informIgnored(jsName);
          }
        }
        for (const cssName of cssAssets) {
          if (regCss(cssName).test(replacedHtml)) {
            const cssChunk = bundle[cssName] as OutputAsset;
            bundlesToDelete.push(cssName);
            replacedHtml = replaceCss(replacedHtml, cssChunk.fileName, cssChunk.source as string);
          } else {
            informIgnored(cssName);
          }
        }
        htmlChunk.source = replacedHtml;
      }

      // Delete all inlined assets.
      for (const name of bundlesToDelete) {
        delete bundle[name];
      }

      for (const name of Object.keys(bundle).filter(
        (i) => !jsExtensionTest.test(i) && !i.endsWith('.css') && !i.endsWith('.html')
      )) {
        informIgnored(name);
      }

      const log = createLogger();
      const manifestPath = './dist/manifest.json';
      ensureDirectory(manifestPath);
      writeFile(manifestPath, JSON.stringify(require('./figma.manifest').default), (err) => {
        if (err) {
          return log.error(`Error writing manifest.json: ${err}`);
        }
        log.info(`Generated manifest.json.`);
      });
    },
  };
}

const _defaultConfig = (config: UserConfig) => {
  if (!config.build) config.build = {};
  config.build.assetsInlineLimit = 100000000;
  config.build.chunkSizeWarningLimit = 100000000;
  config.build.cssCodeSplit = false;
  config.base = undefined;
  if (!config.build.rollupOptions) config.build.rollupOptions = {};
  if (!config.build.rollupOptions.output) config.build.rollupOptions.output = {};
};
