<template>
  <div class="login-index">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: 'login-index'
}
</script>
<style lang="less" scoped>
.login-index {
  flex: 1;
}
</style>
