<template>
  <div class="pay-suc">
    <div class="pay-suc-status">
      <img src="../../images/pay/img_payment.png" alt="">
      <div class="text">支付成功</div>
      <!-- <div class="tips">您可以在订单详情页查看与填写预约信息</div> -->
      <div class="tips">感谢您的购买</div>
      <div class="btns">
        <button @click="toHome">回到首页</button>
        <button class="hl" @click="toOrder">查看订单</button>
      </div>
    </div>
    <!-- <HeartTitle title="为您推荐"></HeartTitle>
    <img class="banner" src="../../images/default-banner.png" alt=""> -->
  </div>
</template>
<script>
import HeartTitle from '@/base/HeartTitle/HeartTitle'
export default {
  components: {
    HeartTitle
  },
  methods: {
    toHome() {
      this.$router.push('/')
    },
    toOrder() {
      this.$router.push({
        name: 'order-list'
      })
    }
  }
}
</script>
<style lang="less" scoped>
.pay-suc {
  flex: 1;
  background-color: #fff;
  &-status {
    padding: 40px 0 120px;
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    img {
      width: 250px;
      margin: 0 auto;
      height: 250px;
    }
    .text {
      font-size: 36px;
      padding: 8px 0 24px;
      color: @orange;
    }
    .tips {
      font-size: 26px;
      color: @grey;
    }
    .btns {
      padding-top: 96px;
      padding: 96px 66px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      button {
        font-size: 28px;
        width: 288px;
        height: 80px;
        border-radius: 40px;
        border: 2px solid;
        color: @orange;
        &.hl {
          color: #fff;
          .linearOrange();
        }
      }
    }
  }
  .banner {
    width: 100%;
    height: 192px;
    margin-top: 52px;
  }
}
</style>
