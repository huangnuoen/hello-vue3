# 健康管理平台 3.0

## src

1. 页面文件 pages
   按模块分类放在 pages 下
2. 组件

- 业务组件，一般是与本项目有关的 Ui 组件 按模块分类放在 components 下 例如，订单 item 放在订单相关模块下 `order/OrderItem`
- 基础通用组件，可适用于大多数项目 放在 base 下 例如，星星组件,loading
- 优先使用[vant](https://youzan.github.io/vant/#/zh-CN/intro)中提供的组件，如 toast、二次确认弹窗等，与设计稿样式不一致或比较违和的在`style/vant.less`中写样式覆盖

3. 命名规范

- vue 文件：组件使用大驼峰，页面使用连字符
- 路由 name: 连字符，路由 path: 连字符

4. route.js

- 列表和详情路由命名参考医生列表/详情模块 `user/doctor`, `user/doctor-detail/11`

5. utils

- tool.js 常用方法
  - `fixedRollThrough`禁止弹窗滚动穿透
  - jumpLink 未知链接或外链通用跳转方法
- verify.js 表单验证方法统一放此处
- error.js 报错监控

6. mixins 定义组件共同功能
7. directives

- waves 点击波浪效果，已全局注册，可以直接使用(不适用于定位元素)

8. style

- variable.less 已全局引入
- index.less 已全局引入
- mixin.less 定义常用 less 样式类方法，如箭头标识
- base.less 通用样式
- vant.less 重新定义的 vant-ui 样式(一般在 vue.config.js 定义，定义不了的才在这里重写)

9. config

- global.js 全局变量,尽量少用，一般只定义 baseurl
- env.js 区分环境
- 定义与后台约定好的常量

10. icons

- svg 存放 svg 图标
- 使用: <svg-icon icon-class="svg文件名" class-name="svg样式class">

### api 请求

1. `api/index.js` 中导出所有`api`
2. 在`api/http.js`对 axios 作了一层封装
3. 接口模块化管理，命名统一使用后台提供的接口路径，如套餐模块的接口在 api/package, 收藏接口在 api/collect
4. `api/index.js` 中导出所有`api`,并且挂载在 vue.prototype.\$api 上，在 vue 中不需要再引入，可以直接调用`this.$api.collect.add()`
5. 后端突然换接口风格。。原来的写法 hold 不住了 3 4 5 层的接口 ，文件名、变量名和 url 路径第一级同名，接口调用的方法名和接口用法对应即可，不需要同名

### 运营位埋点
埋点已经全局添加了 不需要再写`MtaH5.clickStat`, 另外需要：
1. 对埋点元素增加`data-mtaname`属性
2. 对埋点元素祖先节点增加`data-areaname` 属性
3. 对埋点元素所在页面根路由增加 `data-mtakey` 属性

   分别对应：
```js
// 埋点已经全局添加 不需要再写下面的代码了
MtaH5.clickStat(mtakey, { name: mtaname, areaname: mtaname + '_' + areaname })
```

### 路由刷新

刷新当前路由方法：`this.$router.replace({ path: '/redirect' + this.$route.fullPath })`, 一般用于编辑后刷新页面

## 路由

### 1.keep-alive

1. 需要缓存的页面设置 meta.keepAlive 为[]
2. keepAlive 数组内的值为离开缓存页去往需要清除缓存页面的[name]
3. 注意：缓存使用的是组件的 name，需要保持组件 name 和路由 name 相同且唯一

### 2. 二级标题栏 titleBar

1. 二级标题栏 ，需要显示的页面在路由 meta 里配置

```js
  titleBar: {
    title: '', // 可不设置，默认取meta.title
    hasMenu: true, // 是否显示右侧菜单入口
    menu: [ // 右侧菜单配置
      {
        icon: 'home_icon_search',
        text: '我的',
        link: '/mine'
      }
    ]
  }
```

2. 更新 title

```js
this.$store.commit('UPDATE_TITLE_BAR_TITLE', newtitle)
```

### 其他路由配置

```js
meta: {
  //设置该路由进入的权限
  login: true // 登录后才能进入 （登录前必须授权，不需要设auth ）
  auth: true // 授权后才能进入
  title: 'title' //设置该路由title
}
```

## 二、utils

### 1. components

基础组件（base 文件夹下头部以 Base 开头的组件）自动化全局注册

## 注意

1. 已采用 px 转换插件. 编写样式以设计图上的标记 px 写即可. 对于不需要转换的. px 写成大写 PX
2. 全局已开启 eslint , 注意控制台语法规范报错 , 同时 npm run build 前,应该 npm run lint 检验一遍
