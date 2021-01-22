<template>
  <div class="second-entry">
    <div class="second-entry-item" v-for="(item,index) in list" :key="index" @click="$emit('link',item)" v-waves>
      <img :src="item.pic_url" class="icon" :data-mtaname="item.title">
      <!-- <img :src="item.img" class="icon" :data-mtaname="item.name"> -->
      <!-- <img :src="require('@/images/mall/welfare_card_bg_'+(index+1) + '.png')" class="icon" :alt="item.name"> -->
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
.second-entry {
  padding: 32px 28px 32px 30px;
  &-item {
    // font-size: 0;
    display: inline-block;
    height: 96px;
    margin-right: 16px;
    box-shadow: 0px 4px 24px 0px rgba(184, 190, 204, 0.3);
    flex: 1;
    border-radius: 8px;
    img {
      border-radius: 8px;
      width: 220px;
      height: 96px;
      object-fit: contain;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
