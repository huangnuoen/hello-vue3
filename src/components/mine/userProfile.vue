<template>
  <div class="userProfile_box">
    <img :src="userInfo.avatar" class="user_profile" alt />
    <div class="userName_box">
      <p class="userName">{{userInfo.nickname}}</p>
      <div class="user_flag" v-if="false">
        <div class="flag_item one">
          <svg-icon class="mine_icon_vip1" iconClass="mine_icon_vip1"></svg-icon>
          <p>优惠</p>
        </div>
        <div class="flag_item second">
          <svg-icon class="mine_icon_vip2" iconClass="mine_icon_vip2"></svg-icon>
          <p>施予受</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-profile',
  props: ['userInfo']
}
</script>

<style lang="less" scoped>
.userProfile_box {
  display: flex;
  align-items: center;
  justify-self: start;

  .user_profile {
    width: 112px;
    height: 112px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 16px;
    border:1px solid @border;
  }

  .userName_box {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;

    .userName {
      color: @black-d;
      font-size: 44px;
      font-weight: 500;
      margin-bottom: 8px;
    }

    .user_flag {
      display: flex;
      justify-self: start;
      align-items: center;
      height: 36px;

      .flag_item {
        height: 36px;
        box-sizing: border-box;
        margin-right: 10px;
        border-radius: 18px;
        display: flex;
        align-items: center;
        justify-content: center;

        &.one {
          background-color: #fff2d6;
          color: #d48806;
          width: 112px;
        }

        &.second {
          background-color: #eee6ff;
          color: #7754de;
          width: 134px;
        }

        .mine_icon_vip1,
        .mine_icon_vip2 {
          font-size: 24px;
          margin-right: 8px;
        }

        > p {
          font-size: 20px;
          font-family: @Regular;
        }
      }
    }
  }
}
</style>
