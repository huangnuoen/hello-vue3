<template>
  <div class="art-list" v-if="!this.$store.state.loading">
    <van-list
      v-if="list.length"
      v-model="loading"
      @load="getList"
      :immediate-check="false"
      :finished="finished"
      finished-text="没有更多了~"
    >
      <article-li v-for="(n,index) in list" :key="index" :info="n"></article-li>
    </van-list>
    <Empty class="empty" v-else desc="暂无数据~"></Empty>
  </div>
</template>
<script>
import ArticleLi from '@/components/home/ArticleLi'
import Empty from '@/base/Empty/Empty'
import { List } from 'vant'
export default {
  name: 'art-list',
  props: ['type'],
  components: {
    ArticleLi,
    Empty,
    [List.name]: List
  },
  data() {
    return {
      list: [],
      page: 1,
      pageSize: 10,
      loading: false,
      finished: false,

      is_by_label: 1,
      label_total: 0
    }
  },
  created() {
    this.firstGetList()
  },
  methods: {
    firstGetList() {
      this.$store.commit('SET_LOADING', true)
      this.getList().then(() => {
        this.$store.commit('SET_LOADING', false)
      })
    },
    getList() {
      let data

      if (this.type === 1) {
        data = {
          by_label: this.is_by_label,
          page: this.page,
          pageSize: this.pageSize
        }
      } else if (this.type === 2) {
        this.is_by_label = 0

        data = {
          is_latest: 1,
          page: this.page,
          pageSize: this.pageSize
        }
      } else {
        this.is_by_label = 0

        data = {
          cat_id: this.type,
          page: this.page,
          pageSize: this.pageSize
        }
      }

      return new Promise((resolve, reject) => {
        this.$api.article.list(data).then((res) => {
          if (res.code === 200) {
            this.$store.commit('SET_LOADING', false)
            // const data = res.data.data
            // this.list = this.list.concat(data)
            // this.loading = false
            // this.page++
            // if (this.list.length >= res.data.total) {
            //   this.finished = true
            // }

            const data = res.data.data

            // if (this.is_by_label === 1) {
            //   this.label_total = res.data.total
            // }

            this.list = this.list.concat(data)

            this.loading = false

            this.page++

            // if (this.list.length >= this.label_total && this.is_by_label === 1) {
            //   this.page = 1
            //   this.is_by_label = 2
            //   this.getList()
            // }
            // if (this.list.length >= res.data.total + this.label_total) {
            //   this.finished = true
            // }
            if (this.list.length >= res.data.total) {
              this.finished = true
            }
          }
          resolve()
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.art-list {
  padding: 16px 30px 30px;
  background: #fff;
}
.empty {
  margin-top: 150px;
}
</style>
