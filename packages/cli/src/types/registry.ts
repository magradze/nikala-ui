export interface RegistryFile {
  path: string;
  content: string;
  type: "registry:ui" | "registry:util" | "registry:hook" | "registry:block";
}

export interface RegistryItem {
  name: string;
  title: string;
  description: string;
  type: "registry:ui" | "registry:util" | "registry:hook" | "registry:block";
  dependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
}

export interface RegistryIndexItem {
  name: string;
  title: string;
  description: string;
  type: "registry:ui" | "registry:util" | "registry:hook" | "registry:block";
  dependencies?: string[];
  registryDependencies?: string[];
}

export type RegistryIndex = RegistryIndexItem[];