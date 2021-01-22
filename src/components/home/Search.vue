<!-- 搜索栏 -->
<template>
  <div class="home-search">
    <svg-icon class="service" @click="call" iconClass="home_icon_service"></svg-icon>
    <div class="form" @click="$emit('search')">
      <svg-icon class="search" iconClass="home_icon_search"></svg-icon>
      <input v-model="searchKey" readonly placeholder="脂肪肝不用吃药你知道吗？" />
      <!-- <i></i> -->
    </div>
    <div class="msg" @click="tolink">
      <svg-icon iconClass="home_icon_message"></svg-icon>
      <!-- <span><em>12</em></span> -->
    </div>
  </div>
</template>
<script>
import { PHONE_NUM } from '@/config/common'
import { jumpLink } from '@/utils/tool'
export default {
  name: 'home-search',
  data() {
    return {
      searchKey: ''
    }
  },
  methods: {
    tolink() {
      jumpLink({ url: window.internalHospitalUrl + 'user/inquiry' })
    },
    call() {
      location.href = `tel:${PHONE_NUM}`
    }
  }
}
</script>
<style lang="less" scoped>
.home-search {
  width: 100%;
  height: 112px;
  display: flex;
  align-items: center;
  padding: 20px 30px;
}
.service {
  font-size: 48px;
}
.msg {
  position: relative;
  & > svg {
    font-size: 48px;
  }
  & > span {
    position: absolute;
    top: -14px;
    right: -18px;
    width: 34px;
    height: 30px;
    background: #f53134;
    border-radius: 15px;
    display: flex;
    align-content: center;
    justify-content: center;
    em {
      font-size: 24px;
      font-family: SFProDisplay-Medium, SFProDisplay;
      font-weight: 500;
      color: #fff;
      -webkit-transform: scale(0.83);
    }
  }
}
.form {
  width: 546px;
  height: 72px;
  border-radius: 36px;
  margin: 0 24px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
    background-color: #fff;
  & > input {
    flex: 1 1 auto;
    width: 400px;
    font-size: 30px;
    color: #262626;
    line-height: 40px;
    padding: 0 16px;
  }
  .search,
  & > i {
    flex: 0 0 auto;
  }
  .search {
    font-size: 32px;
    margin-left: 20px;
  }
  & > i {
    height: 48px;
    width: 48px;
    margin-right: 32px;
    background: url('~@/images/home/home_icon_robot.png') no-repeat center center / 100% 100%;
  }
}
</style>
