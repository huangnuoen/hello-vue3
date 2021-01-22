<template>
  <div class="address-card" @click="$emit('select')">
    <button v-if="!item.id">
      <svg-icon icon-class="global_icon_add"></svg-icon>
      新增收货地址
    </button>

    <div class="addr" v-else>
      <svg-icon icon-class="orderdetails_icon_location"></svg-icon>
      <div class="addr-info">
        <div class="addr-info-top">
          <span class="name bold">{{item.name}}</span>
          <span class="phone">{{item.phone}}</span>
        </div>
        <div class="addr-info-bottom">
          {{item.province}} {{item.city}} {{item.area}} {{item.address}}
        </div>
      </div>
      <svg-icon class="arrow" icon-class="order_icon_arrow1"></svg-icon>
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
.address-card {
  position: relative;
  width: 718px;
  min-height: 160px;
  background: #fff;
  border-radius: 16px;
  margin: 0 auto;
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
