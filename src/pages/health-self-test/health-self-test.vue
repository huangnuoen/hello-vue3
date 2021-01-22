<template>
  <div id="health-self-test">
    <slide-tab :arr="arr" :tab.sync="tab">
      <test-list :type="type" />
    </slide-tab>
  </div>
</template>

<script>
import SlideTab from '@/base/SlideTab/SlideTab'

import TestList from '@/components/healthSelfTest/TestList'

import { List } from 'vant'

export default {
  name: 'health-self-test',
  data() {
    return {
      arr: [
        { name: '未测', type: 1 },
        { name: '已测', type: 2 }
      ],
      tab: 0
    }
  },
  components: {
    SlideTab,
    TestList,
    [List.name]: List
  },
  computed: {
    type() {
      return this.arr[this.tab].type
    }
  }
}
</script>

<style lang="less" scoped>
#health-self-test {
  width: 100%;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 82px;

  .van-tabs__line {
    width: 50px !important;
  }
}
</style>
