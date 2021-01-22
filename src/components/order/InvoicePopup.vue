<template>
  <van-popup :value="value" round position="bottom" closeable style="height: 90%" @input="togglePopup">
    <PopupBottomWrap :title="title" @confirm="confirm">
      <div class="invoice">
        <section>
          <h3>发票类型</h3>
          <div class="invoice-radio-grp" @click="needInvoice = !needInvoice">
            <div class="invoice-radio" :class="{ active: !needInvoice }">不开发票</div>
            <div class="invoice-radio" :class="{ active: needInvoice }">电子发票</div>
          </div>
          <div class="instr">
            为响应环保，{{ $brandConfig.companyName }}全面启用电子普通发票。在{{
              $brandConfig.companyName
            }}平台预约的体检，杭州地区由<em>杭州袋鼠健康管理有限公司</em>开具，其余地区由<em>讯康信息技术（深圳）有限公司</em>开具，不开具医院发票。
          </div>
        </section>
        <template v-if="needInvoice">
          <section>
            <h3>发票抬头</h3>
            <div class="invoice-radio-grp">
              <div class="invoice-radio">个人</div>
              <div class="invoice-radio">单位</div>
            </div>
            <FormInput label="单位名称" placeholder="请填写单位名称" inputAlign="left"></FormInput>
            <FormInput label="纳税人识别号" placeholder="请填写纳税人识别号/统一社会信用代码" inputAlign="left"></FormInput>
            <FormInput label="收票人邮箱" placeholder="请填写收票人邮箱" inputAlign="left"></FormInput>
          </section>
          <section>
            <h3>发票内容</h3>
            <div class="invoice-radio-grp">
              <div class="invoice-radio active">体检服务</div>
              <div class="invoice-radio">健康信息咨询服务</div>
            </div>
          </section>
        </template>
      </div>
      <div class="tips">确认发票信息后将会直接进入开票流程，不可修改，请认真填写</div>
    </PopupBottomWrap>
  </van-popup>
</template>
<script>
import PopupBottomWrap from '@/components/order/PopupBottomWrap'
import FormInput from '@/components/order/FormInput'

import { Popup } from 'vant'
export default {
  components: { PopupBottomWrap, [Popup.name]: Popup, FormInput },
  props: { title: String, value: Boolean },
  data() {
    return {
      needInvoice: false,
      invoiceOpt: [
        {
          text: '不开发票'
        },
        {
          text: '电子发票'
        }
      ]
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
@import '~@/style/mixin.less';
.popup-bottom-wrap {
  background-color: #fff;
  // position: relative;
}
.invoice {
  padding: 0 30px 64px;
  section {
    padding: 32px 0;
    border-bottom: 1px solid @border;
    &:last-child {
      border-bottom: none;
    }
    h3 {
      color: @black-d;
      font-size: 32px;
    }
    .invoice-radio-grp {
      display: flex;
      margin: 28px 0;
      .invoice-radio {
        margin-right: 32px;
        min-width: 152px;
        text-align: center;
        padding: 10px 28px;
        background: #f2f2f2;
        color: @black-m;
        border-radius: 28px;
        font-size: 26px;
        cursor: pointer;
        &.active {
          color: #fff;
          background-color: @theme;
        }
      }
    }
    .form-item {
      margin: 40px 0 0;
      padding: 0;
      font-size: 26px;
      /deep/ .label {
        font-weight: 500;
      }
    }
    .instr {
      color: @black-l;
      font-size: 24px;
      em {
        color: @theme;
      }
    }
  }
}
.tips {
  position: fixed;
  margin-top: auto;
  bottom: 120px;
  padding: 15px 0;
  width: 100%;
  color: @red;
  font-size: 22px;
  text-align: center;
  .safe-bottom(120px);

  background: rgba(255, 241, 240, 1);
}
</style>
