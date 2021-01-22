<template>
  <div class="top-search-bar">
    <slot name="left"></slot>
    <div class="input-wrap" @click="$emit('toSearch')">
      <svg-icon icon-class="home_icon_search"></svg-icon>
      <span class="placeholder">{{ placeholder }}</span>
    </div>
    <slot name="right"></slot>
  </div>
</template>
<script>
export default {
  props: {
    placeholder: String
  }
}
</script>
<style lang="less" scoped>
@import '~@/style/mixin.less';
.top-search-bar {
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  padding: 0px 30px;
  .input-wrap {
    margin: 0 28px;
    height: 72px;
    border-radius: 36px;
    flex: 1;
    background-color: #fff;
    // padding: 16px 20px;
    padding-left: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 30px;
    color: @grey;
    box-shadow: 0px 8px 16px 0px rgba(155, 167, 178, 0.08);
    svg {
      font-size: 32px;
      margin-right: 16px;
    }
  }
}
</style>
