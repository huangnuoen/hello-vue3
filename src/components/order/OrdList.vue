<template>
  <div class="list-box" v-if="!this.$store.state.loading">
    <van-list
      v-if="orderList.length"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了哦"
      @load="getList"
    >
      <list-item v-for="(listItem,index) in orderList" :key="index" :item="listItem" />
    </van-list>

    <empty class="no-order" :desc="'暂无订单'" v-else />
  </div>
</template>

<script>
import Empty from '@/base/Empty/Empty'
import ListItem from '@/components/order/ListItem'
import { List } from 'vant'

export default {
  name: 'ord-list',
  data() {
    return {
      orderList: [],
      page: 1,
      pageSize: 10,
      loading: false,
      // finished: false,
      current_finish: false,
      thisType: 0
    }
  },
  props: ['type', 'show'],
  components: {
    Empty,
    ListItem,
    [List.name]: List
  },
  created() {
    this.firstGetList()
  },
  computed: {
    finished() {
      return this.current_finish && this.show
    }
  },
  methods: {
    firstGetList() {
      this.$store.commit('SET_LOADING', true)
      this.getList().then(() => {
        this.$store.commit('SET_LOADING', false)
      })
    },
    getList() {
      return new Promise((resolve, reject) => {
        let data

        if (this.type === 3) {
          this.thisType = 6
          data = {
            order_status: this.thisType,
            page: this.page,
            pageSize: this.pageSize
          }
        } else if (this.type === 4) {
          this.thisType = 7
          data = {
            order_status: this.thisType,
            page: this.page,
            pageSize: this.pageSize
          }
        } else {
          if (this.type === 0) {
            data = {
              page: this.page,
              pageSize: this.pageSize
            }
          } else {
            data = {
              order_status: this.type,
              page: this.page,
              pageSize: this.pageSize
            }
          }
        }

        this.$api.user.orderList(data).then((res) => {
          if (res.code === 200) {
            this.orderList = this.orderList.concat(res.data)
            this.page++
            this.current_finish = true
            resolve()
          }
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.no-order {
  margin-top: 220px;
}
</style>
