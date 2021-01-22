<template>
  <div class="test-record" v-if="isShow">
    <top-img style="marginTop:20px" v-if="list.length" :topImg="exam" />

    <van-list
      v-if="list.length"
      v-model="loading"
      @load="getList"
      :immediate-check="false"
      :finished="finished"
      finished-text="已经到底了哦"
    >
      <div class="listBox">
        <record-item v-for="(item,index) in list" :key="index" :item="item" />
      </div>
    </van-list>

    <Empty v-else class="empty" desc="暂无记录"></Empty>

    <footer-btn :btnSession="2">
      <template #left>
        <btn-item :btnText="'再测一次'" />
      </template>
      <template #right>
        <btn-item :btnText="'更多测试'" :clsName="'rightBtn'" />
      </template>
    </footer-btn>
  </div>
</template>

<script>
import TopImg from '@/components/healthSelfTest/TopImg'
import RecordItem from '@/components/healthSelfTest/RecordItem'

import FooterBtn from '@/components/healthSelfTest/FooterBtn'
import BtnItem from '@/components/healthSelfTest/BtnItem'
import Empty from '@/base/Empty/Empty'
import { List } from 'vant'

export default {
  name: 'test-record',
  components: {
    RecordItem,
    TopImg,
    FooterBtn,
    BtnItem,
    [List.name]: List,
    Empty
  },
  data() {
    return {
      list: [],
      exam: {},
      isShow: false,
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

        this.isShow = true
      })
    },

    getList() {
      return new Promise((resolve, reject) => {
        this.$api.exam.resultList({ exam_id: this.$route.query.examId }).then((res) => {
          if (res.code === 200) {
            this.list = this.list.concat(res.data.data)

            this.list[0].exam.user_result_count = res.data.total

            this.exam = this.list[0].exam

            console.log(this.exam)

            this.loading = false

            this.page++

            if (this.list.length >= res.data.total) {
              this.finished = true
            }

            resolve()
          }
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.test-record {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding-bottom: 120px;
}

.empty {
  margin-top: 150px;
}
</style>
