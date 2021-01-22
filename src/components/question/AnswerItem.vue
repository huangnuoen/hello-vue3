<template>
  <div class="answer-item">
    <user :answer="answer" />

    <div class="answer-content">
      {{answer.content}}
    </div>

    <div class="answer-time">回答于 {{answer.ctime.split(' ')[0]}}</div>
  </div>
</template>

<script>
import User from '@/components/question/User'

export default {
  name: 'answer-item',
  props: ['answer'],
  components: {
    User
  }
}
</script>

<style lang="less" scoped>
.answer-item {
  background-color: #fff;
  padding: 32px 30px 48px;
  margin-bottom: 16px;

  .answer-content {
    margin-top: 32px;
    font-family: @Regular;

    font-size: 34px;
    font-family: @Regular;
    color: @black-m;
    line-height: 56px;
  }

  .answer-time {
    font-family: @Regular;
    font-size: 26px;
    color: @grey;
    line-height: 36px;
    margin-top: 32px;
  }
}
</style>
