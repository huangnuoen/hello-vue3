<!-- 健康自测 -->
<template>
  <div class="self-test">
    <plate-title :info="{name: '健康自测', url: '/health-self-test'}"></plate-title>
    <check></check>
    <ul class="list">
      <li v-for="(item,index) in list" @click="$emit('linkto',item)" :key="index"><img :src="item.pic_url"/></li>
      <!-- <li v-for="(item,index) in list" @click="$emit('linkto',item)" :key="index"><img :src="require('@/images/home/'+item.img + '.png')"/></li> -->
      <!-- <li><img src="@/images/home/home_img_report.png"/></li>
      <li><img src="@/images/home/home_img_eye.png"/></li>
      <li><img src="@/images/home/home_img_teeth.png"/></li> -->
    </ul>
  </div>
</template>
<script>
import PlateTitle from './PlateTitle'
import Check from './Check'
export default {
  name: 'self-test',
  components: {
    PlateTitle,
    Check
  },
  props: {
    list: Array
  }
}
</script>
<style lang="less" scoped>
.self-test {
  background: #fff;
  .list {
    padding: 24px 30px 8px;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 336px;
      height: 176px;
      margin-bottom: 16px;
      img {
        width: 100%;
        height: 100%;
      }
      &:nth-child(2n) {
        margin-left: auto;
      }
    }
  }
}
</style>
