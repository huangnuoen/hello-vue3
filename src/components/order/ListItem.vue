<template>
  <div class="list-item" @click="linkDetails">
    <div v-for="(store,index) in order.sub_orders" :key="index">
      <div class="top">
        <div class="hospital">
          <p>{{store.store_name}}</p>
        </div>
        <div class="status">{{ORDER_STATUS_CONFIG[order.order_status].text}}</div>
      </div>

      <package  :packageItem="item" v-for="item in store.products" />
    </div>

    <div class="btn-box">
      <div class="btn-item">查看详情</div>
      <div class="btn-item tip-click" v-for="btn in ORDER_STATUS_CONFIG[order.order_status].btns" :key="btn.text"
        @click.stop="handlerBtn(btn)">{{btn.text}}</div>
    </div>
  </div>
</template>

<script>
import Package from '@/components/order/Package'
import { PHONE_NUM } from '@/config/common'
import { ORDER_STATUS } from '@/config/order'
import { ORDER_STATUS_CONFIG } from '@/utils/orderList'
import { jumpLink } from '@/utils/tool'
export default {
  name: 'list-item',
  props: ['order'],
  components: {
    Package
  },
  data() {
    return {
      statusShow: false,
      order_status: ORDER_STATUS,
      phone_num: PHONE_NUM,
      ORDER_STATUS_CONFIG
    }
  },
  methods: {
    linkDetails() {
      if (this.order.redirect_url && this.order.redirect_url !== '') {
        jumpLink({ url: this.order.redirect_url })
        return
      }
      if (this.order.sub_order_no) {
        this.$router.push({ path: `/store/order?order_no=${this.order.sub_order_no}` })
      } else {
        this.$router.push({ path: `/order-detail?order_no=${this.order.main_order_no}` })
      }
    },
    handlerBtn(btn) {
      this.$emit('handlerBtn', btn)
    }

  }
}
</script>

<style lang="less" scoped>
.list-item {
  width: 100%;
  background-color: #fff;
  padding: 24px 30px;
  margin-bottom: 16px;

  &:first-child {
    margin-top: 10px;
  }

  &:last-child {
    margin-bottom: 0;
  }

  > div {
    > div {
      width: 690px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &.top {
        .hospital {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          p{
            font-size: 26px;
          }
          > img {
            width: 32px;
            height: 32px;
            background-color: skyblue;
            margin-right: 14px;
          }
        }

        .status {
          font-size: 26px;
          font-family: @Regular;
          color: @orange;
        }
      }
    }

    &.btn-box {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: 48px;
      .btn-item {
        justify-content: center;
        align-items: center;
        width: 164px;
        height: 56px;
        border-radius: 28px;
        font-family: @Regular;
        color: @black-m;
        border: 1px solid #ccc;
        margin-left: 16px;
        font-size: 24px;
        text-align: center;

        &.tip-click {
          color: @orange;
          border: 1px solid @orange;
        }
      }
    }
  }
}
</style>
