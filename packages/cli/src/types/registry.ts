export interface RegistryFile {
  path: string;
  content: string;
  type: "registry:ui" | "registry:util" | "registry:hook";
}

export interface RegistryItem {
  name: string;
  title: string;
  description: string;
  type: "registry:ui";
  dependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
}

export interface RegistryIndexItem {
  name: string;
  title: string;
  description: string;
  type: "registry:ui";
  dependencies?: string[];
  registryDependencies?: string[];
}

export type RegistryIndex = RegistryIndexItem[];