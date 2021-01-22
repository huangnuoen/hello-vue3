<template>
  <div class="safecode">
    <p>安全码</p>
    <p class="code">{{code}}</p>
    <van-circle size="120" v-model="currentRate" :rate="rate" :text="text" />
    <!-- <button @click="reduce">{{text}}</button> -->
  </div>
</template>
<script>
import { Circle } from 'vant'
const format = (rate) => Math.min(Math.max(rate, 0), 100)
export default {
  components: {
    [Circle.name]: Circle
  },
  data() {
    return {
      currentRate: 0,
      second: 0,
      text: '10',
      rate: 100,
      code: '...'
    }
  },
  mounted() {
    this.getCode()
  },
  methods: {
    getCode() {
      this.$api.client.authenticatorToken().then((res) => {
        this.code = res.data.token
        this.currentRate = 0
        this.second = res.data.remain_time
        this.countdown(res.data.remain_time)
      })
    },
    reduce() {
      this.rate = format(0)
    },

    countdown(remain_time) {
      if (this.second <= 0) {
        this.getCode()
      } else {
        setTimeout(() => {
          this.second = this.second - 0.01
          this.currentRate = this.currentRate + this.rate / remain_time / 100
          this.text = Math.ceil(this.second) + ''
          this.countdown(remain_time)
        }, 10)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.safecode {
  text-align: center;
  font-size: 40px;
  margin: auto;
  font-weight: bolder;
  p {
    margin: 40px;
  }
  .code {
    color: @theme;
  }
}
</style>
<style lang="less">
.safecode {
  .van-circle__text {
    font-size: 60px;
    color: @blue;
  }
}
</style>
