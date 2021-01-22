<template>
    <div class="cart-submit-bar">
      <slot name="default"></slot>
      <div class="cart-submit-bar__bar">
        <slot name="price"></slot>
        <slot name="btns"></slot>
      </div>
    </div>
</template>
<style lang="less" scoped>
@import '~@/style/mixin.less';
.cart-submit-bar {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  background-color: #fff;
  user-select: none;
  height: 110px;
  box-sizing: border-box;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  border-top: 1px solid @border;
  box-sizing: content-box;
  .safe-padding-bottom(0px);
  &__bar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1;
    button {
      background: linear-gradient(45deg, rgba(255, 128, 0, 1) 0%, @orange 100%);
      padding:  20px;
      min-width: 180px;
      color: #fff;
      border-radius: 40px;
      margin-left: 16px;
      font-size: 28px;

      &.red {
        background: @red;
      }
      &.theme {
        background: @theme;
      }
    }
  }
}
</style>
