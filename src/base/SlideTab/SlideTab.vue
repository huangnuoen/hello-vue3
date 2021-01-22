<!--
  SlideTap 目前主要用在图文、视频列表页
  -props:
    arr 标签数组
    tab 当前选中标签（使用双向数据绑定）
  -events:
    changeTab 当前选中标签改变时触发
  -slots
    default 标签内容
  注意：
  1.当前选中标签改变可以通过监听tab变化或者绑定changeTab
  2.slot内容是组件的情况下，可以缓存并且标签内容之间互不影响；不是组件的情况下，需要监听标签改变内容
-->
<template>
  <div class="slide-tab" :class="{'zindex-tab': isZIndex }">
    <van-tabs @click="changeTab" @scroll="scrollTab" v-model="currentTab" sticky offset-top="38">
      <van-tab v-for="t in arr" :key="t.id" :title="t.name">
        <slot></slot>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { Tab, Tabs } from 'vant'
export default {
  name: 'slide-tab',
  props: {
    arr: {
      type: Array
    },
    tab: {
      type: Number,
      default: 0
    }
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data() {
    return {
      currentTab: this.tab,
      isZIndex: false,
      isStart: true
    }
  },
  methods: {
    changeTab(n) {
      this.$emit('update:tab', n)
    },
    scrollTab(d) {
      this.isZIndex = d.scrollTop > 0
    }
  }
}
</script>
<style lang="less" scoped>
.slide-tab {
  /deep/ .van-tabs__nav.van-tabs__nav--line {
    height: 80px;
    padding-bottom: 37px;
    .van-tab {
      flex-basis: auto !important;
      padding: 0 38px;
      margin-left: -24px;
      &:first-child {
        margin-left: 0;
      }
    }
    .van-tab.van-tab--active .van-tab__text {
      color: @theme2;
    }
    .van-tabs__line {
      background: @theme2;
    }
  }
}
.zindex-tab {
  position: relative;
  z-index: 10;
}
</style>
