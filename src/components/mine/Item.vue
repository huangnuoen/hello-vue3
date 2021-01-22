<template>
  <div class="box" @click="linkTo">
    <div class="infoTip" v-if="item.isShow">3</div>
    <!-- <svg-icon :class="item.className" :iconClass="item.iconClass"></svg-icon> -->
    <van-icon :badge="item.total">
      <svg-icon :iconClass="item.iconClass"></svg-icon>
    </van-icon>
    <p>{{ item.text }}</p>
  </div>
</template>

<script>
import { Icon } from 'vant'
import { jumpLink } from '@/utils/tool'
import { ENV } from '@/config/env.js'
export default {
  name: 'item',
  components: {
    [Icon.name]: Icon
  },
  data() {
    return {}
  },
  props: {
    item: {
      type: Object,
      default: function () {
        return {
          iconClass: 'mine_order_1',
          text: '文字',
          className: 'link_icon1',
          itemLink: '/',
          isShow: false,
          mode: 0
        }
      }
    }
  },
  methods: {
    linkTo() {
      localStorage.setItem('orderTab', '')

      if (this.item.itemLink === '') {
        this.$toast('跳转地址暂未开放')
        return
      }

      switch (this.item.mode) {
        case 0:
          this.$router.push({ path: this.item.itemLink })
          break
        case 1:
          //本地开发的话就不能用window.baseUrl
          if (ENV === 'dev') {
            jumpLink({ url: 'http://dev.daishu-component.com/' + window.pathname + this.item.itemLink })
          } else {
            jumpLink({ url: window.baseUrl + window.pathname + this.item.itemLink })
          }
          break
        case 2:
          jumpLink({ url: window.internalHospitalUrl + this.item.itemLink })
          break
        case 3:
          this.agent()
          break
        default:
          console.log('what???')
      }

      // if (this.item.mode === 0) {
      //   this.$router.push({ path: this.item.itemLink })
      // } else if (this.item.mode === 2) {
      //   jumpLink({ url: window.internalHospitalUrl + this.item.itemLink })
      // } else {
      //   if (this.item.itemLink === '') {
      //     this.$toast('跳转地址暂未开放')
      //   } else {
      //     //本地开发的话就不能用window.baseUrl
      //     if (ENV === 'dev') {
      //       jumpLink({ url: 'http://dev.daishu-component.com/' + window.pathname + this.item.itemLink })
      //       return
      //     }
      //     jumpLink({ url: window.baseUrl + window.pathname + this.item.itemLink })
      //   }
      // }
    },

    //判断是否买了健康合伙人卡 是否激活
    agent() {
      const status = this.$store.state.agentCardInfo.centerPartnerStatus
      switch (status) {
        case 3:
          //跳转申请成为合伙人页面
          this.$router.push(`/partner?phone=${this.$store.state.agentCardInfo.phone}`)
          break
        case 4:
          //跳转到已经申请过的页面
          this.$router.push('/is-partner')
          break
        default:
          this.$toast('系统错误')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-width: 120px;
  position: relative;

  &:nth-child(n + 6) {
    margin-top: 40px;
  }

  .infoTip {
    position: absolute;
    top: -10px;
    right: 15px;
    width: 30px;
    height: 30px;
    background-color: @dot-red;
    color: #fff;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    font-size: 10px;
  }

  .link_icon1 {
    margin-bottom: 16px;
    width: 48px;
    height: 48px;
  }

  .link_icon2 {
    margin-bottom: 16px;
    width: 64px;
    height: 64px;
  }
  svg {
    margin-bottom: 16px;
    font-size: 48px;
  }
  p {
    color: @black-d;
    font-size: 24px;
  }
}
</style>
