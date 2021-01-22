<template>
  <div class="goods-action">
    <slot></slot>
  </div>
</template>
<script>
import { Icon } from 'vant'
export default {
  name: 'goods-action',
  components: { [Icon.name]: Icon }
}
</script>
<style lang="less" scoped>
@import '~@/style/mixin.less';
.goods-action {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  height: 112px;
  background-color: #fff;
  display: flex;
  border-top: 1px solid @border;
  padding: 0 16px;
  box-sizing: content-box;
  .safe-padding-bottom(0px);
}
</style>
