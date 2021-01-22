<template>
  <div class="header-nav">
    <div>
      <slot name="left"></slot>
    </div>
    <div>
      <slot></slot>
    </div>

    <div>
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'header-nav'
}
</script>
<style lang="less" scoped>
.header-nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 88px;
  color: @black-d;
  font-family: @Medium;
  font-size: 30px;
  font-weight: 500;
  padding: 0 30px;
  background-color: #fff;

  > div {
    display: flex;
    align-items: center;
  }
}
</style>
