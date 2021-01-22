<template>
  <div class="partner-card" v-show="isShow">
    <div class="svg-box" @click="link">
      <svg-icon iconClass="img_ent"></svg-icon>
      <p class="end-time">有效期至：2022年01月06日</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'partner-card',
  methods: {
    link() {
      this.$router.push('/project-agent')
    }
  },
  computed: {
    isShow() {
      return this.$store.state.agentCardInfo.homeShow === 1
    }
  }
}
</script>

<style lang="less" scoped>
.partner-card {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;

  .svg-box {
    position: relative;
    svg {
      width: 686px;
      height: 160px;
    }

    .end-time {
      position: absolute;
      left: 42px;
      bottom: 34px;
      white-space: nowrap;
      font-size: 24px;
      font-family: @Regular;
      color: #4b310d;
      line-height: 28px;
    }
  }
}
</style>