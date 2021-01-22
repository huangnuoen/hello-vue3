
<template>
  <div class="form">
    <svg-icon class="search" iconClass="home_icon_search"></svg-icon>
    <span @click='toSearch'>{{'请输入您想搜索的' + (type == 1 ? '疾病' : '药品') + '名称'}}</span>
  </div>
</template>

<script>
export default {
  name: 'search',
  props: {
    type: {
      type: Number,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    toSearch() {
      this.$emit('search')
    }
  }
}
</script>

<style lang='less' scoped>
.form {
  width: 642px;
  height: 80px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 32px 0px rgba(89, 172, 255, 0.2);
  border-radius: 40px;
  margin: -40px 54px;
  position: relative;
  text-align: center;
  line-height: 80px;
  span {
    height: 40px;
    font-size: 30px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(191, 191, 191, 1);
    line-height: 40px;
  }
}
</style>