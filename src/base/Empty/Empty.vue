<template>
  <!-- 空状态 -->
  <div class="empty">
    <!-- <img src="@/images/empty/oder_img_empty.png"> -->
    <img :src="require('@/images/empty/'+img + '.png')">
    <div class="text">{{desc}}</div>
    <div class="bottom">
      <slot></slot>
    </div>
  </div>

</template>
<script>
export default {
  props: {
    desc: String,
    img: {
      type: String,
      default: 'oder_img_empty'
    }
  }
}
</script>
<style lang="less" scoped>
.empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 306px;
    height: 306px;
    margin: 0 auto;
  }
  .text {
    font-size: 26px;
    color: @black-l;
    padding-bottom: 80px;
  }
}
</style>
