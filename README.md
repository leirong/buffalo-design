# React UI 组件库 Buffalo Design

## 📦 Install

```bash
npm install buffalo-design
```

```bash
yarn add buffalo-design
```

```bash
pnpm add buffalo-design
```

## 🔨 Usage

### ESM

```tsx
import { Popover } from "buffalo-design";
import "buffalo-design/dist/css/buffalo-design.min.css";
export default () => {
  return (
    <>
      <Popover title="title" content="content" trigger="click">
        <button>click me</button>
      </Popover>
    </>
  );
};
```

### CJS

```ts
const { Popover } = require("buffalo-design");
require("buffalo-design/dist/css/buffalo-design.min.css");

export default () => {
  return (
    <>
      <Popover title="Title" content="Content">
        <buttom>hover me</buttom>
      </Popover>
    </>
  );
};
```

### UMD

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Buffalo Design UMD Demo</title>
    <script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/buffalo-design@latest/dist/umd/buffalo-design.min.js"></script>
    <link
      rel="stylesheet"
      type="text/css"
      href="https://unpkg.com/buffalo-design@latest/dist/css/buffalo-design.min.css"
    />
    <style>
      html,
      body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
      }
      body {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      const container = document.getElementById("root");
      const root = ReactDOM.createRoot(container);
      const vDom = React.createElement(
        BuffaloDesign.Popover,
        { title: "title", content: "content" },
        React.createElement("button", null, "hover me")
      );
      root.render(vDom);
    </script>
  </body>
</html>
```
