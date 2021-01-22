<template>
  <div id="app">
    <TitleBar v-if="$route.meta.titleBar" :config="$store.state.titleBar"></TitleBar>
    <keep-alive :include="$store.state.keepAlivePages" max="5">
      <router-view></router-view>
    </keep-alive>
    <LoadingV1 v-if="loading"></LoadingV1>
    <!-- <TabBar></TabBar> -->
  </div>
</template>
<script>
// import TabBar from '@/components/index/TabBar'
import TitleBar from '@/base/TitleBar/TitleBar'
import loadMapMixin from '@/mixins/loadMapMixin'
import partnerCardMixin from '@/mixins/partnerCardMixin'
import LoadingV1 from '@/base/loading/LoadingV1'
export default {
  components: { TitleBar, LoadingV1 },
  mixins: [loadMapMixin],
  computed: {
    loading() {
      return this.$store.state.loading
    }
  },
  mounted() {}
}
</script>
<style lang="less">
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  // router-view 需要满屏的自行加flex:1
}
</style>
