<!--
 * @Description: 
 * @Date: 2020-07-20 11:36:53
 * @LastEditors: gengzhong
 * @LastEditTime: 2020-12-18 18:07:13
-->
<template>
  <div class="userInfo_box" :class="{ userInfo_box_v2: !$brandConfig.showDaishu }">
    <companyUserProfile :userInfo="userInfo" />
    <div class="userAssets_box">
      <template v-if="userInfo.extra">
        <div v-if="$brandConfig.dmi" class="userAssetsItem_box" @click="linkTo('to_app/1?attach[to]=dmi')">
          <p class="nums">{{ userInfo.extra.dmi }}</p>
          <p class="names">D米</p>
        </div>
        <div v-if="$brandConfig.medicalCard" class="userAssetsItem_box" @click="linkTo('to_app/1?attach[to]=medical-card')">
          <p class="nums">{{ userInfo.extra.medical_card }}</p>
          <p class="names">卡包</p>
        </div>
        <div class="userAssetsItem_box">
          <p class="nums">{{ userInfo.point }}</p>
          <p class="names">积分</p>
        </div>
        <div class="userAssetsItem_box" @click="goCoupon">
          <p class="nums">{{ userInfo.extra.coupons }}</p>
          <p class="names">优惠券</p>
        </div>
      </template>
    </div>
    <div class="company_info" v-if="userInfo">
      <p>
        <i></i>
        <span>企业服务有效期：</span>
        <em>{{ userInfo.company.deadline_time }}</em>
        <svg-icon @click="showTips" icon-class="icon_help_v2"> </svg-icon>
      </p>
      <p v-if="userInfo.company.point">
        <i></i>
        <span>体检额度：</span>
        <em>{{ userInfo.company.point }}</em>
      </p>
      <p v-if="userInfo.company.family_point">
        <i></i>
        <span>家属额度：</span>
        <em>{{ userInfo.company.family_point }}</em>
      </p>
    </div>
    <img v-if="$brandConfig.goodDoctor" src="@/images/mine/mine_img_doctor.png" @click="$emit('linkDoctor')" class="mine_img_doctor" alt />
  </div>
</template>

<script>
import companyUserProfile from '@/components/mine/companyUserProfile'
import { jumpLink } from '@/utils/tool'
import { ENV } from '@/config/env.js'
import { CHANNEL } from '@/config/common.js'
export default {
  name: 'user-info',
  props: ['userInfo'],
  components: {
    companyUserProfile
  },
  // data() {
  //   return {
  //     daishuUrl,
  //     fuliUrl
  //   }
  // },
  methods: {
    linkTo(url) {
      if (ENV === 'dev') {
        jumpLink({ url: 'http://dev.daishu-component.com/' + window.pathname + url })
        return
      }

      jumpLink({ url: window.baseUrl + window.pathname + url })
    },
    // 增加优惠券判断
    goCoupon() {
      const channel = this.$store.state.channel
      console.log(channel, '优惠券链接')
      if (channel === CHANNEL) {
        this.linkTo('to_app/1?attach[to]=coupon&attach[to_param][get_param][channel]=004_01_0009_0001_01')
      } else {
        this.linkTo('to_app/1?attach[to]=coupon')
      }
    },

    // 团检提示
    showTips() {
      this.$dialog
        .confirm({
          message: this.userInfo.company.tips,
          confirmButtonText: '我知道了',
          showCancelButton: false,
          messageAlign: 'left'
        })
        .then(() => {})
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.userInfo_box {
  width: 100%;
  padding: 48px 30px 0 30px;
  height: 640px;
  // background: url('~@/images/mine/mine-userInfo-bg.png') center center / 100% 100% #fff;
  background: linear-gradient(180deg, #f5f6f7 0%, #f7f9fa 0%, #f7f9fa 71%, #e4e7eb 100%);
  .mine_img_doctor {
    margin-top: 31px;
    width: 690px;
    height: 92px;
    box-shadow: 0px -2px 16px 8px rgba(0, 0, 0, 0.04);
    border-radius: 24px 24px 0px 0px;
  }
}
.company_info {
  background-image: url('~@/images/mine/img_bg_comp2.png');
  background-size: cover;
  height: 188px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 32px;
  margin-top: 28px;
  p {
    display: flex;
    align-items: center;
    line-height: 50px;
    i {
      width: 8px;
      height: 8px;
      background-color: #73dcff;
      border-radius: 50%;
      margin-right: 16px;
    }
    span {
      font-size: 26px;
      font-weight: 400;
      color: #ffffff;
    }
    em {
      font-size: 26px;
      font-weight: 400;
      color: #ffffff;
    }
    svg {
      margin-left: 8px;
    }
  }
}
.userInfo_box_v2 {
  background: transparent;
  height: 350px;
}
.userAssets_box {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 48px;
  height: 88px;
  margin-top: 48px;
  .userAssetsItem_box {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: @black-d;

    .nums {
      font-size: 36px;
      font-weight: 500;
      margin-bottom: 4px;
    }

    .names {
      font-size: 24px;
    }
  }
}
</style>
