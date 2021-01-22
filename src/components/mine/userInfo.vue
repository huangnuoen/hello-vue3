<!--
 * @Description: 
 * @Date: 2020-07-20 11:36:53
 * @LastEditors: gengzhong
 * @LastEditTime: 2020-12-18 18:07:13
-->
<template>
  <div class="userInfo_box" :class="{ userInfo_box_v2: !$brandConfig.showDaishu }">
    <userProfile :userInfo="userInfo" />

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

    <img v-if="$brandConfig.goodDoctor" src="@/images/mine/mine_img_doctor.png" @click="$emit('linkDoctor')" class="mine_img_doctor" alt />
  </div>
</template>

<script>
import userProfile from '@/components/mine/userProfile'
import { jumpLink } from '@/utils/tool'
import { ENV } from '@/config/env.js'
import { CHANNEL } from '@/config/common.js'
export default {
  name: 'user-info',
  props: ['userInfo'],
  components: {
    userProfile
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
    }
  }
}
</script>

<style lang="less" scoped>
.userInfo_box {
  width: 100%;
  padding: 48px 30px 0 30px;
  background: url('~@/images/mine/mine-userInfo-bg.png') center center / 100% 100% #fff;
  height: 420px;

  .mine_img_doctor {
    margin-top: 31px;
    width: 690px;
    height: 92px;
    box-shadow: 0px -2px 16px 8px rgba(0, 0, 0, 0.04);
    border-radius: 24px 24px 0px 0px;
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
