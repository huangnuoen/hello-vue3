<template>
  <div class="test-result" v-if="is_show">
    <test-results :result="result"/>

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
import TestResults from '@/components/healthSelfTest/TestResults'

import FooterBtn from '@/components/healthSelfTest/FooterBtn'
import BtnItem from '@/components/healthSelfTest/BtnItem'

export default {
  name: 'test-result',
  components: {
    TestResults,
    FooterBtn,
    BtnItem
  },
  data() {
    return {
      is_show: false,
      result: {}
    }
  },
  created() {
    this.getResult()
  },
  methods: {
    getResult() {
      this.$store.commit('SET_LOADING', true)

      this.$api.exam.result(this.$route.query.id).then((res) => {
        if (res.code === 200) {
          this.result = res.data
          this.$store.commit('SET_LOADING', false)
          this.is_show = true
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.test-result {
  width: 100%;
  padding: 0 30px;
}
</style>
