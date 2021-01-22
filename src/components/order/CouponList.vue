<template>
  <van-popup :value="value" round position="bottom" closeable style="height: 80%;" @input="togglePopup">
    <PopupBottomWrap :title="title" @confirm="confirm">
      <div class="coupon-list">
        <CouponItem></CouponItem>
        <CouponItem></CouponItem>
        <CouponItem></CouponItem>
        <CouponItem></CouponItem>
        <CouponItem></CouponItem>
      </div>
    </PopupBottomWrap>
  </van-popup>
</template>
<script>
import PopupBottomWrap from '@/components/order/PopupBottomWrap'
import CouponItem from '@/components/coupon/CouponItem'
import { Popup } from 'vant'
export default {
  components: { CouponItem, PopupBottomWrap, [Popup.name]: Popup },
  props: {
    title: String,
    value: {
      type: Boolean
    }
  },
  methods: {
    togglePopup(val) {
      this.$emit('input', val)
    },
    confirm() {
      this.$emit('confirm')
    }
  }
}
</script>
<style lang="less" scoped>
.coupon-list {
  background-color: @bg;
}
</style>
