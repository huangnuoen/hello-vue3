<template>
  <div class="goods-item">
    <div class="img-wrap">
      <img :src="item.img_cover || defaultGoods" />
      <img v-show="item.is_recommend" src="../../images/mall/product_tag_hot@2x.png" class="tag" alt="" />
    </div>
    <div class="goods-item-info">
      <div class="title">{{ item.title }}</div>
      <div class="org">{{ item.supplier_name }}</div>
      <div class="price">
        <div class="old">&yen; <em>{{ item.selling_price }}</em></div>
        <div class="points">
          或 
          {{ item.score }}积分
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'goods-item',
  props: {
    item: Object
  },
  data() {
    return {
      defaultGoods: window.defaultGoods
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/style/mixin.less';
.goods-item {
  padding: 16px 0;
  display: flex;
  border-bottom: 1px solid @border;
  .img-wrap {
    position: relative;
    width: 216px;
    height: 216px;
    margin-right: 18px;
    border-radius: 8px;
    img {
      width: 100%;
      background-color: @bg;
      height: 100%;
      object-fit: contain;
    }
    .tag {
      position: absolute;
      top: 0;
      left: 0;
      width: 92px;
      height: 36px;
      object-fit: contain;
    }
  }
  &-info {
    flex: 1;
    position: relative;
    .title {
      color: @black-m;
      font-size: 28px;
      font-weight: 500;
      .ellipsis-line(100%, 1);
    }
    .org {
      font-size: 24px;
      padding-bottom: 8px;
      padding-top: 8px;
      color: @grey;
    }
    .price {
      width: 100%;
      position: absolute;
      bottom: 0;
      display: flex;
      align-items: center;
      .old {
        color: @orange;
        font-size: 22px;
        line-height: 38px;
        font-weight: 500;
        padding-right: 24px;
        em {
          vertical-align: bottom;
          font-size: 32px;
          line-height: 38px;
          padding-right: 8px;
        }
      }
      .points {
        font-size: 24px;
        color: @grey;
      }
    }
  }
}
</style>
