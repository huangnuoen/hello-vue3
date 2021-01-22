<template>
  <div class="question-detail" v-if="is_show">
    <detail-question :detail="detail" />

    <detail-answer :detail="detail" />

    <div class="no-other" v-if="detail.answers.length">没有更多了</div>
  </div>
</template>

<script>
import DetailQuestion from '@/components/question/DetailQuestion'
import DetailAnswer from '@/components/question/DetailAnswer'
import wechatSDK from '@/utils/wechatSDK'
export default {
  name: 'question-detail',
  components: {
    DetailQuestion,
    DetailAnswer
  },
  data() {
    return {
      detail: {},
      is_show: false
    }
  },
  created() {
    // console.log(this.$route.query.id)

    this.getDetail()
  },
  methods: {
    getDetail() {
      this.$store.commit('SET_LOADING', true)

      this.$api.qa
        .questions({ id: this.$route.query.id })
        .then((res) => {
          if (res.code === 200) {
            const data = this.detail = res.data
            // 设置微信分享
            wechatSDK({
              title: data.question.content,
              desc: data.answers[0].content,
              imgUrl: 'https://public-10006067.file.myqcloud.com/upload/imagelist/activity/386855af7c0a5c8dec6a73ddcd7d25c4.jpeg',
              hasSign: true
            })
          }

          this.$store.commit('SET_LOADING', false)
          this.is_show = true
        })
    }
  }
}
</script>

<style lang="less" scoped>
.question-detail {
  background-color: #fff;
  width: 100%;
  height: 100px;

  .no-other {
    width: 100%;
    height: 96px;
    line-height: 96px;
    text-align: center;
    font-family: @Regular;
    font-size: 26px;
    color: @grey;
  }
}
</style>
