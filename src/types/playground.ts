export interface PropSpec {
  name: string;
  label: string;
  type: "select" | "text" | "boolean" | "number";
  options?: string[];
  default: any;
}

export interface ComponentSpec {
  id: string;
  name: string;
  props: PropSpec[];
  generateCode?: (values: Record<string, any>) => string;
}

export interface StageProps {
  values: Record<string, any>;
}