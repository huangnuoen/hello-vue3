<template>
  <div class="favorites">
    <van-tabs v-model="curTab" :color="variable.theme" :title-active-color="variable.theme">
      <van-tab :title="item.tab" v-for="(item,key) in COLLECT_CONFIG" :key="key" :name="key"></van-tab>
    </van-tabs>
    <div class="content">
      <div class="item" v-for="(item,i) in list" :key="item.id">
        <van-swipe-cell>
          <!-- 根据tab显示不同的item组件 -->
          <component :is="currentTabComponent" :item="item"></component>
          <template #right>
            <button class="delete" @click.stop="cancelCollect(item,i)">取消收藏</button>
          </template>
        </van-swipe-cell>
      </div>
    </div>
    <Empty v-if="!list.length&&!loading" :desc="COLLECT_CONFIG[curTab].desc" style="paddingTop:93px;">
      <button class="theme" @click="tolink" v-waves>{{COLLECT_CONFIG[curTab].btnText}}</button>
    </Empty>
  </div>
</template>
<script>
import variable from '@/style/variable.less'
import { Tab, Tabs, SwipeCell } from 'vant'
import GoodsItem from '@/components/favorites/GoodsItem'
import ArticleItem from '@/components/favorites/ArticleItem'
import VideoItem from '@/components/favorites/VideoItem'
import QuestionItem from '@/components/question/QuestionItem'
import loadingMixin from '@/mixins/loadingMixin'
import Empty from '@/base/Empty/Empty'
const COLLECT_CONFIG = {
  1: {
    component: 'QuestionItem',
    desc: '您还没有收藏过任何问答',
    btnText: '看问答',
    link: '/question-list',
    tab: '健康问答'
  },
  2: {
    component: 'ArticleItem',
    desc: '您还没有收藏过任何文章',
    btnText: '看文章',
    link: '/article-list',
    tab: '文章'
  },
  3: {
    component: 'VideoItem',
    desc: '您还没有收藏过任何视频',
    btnText: '看视频',
    link: '/video-list',
    tab: '视频'
  },
  6: {
    component: 'GoodsItem',
    desc: '您还没有收藏过任何商品',
    btnText: '逛一逛',
    link: '/mall',
    tab: '商品'
  }
}
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [SwipeCell.name]: SwipeCell,
    GoodsItem,
    ArticleItem,
    QuestionItem,
    VideoItem,
    Empty
  },
  mixins: [loadingMixin],
  data() {
    return {
      COLLECT_CONFIG,
      curTab: '6',
      variable,
      list: [],
      currentTabComponent: ''
    }
  },
  mounted() {
    this.currentTabComponent = COLLECT_CONFIG[this.curTab].component
    this.getCollect({ type: this.curTab })
  },
  methods: {
    async cancelCollect(item, i) {
      this.$toast.loading({
        message: '加载中...'
      })
      let res
      switch (+this.curTab) {
        case 2:
        case 3:
          res = await this.$api.user.collectUnset({
            id: item.id,
            type: this.curTab
          })
          break
        case 1:
          res = await this.$api.qa.question_uncollect(item.id)
          break

        case 6:
          res = await this.$api.store.collectProduct({ product_id: item.id })
          break
        default:
          break
      }
      this.list.splice(i, 1)
      this.$toast(res.message)
    },
    getCollect(params) {
      this.setLoading(true)
      this.list = []
      this.$api.user
        .collects(params)
        .finally(() => {
          this.$toast.clear()
        })
        .then((res) => {
          this.setLoading(false)
          if (res.code === 200) {
            this.list = res.data.data
          }
        })
    },
    tolink() {
      this.$router.push(this.COLLECT_CONFIG[this.curTab].link)
    }
  },
  watch: {
    curTab(type) {
      this.currentTabComponent = COLLECT_CONFIG[this.curTab].component
      this.getCollect({ type })
    }
  }
}
</script>
<style lang="less" scoped>
.delete {
  color: #fff;
  background-color: #f5181b;
  height: 100%;
  padding: 0 20px;
  font-size: 28px;
}
.van-tabs {
  margin-bottom: 24px;
}
.empty {
  button {
    width: 310px;
    height: 88px;
    background: rgba(240, 242, 242, 1);
    border-radius: 44px;
    font-size: 30px;
    margin-right: 10px;
    color: #606266;
    &.theme {
      color: @theme;
      background-color: @theme;
      color: #fff;
    }
  }
}
</style>
