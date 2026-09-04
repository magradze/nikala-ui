import { Callout, type CalloutProps } from "@/components/ui/callout";
import type { Component } from "solid-js";

export type DocCalloutProps = CalloutProps;

/**
 * @deprecated Use Callout from "@/components/ui/callout" directly.
 */
export const DocCallout: Component<DocCalloutProps> = (props) => {
  return <Callout {...props} />;
};