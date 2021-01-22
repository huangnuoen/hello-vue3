<template>
  <section class="flows">
    <h3 class="left-line">服务流程</h3>
    <ul>
      <li class="flows-item" :key="index" v-for="(item,index) in list">
        <span class="sequence-number">{{index+1}}</span>
        <span class="title">{{item.title}}</span>
        <div class="text">{{item.text}}</div>
        <div class="line"></div>
      </li>
    </ul>
  </section>
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
.flows {
  .flows-item {
    font-size: 26px;
    position: relative;
    .title {
      color: @black-d;
      font-weight: 500;
      padding-bottom: 4px;
    }
    .text {
      color: @black-m;
      padding-left: 46px;
      padding-bottom: 42px;
    }
    &:last-child {
      .text {
        padding-bottom: 0;
      }
      .line {
        display: none;
      }
    }
    .line {
      position: absolute;
      top: 40px;
      left: 13px;
      width: 1px;
      height: 67%;
      background-color: @border;
    }
  }
}
</style>
