<template>
  <div class="article-list" :class="{ 'show-title-bar': $route.meta.titleBar }">
    <slide-tab v-if="isLoad" :arr="arr" :tab.sync="tab">
      <art-list :type="typeId"></art-list>
    </slide-tab>
    <BackTop :bottom="31" :right="7"></BackTop>
  </div>
</template>
<script>
import SlideTab from '@/base/SlideTab/SlideTab'
import ArtList from '@/components/article/ArtList'
import BackTop from '@/base/BackTop/BackTop'
import { scrollTop } from '@/utils/tool'
import * as types from '@/store/mutation-types'
export default {
  name: 'article-list',
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.$route.query.from) {
        vm.$store.commit(types.SET_TITLE_BAR, {
          title: '健康资讯',
          hasMenu: false
        })
      }
    })
  },
  components: {
    SlideTab,
    ArtList,
    BackTop
  },
  data() {
    return {
      arr: [
        { name: '推荐', id: 1 },
        { name: '最新', id: 2 }
      ],
      tab: 0,
      isLoad: false
    }
  },
  computed: {
    typeId() {
      return this.arr[this.tab].id
    }
  },
  created() {
    this.getCategory()
  },
  methods: {
    scrollTop,
    getCategory() {
      this.$store.commit('SET_LOADING', true)
      this.$api.category
        .list({
          type: 1
        })
        .then((res) => {
          this.isLoad = true
          this.$store.commit('SET_LOADING', false)
          if (res.code === 200) {
            const data = res.data
            this.arr = this.arr.concat(data)
          }
        })
    }
  }
}
</script>
<style lang="less" scoped>
.article-list {
  background: #fff;
  min-height: 100vh;
  width: 100%;
}
.show-title-bar {
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 82px;
}
.top {
  position: fixed;
  right: 14px;
  bottom: 62px;
  height: 112px;
  width: 112px;
  background: url('~@/images/news/btn_top.png') no-repeat center center / 100% 100%;
  opacity: 0;
  z-index: 999;
  &.show {
    opacity: 1;
  }
}
</style>
