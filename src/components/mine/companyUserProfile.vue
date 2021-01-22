<template>
  <div class="userProfile_box">
    <div class="avatar">
      <img :src="userInfo.avatar" class="user_profile" alt />
      <img class="icon" :src="require('@/images/mine/icon_comp.png')" alt />
    </div>
    <div class="userName_box">
      <p class="userName">{{ userInfo.company.name }}</p>
      <div class="user_flag">
        {{ userInfo.company.company_name }}
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

  .avatar {
    flex: 0 0 112px;
    width: 112px;
    height: 112px;
    border-radius: 50%;
    margin-right: 16px;
    border: 4px solid #f0ce7d;
    position: relative;
    .user_profile {
      border-radius: 50%;
      overflow: hidden;
      width: 100%;
      height: 100%;
    }
    .icon {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 32px;
    }
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
    }

    .user_flag {
      display: flex;
      justify-self: start;
      align-items: center;
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
