<template>
  <div class="first-entry">
    <div class="title">
      <img :src="require('@/images/third-party/cmb/img_title1@2x.png')" alt />
    </div>
    <div
      class="first-entry-item"
      v-for="(item,index) in list"
      :key="index"
      @click="$emit('link',item)"
      v-waves
    >
      <img :src="item.pic_url" class="icon" :data-mtaname="item.title" />
      <div class="text">{{item.title}}</div>
      <!-- <img :src="item.img" class="icon" :data-mtaname="item.name" >
      <div class="text">{{item.name}}</div>-->
    </div>
  </div>
</template>
<script>
import { Skeleton } from 'vant'
export default {
  components: { [Skeleton.name]: Skeleton },
  props: {
    list: Array
  },
  methods: {}
}
</script>
<style lang="less" scoped>
@import '~@/style/mixin.less';
.first-entry {
  display: flex;
  justify-content: flex-start;
  padding: 24px 10px 0px;
  flex-wrap: wrap;
  .title {
    text-align: center;
    width: 100%;
    img {
      width: 560px;
    }
  }
  &-item {
    font-size: 0;
    flex: 0 0 172px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 34px;
    .icon {
      width: 80px;
      height: 80px;
      object-fit: contain;
      border-radius: 50%;
      margin-bottom: 8px;
      background-color: @border;
    }
    .text {
      font-size: 24px;
      color: @black-m;
    }
  }
}
</style>
