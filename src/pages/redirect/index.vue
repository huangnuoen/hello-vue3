<template>
  <!-- 中转空白页 用于重新加载 -->
  <div></div>
</template>
<script>
export default {
  // 跳回原来页面
  beforeRouteEnter (to, from, next) {
    const fullPath = to.params.path
    const query = to.query
    next(vm => {
      vm.$router.replace({ path: '/' + fullPath, query })
    })
  }
}
</script>
