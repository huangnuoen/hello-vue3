<template>
  <van-popup :value="value" round position="bottom" closeable style="height: 60%;" @input="togglePopup">
    <PopupBottomWrap :title="title" @confirm="confirm">
      <div class="list">
        <div class="item" v-for="item in list" :key="item">
          <BaseCheckbox :checked="curItem===item" @change="(val)=>change(val,item)"><span>{{item}}</span></BaseCheckbox>
        </div>
        <div class="tips">
          <svg-icon icon-class="order_pop_icon_point"></svg-icon>
          现在开药需上传处方凭证
        </div>
      </div>

    </PopupBottomWrap>
  </van-popup>
</template>
<script>
import PopupBottomWrap from '@/components/order/PopupBottomWrap'
import { Popup } from 'vant'
export default {
  components: { PopupBottomWrap, [Popup.name]: Popup },
  props: {
    title: String,
    value: {
      type: Boolean
    },
    list: Array
  },
  data() {
    return {
      curItem: ''
    }
  },
  methods: {
    change(val, item) {
      this.curItem = item
    },

    togglePopup(val) {
      this.$emit('input', val)
    },
    confirm() {
      if (this.curItem) {
        this.$emit('confirm', this.curItem)
      } else {
        this.$toast('请先选择')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.popup-bottom-wrap {
  background-color: #fff;
}
.list {
  padding: 0 48px;

  .item {
    padding: 24px 0;
    font-size: 32px;
    color: @black-m;
    .base-checkbox {
      justify-content: flex-start;
    }
  }
}
.tips {
  border-top: 1px solid @border;
  color: @grey;
  font-size: 24px;
  padding-top: 28px;
  margin-top: 20px;
  svg{
    color: #D9D9D9;
    font-size: 32px;
  }
}
</style>
