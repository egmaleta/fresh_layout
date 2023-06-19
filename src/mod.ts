import { buildTrie, getRouteInfoBranch } from "./trie.ts";
import { is404, is500, isApp, isLayout, isMiddleware } from "./utils.ts";
import type { Manifest, PageProps } from "./deps.ts";
import type { Layout, LayoutManifest, Page, RouteInfo } from "./types.ts";

const wrap = <Data = any>(page: Page<Data>, layout: Layout<Data>) => {
  return (props?: PageProps<Data>) => layout(page, props);
};

export const applyLayouts = <Data = any>(
  page: Page<Data>,
  layouts: Layout<Data>[],
): Page<Data> => {
  if (layouts.length === 0) {
    return page;
  }

  return wrap(applyLayouts(page, layouts.slice(1)), layouts[0]);
};

export const applyManifestLayouts = (manifest: LayoutManifest): Manifest => {
  const layoutRoutes: RouteInfo[] = [];
  const pageRoutes: RouteInfo[] = [];
  const rest: {
    path: string;
    module: Omit<LayoutManifest["routes"][string], "LayoutModule">;
  }[] = [];

  Object.entries(manifest.routes).forEach(([route, mod]) => {
    const i = route.lastIndexOf("/");
    const routeFileName = route.slice(i + 1);

    if (
      is404(routeFileName) ||
      is500(routeFileName) ||
      isApp(routeFileName) ||
      isMiddleware(routeFileName) ||
      ("handler" in mod)
    ) {
      rest.push({ path: route, module: mod });
    } else if ("default" in mod) {
      if (isLayout(routeFileName)) {
        const routeDir = route.slice(0, i);
        layoutRoutes.push({ path: routeDir, module: mod });
      } else {
        pageRoutes.push({ path: route, module: mod });
      }
    }
  });

  const trie = buildTrie([...layoutRoutes, ...pageRoutes], "/");

  pageRoutes.forEach((ri) => {
    const branch = getRouteInfoBranch(ri, ri.path.split("/"), trie);
    const lastIndex = branch.length - 1;

    const page = applyLayouts(
      branch[lastIndex].module.default as Page,
      branch.slice(0, lastIndex).map((ri) => ri.module.default as Layout),
    );

    ri.module = { ...ri.module, default: page };
  });

  return {
    ...manifest,
    routes: Object.fromEntries(
      [...pageRoutes, ...rest].map(({ path, module }) => [path, module]),
    ),
  };
};
