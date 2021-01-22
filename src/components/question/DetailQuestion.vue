<template>
  <div class="detail-question">
    <from :fromObj="fromObj" />

    <div class="question">{{detail.question.content}}</div>

    <div class="label-box">
      <detail-label :labelText="item" v-for="(item,index) in getLabelList" :key="index" />
    </div>

    <collect class="detail-collect" :collect="detail.is_collected" :id="detail.question.id" />
  </div>
</template>

<script>
import From from '@/components/question/From'
import DetailLabel from '@/components/question/DetailLabel'
import Collect from '@/components/question/Collect'

export default {
  name: 'question-detail',
  props: {
    detail: Object
  },
  components: {
    DetailLabel,
    Collect,
    From
  },
  data() {
    return {
      fromObj: { fromImg: 1, fromText: '患者提问' }
    }
  },
  computed: {
    getLabelList() {
      return this.detail.question.label_names.split(',').filter((item, index) => index < 5)
    }
  }
}
</script>

<style lang="less" scoped>
.detail-question {
  background-color: #fff;
  width: 100%;
  padding: 24px 30px;
  position: relative;

  .question {
    margin: 16px 0px;
    font-family: @Medium;
    font-size: 40px;
    color: @black-d;
    max-width: 600px;
    line-height: 56px;
  }

  .label-box {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .detail-collect {
    position: absolute;
    right: 46px;
    top: 74px;
  }
}
</style>
