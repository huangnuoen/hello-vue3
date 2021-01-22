<template>
  <div class="index">
    <keep-alive :include="$store.state.keepAlivePages" max="5">
      <router-view></router-view>
    </keep-alive>
    <tab-bar></tab-bar>
  </div>
</template>
<script>
import TabBar from '@/components/index/TabBar'
export default {
  name: 'index',
  components: {
    TabBar
  },
  computed: {
    isTitleBar() {
      return this.$route.meta.titleBar
    }
  },
  beforeRouteLeave(to, from, next) {
    next()
  }
}
</script>
<style lang="less" scoped>
@import '~@/style/mixin.less';
.index {
  padding-bottom: 100px;
  .safe-padding-bottom(100px);
}
</style>
