<template>
  <div class="question-li" v-if="isShow">
    <van-list
      v-if="list.length"
      v-model="loading"
      @load="getList"
      :immediate-check="false"
      :finished="finished"
      finished-text="没有更多了"
    >
      <question-item v-for="item in list" :key="item.id" :item="item" />
    </van-list>

    <Empty class="empty" v-else desc="暂无数据~"></Empty>
  </div>
</template>

<script>
import QuestionItem from '@/components/question/QuestionItem'
import { List } from 'vant'

import Empty from '@/base/Empty/Empty'
export default {
  name: 'question-li',
  props: ['type'],
  components: {
    QuestionItem,
    [List.name]: List,
    Empty
  },
  data() {
    return {
      isShow: false,
      list: [],
      page: 1,
      pageSize: 10,
      loading: false,
      finished: false
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
      let params
      if (this.type === 0) {
        params = {
          page: this.page,
          pageSize: this.pageSize,
          is_latest: 1
        }
      } else if (this.type === 1) {
        params = {
          is_latest: 1, //是否为最近
          page: this.page,
          pageSize: this.pageSize
        }
      } else {
        params = {
          category_id: this.type,
          is_latest: false, //是否为最近
          page: this.page,
          pageSize: this.pageSize
        }
      }

      return new Promise((resolve, reject) => {
        this.$api.qa
          .questions({
            id: 0,
            params
          })
          .then((res) => {
            if (res.code === 200) {
              const data = res.data.data

              this.list = this.list.concat(data)

              this.loading = false

              this.page++

              if (this.list.length >= res.data.total) {
                this.finished = true
              }
            } else if (res.code === 500) {
            }

            this.isShow = true
            resolve()
          })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.empty {
  margin-top: 150px;
}
</style>
