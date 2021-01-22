<template>
  <div class="list-tab" :class="{'zindex-tab':isZIndex}">
    <van-tabs
      @click="changeTab"
      v-model="currentTab"
      @scroll="scrollTab"
      sticky
      background="#F7F7F7"
    >
      <van-tab v-for="t in tabArr" :title="t.name" :key="t.id">
        <slot></slot>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant'

export default {
  name: 'list-tab',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  props: ['tab'],
  data() {
    return {
      tabArr: [
        {
          name: '全部',
          id: 0
        },
        {
          name: '待付款',
          id: 1
        },
        {
          name: '待使用',
          id: 2
        },
        {
          name: '待评价',
          id: 6
        },
        {
          name: '退款/售后',
          id: 7
        }
      ],
      currentTab: this.tab,
      isZIndex: false
    }
  },
  methods: {
    changeTab(n) {
      localStorage.setItem('orderTab', n)
      this.$emit('update:tab', n)
    },
    scrollTab(d) {
      this.isZIndex = d.scrollTop > 0
      this.$emit('topShow', this.isZIndex)
    }
  }
}
</script>

<style lang="less" scoped>
.list-tab {
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
  z-index: 999;
}
</style>
