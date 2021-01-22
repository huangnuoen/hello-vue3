<template>
  <div class="invoice-section">
    <!--已有发票-->
    <div class="have-invoice" v-if="have">
      <div class="item">
        <p>发票类型</p>
        <p>电子发票</p>
      </div>
      <div class="item">
        <p>发票抬头</p>
        <p>个人</p>
      </div>
      <div class="item">
        <p>发票内容</p>
        <p>体检服务</p>
      </div>
    </div>

    <!--申请发票-->
    <div class="apply-invoice" v-else>
      <div class="top">
        <p class="title">发票信息</p>
        <div class="right">
          <p>开取电子发票</p>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="bottom">服务完成后仍支持免费补开发票</div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant'

export default {
  name: 'invoice-section',
  components: {
    [Icon.name]: Icon
  },
  data() {
    return {
      have:false
    }
  }
}
</script>

<style lang="less" scoped>
.invoice-section {
  margin-top: 20px;
  width: 100%;
  background-color: #fff;
  padding: 30px;
  font-size: 26px;
  font-family: @Regular;
  color: @black-m;

  > .apply-invoice,
  .have-invoice {
    width: 690px;

    .item{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;

      &:last-child{
        margin-bottom: 0px;
      }
    }

    > .top {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title {
        font-size: 28px;
        font-weight: 500;
      }

      .right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 28px;
      }
    }

    > .bottom {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 24px;
      margin-top: 18px;
      padding-right: 28px;
    }
  }
}
</style>
