# fresh_layout

Layouts for Deno Fresh.

## Installation

Add **fresh_layouts** dependency to your `imports_map.json` file:

```json
{
  "imports": {
    ...,
    "$fresh_layout/": "https://deno.land/x/fresh_layout@0.1.0/"
  }
}
```

## Usage

There are 3 ways to apply layouts to route pages:

### File-based routing way (recommended)

In `main.ts` file, import `applyManifestLayouts` from `"$fresh_layouts/mod.ts"` and call `applyManifestLayouts` with `manifest`. Use the returned `Manifest` object to call the `start` function.

```tsx
...
import { applyManifestLayouts } from "$fresh_layouts/mod.ts";
...
const newManifest = applyManifestLayouts(manifest);
await start(newManifest, { plugins: [twindPlugin(twindConfig)] });
```

This way enables the use of `_layout.(js|jsx|ts|tsx)` files within the `routes/` directory.

#### How layouts are applied?

Layouts are applied to every page route in its directory, and to every layout or page route down in the directory tree. Here is a simple example:

```
routes/             |
|  slug/            |
|  |  [id]/         |
|  |  |  index.tsx  |  1
|  |  index.tsx     |  2
|  |  _layout.tsx   |  3 wraps (2) and (1)
|  [name].tsx       |  4
|  _layout.tsx      |  5 wraps (4), (3) wrapping (2) and (3) wrapping (1)
```

> **NOTE:** (named) layouts aren't supported yet. I'm figuring out how to support them. Any help is appreciated :)

### Per-route way

Write layout components anywhere, import them in your page route file and call `applyLayouts` with your page component and the layouts in the order they will be applied:

```tsx
// routes/path/to/page.tsx
import { applyLayouts } from "$fresh_layouts/mod.ts";

import { mainLayout } from "path-to/main-layout.tsx";
import { secondLayout } from "path-to/second-layout.tsx";
import { thirdLayout } from "path-to/third-layout.tsx";

export default applylayouts(() => {
  return <p>Do you like arrow functions?</p>;
}, [mainLayout, secondLayout, thirdLayout]);
```

The above example will apply intuitively the layouts like this:

```tsx
<MainLayout>
  <SecondLayout>
    <ThirdLayout>
      <p>Do you like arrow functions?</p>
    </ThirdLayout>
  </SecondLayout>
</MainLayout>
```

### Middleware way

Add a config section to any `_middleware.ts` file:

```tsx
export const config = {
  layout: Template
}
```

Where `Template` is a normal preact component. This way will apply the layout to every page route that this middleware applies to.

> Note: No need to wrap with `useLayout` or setup any differently than a normal react component. It will be wrapped automatically and have the props passed in.

### useLayout helper

If you want to apply a normal componet as a layout, you can use the `useLayout` helper:

Example _layout.tsx file:

```tsx
import Dashboard from "~/components/Dashboard.tsx";
import {useLayout} from "$fresh_layout";

export default useLayout(Dashboard)
```

### All?

Yes, all ways can be used together. Just keep in mind that **per-route** layouts apply first, then middleware layouts, then the _layout.tsx file.

## The `Layout` component

```tsx
export const layout: Layout = (child: Page, props?: PageProps) => {
  return <>{/* JSX Code */}</>;
};
```

In order to render the child component, call:

```tsx
child(props); // remember to use {} when calling inside JSX
```

Here are the complete type definitions of `Layout` and `Page` type aliases:

```tsx
export type Page<Data = any> = (props?: PageProps<Data>) => JSX.Element;

export type Layout<Data = any> = (
  child: Page<Data>,
  props?: PageProps<Data>
) => JSX.Element;
```

It might feel strange that, even when layouts can wrap others, a `Layout` component always receive a `Page` component as child. That's because every time a layout wraps a page, it is wrapped by a `Page` component.

```tsx
// src/mod.ts
function wrap<Data = any>(page: Page<Data>, layout: Layout<Data>) {
  return (props?: PageProps<Data>) => layout(page, props);
}
```

## Contributing

You can open an issue or make a PR, I'll try to check and merge (if possible) quickly.

## License

Under [MIT](https://github.com/egmaleta/fresh_layout/blob/main/LICENSE) license.
