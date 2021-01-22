<template>
  <!-- 折叠面板效果 -->
  <transition name="collapse" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter"
    v-on:before-leave="beforeLeave" v-on:leave="leave" v-on:after-leave="afterLeave">
    <slot></slot>
  </transition>

</template>
<script>
export default {
  methods: {
    beforeEnter(el) {
      if (!el.dataset) el.dataset = {}
      el.dataset.oldPaddingTop = el.style.paddingTop
      el.dataset.oldPaddingBottom = el.style.paddingBottom
      el.style.height = '0'
      el.style.paddingTop = 0
      el.style.paddingBottom = 0
    },

    enter(el) {
      el.dataset.oldOverflow = el.style.overflow
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px'
        el.style.paddingTop = el.dataset.oldPaddingTop
        el.style.paddingBottom = el.dataset.oldPaddingBottom
      } else {
        el.style.height = ''
        el.style.paddingTop = el.dataset.oldPaddingTop
        el.style.paddingBottom = el.dataset.oldPaddingBottom
      }

      el.style.overflow = 'hidden'
    },

    afterEnter(el) {
      el.style.height = ''
      el.style.overflow = el.dataset.oldOverflow
    },

    beforeLeave(el) {
      if (!el.dataset) el.dataset = {}
      el.dataset.oldPaddingTop = el.style.paddingTop
      el.dataset.oldPaddingBottom = el.style.paddingBottom
      el.dataset.oldOverflow = el.style.overflow

      el.style.height = el.scrollHeight + 'px'
      el.style.overflow = 'hidden'
    },

    leave(el) {
      if (el.scrollHeight !== 0) {
        el.style.height = 0
        el.style.paddingTop = 0
        el.style.paddingBottom = 0
      }
    },

    afterLeave(el) {
      el.style.height = ''
      el.style.overflow = el.dataset.oldOverflow
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
    }
  }
}
</script>
<style lang="less" scoped>
.collapse-enter-active,
.collapse-leave-active {
  transition: all ease 0.3s;
}
.collapse-enter,
.collapse-leave-to {
  opacity: 0;
  height: 0;
}
.collapse-enter-to,
.collapse-leave {
  height: 288px * 2;
  opacity: 1;
}
</style>
