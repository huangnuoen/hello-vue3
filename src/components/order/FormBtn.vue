<template>
  <FormItem class="form-btn">
    <div class="label"><em v-if="required">*</em>{{label}}</div>
    <button class="btn value" @click="select">{{placeholder}}</button>
  </FormItem>
</template>
<script>
import FormItem from './FormItem'
export default {
  name: 'form-btn',
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
      type: [String, Number],
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
.form-btn {
  // border-bottom: 2px solid #e8e8e9;
  .btn {
    position: relative;
    text-align: right;
    color: #fff;
    font-size: inherit;
    padding: 0 16px;
    // border: 1px solid @border;
    border-radius: 26px;
    height: 52px;
    text-align: center;
    width: auto;
    background-color: @theme;
  }
  &:last-child {
    // border-bottom: none;
  }
  svg {
    color: #bfbfbf;
    font-size: 22px;
  }
}
</style>
