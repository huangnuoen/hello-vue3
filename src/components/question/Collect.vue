<template>
  <div class="collect" @click="collectAct">
    <div class="img-box">
      <img v-if="is_collect" src="@/images/question/collect.png" alt />
      <img v-else src="@/images/question/collect_not.png" alt />
    </div>
    <div class="txt">收藏</div>
  </div>
</template>

<script>
import { toLogin } from '@/utils/auth'

export default {
  name: 'collect',
  props: ['collect', 'id'],
  data() {
    return {
      is_collect: this.collect,
      collecting: false
    }
  },
  created() {},
  methods: {
    collectAct() {
      if (this.collecting) return
      this.collecting = true

      this.is_collect = !this.is_collect

      if (this.is_collect) {
        this.$api.qa
          .question_collect(this.id)
          .then((res) => {
            if (res.code === 200) {
              this.$toast('已收藏')
              // } else if (res.code === 510) {
              // toLogin(this.$route, res.data)
            }
          })
          .finally(() => {
            this.collecting = false
          })
      } else {
        this.$api.qa
          .question_uncollect(this.id)
          .then((res) => {
            if (res.code === 200) {
              this.$toast('已取消收藏')
              // } else if (res.code === 510) {
              // toLogin(this.$route, res.data)
            }
          })
          .finally(() => {
            this.collecting = false
          })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.collect {
  display: flex;
  align-items: center;
  justify-self: start;
  flex-direction: column;

  .img-box {
    width: 42px;
    height: 42px;

    img {
      width: 42px;
      height: 42px;
    }
  }

  .txt {
    font-size: 20px;
    font-family: @Regular;
    color: @black-m;
  }
}
</style>
