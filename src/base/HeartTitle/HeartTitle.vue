<template>
  <van-divider>
    <svg-icon icon-class="mine_icon_love"></svg-icon>
    {{title}}
  </van-divider>

</template>
<script>
import { Divider } from 'vant'
export default {
  components: {
    [Divider.name]: Divider
  },
  props: {
    title: {
      type: String,
      default: '猜你喜欢'
    }
  }
}
</script>
<style lang="less" scoped>
.van-divider {
  width: 300px;
  margin: 22px auto;
  color: @black-m;
  font-size: 26px;

  svg {
    font-size: 24px;
    margin-right: 8px;
  }
}
</style>
