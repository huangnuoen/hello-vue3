<template>
  <div class="express-card" @click="$emit('select')">
    <div class="address-card express" v-if="item.express_no">
      <div class="addr">
        <svg-icon icon-class="order_icon_van"></svg-icon>
        <div class="addr-info">
          <div class="addr-info-top">
            <span class="name bold">物流公司：{{item.express_company}}</span>
            <!-- <span class="phone">{{item.phone}}</span> -->
          </div>
          <div class="addr-info-bottom">
            物流单号：{{item.express_no}}
          </div>
        </div>
        <!-- <svg-icon class="arrow" icon-class="order_icon_arrow1"></svg-icon> -->
      </div>
    </div>
    <div class="address-card">
      <div class="addr">
        <svg-icon icon-class="orderdetails_icon_location"></svg-icon>
        <div class="addr-info">
          <div class="addr-info-top">
            <span class="name bold">{{item.name}}</span>
            <span class="phone">{{item.mobile_phone}}</span>
          </div>
          <div class="addr-info-bottom">
            {{item.province}} {{item.city}} {{item.area}} {{item.address}}
          </div>
        </div>
      </div>
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
.express-card {
  background: #fff;
}
.address-card {
  &.express {
    margin-bottom: 0;
  }
  position: relative;
  min-height: 160px;
  // border-radius: 16px;
  padding: 36px 24px;
  .addr {
    display: flex;
    align-items: center;
    font-size: 26px;
    svg {
      font-size: 64px;
      margin-right: 24px;
      flex: 0 0 64px;
    }
    &-info {
      flex: 0 0 532px;
      &-top {
        padding-bottom: 8px;
        .name {
          font-size: 32px;
          color: @black-m;
          padding-right: 24px;
        }
        .phone {
          color: @grey;
        }
      }
      &-bottom {
        color: @black-m;
      }
    }
    svg.arrow {
      position: absolute;
      right: 0px;
      top: 50%;
      color: @grey-l;
      font-size: 24px;
      transform: translateY(-50%);
    }
  }
  button {
    width: 100%;
    height: 88px;
    color: @orange;
    font-size: 32px;
    svg {
      stroke: @orange;
      font-size: 40px;
      vertical-align: sub;
    }
  }
  margin-bottom: 24px;
}
</style>
