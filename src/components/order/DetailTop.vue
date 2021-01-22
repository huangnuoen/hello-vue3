<template>
  <div class="detail-top">
    <div class="text-box">
      <p class="status">{{item.order_info.order_status_desc||showObj.statusTitle}}</p>
      <!-- <p class="describe">{{showObj.desc}}</p> -->
      <p class="describe">{{STORE_ORDER_CLOSE_TYPE[item.order_info.close_type] || showObj.desc}}</p>
      <slot></slot>
    </div>

    <div class="img-box">
      <img :src="showObj.imgSrc" alt />
    </div>
  </div>
</template>

<script>
import { STORE_ORDER_CLOSE_TYPE } from '@/config/order'
export default {
  name: 'detail-top',
  props: {
    showObj: {
      type: Object
    },
    item: {
      type: Object
    }
  },
  data() {
    return {
      STORE_ORDER_CLOSE_TYPE
    }
  }
}
</script>

<style lang="less" scoped>
.detail-top {
  width: 100%;
  height: 216px;
  background: url('@{images}/order/detail_top_bg.png');
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px 18px 30px;
  margin-bottom: -18px;
  > .white-bottom {
    width: 100%;
    height: 24px;
    border-top-right-radius: 24px;
    border-top-left-radius: 24px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #fff;
  }

  .text-box {
    max-width: 432px;
    color: #fff;
    font-family: @Medium;

    .status {
      font-size: 36px;
      font-weight: 500;
      margin-bottom: 10px;
    }

    .describe {
      font-size: 24px;
    }
  }

  .img-box {
    width: 176px;
    height: 176px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
