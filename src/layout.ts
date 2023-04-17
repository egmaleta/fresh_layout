import { PageProps } from "./deps.ts";
import { LayoutPage, Page } from "./types.ts";

// deno-lint-ignore no-explicit-any
const wrap = <Data = any>(page: Page<Data>, layout: LayoutPage<Data>) => {
  return (props?: PageProps<Data>) => layout(page, props);
};

// deno-lint-ignore no-explicit-any
export const applyLayouts = <Data = any>(
  page: Page<Data>,
  layouts: LayoutPage<Data>[]
): Page<Data> => {
  if (layouts.length === 0) {
    return page;
  }

  return wrap(applyLayouts(page, layouts.slice(1)), layouts[0]);
};
