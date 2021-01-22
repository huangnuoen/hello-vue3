<template>
  <div class="ill-cover">
    <img :src="img" alt="" />
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang='less' scoped>
.ill-cover {
  width: 750px;
  height: 360px;
  img {
    width: 100%;
  }
}
</style>