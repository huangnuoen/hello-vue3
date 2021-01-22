## Backtop 回到顶部

返回页面顶部的操作按钮

### 基础用法

```html
<template>
  <BackTop :bottom="31" :right="7"> </BackTop>
</template>
```

### 自定义显示内容

其中的内容可支持自定义。

```html
<template>
  <BackTop :bottom="31" :right="7">
    <div>
      UP
    </div>
  </BackTop>
</template>
```

### Attributes

| 参数              | 说明                             | 类型   | 可选值 | 默认值 |
| ----------------- | -------------------------------- | ------ | ------ | ------ |
| visibility-height | 滚动高度达到此参数值才出现       | number |        | 200    |
| right             | 控制其显示位置, 距离页面右边距   | number |        | 40     |
| bottom            | 控制其显示位置, 距离页面底部距离 | number |        | 40     |

### Events

| 事件名 | 说明               | 回调参数 |
| ------ | ------------------ | -------- |
| click  | 点击按钮触发的事件 | 点击事件 |
