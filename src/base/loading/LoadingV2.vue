<template>
  <!--小loading，通常用于组件内局部刷新-->
  <transition name="fade">
    <div class="loading-v2">
      <div class="round round-1"></div>
      <div class="round round-2"></div>
      <div class="round round-3"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'loading-v2'
}
</script>

<style lang="less" scoped>
@import url("~@/style/transtion");
@keyframes loading1 {
  from {
    background-color: #fff;
  }
  to {
    background-color: @theme;
  }
}

.loading-v2 {
  position: relative;
  z-index: 9;
  width: 100%;
  height: 100px;
  // background-color: #fff;
}
.round {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #fff;
  transform: translate(-50%, -50%);
  animation: loading1 0.6s ease infinite;
}
.round-1 {
  margin-left: -16px;
  animation-delay: 0.1s;
}
.round-2 {
  animation-delay: 0.2s;
}
.round-3 {
  margin-left: 16px;
  animation-delay: 0.3s;
}
.loading-leave-active {
  transition: opacity 0.3s;
}
.loading-enter,
.loading-leave-to {
  opacity: 0;
}
</style>
