<template>
  <div class="pay">
    <header>
      <div class="text">需支付</div>
      <div class="price">&yen; <em>{{price|G_formatPrice}}</em></div>
    </header>
    <div class="ways">
      <h5>支付方式</h5>
      <div class="way" v-for="item in ways" :key="item.pay_channel">
        <BaseCheckbox :checked="item.pay_channel===payWay" @change="selectWay(item,$event)">
          <svg-icon :icon-class="item.icon"></svg-icon>
          {{item.text}}
        </BaseCheckbox>
      </div>

    </div>
    <footer>
      <button v-waves @click="topay">确认支付</button>
    </footer>
  </div>
</template>
<script>
import BaseCheckbox from '@/base/BaseCheckbox/BaseCheckbox'
import { wechatpay } from '@/utils/pay'
import { ORDER_STATUS } from '@/config/order'
export default {
  components: {
    BaseCheckbox
  },
  data() {
    return {
      price: '',
      payWay: 10,
      ways: [
        {
          text: '微信支付',
          icon: 'icon_pay_weixin',
          pay_channel: 10
        }
      ]
    }
  },
  mounted() {
    this.getOrder()
  },
  methods: {
    getOrder() {
      this.$api.user.orderDetail({ main_order_no: this.$route.query.order_no }).then((res) => {
        if (res.code === 200) {
          this.price = res.data.payment_info.pay_amount
          if (+res.data.order_status !== +ORDER_STATUS.WAIT_PAY) {
            this.$router.replace('/order-list')
          }
        }
      })
    },
    toOrderDetail() {
      this.$router.replace(`/order-detail?order_no=${this.$route.query.order_no}`)
    },
    selectWay(item, val) {
      this.payWay = item.pay_channel
    },
    topay() {
      if (!this.payWay) {
        this.$toast('请选择支付方式')
        return
      }
      this.$toast.loading({
        message: '正在加载...'
      })
      this.$api.pay
        .order(this.$route.query.order_no, { pay_channel: this.payWay })
        .finally(() => {
          this.$toast.clear()
        })
        .then((res) => {
          if (res.code === 200) {
            wechatpay({
              config: res.data.certificate,
              success: (res) => {
                this.$router.replace(`/pay-suc?order_no=${this.$route.query.order_no}`)
              },
              fail: (res) => {
                this.$toast('支付失败')
                this.toOrderDetail()
              }
            })
          }
        })
    }
  },
  computed: {}
}
</script>
<style lang="less" scoped>
@import '~@/style/mixin';
.pay {
  flex: 1;
  background-color: #fff;
  header {
    padding: 80px 0;
    text-align: center;
    .text {
      font-size: 28px;
      color: @black-m;
    }
    .price {
      font-size: 44px;
      color: @black-d;
      em {
        font-size: 68px;
      }
    }
  }
  .ways {
    padding: 30px;
    h5 {
      color: @grey;
      font-size: 28px;
      padding-bottom: 16px;
    }
    .way {
      padding: 32px 0;
      .base-checkbox {
        justify-content: space-between;
        /deep/ .base-checkbox-icon {
          order: 2;
        }
        /deep/ .text {
          order: 1;
          padding-left: 0;
        }
      }
    }
  }
  footer {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    height: 80px;
    background: rgba(255, 255, 255, 0.9);
    text-align: center;
    padding: 20px 0;
    .safe-padding-bottom(20px);
    box-sizing: content-box;
    button {
      width: 642px;
      height: 80px;
      .linearOrange(45deg);
      border-radius: 40px;
      color: #fff;
    }
    font-size: 28px;
    font-weight: 500;
  }
}
</style>
