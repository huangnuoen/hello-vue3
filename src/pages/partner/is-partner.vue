<template>
  <div class="is-partner">
    <main>
      <img src="@/images/is-partner/img_done@2x.png" alt="" class="top-img" />
      <p class="success">申请成功！</p>
      <p class="tips">快去健康合伙人APP分享体检卡吧！</p>

      <div class="content">
        <div class="content-title">
          <img src="@/images/is-partner/img_point@2x.png" alt="" />
          <p>APP下载方法</p>
          <img src="@/images/is-partner/img_point copy@2x.png" alt="" />
        </div>

        <div class="txt">
          <p>方法一：在应用商店搜索“健康合伙人”下载</p>
          <p>方法二：Andorid系统手机用户可直接点击下方按钮下载</p>
        </div>

        <div class="down-btn" @click="downApp">下载APP</div>

        <div class="return" @click="$router.back()">返回上一页</div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'is-partner',
  methods: {
    downApp() {}
  }
}
</script>

<style lang="less" scoped>
.is-partner {
  width: 100%;
  min-height: calc(100vh - 82px);
  background-color: #ff8547;
  

  main {
    background: url('~@/images/is-partner/img_bg@2x.png') center top / 100% 100% no-repeat;
    padding-bottom: 262px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    .top-img {
      width: 320px;
      width: 320px;
      margin-top: 48px;
    }

    .success {
      font-size: 48px;
      font-family: @Semibold;
      font-weight: 600;
      color: #ffffff;
      line-height: 48px;
      margin-top: 5px;
    }

    .tips {
      font-size: 30px;
      font-family: @Regular;
      color: #ffffff;
      line-height: 48px;
      margin-top: 16px;
    }
    .content {
      margin-top: 48px;
      width: calc(100vw - 80px);
      background: #ffffff;
      border-radius: 24px;
      opacity: 0.95;
      padding: 48px 48px 88px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: column;

      .content-title {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 22px;
        > p {
          font-size: 36px;
          font-family: @Semibold;
          font-weight: 600;
          color: #fe7233;
          line-height: 48px;
          margin: 0 20px;
        }

        img {
          width: 28px;
          height: 24px;
        }
      }

      .txt {
        font-size: 30px;
        font-family: @Regular;
        color: #85898c;
        line-height: 52px;
        margin-bottom: 128px;
      }

      .down-btn {
        width: 574px;
        height: 88px;
        background: linear-gradient(135deg, #ff8000 0%, #fa5300 100%);
        border-radius: 44px;
        font-size: 34px;
        font-family: @Medium;
        font-weight: 500;
        color: #ffffff;
        line-height: 88px;
        text-align: center;
        margin-bottom: 32px;
      }

      .return {
        font-size: 30px;
        font-family: @Regular;
        color: #85898c;
        line-height: 48px;
      }
    }
  }
}
</style>