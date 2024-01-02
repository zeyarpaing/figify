import { PluginManifest } from 'types';

const manifest: PluginManifest = {
  name: 'figify',
  id: '1324032799462433943',
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
