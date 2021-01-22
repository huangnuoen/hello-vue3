<template>
  <van-popup :value="value" round position="bottom" style="height: 50%;" @input="togglePopup">
    <van-picker title="选择证件类型" default-index=0 show-toolbar :columns="columns" value-key="text" @confirm="onConfirm"
      @cancel="onCancel" />
  </van-popup>
</template>
<script>
import { Popup, Picker } from 'vant'
import { ID_TYPE_ARR } from '@/config/common'

export default {
  components: { [Picker.name]: Picker, [Popup.name]: Popup },
  props: { title: String, value: Boolean },
  data() {
    return {
      columns: ID_TYPE_ARR
    }
  },
  mounted() {

  },
  methods: {
    onConfirm(val) {
      this.togglePopup(false)
      this.$emit('confirm', val)
    },
    onCancel() {
      this.togglePopup(false)
    },
    togglePopup(val) {
      this.$emit('input', val)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
