# BaseCheckbox 复选框

## 代码演示

### 基础用法

通过`v-model`绑定复选框的勾选状态

```html
<BaseCheckbox v-model="checked"></BaseCheckbox>
```

```js
export default {
  data() {
    return {
      checked: true
    }
  }
}
```

### slot

默认插槽，自定义文本, 相当于复选框的label
```html
<BaseCheckbox v-model="checkall">全选</BaseCheckbox>
```

## API

### BaseCheckbox Props

| 参数            | 说明           | 类型      | 默认值  |
| --------------- | -------------- | --------- | ------- |
| v-model (value) | 是否为选中状态 | _boolean_ | `false` |

### BaseCheckbox Events

| 事件名 | 说明                     | 回调参数           |
| ------ | ------------------------ | ------------------ |
| change | 当绑定值变化时触发的事件 | _checked: boolean_ |

### BaseCheckbox Slots

| 名称    | 说明       | SlotProps |
| ------- | ---------- | --------- |
| default | 自定义文本 | -         |
