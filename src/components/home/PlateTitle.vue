<!--
 * @Author: Tan Xuan
 * @Date: 2020-09-21 14:10:01
 * @LastEditTime: 2020-09-22 11:42:19
 * @LastEditors: Tan Xuan
 * @Description: 
-->
<template>
  <div class="plate-title">
    <span class="name">{{info.name}}</span>
    <i v-if="info.tip" :style="{'background-color': info.tipBg, color: info.tipColor}">{{info.tip}}</i>
    <span
      class="sub"
      v-if="info.subName"
      :style="{'background-color': info.subBg, color: info.subColor}"
    >{{info.subName}}</span>
    <span class="more" v-if="info.url" @click="$router.push(info.url)">{{info.more || '查看更多'}}</span>
  </div>
</template>
<script>
export default {
  name: 'plate-title',
  props: ['info'],
  // info: {
  //   name: '中医医典',
  //   tip: 'New',
  //   tipBg: '#f53134',
  //   tipColor: 'white',
  //   subName: '已收录专业医典数据3539条',
  //   subBg: '',
  //   subColor: '',
  //   url: '',
  //   more: '',
  // }
}
</script>
<style lang="less" scoped>
.plate-title {
  display: flex;
  align-items: center;
  padding: 32px 30px 24px;
  background: #fff;
  .name {
    font-size: 36px;
    font-family: @Medium;
    font-weight: 500;
    color: #262626;
    line-height: 50px;
  }
  & > i {
    display: block;
    height: 36px;
    padding: 0 8px;
    background: #e6f7ff;
    font-size: 22px;
    font-weight: 400;
    color: #1890ff;
    line-height: 36px;
    font-style: normal;
    margin-left: 16px;
    border-radius: 4px;
  }
  .sub {
    display: block;
    height: 36px;
    padding: 0 8px;
    background: #fff0e0;
    font-size: 22px;
    font-weight: 400;
    color: #fa791c;
    line-height: 36px;
    font-style: normal;
    margin-left: 16px;
    border-radius: 4px;
  }
  .more {
    font-size: 28px;
    font-weight: 400;
    color: #818999;
    line-height: 40px;
    margin-left: auto;
  }
}
</style>
