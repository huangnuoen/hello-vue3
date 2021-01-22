<template>
  <div class="tips-login" v-show="!authStatus">
    <p>登录开启健康生活~</p>
    <div class="btn" @click="goLogin">去登录</div>
  </div>
</template>

<script>
import { authNeed } from '@/utils/auth'

export default {
  name: 'tips-login',
  methods: {
    goLogin() {
      authNeed()
    }
  },
  computed: {
    authStatus() {
      return this.$store.state.user.authStatus
    }
  }
}
</script>

<style lang="less" scoped>
.tips-login {
  width: 686px;
  height: 96px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 48px;

  position: fixed;
  bottom: 132px;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 52px;

  > .btn {
    width: 128px;
    height: 56px;
    background: #ffab11;
    border-radius: 28px;
    text-align: center;
    line-height: 56px;

    font-size: 24px;
    font-family: @Medium;
    font-weight: 500;
    color: #ffffff;
  }

  > p {
    font-size: 28px;
    font-family: @Regular;
    color: #ffffff;
  }
}
</style>