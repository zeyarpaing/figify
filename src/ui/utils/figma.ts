import type { Actions } from '@/controller';

/**
 * @description
 * This is a helper utility to send messages to figma main window with a function style syntax.
 */
export const Figma = new Proxy<Actions>({} as Actions, {
  get: (_, prop) => {
    return (payload: any) => {
      parent.postMessage({ pluginMessage: { type: prop, payload } }, '*');
    };
  },
});
