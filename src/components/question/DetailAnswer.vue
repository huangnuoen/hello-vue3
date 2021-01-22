<template>
  <div class="detail-answer">
    <div class="header">
      <from :fromObj="fromObj" />
    </div>
    <div class="answer-list" v-if="detail.answers.length">
      <AnswerItem :answer="item" v-for="(item, index) in detail.answers" :key="index" />
    </div>

    <empty v-else :desc="'暂无解答'" />
  </div>
</template>

<script>
import From from '@/components/question/From'
import AnswerItem from '@/components/question/AnswerItem'

import Empty from '@/base/Empty/Empty'

export default {
  name: 'detail-answer',
  props: {
    detail: Object
  },
  components: {
    From,
    AnswerItem,
    Empty
  },
  data() {
    return {
      fromObj: { fromImg: 0, fromText: '医生回答' }
    }
  }
}
</script>

<style lang="less" scoped>
.detail-answer {
  margin-top: 16px;

  .header {
    width: 100%;
    background-color: #fff;
    padding: 16px 30px;
  }
}
</style>
