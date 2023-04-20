import { JSX, PageProps } from "./deps.ts";

// deno-lint-ignore no-explicit-any
export type Page<Data = any> = (props?: PageProps<Data>) => JSX.Element;

// deno-lint-ignore no-explicit-any
export type Layout<Data = any> = (
  child: Page<Data>,
  props?: PageProps<Data>
) => JSX.Element;

export interface Module {
  default?: Page | Layout;
}

export interface RouteInfo {
  path: string;
  module: Module;
}
