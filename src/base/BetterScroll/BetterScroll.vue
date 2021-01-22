<template>
  <div>
    <div class="wrapperX">
      <div class="contentX">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.wrapperX {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.contentX {
  white-space: nowrap;
  display: inline-block;
}
</style>

<script>
import BScroll from '@better-scroll/core'
export default {
  data() {
    return {
      bs: null,
      options: {
        scrollY: false, // 因为scrollY默认为true，其实可以省略
        scrollX: true,
        click: true
      }
    }
  },
  props: {
    // 接收options参数
    bScrollOptions: {
      default() {
        return {}
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.options = { ...this.options, ...this.bScrollOptions }
      this.bs = new BScroll('.wrapperX', this.options)
    })
  }
}
</script>
