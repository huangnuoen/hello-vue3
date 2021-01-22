<template>
  <div class="login login-wrapper">
    <template v-if="!loading">
      <header>
        <img :src="$brandConfig.logo" class="logo" />
        <!-- <h1 v-if="isFamilyDoctor">袋鼠好医生</h1> -->
      </header>
      <form class="form">
        <div class="form-input">
          <!-- <i class="tel"></i> -->
          <input type="tel" maxlength="11" v-model="mobile_phone" @blur="blurHandle" placeholder="请输入11位手机号" />
        </div>
        <div class="form-input img-verity">
          <!-- <i class="code"></i> -->
          <input type="tel" @blur="blurHandle" v-model="picCode" placeholder="请输入图形验证码" maxlength="4" />
          <img :src="verifyImgUrl" @click="_getVerifyCode" class="picCode" />
        </div>
        <div class="form-input password">
          <!-- <i class="lock"></i> -->
          <input type="tel" @blur="blurHandle" v-model="code" maxlength="6" placeholder="请输入短信验证码" />
          <span class="msg" :class="{ gray: !canGetRandCode }" @click="_getRandCode">{{ canGetRandCode ? '获取验证码' : second + 's' }}</span>
        </div>
        <div class="form-btns">
          <div class="form-btn" :class="{ active: mobile_phone && code && agreed }" @click="submit">登录</div>
          <!-- 内部渠道才显示协议 -->
          <div class="agreement">
            <BaseCheckbox v-model="agreed">已阅读并同意</BaseCheckbox><em @click="$router.push('/login/agreement')">《用户协议》</em>与<em
              @click="$router.push('/login/privacy')"
              >《隐私保护政策》</em
            >
          </div>
        </div>
      </form>
    </template>
  </div>
</template>
<script>
import { phoneCheck } from '@/utils/verify'
import { resetScroll } from '@/utils/reset-scroll'
import { jumpLink } from '@/utils/tool'
import BaseCheckbox from '@/base/BaseCheckbox/BaseCheckbox'
export default {
  components: { BaseCheckbox },
  name: 'login-form',
  data() {
    return {
      picCode: '',
      verifyImgUrl: '',
      loading: false,
      mobile_phone: '',
      code: '',
      second: 60,
      canGetRandCode: true,
      agreed: false,
      key: ''
    }
  },
  mounted() {
    this._getVerifyCode()
  },
  methods: {
    blurHandle() {
      resetScroll()
    },
    _getRandCode() {
      if (this.getting) return
      if (!this.canGetRandCode) return
      if (!this.mobile_phone) {
        this.$toast('请输入手机号')
        return
      }
      if (!phoneCheck(this.mobile_phone)) {
        this.$toast('手机号不正确')
        return
      }
      // 图形码验证
      if (!this.picCode) {
        this.$toast('请输入图形验证码')
        return
      }
      this.getting = true
      this.$api.tool
        .verify_code({
          mobile_phone: this.mobile_phone,
          key: this.key,
          captcha: this.picCode
        })
        .then((res) => {
          if (res.code === 200) {
            // 开启倒计时
            this.canGetRandCode = false
            this.coundown()
            this.$toast('验证码已发送，请注意查收')
          } else {
            this.$toast('图形验证码错误，请重试')
          }
        })
        .finally(() => {
          this.getting = false
        })
    },
    coundown() {
      setTimeout(() => {
        if (this.second <= 0) {
          this.second = 60
          this.canGetRandCode = true
          return
        }
        this.second--
        this.coundown()
      }, 1000)
    },

    _getVerifyCode() {
      this.$api.tool.captcha().then((res) => {
        if (res.code === 200) {
          this.verifyImgUrl = res.data.img
          this.key = res.data.key
        }
      })
    },
    submit() {
      // 手机号
      if (!this.mobile_phone) {
        this.$toast('请输入手机号')
        return
      }
      if (!phoneCheck(this.mobile_phone)) {
        this.$toast('手机号不正确')
        return
      }
      if (!this.code) {
        this.$toast('请输入短信验证码')
        return
      }
      if (!this.agreed) {
        this.$toast('请先同意协议')
        return
      }
      this.register()
    },
    register() {
      if (this.registering) return
      this.registering = true
      this.$api.user
        .bind({
          mobile_phone: this.mobile_phone,
          code: this.code
        })
        .then((res) => {
          if (res.code === 200) {
            // 登录后重置某些信息
            this.$store.commit('user/CLEAR')
            // 如果后台有返回链接就直接跳转
            if (res.data.redirect) {
              window.location.href = res.data.redirect
              return
            }
            if (this.$route.query.redirect) {
              const url = decodeURIComponent(this.$route.query.redirect)
              jumpLink({ url, replace: true })
            } else {
              this.$router.replace('/')
            }
          } else {
            this.$toast(res.message)
          }
        })
        .finally(() => {
          this.registering = false
        })
    }
  }
}
</script>
<style lang="less" scoped>
.login-wrapper {
  text-align: center;
  background: url('@{images}/login/footer-bg.png') bottom center / contain no-repeat;
}
.login {
  height: 100%;
  background-color: #fff;
  header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 288px;
    // padding: 90px 0 65px;
    .logo {
      min-width: 278px;
      min-height: 88px;
      transform: scale(0.5);
      object-fit: contain;
    }
    h1 {
      color: @theme;
      font-size: 72px;
      background: transparent;
      font-weight: bold;
      letter-spacing: 6px;
      padding-top: 38px;
      line-height: 68px;
    }
  }
  .form {
    padding: 0 48px;
    text-align: left;
    .form-input {
      position: relative;
      display: flex;
      align-items: center;
      width: 654px;
      padding: 28px 0;
      padding-left: 22px;
      margin-bottom: 16px;
      border-bottom: 1px solid @border;
      input {
        font-size: 32px;
      }
      &.img-verity {
        .picCode {
          width: 180px;
          height: 80px;
          position: absolute;
          top: 8px;
          right: 20px;
          object-fit: contain;
          border: 1px solid @border;
          background-color: @bg;
        }
      }
      .msg {
        position: absolute;
        right: 0;
        width: 200px;
        // border-left: 1px solid @color-border;
        text-align: center;
        vertical-align: middle;
        color: @theme;
        font-size: 32px;
        &.gray {
          color: #ccc;
        }
      }
    }
    .form-btns {
      margin-top: 64px;
      text-align: center;
      .form-btn {
        font-size: 34px;
        font-weight: 500;
        width: 654px;
        // height: 80px;
        background: @linearBg;
        opacity: 0.4;
        border-radius: 40px;
        color: #fff;
        padding: 16px 0;
        &.active {
          opacity: 1;
        }
      }
      .agreement {
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        color: @grey;
        .base-checkbox {
          color: @grey;
          /deep/ .base-checkbox-icon {
            width: 24px;
            border-radius: 5px;
            height: 24px;
            color: transparent;
            // i {
            //   color: transparent;
            //   transform: translate(-2px, -12px);
            // }
            &.checked {
              background-color: #fff;
              border-color: @grey-l;
              color: @theme;
              svg {
                font-size: 44px;
                color: @theme;
                transform: scale(2) translate(2px, 0px);
              }
            }
          }
        }
        em {
          color: @theme;
        }
        padding-top: 16px;
      }
    }
  }
}
</style>
