<template>
  <div class="order-no">
    <div class="no-item">
      <div>
        <div class="item-name">订单编号</div>
        <div class="item-content">{{this.$route.query.order_no}}</div>
      </div>

      <div class="copyBtn" @click="copyOrderNo" :data-clipboard-text="this.$route.query.order_no">复制单号</div>

    </div>
    <div class="no-item">
      <div>
        <div class="item-name">下单时间</div>
        <div class="item-content">{{item.order_info.ctime}}</div>
      </div>
    </div>
    <div class="no-item">
      <div>
        <div class="item-name">下单渠道</div>
        <div class="item-content">微信</div>
      </div>
    </div>
    <!-- 支付信息 -->
    <template v-if="item.payment_info.payed_at">
      <div class="no-item">
        <div>
          <div class="item-name">支付方式</div>
          <div class="item-content">微信支付</div>
        </div>
      </div>
      <div class="no-item">
        <div>
          <div class="item-name">支付时间</div>
          <div class="item-content">{{item.payment_info.payed_at||'-'}}</div>
        </div>
      </div>
    </template>

    <!--<div class="no-item">
      <div>
        <div class="item-name">订单快照</div>
        <div class="item-content">发生交易争议时，可作为判断依据</div>
      </div>

      <van-icon name="arrow" />
    </div>

-->
  </div>
</template>

<script>
import Clipboard from 'clipboard'

import { Icon } from 'vant'
export default {
  name: 'order-no',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    [Icon.name]: Icon
  },
  methods: {
    copyOrderNo(order_no) {
      const clipboard = new Clipboard('.copyBtn')
      clipboard.on('success', (e) => {
        this.$toast('复制成功')
        clipboard.destroy()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.order-no {
  width: 100%;
  background-color: #fff;
  padding: 30px;
  font-size: 26px;
  font-family: @Regular;
  color: @black-m;
  margin-top: 20px;

  .no-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;

    &:last-child {
      margin-bottom: 0;
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      &.copyBtn {
        width: 148px;
        height: 52px;
        background-color: #fff;
        justify-content: center;
        align-items: center;
        border-radius: 28px;
        border: 1px solid #ccc;
        font-size: 24px;
        color: @black-m;
      }

      > .item-name {
        margin-right: 72px;
        min-width: 110px;
      }
    }
  }
}
</style>
