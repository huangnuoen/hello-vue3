<template>
  <FormItem class="form-select">
    <!-- <div class="form-select form-item" @click="select"> -->
    <div class="label"><em v-if="required">*</em>{{label}}</div>
    <div class="select value" @click="select" :class="{'active':value}">{{value||placeholder}}</div>
    <div>
      <slot></slot>
    </div>
    <svg-icon icon-class="order_icon_arrow1"></svg-icon>
    <!-- </div> -->
  </FormItem>
</template>
<script>
import FormItem from './FormItem'
export default {
  name: 'form-select',
  components: { FormItem },
  props: {
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
      type: [String, Number, Date],
      default: 0
    }
  },
  methods: {
    select() {
      this.$emit('select')
    }
  }
}
</script>
<style lang="less" scoped>
.form-select {
  // border-bottom: 2px solid #e8e8e9;
  .select {
    position: relative;
    width: 80%;
    text-align: right;
    color: @grey-l;
    font-size: inherit;
    padding-right: 16px;
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
  div{
    white-space: nowrap;
  }
}
</style>
