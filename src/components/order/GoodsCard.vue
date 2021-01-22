<template>
  <div class="goods-card">
    <h2>
      {{item.supplier_name}}
      <!-- <svg-icon icon-class="order_icon_arrow1"></svg-icon> -->
    </h2>
    <ul class="goods-list">
      <li class="goods-item" v-for="goods in item.carts" :key="goods.id">
        <img :src="goods.img_cover||defaultGoods">
        <div class="info">
          <h3>{{goods.title}}</h3>
          <!-- <button class="additems"><span>共 12 项检查项目</span>
            <svg-icon icon-class="order_icon_arrow1"></svg-icon>
          </button> -->
          <BasePrice :price="goods.price" color="#262626"></BasePrice>
        </div>
        <div class="cnt">x{{goods.num}}</div>
      </li>
    </ul>
    <!-- 体检类才有，暂时隐藏 -->
    <!-- <ul class="tips">
      <li>
        <svg-icon icon-class="order_icon_time"></svg-icon>
        <span class="text">预约有效期为90天，支持过期退款</span>
      </li>
      <li>
        <svg-icon icon-class="order_icon_safe"></svg-icon>
        <span class="text">支持随时退、随时改</span>
      </li>
    </ul> -->
  </div>
</template>
<script>
import BasePrice from '@/base/BasePrice/BasePrice'
export default {
  components: { BasePrice },
  props: { item: Object },
  data() {
    return {
      defaultGoods: window.defaultGoods
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/style/mixin.less';
.goods-card {
  padding: 16px 0;
  background-color: #fff;
  border-radius: 16px;
  width: 718px;
  margin: 0 auto 24px;
  box-shadow: 0px 2px 40px 0px rgba(0, 0, 0, 0.08);
  h2 {
    font-size: 32px;
    font-weight: 500;
    color: @black-d;
    padding: 16px 24px;
    svg {
      font-size: 22px;
      vertical-align: baseline;
    }
  }
  ul {
    padding: 0 24px;
    .goods-item {
      display: flex;
      padding: 26px 0 36px;
      img {
        width: 140px;
        height: 140px;
        object-fit: contain;
        margin-right: 20px;
        margin-top: 10px;
        border: 1px solid @border;
      }
      .info {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        h3 {
          .ellipsis-line(440px, 2);
          font-size: 28px;
          font-weight: 500;
          color: @black-d;
          text-shadow: 0px 2px 40px rgba(0, 0, 0, 0.08);
        }
        .additems {
          display: block;
          font-size: 26px;
          color: @black-l;
          text-shadow: 0px 2px 40px rgba(0, 0, 0, 0.08);
          margin-bottom: 18px;
          svg {
            vertical-align: baseline;
            font-size: 20px;
          }
        }
      }
      .cnt {
        font-size: 22px;
        color: @black-d;
        line-height: 32px;
        text-shadow: 0px 2px 40px rgba(0, 0, 0, 0.08);
        padding-top: 4px;
      }
    }
  }
  .tips {
    border-top: 1px solid #f2f6fc;
    margin-left: 24px;
    padding-top: 8px;
    padding-left: 0;
    li {
      padding: 8px 0;
      svg {
        font-size: 32px;
        margin-right: 12px;
        vertical-align: middle;
      }
      span {
        font-size: 24px;
        font-weight: 400;
        color: @black-l;
        text-shadow: 0px 2px 40px rgba(0, 0, 0, 0.08);
      }
    }
  }
}
</style>
