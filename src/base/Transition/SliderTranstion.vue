<template>
  <transition name="slide">
    <slot></slot>
  </transition>
</template>
<style lang="less" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all ease 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
.slide-enter-to,
.slide-leave {
  opacity: 1;
}

</style>
