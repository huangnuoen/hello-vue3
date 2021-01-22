<template>
  <div class="partner">
    <div class="top">
      <p class="title">申请成为健康合伙人</p>
    </div>

    <div class="text-content">
      全国首个分享经济模式体检平台，独创健康经纪人理念，以向广大用户推出体检服务与互联网医院服务相结合的一体式健康卡产品，将大健康行业入口推向每一位用户，打造全民合伙人、全民创富时代。
    </div>

    <div class="form-box">
      <van-field v-model="form.name" label="真实姓名" clearable placeholder="请输入真实姓名" maxlength="20" />
      <van-field v-model="form.cardId" label="身份证号" clearable placeholder="请输入身份证号" maxlength="18" />
      <van-field v-model="form.phone" label="手机号" readonly clearable placeholder="请输入手机号" maxlength="11" />
      <van-field v-model="form.code" center clearable label="验证码" placeholder="请输入验证码" maxlength="6">
        <template #button>
          <p :class="{ 'get-code': times === 60 }" @click="sendSms">{{ getCode }}</p>
        </template>
      </van-field>
      <van-field
        v-model="selectCity.area_name"
        readonly
        label="城市"
        right-icon="arrow"
        placeholder="请选择城市"
        @click="$router.push('city-list')"
      />
    </div>

    <div class="commit-btn" @click="commit">确认申请</div>
  </div>
</template>

<script>
import { Icon, Field } from 'vant'
import { IdCardCheck, phoneCheck } from '@/utils/verify'
import { isMobile } from '@/utils/tool'

export default {
  name: 'partner',
  components: {
    [Icon.name]: Icon,
    [Field.name]: Field
  },
  data() {
    return {
      getCode: '获取验证码',
      times: 60,
      canGet: true,
      canCommit: true,
      form: {
        name: '',
        cardId: '',
        phone: '',
        code: '',
        city: ''
      }
    }
  },
  computed: {
    selectCity() {
      return this.$store.state.partnerCity
    }
  },
  // activated() {
  //   console.log(1)
  // },
  created() {
    this.form.phone = this.$route.query.phone
  },
  methods: {
    commit() {
      if (!this.canCommit) return

      // 姓名验证
      const nameRegExp = /[^a-zA-Z\u4e00-\u9fa5]/g
      if (this.form.name.trim() === '' || nameRegExp.test(this.form.name.trim())) {
        this.$toast('请输正确输入姓名')
        return
      }

      const testCardIdResult = IdCardCheck(this.form.cardId)
      if (typeof testCardIdResult === 'string') {
        this.$toast(testCardIdResult)
        return
      }

      // if (this.form.phone.trim() === '' || !phoneCheck(this.form.phone)) {
      //   this.$toast('请输入正确的手机号码')
      //   return
      // }

      if (!this.form.code.trim()) {
        this.$toast('请输入验证码')
        return
      }

      this.canCommit = false
      this.$api.user
        .agent_apply_partner({
          name: this.form.name,
          identity_card: this.form.cardId,
          verify_code: this.form.code,
          city_id: this.selectCity.id
        })
        .then((res) => {
          if (res.code === 200) {
            this.$router.replace('/is-partner')
          } else {
            this.$toast(res.message)
          }

          this.canCommit = true
        })
    },
    sendSms() {
      if (!this.canGet || this.times !== 60) return

      this.canGet = false
      this.$api.user.agent_send_msg().then((res) => {
        if (res.code === 200) {
          this.$toast(res.message)

          this.canGet = true
          this.timeDown()
        }
      })
    },
    timeDown() {
      this.times--
      this.getCode = `剩余${this.times}s`

      const timer = setInterval(() => {
        if (this.times <= 0) {
          this.times = 60
          this.getCode = '获取验证码'
          clearInterval(timer)
          return
        }

        this.times--
        this.getCode = `剩余${this.times}s`
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.partner {
  min-height: calc(100vh - 82px);
  background-color: #fff;
  width: 100%;

  padding-bottom: 128px;

  .top {
    padding: 24px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    .title {
      font-size: 40px;
      font-family: @Semibold;
      font-weight: 600;
      color: #3d3e40;
      line-height: 56px;
    }
  }

  .text-content {
    font-size: 30px;
    font-family: @Regular;
    color: #85898c;
    line-height: 48px;
    padding: 0px 56px;
    margin-bottom: 24px;
  }

  .form-box {
    padding: 0 56px;
    position: relative;
    &::after {
      content: ' ';
      width: calc(100% - 112px);
      height: 1px;
      background-color: #ebedf0;
      position: absolute;
      left: 50%;
      bottom: 0px;
      transform: translateX(-50%);
      opacity: 0.5;
    }

    /deep/ .van-cell.van-field {
      padding: 30px 0px;

      &:not(:last-child)::after {
        left: 0px;
      }

      .van-cell__title.van-field__label,
      .van-cell__value.van-field__value {
        span {
          font-size: 30px;
          font-family: @Regular;
          font-weight: 400;
          color: #3d3e40;
          line-height: 32px;
        }

        .van-field__body {
          input {
            font-size: 30px;
            font-family: @Regular;
            font-weight: 400;
            color: #3d3e40;
            line-height: 32px;
          }

          .van-field__button {
            p {
              color: #b6babf;
              &.get-code {
                color: @theme;
              }
            }
          }
        }
      }
    }
  }

  .commit-btn {
    width: 642px;
    height: 88px;
    background: #ffab11;
    border-radius: 44px;
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);

    font-size: 34px;
    font-family: @Medium;
    font-weight: 500;
    color: #ffffff;
    line-height: 88px;
    text-align: center;
  }
}
</style>