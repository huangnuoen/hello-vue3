<!-- 健康资讯 -->
<template>
  <div class="article">
    <plate-title :info="{name: '健康资讯', url: '/article-list'}"></plate-title>
    <div class="articles">
      <article-li v-for="n in list" :key="n.id" :info="n" :isSkeleton="isLoad"></article-li>
    </div>
    <div class="change">
      <svg-icon :class="{'loading': isLoad}" iconClass="home_icon_change"></svg-icon>
      <span @click="changeList">换一批</span>
    </div>
  </div>
</template>
<script>
import PlateTitle from './PlateTitle'
import ArticleLi from './ArticleLi'
export default {
  name: 'home-article',
  components: {
    PlateTitle,
    ArticleLi
  },
  data() {
    return {
      isLoad: false,
      page: 1,
      pageSize: 3,
      list: [],
      total: 0,
      is_by_label: 1,
      by_label_total: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    changeList() {
      if (this.isLoad) return
      // 只展示满3个
      // let r = this.total % this.pageSize
      // if ((this.total - r) / this.pageSize === this.page) {
      //   this.$toast('没有更多了~')
      //   return
      // }

      if (this.pageSize * (this.page + 1) >= this.total + this.by_label_total && this.page !== 1) {
        this.$toast('没有更多了~')
        return
      }
      this.page++
      this.getList()
    },
    getList() {
      this.isLoad = true
      this.$api.article
        .list({
          by_label: this.is_by_label,
          page: this.page,
          pageSize: this.pageSize
        })
        .then((res) => {
          this.isLoad = false
          if (res.code === 200) {
            const data = res.data.data

            this.list = data

            // if (this.is_by_label === 1) {
            //   this.by_label_total = res.data.total

            //   if (this.pageSize * this.page >= this.by_label_total) {
            //     this.page = 1
            //     this.is_by_label = 2

            //     if (res.data.total === 0) {
            //       this.getList()
            //     }
            //   }
            // }

            // if (this.is_by_label !== 1) {
            //   this.total = res.data.total
            // }
            this.total = res.data.total
          }
        })
    }
  }
}
</script>
<style lang="less" scoped>
.recommend {
  background: #fff;
}
.articles {
  margin-top: -24px;
  padding: 0 30px;
}
.change {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 78px;
  & > svg {
    font-size: 32px;
    margin-right: 16px;
  }
  & > span {
    font-size: 28px;
    color: #818999;
    line-height: 40px;
  }
  .loading {
    transition: all ease 1s;
    transform: rotate(360deg);
  }
}
</style>
