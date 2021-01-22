<template>
  <van-popup :value="value" round position="bottom" duration=0 closeable style="height: 80%;" @input="togglePopup" @close="$emit('close')">
    <PopupBottomWrap :title="title" @confirm="confirm">
      <div class="back" @click="$emit('back')">
        <svg-icon icon-class="global_icon_back"></svg-icon>
      </div>
      <div class="times">
        <div class="time-item" :class="{active:selected.text === item.text}" v-for="item in list" @click="select(item)">
          08:30-09:00</div>
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
    list: {
      type: Array,
      default: () => [{ text: '23421' }, { text: '2324' }, { text: '2314' }, { text: '55234' }, { text: '2212234' }]
    }
  },
  data() {
    return {
      selected: {}
    }
  },
  methods: {
    togglePopup(val) {
      this.$emit('input', val)
    },
    select(item) {
      this.selected = item
    },
    confirm() {
      if (this.selected.text) {
        this.$emit('confirm', this.selected)
      } else {
        this.$toast('请选择时间段')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.popup-bottom-wrap {
  background-color: #fff;
  position: relative;
  .back {
    display: inline-block;
    position: absolute;
    top: 30px;
    left: 30px;
    font-size: 34px;
    z-index: 10;
    svg {
      color: @grey-l;
    }
  }
}
.times {
  padding: 48px 30px;
  .time-item {
    display: inline-block;
    font-size: 26px;
    color: @black-m;
    padding: 10px 16px;
    text-align: center;
    border-radius: 28px;
    background-color: #f2f2f2;
    border: 1px solid transparent;
    margin-right: 24px;
    width: 212px;
    margin-bottom: 24px;
    cursor: pointer;
    &:nth-child(3n) {
      margin-right: 0;
    }
    &.disabled {
      opacity: 0.3;
    }
    &.active {
      color: @theme;
      border-color: @theme;
      background-color: rgba(255, 171, 17, 0.1);
    }
  }
}
</style>
