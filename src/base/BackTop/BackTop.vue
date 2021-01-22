<template>
  <transition name="fade">
    <div
      v-if="visible"
      @click.stop="handleClick"
      :style="{
        right: styleRight,
        bottom: styleBottom
      }"
      class="backtop"
    >
      <slot>
        <svg-icon icon-class="global_btn_top"></svg-icon>
      </slot>
    </div>
  </transition>
</template>

<script>
import { throttle } from '@/utils/tool'

export default {
  name: 'back-top',

  props: {
    visibilityHeight: {
      type: Number,
      default: 200
    },
    right: {
      type: Number,
      default: 40
    },
    bottom: {
      type: Number,
      default: 40
    }
  },

  data() {
    return {
      container: null,
      visible: false
    }
  },

  computed: {
    styleBottom() {
      return `${this.bottom}px`
    },
    styleRight() {
      return `${this.right}px`
    }
  },

  mounted() {
    this.init()
    this.throttledScrollHandler = throttle(this.onScroll, 300)
    this.container.addEventListener('scroll', this.throttledScrollHandler)
  },

  methods: {
    init() {
      this.container = document
    },
    getScrollTop() {
      return document.documentElement.scrollTop || document.body.scrollTop
    },
    getElement() {
      return document.documentElement.scrollTop ? document.documentElement : document.body
    },
    onScroll() {
      const scrollTop = this.getScrollTop()
      this.visible = scrollTop >= this.visibilityHeight
    },
    handleClick(e) {
      this.scrollToTop()
      this.$emit('click', e)
    },
    scrollToTop() {
      const el = this.getElement()
      let step = 0
      const interval = setInterval(() => {
        if (el.scrollTop <= 0) {
          clearInterval(interval)
          return
        }
        step += 10
        el.scrollTop -= step
      }, 20)
    }
  },

  beforeDestroy() {
    this.container.removeEventListener('scroll', this.throttledScrollHandler)
  }
}
</script>
<style lang="less" scoped>
@import url('~@/style/transtion');
.backtop {
  position: fixed;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  z-index: 50;
  .safe-padding-bottom(0px);
}
svg {
  font-size: 112px;
}
</style>
