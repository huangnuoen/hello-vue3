<template>
  <button class="goods-action-button" @click="$emit('click')">
    {{text}}
  </button>
</template>
<script>
export default {
  props: {
    text: String
  }
}
</script>
<style lang="less" scoped>
.goods-action-button {
  max-width: 320px;
  flex: 1;
  height: 80px;
  font-size: 28px;
  line-height: 80px;
  color: #fff;
  background: linear-gradient(90deg, rgba(255, 209, 91, 1) 0%, rgba(255, 171, 17, 1) 100%);
  &.orange {
    .linearOrange(90deg);
  }
}
button:first-of-type {
  border-top-left-radius: 200px;
  border-bottom-left-radius: 200px;
  margin-left: auto;
}
button:last-of-type {
  border-top-right-radius: 200px;
  border-bottom-right-radius: 200px;
}
</style>
