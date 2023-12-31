type Parameter = {
  name: string;
  key: string;
  description?: string;
  allowFreeform?: boolean;
  optional?: boolean;
};

type NetworkAccess = {
  allowedDomains: string[];
  reasoning?: string;
  devAllowedDomains?: string[];
};

type ManifestMenuItem = {
  name: string;
  command: string;
  parameters?: Parameter[];
  parameterOnly?: boolean;
};

type ManifestRelaunchButton = {
  command: string;
  name: string;
  multipleSelection?: boolean;
};

type PluginPermissionType =
  | 'currentuser'
  | 'activeusers'
  | 'fileusers'
  | 'payments'
  | 'teamlibrary';

type CodeLanguage = {
  label: string;
  value: string;
};

type CodegenPreference =
  | {
      itemType: 'unit';
      defaultScaleFactor: number;
      scaledUnit: string;
      default?: boolean;
      includedLanguages?: string[];
    }
  | {
      itemType: 'select';
      propertyName: string;
      label: string;
      options: {
        label: string;
        value: string;
        isDefault?: boolean;
      }[];
      includedLanguages?: string[];
    }
  | {
      itemType: 'action';
      propertyName: string;
      label: string;
      includedLanguages?: string[];
    };

export interface PluginManifest {
  name: string;
  id: string;
  api: string;
  main: string;
  ui?: string | { [key: string]: string };
  capabilities?: ('textreview' | 'codegen' | 'inspect' | 'vscode')[];
  enableProposedApi?: boolean;
  enablePrivatePluginApi?: boolean;
  build?: string;
  permissions?: PluginPermissionType[];
  editorType: Array<'figma' | 'figjam' | 'dev'>;
  menu?: ManifestMenuItem[];
  relaunchButtons?: ManifestRelaunchButton[];
  networkAccess?: NetworkAccess;
  parameters?: Parameter[];
  parameterOnly?: boolean;
  codegenLanguages?: CodeLanguage[];
  codegenPreferences?: CodegenPreference[];
}
