# React + TypeScript + Vite + node.js H5 记账本项目

### 前端开发

前端部分 React18，全程使用 React Hook ;
组件库使用 React-vant 性能极佳的高质量组件库，覆盖移动端主流场景
脚手架采用的是 Vite，它在开发模式下的冷启动，让你真正体验到秒更新的快感。我认为 esm 的模块化规范会是未来的趋势，趁早学习，占据主动。

### 后端开发

采用 Node 的上层架构 Egg.js，它是由阿里研发维护的，并且是基于 Koa 开发，有着高度可扩展的插件机制，很多需求我们可以通过插件的形式来实现
数据库为 MySQL

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
