<template>
  <div class="goods-action-icon" @click="$emit('click')">
    <van-icon :badge="badge">
      <svg-icon :icon-class="icon"></svg-icon>
    </van-icon>
    <div class="text">{{text}}</div>
  </div>
</template>
<script>
import { Icon } from 'vant'
export default {
  props: {
    icon: String,
    text: String,
    badge: [Number, String]
  },
  components: { [Icon.name]: Icon }
}
</script>
<style lang="less" scoped>
.goods-action-icon {
  cursor: pointer;
  width: 76px;
  color: @black-m;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
  justify-content: center;
  svg {
    color: #fff;
    font-size: 42px;
    stroke: #4d4d4d;
    margin-bottom: 2px;
  }
  .text {
    font-size: 20px;
    white-space: nowrap;
  }
  &.active {
    svg {
      // animation: bounded cubic-bezier(0.6, 4, 0.3, 0.8) .3s;
      transition: transform 0.3s;
      transform: rotateY(180deg);
      stroke: @theme;
      color: @theme;
    }
  }
  &:last-of-type {
    margin-right: 34px;
  }
}
</style>
