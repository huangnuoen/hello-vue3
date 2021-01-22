<template>
  <FormItem class="form-input">
    <div class="label" :style="{flexBasis: labelWidth}"><em v-if="required">*</em>{{label}}</div>
    <input :type="type" :placeholder="placeholder" :value="value" @input="input" @blur="blur" @focus="focus"
      :maxlength="maxlength" :style="{textAlign:inputAlign}">
  </FormItem>
</template>
<script>
import FormItem from './FormItem'
import { resetScroll } from '@/utils/reset-scroll'
export default {
  components: { FormItem },
  model: {
    event: 'input',
    prop: 'value'
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
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
      default: '占位符'
    },
    value: {
      type: String
    },
    maxlength: {
      type: [String, Number],
      default: -1
    },
    inputAlign: String,
    labelWidth: String
  },
  methods: {
    input(e) {
      this.$emit('input', e.target.value)
    },
    blur(e) {
      this.$emit('blur', e.target.value)
      resetScroll()
    },
    focus() {
      this.$emit('focus')
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/style/mixin.less';
.form-input {
  input {
    flex:1;
    .placeholder(@grey-l);
    text-align: right;
    font-size: inherit;
    text-align: right;
    padding-right: 30px;
  }
  &:last-child {
    // border-bottom: none;
  }
}
</style>
