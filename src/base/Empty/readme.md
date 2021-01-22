# Empty 空状态

## 代码演示

### 基础用法

```html
<Empty desc="购物车还没有商品哦~" />
```

### 图片 img

Empty 组件支持自定义图片（目前只支持png格式），在img中传入图片文件名（不需要后缀）, 图片需要提前放在`@/images/empty/`下

```html
<Empty desc="购物车还没有商品哦~" img="oder_img_empty" />
```

### 自定义内容

通过默认插槽可以在 Empty 组件的下方插入内容

```html
<Empty desc="购物车还没有商品哦~" img="oder_img_empty" >
  <button>查看收藏</button>
  <button class="theme">去逛逛</button>
</Empty>
<style>
  .button {
    width: 240px;
  }
</style>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| img | 自定义图片，支持传入图片文件名，图片需要提前放在`@/images/empty/`下 | _string_ | `default` |
| desc | 图片下方的描述文字 | _string_ | - |

### Slots

| 名称        | 说明           |
| ----------- | -------------- |
| default     | 自定义底部内容 |
| img       | 自定义图标     |
| desc | 自定义描述文字 |
