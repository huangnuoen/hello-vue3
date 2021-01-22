<template>
  <div class="order-products">

    <div class="order-products" v-for="(goods,index) in item.sub_order" :key="index">
      <div class="top">
        <div class="hospital">
          <p>{{goods.store_name}}</p>
        </div>
      </div>

      <div class="package" v-for="(packageItem,index) in goods.products" :key="index">
        <div class="left">
          <img :src="packageItem.product_img" alt />
          <div class="order-name">{{packageItem.product_title}}</div>
        </div>
        <div class="right">
          <p>&yen; {{packageItem.selling_price | G_formatPrice}}</p>
          <p>x {{packageItem.num}}</p>
        </div>
      </div>
    </div>
    <!-- 订单提示 -->
    <div class="order-tips" v-if="tips">
      <svg-icon icon-class="global_icon_remind"></svg-icon>
      {{tips}}
    </div>
    <slot></slot>
    <div class="price-info">
      <div class="no-item">
        <div>
          <div class="item-name">商品总额</div>
        </div>
        <!-- <div> &yen; {{item.payment_info.total_amount| G_formatPrice}}</div> -->
        <div> &yen; {{(item.payment_info.total_amount-item.payment_info.delivery_fee) | G_formatPrice}}</div>
      </div>
      <!-- 有type且type是预约类才隐藏运费 -->
      <div class="no-item" v-if="!(item.order_info.type&&+item.order_info.type===+GOODS_TYPE.SERVICE)">
        <div>
          <div class="item-name">运费</div>
        </div>
        <div> &yen; {{item.payment_info.delivery_fee | G_formatPrice}}</div>
      </div>

      <div class="no-item" v-show="item.payment_info.score">
        <div>
          <div class="item-name">福利积分</div>
        </div>
        <div>- &yen; {{item.payment_info.score | G_formatPrice}}</div>
      </div>
      <div class="no-item">
        <div>
          <div class="item-name other">{{item.payment_info.payed_at?'实付款':'应付款'}}</div>
        </div>
        <BasePrice :price="item.payment_info.pay_amount" :color="variable.orange"></BasePrice>
        <!-- <div class="money">
          <p>&yen; </p>
          <p class="pre"> {{item.payment_info.pay_amount | G_formatPrice}}</p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import variable from '@/style/variable.less'
import { GOODS_TYPE } from '@/config/common'
export default {
  name: 'order-products',
  props: {
    item: Object
  },
  data() {
    return {
      variable,
      GOODS_TYPE
    }
  },
  components: {},
  computed: {
    tips() {
      if (this.item.order_info.type === GOODS_TYPE.NON_PRESCRIPTION) {
        return '在线购药服务由益丰大药房提供'
      } else if (this.item.reservation && !this.item.reservation.mobile_phone) {
        return '可在购买后90天内填写预约信息'
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.order-products {
  width: 100%;
  background-color: #fff;
  font-size: 26px;
  font-family: @Regular;
  color: @black-m;
  padding-top: 30px;
  .top {
    width: 690px;
    display: flex;
    align-items: center;

    .hospital {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      > img {
        width: 32px;
        height: 32px;
        background-color: skyblue;
        margin-right: 14px;
      }
    }
  }

  .order-products {
    // margin-top: 36px;
    margin-bottom: 32px;
    padding: 0 30px;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }

    > .top {
      width: 690px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .hospital {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        > img {
          width: 32px;
          height: 32px;
          background-color: skyblue;
          margin-right: 14px;
        }
      }

      .status {
        font-size: 26px;
        font-family: @Regular;
        color: @orange;
      }
    }

    .package {
      margin-top: 40px;

      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      .left {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;

        > img {
          width: 120px;
          height: 120px;
          border-radius: 8px;
          margin-right: 24px;
          object-fit: contain;
        }

        .order-name {
          font-size: 28px;
          color: @black-m;
          font-family: @Regular;
          line-height: 40px;
          max-width: 400px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }

      .right {
        height: 120px;
        font-size: 26px;
        color: @black-m;
        font-family: @Regular;
        text-align: right;

        p {
          &:last-child {
            margin-top: 16px;
          }
        }
      }
    }
  }
  .order-tips {
    color: #f5830a;
    width: 690px;
    background: rgba(253, 250, 238, 1);
    border-radius: 8px;
    padding: 10px 16px;
    margin: 0 auto;
    margin-bottom: 32px;
    font-size: 24px;
    svg {
      stroke: currentColor;
      font-size: 32px;
    }
  }
  .price-info {
    padding: 0 30px 30px 30px;
  }
  .no-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    color: @grey;
    font-size: 24px;
    &:last-child {
      margin-bottom: 0;
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      > div {
        &.item-name {
          margin-right: 72px;
          min-width: 110px;
        }

        &.other {
          color: #303133;
          font-size: 30px;
        }
      }

      &.money {
        color: #fa5300;
        display: flex;

        .pre {
          font-size: 30px;
        }

        .ft {
          margin-top: 6px;
        }
      }
    }
  }
}
</style>
