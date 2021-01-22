<template>
  <div class="live-entry" @click="$emit('link',item)">
    <img :src="item.img" alt="">
    <div class="tag">直播预告</div>
    <div class="info">
      <h3>直播时间：</h3>
      <div class="time">2020.03.06 20:30</div>
      <button class="book" v-show="false">
        <svg-icon icon-class="welfare_live_icon_like"></svg-icon>订阅
      </button>
    </div>
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
.live-entry {
  position: relative;
  width: 690px;
  height: 288px;
  background: #fff;
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  overflow: hidden;
  font-size: 0;
  margin: 32px auto;
  img {
    width: 690px;
    height: 192px;
    object-fit: cover;
    background-color: @bg;
  }
  .tag {
    position: absolute;
    top: 0;
    background-color: @blue;
    color: #fff;
    font-size: 22px;
    border-radius: 12px 0px 12px 0px;
    text-align: center;
  }
  .info {
    display: flex;
    align-items: center;
    font-size: 30px;
    color: @black-d;
    padding: 27px 16px;
    background-color: #fff;
    button.book {
      position: absolute;
      right: 16px;
      width: 144px;
      padding: 10px 0;
      background: @linearBg;
      box-shadow: 0px 2px 16px 0px rgba(255, 171, 17, 0.5);
      border-radius: 44px;
      color: #fff;
      font-size: 28px;
      svg {
        font-size: 40px;
        vertical-align: bottom;
      }
    }
  }
}
</style>
