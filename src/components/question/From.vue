<template>
  <div class="from">
    <img v-if="fromObj.fromImg === 1" src="@/images/question/question.png" alt />
    <img v-else src="@/images/question/answer.png" alt />
    <p class="from-text">{{fromObj.fromText}}</p>
  </div>
</template>

<script>
export default {
  name: 'from',
  props: {
    fromObj: Object
  }
}
</script>

<style lang="less" scoped>
.from {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  > img {
    width: 32px;
    height: 32px;
    margin-right: 10px;
  }

  > .form-text {
    font-family: @Regular;
    color: @black-d;
    font-size: 28px;
  }
}
</style>
