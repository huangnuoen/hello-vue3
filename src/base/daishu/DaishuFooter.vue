<template>
  <!-- 带客服电话的袋鼠底部 -->
  <div class="daishu-footer">
    <p>本服务由{{ $brandConfig.companyName }}提供</p>
    <p>{{ PHONE_NUM }}</p>
  </div>
</template>
<script>
import { PHONE_NUM } from '@/config/common'
export default {
  name: 'daishu-footer',
  data() {
    return {
      PHONE_NUM
    }
  }
}
</script>
<style lang="less" scoped>
.daishu-footer {
  text-align: center;
  margin: 48px 0;
  p {
    font-size: 26px;
    color: @grey;
    line-height: 36px;
    margin-bottom: 8px;
  }
}
</style>
