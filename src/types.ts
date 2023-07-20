import {
  AppModule,
  ErrorPageModule,
  JSX,
  Manifest,
  PageProps,
  RouteModule,
  UnknownPageModule,
} from "./deps.ts";

export type Page<Data = any> = (props?: PageProps<Data>) => JSX.Element;

export type Layout<Data = any> = (
  child: Page<Data>,
  props?: PageProps<Data>,
) => JSX.Element;

export interface PageModule {
  default?: Page;
}

export interface LayoutModule {
  default?: Layout;
}

export interface LayoutManifest extends Omit<Manifest, "routes"> {
  routes: Record<
    string,
    Manifest["routes"][string] | LayoutModule | PageModule
  >;
}

export interface RouteInfo {
  path: string;
  module:
    | AppModule
    | RouteModule
    | PageModule
    | LayoutModule
    | ErrorPageModule
    | UnknownPageModule;
}

export interface PageRouteInfo extends RouteInfo {
  path: string;
  module: RouteModule | PageModule | UnknownPageModule | ErrorPageModule;
}

export interface LayoutRouteInfo extends RouteInfo {
  path: string;
  module: LayoutModule;
}
