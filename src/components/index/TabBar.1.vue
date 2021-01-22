<template>
  <div class="bar">

    <router-link class="tab-item" tag="div" to="/home">
      <i class="home">
        <svg-icon icon-class="tabbar_icon_home_sel"></svg-icon>
      </i>
      <span>首页</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/mall">
      <i class="mall">
        <svg-icon icon-class="tabbar_icon_heal_sel"></svg-icon>
      </i>
      <span>商城</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/health">
      <i class="home">
        <svg-icon icon-class="tabbar_icon_heal_def"></svg-icon>
      </i>
      <span>健康</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/mine">
      <i class="mine">
        <svg-icon icon-class="tabbar_icon_mine_def"></svg-icon>
      </i>
      <span>我的</span>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'tabbar'
}
</script>
<style lang="less" scoped>
@import '~@/style/mixin.less';
.bar {
  width: 100%;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  z-index: 100;
  padding: 5px 0;
  .safe-padding-bottom(5px);
}
.tab-item {
  margin-left: auto;
  text-align: center;
  line-height: 0;
  & > span {
    display: block;
    font-size: 22px;
    line-height: 22px;
    color: #919499;
  }
  & > i {
    margin: 8px 0 6px;
    height: 54px;
    width: 54px;
    svg {
      font-size: 58px;
      color: #FFC233;
      stroke: #000;
    }
  }
  .home {
    // background: url('~@/images/home/tabbar_icon_home.png') no-repeat center center / 100% 100%;
  }
  .mall {
    // background: url('~@/images/home/tabbar_icon_mall.png') no-repeat center center / 100% 100%;
  }
  .mine {
    // background: url('~@/images/home/tabbar_icon_mine.png') no-repeat center center / 100% 100%;
  }
  &:first-child {
    padding-right: 30px;
  }
  &:last-child {
    padding-left: 30px;
    margin-right: auto;
  }
}
.router-link-exact-active,
.router-link-active {
  i {
  }
  .home {
    // background: url('~@/images/home/tabbar_icon_home_def.png') no-repeat center center / 100% 100%;
  }
  .mall {
    // background: url('~@/images/home/tabbar_icon_mall_def.png') no-repeat center center / 100% 100%;
  }
  .mine {
    // background: url('~@/images/home/tabbar_icon_mine_def.png') no-repeat center center / 100% 100%;
  }
  & > span {
    color: @theme2;
  }
}
</style>
