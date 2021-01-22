<template>
  <div class="advert-entry" v-if="item.img" @click="$emit('link',item)">
    <img :src="item.img">
  </div>

</template>
<script>
export default {
  props: {
    item: Object
  }
}
</script>
<style lang="less" scoped>
.advert-entry {
  padding: 32px 0;
  text-align: center;
  img {
    border: 1px solid @border;
    width: 690px;
    height: 176px;
    object-fit: contain;
    border-radius: 12px;
    background-color: @bg;
  }
}
</style>
