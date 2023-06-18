import { JSX, Manifest, PageProps } from "./deps.ts";

// deno-lint-ignore no-explicit-any
export type Page<Data = any> = (props?: PageProps<Data>) => JSX.Element;

// deno-lint-ignore no-explicit-any
export type Layout<Data = any> = (
  child: Page<Data>,
  props?: PageProps<Data>
) => JSX.Element;

export interface LayoutModule {
  default?: Page | Layout;
}

export interface RouteInfo {
  path: string;
  module: LayoutModule;
}

export interface LayoutManifest extends Omit<Manifest, "routes"> {
  routes: Record<
    string,
    Manifest["routes"] extends infer R ? R | LayoutModule : never
  >;
}
