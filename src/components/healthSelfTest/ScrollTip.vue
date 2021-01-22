<template>
  <div class="scroll-tip">
    <div>icon</div>
    <div>滑动查看更多</div>
  </div>
</template>

<script>
export default {
  name: 'scroll-tip'
}
</script>

<style lang="less" scoped>
.scroll-tip {
  width: 100%;
  height: 120px;
  background-color: #ffeecf;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fa9716;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
}
</style>
