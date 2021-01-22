<template>
  <div class="recommend_box">
    <div class="recommend_box_content">
      <div class="left"></div>
      <!--<img src="@/images/mine/mine_icon_love.png" alt />-->
      <svg-icon class="mine_icon_love" iconClass="mine_icon_love"></svg-icon>
      <p>为您推荐</p>
      <div class="right"></div>
    </div>

    <div class="recommend_list">
      <recommend-item />
    </div>
  </div>
</template>

<script>
import recommendItem from '@/components/mine/recommendItem'

export default {
  name: 'recommend',
  components: {
    recommendItem
  }
}
</script>

<style lang="less" scoped>
.recommend_box {
  width: 100;
  padding-bottom: 24px;
  .recommend_box_content {
    padding: 48px 0 38px;
    display: flex;
    align-items: center;
    justify-content: center;

    .left,
    .right {
      width: 24px;
      height: 2px;
      background: #d9d9d9;
      border-radius: 1px;
      margin: 0 10px;
    }

    .mine_icon_love {
      margin-right: 8px;
      width: 26px;
      height: 26px;
    }

    p {
      font-size: 26px;
      font-weight: 500;
      color: #404040;
    }
  }

  .recommend_list {
    width: 100%;
    background-color: #fff;
    padding-bottom: 24px;
  }
}
</style>
