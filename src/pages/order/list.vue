<template>
  <div class="order-list">
    <van-tabs v-model="tab" :color="variable.theme" :title-active-color="variable.theme" :background="variable.bg">
      <van-tab :title="item.tab" v-for="(item,key) in order_tabs" :key="key" :name="key"></van-tab>
    </van-tabs>
    <div class="content">
      <ListItem v-for="(item) in orderList" :key="item.id" :order="item" @handlerBtn="handlerBtn($event,item)">
      </ListItem>
    </div>
    <Empty v-if="!orderList.length&&!loading" desc="暂无订单" style="paddingTop:93px;" />

  </div>
</template>

<script>
import variable from '@/style/variable.less'
import ListItem from '@/components/order/ListItem'
import loadingMixin from '@/mixins/loadingMixin'
import Empty from '@/base/Empty/Empty'
import { ORDER_STATUS } from '@/config/order'
import { BTN_HANDLER, ORDER_STATUS_CONFIG } from '@/utils/orderList'
import { Tab, Tabs } from 'vant'
const order_tabs = {
  [ORDER_STATUS.ALL]: {
    tab: '全部'
  },
  [ORDER_STATUS.WAIT_PAY]: {
    tab: '待付款'
  },
  [ORDER_STATUS.WAIT_RESERVATION]: {
    tab: '待使用'
  },
  [ORDER_STATUS.DONE]: {
    tab: '待评价'
  },
  [ORDER_STATUS.AFTER]: {
    tab: '退款/售后'
  }
}
export default {
  name: 'order-list',
  mixins: [loadingMixin],
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    ListItem,
    Empty
  },
  data() {
    return {
      variable,
      ORDER_STATUS_CONFIG,
      tab: this.$route.query.order_status || '0',
      show: false,
      order_tabs,
      allOrderList: {
        [ORDER_STATUS.ALL]: [],
        [ORDER_STATUS.WAIT_PAY]: [],
        [ORDER_STATUS.WAIT_RESERVATION]: [],
        [ORDER_STATUS.DONE]: [],
        [ORDER_STATUS.AFTER]: []
      }
    }
  },
  created() {
    this.getList(this.tab)
  },
  methods: {
    getList(order_status) {
      this.setLoading(true)
      if (+order_status === 0) {
        order_status = ''
      }
      this.$api.user
        .orderList({ order_status })
        .then((res) => {
          if (res.code === 200) {
            this.allOrderList[this.tab] = res.data
          }
        })
        .finally(() => {
          this.setLoading(false)
        })
    },
    handlerBtn(btn, item) {
      BTN_HANDLER[btn.code].call(this, { order_info: { main_order_no: item.main_order_no } })
    },
    refresh() {
      this.$router.replace({ path: '/redirect' + this.$route.fullPath })
    }
  },
  computed: {
    orderList() {
      return this.allOrderList[this.tab]
    }
  },
  watch: {
    tab(order_status) {
      // 为了回退时记住tab
      this.$router.replace(`${this.$route.path}?order_status=${order_status}`)
      if (!this.allOrderList[this.tab].length) {
        this.getList(order_status)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.order-list {
  width: 100%;
}
.van-tabs {
  position: sticky;
  top: 80px;
  background-color: @bg;
  z-index: 10;
}
</style>
