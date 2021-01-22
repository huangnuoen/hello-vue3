<template>
  <div class="test-list" v-if="isShow">
    <van-list
      v-if="list.length"
      v-model="loading"
      @load="getList"
      :immediate-check="false"
      :finished="finished"
      finished-text="已经到底了哦"
    >
      <div class="listBox">
        <list-item v-for="item in list" :key="item.id" :item="item" :type="type" />
      </div>
    </van-list>
    <Empty class="empty" v-else desc="暂无"></Empty>
  </div>
</template>

<script>
import ListItem from '@/components/healthSelfTest/ListItem'
import Empty from '@/base/Empty/Empty'
import { List } from 'vant'

export default {
  name: 'test-list',
  props: ['type'],
  components: {
    ListItem,
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
      isShow: false
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

        this.isShow = true
      })
    },
    getList() {
      return new Promise((resolve, reject) => {
        this.$api.exam
          .list({ page: this.page, pageSize: this.pageSize, type: this.type })
          .then((res) => {
            if (res.code === 200) {
              this.list = this.list.concat(res.data.data)
              this.page++
              this.loading = false

              if (this.list.length >= res.data.total) {
                this.finished = true
              }
            }

            resolve()
          })
          .catch(() => {})
      })
    }
  }
}
</script>

<style lang="less" scoped>
.listBox {
  width: 100%;
  padding: 0 30px;
}

.empty {
  margin-top: 200px;
}
</style>
