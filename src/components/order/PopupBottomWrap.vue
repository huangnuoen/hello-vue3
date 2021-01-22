<template>
  <div class="popup-bottom-wrap">
    <header>{{title}}</header>
    <div class="content">
      <slot></slot>
    </div>
    <footer>
      <button @click="$emit('confirm')">{{btnText}}</button>
    </footer>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    btnText: {
      type: String,
      default: '确定'
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/style/mixin.less';

.popup-bottom-wrap {
  background-color: @bg;
  height: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  header {
    width: 100%;
    height: 92px;
    flex-shrink: 0;
    background-color: #fff;
    font-size: 32px;
    font-weight: 500;
    color: @black-d;
    text-align: center;
    padding: 24px;
    z-index: 1;
  }
  .content {
    flex: 1;
    overflow: auto;
  }
  footer {
    background-color: #fff;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    .safe-padding-bottom(20px);
    button {
      width: 642px;
      height: 80px;
      background: @theme;
      color: #fff;
      border-radius: 40px;
      font-size: 28px;
    }
  }
}
</style>
