# vue3

## 快速开始
```js
npm init vite-app hello-vue3
```
or
```js
npm install -g @vue/cli 
vue create hello-vue3
```

## 全局api

1. 防止全局api污染了Vue, 将Vue.use等全局api转成app.use, app通过creatApp创建
e.g. 
```js
Vue.use => app.use
Vue.prototype => app.config.globalProperties
```
2. Vue暴露的方法通过 `import { createApp, h, nextTick } from 'vue'` 引入
  > 在 Vue 3 中，全局和内部 API 都经过了重构，并考虑到了 tree-shaking 的支持。因此，全局 API 现在只能作为 ES 模块构建的命名导出进行访问

## render函数
1. 不再接收参数，将主要用于setup()内

## ref 基本数据类型
> 通过一个新的 ref 函数使任何响应式变量在任何地方起作用

ref 对我们的值创建了一个响应式引用

```js

```
## reactive 引用类型

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
