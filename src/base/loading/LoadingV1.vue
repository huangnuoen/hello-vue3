<template>
  <div class="loading">
    <img src="@/images/loading.gif" alt="" />
  </div>
</template>
<style lang="less" scoped>
.loading {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  img {
    position: absolute;
    top: 37%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 140px;
    height: 140px;
  }
}
</style>
