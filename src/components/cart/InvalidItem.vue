<template>
  <div class="invalid-item">
    <div class="tag">失效</div>
    <img :src="item.img_cover">
    <div class="info">
      <h3>{{item.title}}</h3>
      <div class="btns">
        <!-- <button>相似推荐</button> -->
        <button class="theme" @click="$emit('delete',item)">删除商品</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  }
}
</script>
<style lang="less" scoped>
@import '~@/style/mixin.less';
.invalid-item {
  display: flex;
  align-items: center;
  padding: 26px 0;
  .tag {
    display: inline-block;
    width: 30px;
    padding: 0px 0;
    height: 66px;
    background: rgba(242, 242, 242, 1);
    border-radius: 16px;
    color: @black-l;
    text-align: center;
    font-size: 22px;
  }
  img {
    opacity: 0.3;
    object-fit: cover;
    width: 140px;
    height: 140px;
    margin-right: 16px;
    margin-left: 22px;
    border: 1px solid @border;
  }
  .info {
    height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    h3 {
      .ellipsis-line(500px, 2);
      color: @black-d;
      opacity: 0.3;
      font-size: 28px;
    }
    .btns {
      text-align: right;
      button {
        width: 148px;
        height: 52px;
        font-size: 24px;
        border-radius: 28px;
        border: 1px solid #ccc;
        margin-left: 16px;
        color: #404040;
        &.theme {
          color: @theme;
          border-color: @theme;
        }
      }
    }
  }
}
</style>
