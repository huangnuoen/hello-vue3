<template>
  <div class="question-item" @click="linkDetail">
    <div class="top">
      <img src="@/images/question/question.png" alt />
      <p>{{item.content}}</p>
    </div>
    <div class="bottom">
      <img src="@/images/question/answer.png" alt />
      <p>{{item.answer}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'question-item',
  props: {
    item: Object
  },
  methods: {
    linkDetail() {
      this.$router.push({ path: `/question-detail?id=${this.item.id}` })
    }
  }
}
</script>

<style lang="less" scoped>
.question-item {
  width: 100%;
  background-color: #fff;
  padding: 30px 32px 40px;
  margin-top: 16px;

  > div {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;

    &.top {
      margin-bottom: 8px;
      > p {
        font-weight: 500;
        font-family: @Medium;
        font-size: 32px;
        color: @black-d;
        line-height: 44px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      > img {
        width: 32px;
        height: 32px;
        margin: 6px 16px 6px 0px;
      }
    }

    &.bottom {
      > p {
        font-family: @Regular;
        font-size: 28px;
        color: @black-m;
        line-height: 48px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      > img {
        width: 32px;
        height: 32px;
        margin: 7px 16px 7px 0px;
      }
    }
  }
}
</style>
