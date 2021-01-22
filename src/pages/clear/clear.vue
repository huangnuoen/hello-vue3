<template>
  <div>2</div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  mounted() {
    localStorage.clear()
    sessionStorage.clear()
    location.href = `${baseUrl}/auth/test/clear`
  }
}
</script>
