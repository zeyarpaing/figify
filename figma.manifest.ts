import { PluginManifest } from 'types';

const manifest: PluginManifest = {
  name: 'figify',
  id: '1245763510166563530',
  api: '1.0.0',
  main: './plugin.js',
  capabilities: [],
  enableProposedApi: false,
  editorType: ['figma', 'figjam'],
  ui: './index.html',
  networkAccess: {
    allowedDomains: ['none'],
  },
};

export default manifest;
