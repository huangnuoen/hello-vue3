<template>
  <div class="third-entry">
    <h3>健康生活</h3>
    <div class="content">
      <div
        class="item"
        v-for="(item,index) in list"
        :key="index"
        v-waves
        @click="$emit('link',item)"
      >
        <!-- <img :src="item.img" class="icon" :data-mtaname="item.name" > -->
        <img :src="item.pic_url" class="icon" :data-mtaname="item.title" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: Array
  }
}
</script>
<style lang="less" scoped>
.third-entry {
  padding: 32px 30px;
  h3 {
    color: @black-d;
    font-size: 36px;
    padding-bottom: 24px;
    font-weight: 500;
  }
  .content {
    height: 400px;

    .item {
      font-size: 0;
      display: inline-block;
      margin-right: 16px;
      float: left;
      &:first-child {
        width: 218px;
        height: 400px;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      &:nth-child(3),
      &:nth-child(2) {
        width: 220px;
        height: 192px;
      }
      &:nth-child(3),
      &:nth-child(5) {
        margin-right: 0;
      }
      &:nth-child(4) {
        width: 456px;
        height: 192px;
        margin-right: 0;
        margin-top: 16px;
      }
    }
  }
}
</style>
