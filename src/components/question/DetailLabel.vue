<template>
  <span class="detail-label">{{labelText}}</span>
</template>

<script>
export default {
  name: 'detail-label',
  props: {
    labelText: {
      type: String,
      default: '标签'
    }
  }
}
</script>

<style lang="less">
.detail-label {
  padding: 12px 16px;
  color: #737373;
  font-size: 26px;
  font-family: @Regular;
  background-color: @bg;
  margin-right: 16px;
  border-radius:12px;
  margin-top: 10px;
}
</style>
