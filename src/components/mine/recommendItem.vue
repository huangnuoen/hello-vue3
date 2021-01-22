<template>
  <div class="internet-ads">
    <div class="msg">
      <div class="title">
        <span>
          赢取最高<em>千元</em>大奖
        </span>
        <div class="btn">
          <span>去挑战</span>
          <van-icon class="icon" name="arrow" />
        </div>
      </div>
      <p>4月1日至10日 健康知识竞答等你挑战</p>
    </div>
    <img src="@/images/home/home_img_award.png" />
  </div>
</template>
<script>
import { Icon } from 'vant'
export default {
  name: 'recommend-item',
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
      & > span {
        font-size: 40px;
        font-family: @Semibold;
        font-weight: bold;
        color: #404040;
        line-height: 56px;
        em {
          color: #f84e03;
        }
      }
      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 104px;
        height: 36px;
        background: #ff4e00;
        border-radius: 18px;
        font-size: 22px;
        color: #fff;
        margin-left: 12px;
      }
    }
    & > p {
      font-size: 26px;
      font-weight: 400;
      color: #8c8c8c;
      line-height: 40px;
    }
  }
  img {
    height: 176px;
    width: 176px;
  }
}
</style>
