<template>
  <li class="group-item">
    <div class="group-head">
      <!-- <van-checkbox icon-size="18px" :checked-color="variable.theme" v-model="item.checked" @click="$emit('select')">
      </van-checkbox> -->
      <!-- 复现框 -->
      <BaseCheckbox :checked="checked" @change="change"></BaseCheckbox>
      <h2>{{item.supplier_name}}
      </h2>
    </div>
    <div class="group-main">
      <slot></slot>
    </div>
  </li>
</template>
<script>
import BaseCheckbox from '@/base/BaseCheckbox/BaseCheckbox'
import variable from '@/style/variable.less'
export default {
  components: { BaseCheckbox },
  props: {
    item: Object,
    chosen: Array
  },
  data() {
    return {}
  },
  methods: {
    // change(checked) {
    //   // 选择当前group
    //   // this.item.checked = checked
    //   this.$emit('select', { item: this.item, checked })
    // },
    change(val) {
      this.$emit('change', val)
      this.$emit('select', this.item, val)
    }
  },
  computed: {
    variable() {
      return variable
    },
    checked() {
      // return this.chosen.includes(this.item.id)
      const checked = this.item.products.every((goods) => {
        return this.chosen.includes(goods.id)
      })
      return checked
    }
  }
}
</script>
<style lang="less" scoped>
.group-item {
  background-color: #fff;
  padding-left: 30px;
  margin-bottom: 24px;
  border-radius: 16px;
  .group-head {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 27px 0 16px;
    .van-checkbox {
    }
    h2 {
      font-size: 32px;
      font-weight: 500;
      color: @black-d;
      padding-left: 16px;
      // height: 92px;
      // line-height: 92px;
      svg {
        font-size: 22px;
        vertical-align: baseline;
      }
    }
  }
}
</style>
