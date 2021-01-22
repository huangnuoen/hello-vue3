<template>
  <div class="mine_search_box">
    <div>
      <slot name="header"></slot>
    </div>
    <div>
      <slot></slot>
    </div>

    <div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'mine-search'
}
</script>
<style lang="less" scoped>
.mine_search_box {
  width: 100%;
  // height: 112px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px 0;
  color: #000000;
  font-size: 37px;
  font-weight: 500;

  >div{
    display: flex;
    align-items: center;
  }
}
</style>
