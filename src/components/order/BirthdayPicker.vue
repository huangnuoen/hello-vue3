<template>
  <van-popup :value="value" round position="bottom" style="height: 50%;" @input="togglePopup">
    <van-datetime-picker v-model="birthday" type="date" title="选择出生日期" :min-date="minBirthDate"
      :max-date="maxBirthDate" @confirm="onConfirm" />
  </van-popup>
</template>
<script>
import { Popup, DatetimePicker } from 'vant'

export default {
  components: { [DatetimePicker.name]: DatetimePicker, [Popup.name]: Popup },
  props: { title: String, value: Boolean },
  data() {
    return {
      minBirthDate: new Date('1900/01/01'),
      maxBirthDate: new Date(),
      birthday: ''
    }
  },
  mounted() {},
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
