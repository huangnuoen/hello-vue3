<template>
  <div class="top-component">
    <div class="back">
      <svg-icon icon-class="icon_arrow_lef_v2"></svg-icon>
    </div>
    <span>健康合伙人</span>
    <div class="city">
      <span>深圳</span>
      <svg-icon icon-class="icon_arrow_down"></svg-icon>
    </div>
  </div>
</template>

<style lang="less" scoped>
@imgUrl: '../../images/project-agent/';
.top-component {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 96px;
  background-image: url('~@/images/project-agent/nav_bg.png');
  background-size: cover;
  padding: 0 32px;
  span {
    height: 32px;
    font-size: 32px;
    font-weight: 500;
    color: #ebd0a9;
    line-height: 32px;
  }
  & > .back {
    width: 100px;
    svg {
      font-size: 40px;
    }
  }
  & > .city {
    display: inline-flex;
    align-items: center;
    span {
      margin-right: 4px;
    }
  }
}
</style>

<script>
export default {}
</script>