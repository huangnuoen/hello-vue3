<template>
  <div class="footer-btn" :class="{'center':center}" @click="goThis($event)">
    <slot name="left"></slot>
    <slot></slot>
    <slot name="right"></slot>
  </div>
</template>

<script>
export default {
  name: 'footer-btn',
  props: {
    center: {
      type: Boolean,
      default: false
    },
    btnSession: Number
  },
  methods: {
    goThis(e) {
      if (this.btnSession === 1) {
        if (e.target.className === 'goTest' || e.target.className === 'btn-item rightBtn') {
          this.$router.push({ path: `/answer-page?id=${this.$route.query.id}` })
        } else if (e.target.className === 'btn-item leftBtn') {
          this.$router.push({ path: `/test-record?examId=${this.$route.query.id}` })
        }
      } else if (this.btnSession === 2) {
        if (e.target.className === 'btn-item rightBtn') {
          this.$router.push({ path: `/health-self-test` })
        } else if (e.target.className === 'btn-item leftBtn') {
          this.$router.push({ path: `/answer-page?id=${this.$route.query.examId}` })
        }
      } else if (this.btnSession === 3) {
        if (e.target.className === 'btn-item rightBtn') {
          this.$emit('define')
        } else if (e.target.className === 'btn-item leftBtn') {
          this.$emit('upper')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.footer-btn {
  width: 100%;
  position: fixed;
  z-index: 9999;
  bottom: 0;
  left: 0;
  width: 750px;
  height: 128px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;
  background-color: #fff;

  &.center {
    justify-content: center;
  }
}
</style>
