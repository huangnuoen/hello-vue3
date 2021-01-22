<template>
  <van-popup :value="value" round position="bottom" closeable style="height: 60%;" @input="togglePopup">
    <PopupBottomWrap :title="title" @confirm="confirm">
      <div class="family-list">
        <div class="family-item" v-for="item in list" :key="item.id">
          <span>{{item.name}}</span>
          <span class="tag">{{item.remark}}</span>
          <span>{{item.age}}岁</span>
          <span>{{SEX_TYPE[item.sex]}}</span>
          <BaseCheckbox :checked="curItem.id===item.id" @change="(val)=>change(val,item)"></BaseCheckbox>
        </div>
      </div>
    </PopupBottomWrap>
  </van-popup>

</template>
<script>
import BaseCheckbox from '@/base/BaseCheckbox/BaseCheckbox'
import { Popup } from 'vant'
import PopupBottomWrap from '@/components/order/PopupBottomWrap'
import { SEX_TYPE, ID_TYPE } from '@/config/common'
export default {
  components: { BaseCheckbox, PopupBottomWrap, [Popup.name]: Popup },
  props: { title: String, value: Boolean, list: Array, active: Object },
  data() {
    return {
      SEX_TYPE,
      ID_TYPE,
      curItem: {}
    }
  },
  methods: {
    togglePopup(val) {
      this.$emit('input', val)
    },
    confirm() {
      this.$emit('confirm', this.curItem)
    },
    change(val, item) {
      if (this.curItem.id === item.id) {
        this.curItem = {}
      } else {
        this.curItem = item
      }
    }
  },
  computed: {}
}
</script>
<style lang="less" scoped>
.popup-bottom-wrap {
  background-color: #fff;
}
.family-list {
  .family-item {
    display: flex;
    align-items: center;
    height: 92px;
    padding: 0 30px;
    margin-bottom: 16px;
    &.disabled {
      span {
        color: @grey-l;
      }
    }
    span {
      font-size: 32px;
      color: @black-m;
      margin-right: 24px;
      &.tag {
        color: @theme;
        font-size: 22px;
        background: rgba(255, 171, 17, 0.1);
      }
    }
    .base-checkbox {
      position: absolute;
      right: 18px;
      color: #fff;
    }
  }
}
</style>
