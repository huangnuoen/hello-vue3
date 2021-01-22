<!-- 健康问答 -->
<template>
  <div class="question">
    <plate-title :info="{name: '健康问答', tip: '您可能关心的问题', url: '/question-list'}"></plate-title>
    <div class="arcticle-list">
      <question-li v-for="n in qusList" :key="n.id" :info="n" :isSkeleton="isLoad"></question-li>
    </div>
    <ul class="list">
      <li v-for="(item,index) in list" @click="$emit('linkto',item)" :key="index"><img :src="item.pic_url"/></li>
    </ul>
  </div>
</template>
<script>
import PlateTitle from './PlateTitle'
import QuestionLi from './QuestionLi'
export default {
  name: 'home-question',
  components: {
    PlateTitle,
    QuestionLi
  },
  props: {
    list: Array
  },
  data() {
    return {
      qusList: [{}, {}, {}],
      isLoad: false
    }
  },
  created() {
    this.getQuestions()
  },
  methods: {
    getQuestions() {
      this.isLoad = true
      this.$api.qa
        .questions({
          params: {
            pageSize: '3',
            complex_sequence: 'desc'
          }
        })
        .then((res) => {
          this.isLoad = false
          if (res.code === 200) {
            this.qusList = res.data.data
          }
        })
    }
  }
}
</script>
<style lang="less" scoped>
.question {
  background: #fff;
  .list {
    padding: 16px 30px 0;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 336px;
      height: 176px;
      margin-bottom: 16px;
      img {
        width: 100%;
        height: 100%;
      }
      &:nth-child(2n) {
        margin-left: auto;
      }
    }
  }
}
.arcticle-list {
  padding: 0 30px;
  background: #fff;
  margin-top: -32px;
}
.card-list {
  padding: 0 30px;
  display: flex;
  flex-wrap: wrap;
}
</style>
