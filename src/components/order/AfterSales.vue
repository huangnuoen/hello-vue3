<template>
  <van-popup :value="value" round position="bottom" closeable style="height: 60%;" @input="togglePopup">
    <PopupBottomWrap :title="title" @confirm="submit" btnText="提交">
      <van-radio-group v-model="result" max="5">
        <div class="content">
          <div class="item">
            <van-radio name="服务信息填写错误" checked-color="#FFAB11">服务信息填写错误</van-radio>
          </div>
          <div class="item">
            <van-radio name="服务未完成，申请全额退款" checked-color="#FFAB11">服务未完成，申请全额退款</van-radio>
          </div>
          <div class="item">
            <van-radio name="部分服务未完成，申请部分退款" checked-color="#FFAB11">部分服务未完成，申请部分退款</van-radio>
          </div>
          <div class="item">
            <van-radio name="服务项目与商品详情描述不符" checked-color="#FFAB11">服务项目与商品详情描述不符</van-radio>
          </div>
          <div class="item">
            <van-radio name="其他" checked-color="#FFAB11">其他</van-radio>
          </div>
        </div>
      </van-radio-group>
    </PopupBottomWrap>
  </van-popup>
</template>
<script>
import BaseCheckbox from '@/base/BaseCheckbox/BaseCheckbox'
import PopupBottomWrap from '@/components/order/PopupBottomWrap'
import { ActionSheet, Popup, Checkbox, CheckboxGroup, RadioGroup, Radio } from 'vant'
export default {
  components: {
    [ActionSheet.name]: ActionSheet,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    BaseCheckbox,
    PopupBottomWrap,
    [Popup.name]: Popup
  },
  props: { title: String, value: Boolean },
  data() {
    return {
      result: '',
      checked: false
    }
  },
  methods: {
    togglePopup(val) {
      this.$emit('input', val)
    },
    submit() {
      if (!this.result) {
        this.$toast('请选择原因')
        return
      }
      this.$dialog
        .confirm({
          message: '确定申请售后吗？',
          confirmButtonText: '确定',
          cancelButtonText: '再想想'
        })
        .then(() => {
          const data = {
            sub_order_no: this.$route.query.order_no,
            refund_reason: this.result
          }
          this.$emit('confirm', data)
          this.togglePopup(false)
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="less" scoped>
.popup-bottom-wrap {
  background-color: #fff;
}
.report-list {
  padding: 0 48px;
  .report-item {
    display: flex;
    align-items: center;
    height: 92px;
    &.disabled {
      span {
        color: @grey-l;
      }
    }
    span {
      font-size: 32px;
      color: @black-m;
      margin-right: 24px;
    }
    .base-checkbox {
      color: #fff;
    }
  }
}
.content {
  width: 100%;
  padding-bottom: 30px;

  > .item {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 48px;
    font-family: @Regular;
  }

  > .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80px;
    margin-top: 80px;

    .comfire {
      width: 642px;
      height: 80px;
      background: @theme;
      border-radius: 40px;
      text-align: center;
      line-height: 80px;
      color: #fff;
      font-size: 28px;
    }
  }
}

.van-action-sheet__header {
  font-weight: 500;
  color: #262626;
  font-size: 32px;
  font-family: @Medium;
  height: 120px;

  display: flex;
  align-items: center;
  justify-content: center;

  .van-action-sheet__close {
    top: 18px;
  }
}
</style>
