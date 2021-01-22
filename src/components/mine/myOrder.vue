<template>
  <div class="mineSection_box">
    <p class="section_title">我的订单</p>

    <div class="section_items">
      <item v-for="(item,index) in items" :item="item" :key="index" />

      <div class="section_items_son">
        <item :item="items2[0]" />
        <!--<img src="@/images/mine/mine_img_shadow.png" class="center_img" alt />-->
        <svg-icon class="center_img" iconClass="mine_img_shadow"></svg-icon>
        <item :item="items2[1]" />
      </div>
    </div>
  </div>
</template>

<script>
import item from '@/components/mine/Item'

export default {
  name: 'my-order',
  data() {
    return {
      items: [
        {
          iconClass: 'mine_order_1',
          text: '待付款',
          isShow: false,
          className: 'link_icon1',
          itemLink: '/order-list?order_status=1',
          mode: 0
        },
        {
          iconClass: 'mine_order_2',
          text: '待使用',
          className: 'link_icon1',
          itemLink: '/order-list?order_status=2',
          mode: 0
        },
        {
          iconClass: 'mine_order_3',
          text: '待评价',
          className: 'link_icon1',
          itemLink: '/order-list?order_status=6',
          mode: 0
        }
      ],
      items2: [
        {
          iconClass: 'mine_order_4',
          text: '退款/售后',
          itemLink: '/',
          className: 'link_icon1',
          itemLink: '/order-list?order_status=7',
          mode: 0
        },
        {
          iconClass: 'mine_order_5',
          text: '全部订单',
          className: 'link_icon1',
          itemLink: '/order-list',
          mode: 0
        }
      ]
    }
  },
  components: {
    item
  }
}
</script>

<style lang="less" scoped>
.mineSection_box {
  width: 100%;
  height: 254px;
  background: url('~@/images/mine/my-order-bg.png') center center / 100% 100%;
  padding: 38px 30px 48px;
  position: relative;
  margin-top: -16px;
  z-index: 10;

  .section_title {
    font-size: 32px;
    font-weight: 500;
  }

  .section_items {
    display: flex;
    margin-top: 32px;
    justify-content: space-between;

    .section_items_son {
      display: flex;
      justify-content: space-between;
      .center_img {
        width: 14px;
        height: 96px;
      }
    }
  }
}
</style>
