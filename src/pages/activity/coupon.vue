<template>
  <div class="get-coupon">
    <div class="content">
      <div class="list">
        <div class="coupon-item" v-for="item in coupons">
          <div class="left">
            &yen;
            <em>{{item.used_amount | G_formatPrice(false)}}</em>
          </div>
          <div class="right">
            <div class="title">{{item.title}}</div>
            <div class="tips">
              <p>{{item.desc|| '-'}}</p>
              <p>{{item.time_desc}}</p>
            </div>
          </div>
        </div>

      </div>
      <button @click="receive">
        <img src="@/images/activity/coupon/btn.png" alt="">
      </button>
    </div>
  </div>
</template>
<script>
import { jumpLink } from '@/utils/tool'
export default {
  data() {
    return {
      coupons: []
    }
  },
  mounted() {
    this.$api.coupon.list({ act_id: this.$route.query.act_id }).then((res) => {
      if (res.code === 200) {
        this.coupons = res.data.list
      }
    })
  },
  methods: {
    async receive() {
      this.$toast.loading({ message: '正在领取...' })
      const res = await this.$api.coupon.get(this.$route.query.act_id)
      this.$toast.clear()
      if (res.code === 200) {
        this.$toast({ message: '领取成功' })
        jumpLink({ url: res.data.redirectUrl })
      } else {
        this.$toast(res.message)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.get-coupon {
  min-height: 2041px;
  background: url('@{images}/activity/coupon/big-bg.png') top / cover no-repeat;
  padding-top: 510px;
  .content {
    font-family: PingFang SC;
    width: 100%;
    height: 1084px;
    background: url('@{images}/activity/coupon/popup-bg.png') top / cover no-repeat;
    padding: 142px 103px 142px;
    text-align: center;
    .list {
      overflow: scroll;
      height: 850px;
      .coupon-item {
        height: 160px;
        background: url('@{images}/activity/coupon/bg.png') top / cover no-repeat;
        width: 544px;
        margin-bottom: 11px;
        display: flex;
        align-items: center;
        .left {
          flex: 0 0 174px;
          text-shadow: 0px 2px 6px rgba(242, 78, 51, 0.34);
          color: #ffffff;
          line-height: 16px;
          font-size: 20px;
          em {
            font-size: 60px;
            font-weight: 600;
          }
        }
        .right {
          text-align: center;
          align-self: flex-start;
          flex: 1;
          margin-top: 40px;
          .title {
            font-size: 28px;
            font-weight: 600;
            color: #792c09;
            line-height: 16px;
          }
          .tips {
            padding-top: 20px;
            p {
              font-size: 20px;
              font-weight: 400;
              color: #624040;
            }
          }
        }
      }
    }
    button {
      margin-top: 20px;
      img {
        width: 480px;
        height: 92px;
      }
    }
  }
}
</style>
