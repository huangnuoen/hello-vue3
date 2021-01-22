<template>
  <van-popup :value="value" round position="bottom" closeable style="height: 60%;" @input="togglePopup">
    <PopupBottomWrap :title="title" @confirm="$emit('confirm')">
      <div class="report-list">
        <div class="report-item">
          <BaseCheckbox v-model="checked">
            <span>电子报告</span>
          </BaseCheckbox>
        </div>
        <div class="report-item">
          <BaseCheckbox v-model="checked">
            <span>电子报告</span>
          </BaseCheckbox>
        </div>
        <div class="tips">
          <svg-icon icon-class="order_pop_icon_point"></svg-icon>
          该机构支持报告快递，如有需要请在体检时联系机构工作人员
        </div>
      </div>
    </PopupBottomWrap>
  </van-popup>
</template>
<script>
import BaseCheckbox from '@/base/BaseCheckbox/BaseCheckbox'
import PopupBottomWrap from '@/components/order/PopupBottomWrap'
import { Popup } from 'vant'
export default {
  components: { BaseCheckbox, PopupBottomWrap, [Popup.name]: Popup },
  props: { title: String, value: Boolean },
  data() {
    return {
      checked: false
    }
  },
  methods: {
    togglePopup(val) {
      this.$emit('input', val)
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
.tips {
  border-top: 1px solid @border;
  color: @grey;
  font-size: 24px;
  padding-top: 28px;
  margin-top: 20px;
  svg {
    color: @theme;
    font-size: 32px;
  }
}
</style>
