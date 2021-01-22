<template>
  <div :class="['btn-item',clsName]">{{btnText}}</div>
</template>

<script>
export default {
  name: 'btn-item',
  props: {
    btnText: {
      type: String,
      default: '按钮'
    },
    clsName: {
      type: String,
      default: 'leftBtn'
    }
  }
}
</script>

<style lang="less" scoped>
.btn-item {
  width: 310px;
  height: 88px;
  background: #fff;
  border-radius: 44px;
  text-align: center;
  line-height: 88px;
  font-family: @STYuanti;
  font-size: 30px;

  &.leftBtn {
    opacity: 0.8;
    border: 1px solid @theme;
    color: @theme;
  }

  &.rightBtn {
    background-color: @theme;
    color: #fff;
  }
}
</style>
