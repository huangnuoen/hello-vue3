<template>
  <FormItem class="form-radio-grp">
    <!-- <div class="form-radio-grp form-item" @click="radio"> -->
    <div class="label"><em v-if="required">*</em>{{label}}</div>
    <div class="radio-grp value active">
      <span class="radio " v-for="(item,index) in option" :key="index">
        <BaseCheckbox :checked="+item.value===+curItem.value" @change="(val)=>change(val,item)">
          {{item.text}}</BaseCheckbox>
      </span>
    </div>
    <!-- </div> -->
  </FormItem>
</template>
<script>
import BaseCheckbox from '@/base/BaseCheckbox/BaseCheckbox'
import FormItem from './FormItem'
export default {
  name: 'form-radio-grp',
  components: { FormItem, BaseCheckbox },
  data() {
    return {
      curItem: {}
    }
  },
  props: {
    option: Array,
    required: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'label'
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      type: [String, Number],
      default: 0
    }
  },
  mounted() {},
  methods: {
    change(val, item) {
      this.curItem = item
      this.$emit('change', item)
    }
  },
  watch: {
    value(val) {
      // 优先取父级传入的值
      this.$set(this.curItem, 'value', val)
    }
  }
}
</script>
<style lang="less" scoped>
.form-radio-grp {
  // border-bottom: 2px solid #e8e8e9;
  .radio-grp {
    position: relative;
    width: 80%;
    text-align: right;
    color: @grey-l;
    font-size: inherit;
    display: flex;
    justify-content: flex-end;
    .radio {
      // white-space: nowrap;
      // display: flex;
      padding-left: 20px;
      // .base-checkbox{
      //   margin-left: 0;
      // }
    }
    &.active {
      color: @black-m;
    }
  }
  &:last-child {
    // border-bottom: none;
  }
  svg {
    color: #bfbfbf;
    font-size: 22px;
  }
  div {
    white-space: nowrap;
  }
}
</style>
