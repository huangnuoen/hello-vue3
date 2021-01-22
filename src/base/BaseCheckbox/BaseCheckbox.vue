<template>
  <span class="base-checkbox" @click="change">
    <span class="base-checkbox-icon" :class="{checked,disabled}">
      <!-- <van-icon name="success" v-if="!disabled" /> -->
      <svg-icon icon-class="global_icon_gou"></svg-icon>
    </span>
    <span class="text">
      <slot></slot>
    </span>
  </span>
</template>
<script>
import { Icon } from 'vant'

export default {
  components: { [Icon.name]: Icon },
  model: {
    event: 'change',
    prop: 'checked'
  },
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean
    }
  },
  data() {
    return {}
  },
  methods: {
    change() {
      // this.checked = !this.checked
      if (this.disabled) return
      this.$emit('change', !this.checked)
    }
  }
}
</script>
<style lang="less" scoped>
.base-checkbox {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  &-icon {
    border: 1px solid #c8c9cc;
    font-size: 18px;
    border-radius: 100%;
    width: 36PX/2;
    height: 36PX/2;
    line-height: 36PX/2;
    transition: all 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    svg{
      color: #fff;
      font-size: 28px;
      width: 100%;
      height: 100%;
    }
    // i {
    //   width: 100%;
    //   height: 100%;
    //   color: #fff;
    //   font-size: 28px;
    //   vertical-align: middle;
    // }
    &.checked {
      background-color: @theme;
      border-color: @theme;
    }
    &.disabled {
      background-color: @border;
      border: 1px solid #e1e1e1;
    }
  }
  .text {
    color: inherit;
    padding-left: 20px;
  }
}
</style>
