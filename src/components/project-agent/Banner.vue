<template>
  <div class="banner-component">
    <div class="content">
      <div class="card">
        <div class="person-info">
          <div>
            <div class="img">
              <img src="" alt="" />
            </div>
            <div class="text">
              <p>邵雨婷</p>
              <p>您已成为袋鼠健康平台用户12天</p>
            </div>
          </div>
        </div>
        <div class="card-info">
          <p>No.0123456789</p>
          <p>有效期至 {{ homeData.end_day }}</p>
        </div>
      </div>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<style lang="less" scoped>
.banner-component {
  & > .content {
    width: 100%;
    margin-top: -2px;
    height: 672px;
    background-image: url('~@/images/project-agent/banner_bg.png');
    background-position: 0 -96px;
    background-size: cover;
    position: relative;
    .card {
      width: 686px;
      height: 360px;
      background-image: url('~@/images/project-agent/card_bg.png');
      background-size: cover;
      position: absolute;
      bottom: 0;
      left: 50%;
      margin-left: -343px;
      padding: 40px 32px;
      .person-info {
        height: 208px;
        & > div {
          display: flex;
          align-items: center;
          & > .img {
            width: 92px;
            height: 92px;
            border-radius: 50%;
            overflow: hidden;
            border: 4px solid rgba(250, 251, 255, 0.9);
            flex: 0 0 92px;
            margin-right: 16px;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          .text {
            p:nth-child(1) {
              font-size: 34px;
              font-weight: 600;
              color: #fafbff;
            }
            p:nth-child(2) {
              font-size: 24px;
              font-weight: 400;
              color: #fafbff;
            }
          }
        }
      }
      .card-info {
        p:nth-child(1) {
          font-size: 24px;
          font-weight: 400;
          color: #fafbff;
          line-height: 24px;
        }
        p:nth-child(2) {
          font-size: 24px;
          font-weight: 400;
          color: #fafbff;
          line-height: 24px;
          margin-top: 16px;
        }
      }
    }
  }
  .bottom {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 72px;
    background-image: url('~@/images/project-agent/img_smile.png');
    background-size: cover;
    margin-top: -25px;
  }
}
</style>

<script>
export default {
  props: {
    homeData: {
      default() {
        return {}
      }
    }
  }
}
</script>