<template>
  <section class="notice">
    <h3 class="left-line">注意事项</h3>
    <ul>
      <li class="notice-item" :key="index" v-for="(item,index) in list"><span
          class="sequence-number">{{index+1}}</span>{{item}}
      </li>
    </ul>
  </section>

</template>
<script>
export default {
  props: {
    list: Array
  }
}
</script>
<style lang="less" scoped>
@import '~@/pages/store/goods.less';
.notice {
  .notice-item {
    color: @black-m;
    font-size: 26px;
    padding-top: 10px;
  }
}
</style>
