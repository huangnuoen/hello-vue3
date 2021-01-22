<template>
  <div class="search-key">{{text}}</div>
</template>
<script>
export default {
  props: {
    text: String
  }
}
</script>
<style lang="less" scoped>
.search-key {
  display: inline-block;
  border-radius: 30px;
  padding: 12px 45px;
  font-size: 26px;
  color: #737373;
  background-color: @bg;
  margin-right: 24px;
  margin-bottom: 24px;
}
</style>
