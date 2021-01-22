<template>
  <div class="my-points">
    <h4>我的积分</h4>
    
    <div class="points"> <span class="text">{{item.point}}</span>
      <!-- <svg-icon icon-class="order_icon_arrow1"></svg-icon> -->
    </div>
    <!-- <button>什么是积分?</button> -->
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
.my-points {
  display: flex;
  position: relative;
  padding: 30px;
  font-size: 36px;
  h4 {
    color: @black-d;
    font-weight: 500;
    padding-right: 8px;
  }
  .points {
    display: flex;
    align-items: center;
    color: @orange;
    font-weight: bold;
    .text {
      padding-right: 4px;
    }
    svg {
      font-size: 24px;
      vertical-align: middle;
    }
  }
  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 30px;
    width: 204px;
    height: 64px;
    .linearOrange(45deg);
    border-radius: 44px;
    font-size: 28px;
    color: #fff;
  }
}
</style>
