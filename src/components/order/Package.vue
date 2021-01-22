<template>
  <div class="package">
    <div class="left">
      <img :src="packageItem.product_img" alt />
      <div class="order-name">{{packageItem.product_title}}</div>
    </div>
    <div class="right">
      <p>¥ {{packageItem.order_price | G_formatPrice}}</p>
      <p>x {{packageItem.num}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'package',
  props: ['packageItem'],
  mounted() {}
}
</script>

<style lang="less" scoped>
.package {
  margin-top: 30px;
  margin-bottom: 56px;

  &:last-child {
    margin-bottom: 48px;
  }
  .left {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;

    > img {
      width: 120px;
      height: 120px;
      border-radius: 8px;
      // background-color: skyblue;
      margin-right: 24px;
      object-fit: contain;
    }

    .order-name {
      font-size: 28px;
      color: @black-m;
      font-family: @Regular;
      line-height: 40px;
      max-width: 400px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  .right {
    height: 120px;
    font-size: 26px;
    color: @black-m;
    font-family: @Regular;
    text-align: right;

    p {
      &:last-child {
        margin-top: 16px;
      }
    }
  }
}
</style>
