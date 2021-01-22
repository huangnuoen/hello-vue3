<template>
  <!-- <van-dropdown-menu :active-color="variable.theme">
    <van-dropdown-item v-model="value2" :options="sortList" />
    <van-dropdown-item title="分类" ref="item"> -->
      <div class="opt-items">
        <div class="opt-item" @click="chooseClass(item)" :class="{active:+value===+item.value}"
          v-for="item in list">{{item.text}}
        </div>
      </div>
    <!-- </van-dropdown-item>
  </van-dropdown-menu> -->
</template>
<script>
import { DropdownMenu, DropdownItem, List } from 'vant'
import variable from '@/style/variable.less'

export default {
  props: {
    list: Array,
    value: [Number, String] // 当前选中项
  },
  components: {
    [List.name]: List,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem
  },
  data() {
    return {
      variable,
      // value2: 'a',
      sortList: [
        { text: '销量排序', value: 'c' }
      ]
    }
  },
  methods: {
    chooseClass(item) {
      // 多选
      // const i = this.value.indexOf(item.value)
      // const arr = [...this.value]
      // if (i > -1) {
      //   arr.splice(i, 1)
      // } else {
      //   arr.push(item.value)
      // }
      // 单选
      // const arr = [item.value]
      this.$emit('input', item.value)
      this.$emit('change', item.value)
    }
  }
}
</script>
<style lang="less" scoped>
.opt-items {
  padding: 32px 0px 0;
  margin: 0 30px;
  // border-top: 1px @border solid;
  .opt-item {
    display: inline-block;
    height: 80px;
    min-width: 156px;
    background: rgba(245, 245, 247, 1);
    border-radius: 12px;
    color: @black-m;
    font-size: 26px;
    padding: 22px 0;
    text-align: center;
    margin: 0 11px 22px;
    margin: 0 8px 22px;
    text-align: center;
    &.active {
      color: @theme;
    }
    &:nth-child(4n + 1) {
      margin-left: 0;
    }
    &:nth-child(4n) {
      margin-right: 0;
    }
  }
}
</style>
