<template>
  <div class="btn" :data-code="code">{{btnText}}</div>
</template>

<script>
export default {
  name: 'bottom-btn',
  props: {
    btnText: {
      type: String,
      default: '联系客服'
    },
    code: {
      type: [Number, String],
      default: 0
    }
  }
}
</script>

<style lang="less" scoped>
.btn {
  width: 176px;
  height: 64px;
  border-radius: 44px;
  text-align: center;
  line-height: 64px;
  font-family: @Regular;
  font-size: 28px;
  margin-left: 16px;
  border: 1px solid #ccc;
  &[data-code='8'],
  &[data-code='7'],
  &[data-code='4'],
  &[data-code='3'],
  &[data-code='1'] {
    order: 2;
    border: 1px solid transparent;
    color: #fff;
    .linearOrange(45deg);
  }
  &.disabled{
    opacity: .6;
  }
}
</style>
