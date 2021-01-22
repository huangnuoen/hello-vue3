<!-- 知识竞答 -->
<template>
  <div class="internet-ads">
    <div class="msg">
      <div class="title">
        <span>赢取最高<em>千元</em>大奖</span>
        <div class="btn">
          <span>去挑战</span>
          <van-icon class="icon" name="arrow" />
        </div>
      </div>
      <p>4月1日至10日 健康知识竞答等你挑战</p>
    </div>
    <img src="@/images/home/home_img_award.png"/>
  </div>
</template>
<script>
import { Icon } from 'vant'
export default {
  name: 'internet-ads',
  components: {
    [Icon.name]: Icon
  }
}
</script>
<style lang="less" scoped>
.internet-ads {
  background: #fff;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  .msg {
    margin-top: 38px;
    .title {
      display: flex;
      align-items: center;
      &>span {
        font-size:40px;
        font-family:@Semibold;
        font-weight:600;
        color:#404040;
        line-height:56px;
        em {
          color: #F84E03;
        }
      }
      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width:114px;
        height:40px;
        line-height: 40px;
        background:#FF4E00;
        color:#fff;
        border-radius:18px;
        margin-left: 12px;
        font-size:24px;
        transform: scale(0.9);
      }
    }
    &>p {
      font-size:26px;
      font-weight:400;
      color:#8c8c8c;
      line-height:40px;
    }
  }
  img {
    height: 176px;
    width: 176px;
  }
}
</style>
