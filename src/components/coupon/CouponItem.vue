<template>
  <div class="coupon-item disabled">
    <div class="coupon-item-content">
      <div class="coupon-item-content-left">
        <div class="price">&yen; <em>50</em></div>
        <div class="instr">指定套餐优惠券</div>
      </div>
      <div class="coupon-item-content-right">
        <div class="coupon-item-content-right-top">
          <h3>
            <span class="tag">新用户</span>固定天数优惠8固定天数优惠8固定天数优惠8固定天数优惠8.8折
          </h3>
          <div class="time">2018.12.03 - 2018.12.10</div>
        </div>
        <div class="coupon-item-content-right-bottom" @click="showTips=!showTips" :class="{showTips}">
          详细说明
          <svg-icon icon-class="order_icon_fold_up"></svg-icon>
        </div>
        <BaseCheckbox v-model="checked"></BaseCheckbox>
      </div>
    </div>
    <CollapseTransition>
      <div class="coupon-item-tips" v-show="showTips">
        <svg-icon icon-class="order_pop_icon_point"></svg-icon>
        订单价格未达到满减金额
      </div>
    </CollapseTransition>
  </div>
</template>
<script>
import CollapseTransition from '@/base/Transition/CollapseTransition'
import BaseCheckbox from '@/base/BaseCheckbox/BaseCheckbox'

export default {
  components: { CollapseTransition, BaseCheckbox },
  data() {
    return {
      showTips: false,
      checked: false
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/style/mixin.less';
.coupon-item {
  margin: 24px auto 24px;
  width: 686px;
  &.disabled {
    .coupon-item-content {
      &-left {
        background-image: url('@{images}/coupon/card_bg_disable.png');
      }
      &-right {
        .tag {
          background-color: #cccccc;
        }
        h3,
        .time,
        &-bottom {
          color: #ccc;
        }
      }
    }
  }
  .coupon-item-content {
    height: 212px;
    display: flex;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.08);
    border-radius: 8px;

    &-left {
      background: url('@{images}/coupon/card_bg_normal@2x.png') top left / contain no-repeat;
      overflow: hidden;
      flex: 0 0 236px;
      color: #fff;
      font-size: 24px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .price {
        font-size: 40px;
        font-weight: bold;
        em {
          font-size: 80px;
        }
      }
      .instr {
        font-size: 24px;
      }
    }
    &-right {
      flex: 1;
      position: relative;
      &-top {
        height: 170px;
        position: relative;
        border-bottom: 1px solid @border;
        color: @black-m;
        padding-left: 20px;
        h3 {
          padding-top: 26px;
          // display: flex;
          .tag {
            font-size: 22px;
            width: 78px;
            height: 32px;
            line-height: 32px;
            padding: 1px 0;
            text-align: center;
            color: #fff;
            background: @orange;
            border-radius: 16px;
            margin-right: 12px;
          }
          font-size: 28px;
          .ellipsis-line(300px, 2);
          font-weight: bold;
        }
        .time {
          position: absolute;
          bottom: 6px;
          font-size: 24px;
        }
      }
      &-bottom {
        position: relative;
        color: #9c9c9c;
        font-size: 20px;
        padding-top: 6px;
        padding-left: 20px;
        &.showTips {
          svg {
            transform: rotate(0);
          }
        }
        svg {
          position: absolute;
          right: 32px;
          top: 12px;
          color: #d6d6d9;
          transform: rotate(90deg);
          transition: transform 0.3s;
        }
      }
      .base-checkbox {
        position: absolute;
        right: 0;
        top: 78px;
      }
    }
  }
  &-tips {
    font-size: 22px;
    color: @grey;
    padding-top: 8px;
  }
}
</style>
