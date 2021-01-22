<template>
  <!-- 商城订单 -->
  <div class="order-detail" v-if="pageShow">
    <!-- 头部订单状态 -->
    <DetailTop :showObj="showObj" :item="details">
      <div class="van-count-down">
        <van-count-down v-if="showCountDown==='WAIT_PAY'" @finish="timeOver" :time="details.order_info.remain_time*1000"
          format="请在 mm : ss 内完成支付" />
        <template v-if="showCountDown==='SENDED'">
          {{receivedTime}}
        </template>
      </div>
    </DetailTop>
    <ExpressCard v-if="delivery" :item="delivery"></ExpressCard>
    <!-- 预约定位 -->
    <AppointmentLocation v-if="false" />
    <!-- 订单预约方信息 -->
    <AppointmentPerson v-if="details.reservation.mobile_phone" :reservation="details.reservation" />
    <!-- 订单商品 -->
    <OrderProducts :item="details">
      <!--订单预约信息填写组件-->
      <appointment-information v-if="false" />

    </OrderProducts>
    <!-- 发票 -->
    <!--<invoice-section v-if="details.order_status !== order_status.WAIT_PAY" />-->
    <OrderNo :item="details" />
    <!-- 订单流程 -->
    <!-- <order-process v-if="details.order_info.type===GOODS_TYPE.SERVICE" /> -->
    <!-- 底部按钮 -->
    <div class="btn-box" v-if="details.order_info.actions.length">
      <BottomBtn v-for="btn in details.order_info.actions" :key="btn.code" :btnText="btn.text"
        @click.native="handleBtn(btn)" :code="btn.code" :class="{disabled:disabledBtns.indexOf(btn.code)>-1}">
      </BottomBtn>
    </div>
    <AfterSales title="申请售后原因" v-model="showApplyRefund" @confirm="applyAfter" />

  </div>
</template>

<script>
import DetailTop from '@/components/order/DetailTop'
import AppointmentPerson from '@/components/order/AppointmentPerson'
import AppointmentLocation from '@/components/order/AppointmentLocation'
import OrderNo from '@/components/order/OrderNo'
import BottomBtn from '@/components/order/BottomBtn'
import OrderProducts from '@/components/order/OrderProducts'
import InvoiceSection from '@/components/order/InvoiceSection'
import OrderProcess from '@/components/order/OrderProcess'
import AfterSales from '@/components/order/AfterSales'
import AppointmentInformation from '@/components/order/AppointmentInformation'
import ExpressCard from '@/components/order/ExpressCard'
import bookingMixin from '@/mixins/bookingMixin'
import loadingMixin from '@/mixins/loadingMixin'
import { CountDown } from 'vant'
import { BTN_HANDLER, DISPATCH } from '@/utils/orderList'
import { PHONE_NUM, GOODS_TYPE } from '@/config/common'
import { ORDER_STATUS, STORE_ORDER_STATUS } from '@/config/order'
import { parseTimeData } from '@/utils/tool'
export let COMMON_ORDER_STATUS_CONFIG = {
  [STORE_ORDER_STATUS.CLOSED]: {
    statusTitle: '已关闭',
    desc: '',
    imgSrc: require(`@/images/order/${'cancel.png'}`)
  },
  [STORE_ORDER_STATUS.CANCELED]: {
    statusTitle: '已取消',
    desc: '订单已取消，如有需要请再次购买',
    imgSrc: require(`@/images/order/${'cancel.png'}`)
  },
  [STORE_ORDER_STATUS.WAIT_PAY]: {
    statusTitle: '待付款',
    desc: '',
    imgSrc: require(`@/images/order/${'To_be_paid.png'}`)
  },
  [STORE_ORDER_STATUS.REFUNDING]: {
    statusTitle: '售后中',
    desc: '稍后客服可能与您电话联系，请保持手机畅通',
    imgSrc: require(`@/images/order/${'Customer_service.png'}`)
  },
  [STORE_ORDER_STATUS.REFUND_FAIL]: {
    statusTitle: '售后失败',
    desc: ''
  },
  [STORE_ORDER_STATUS.REFUND_SUCCESS]: {
    statusTitle: '售后成功',
    desc: ''
  },
  [STORE_ORDER_STATUS.DONE]: {
    statusTitle: '已完成',
    desc: '',
    imgSrc: require(`@/images/order/${'complete.png'}`)
  }
}
function getConfig(type) {
  let config = {}
  switch (type) {
    case 1:
      config = {
        [STORE_ORDER_STATUS.WAIT_PAY]: {
          statusTitle: '待付款',
          desc: '',
          imgSrc: require(`@/images/order/${'To_be_paid.png'}`)
        },
        [STORE_ORDER_STATUS.PAYED]: {
          statusTitle: '待预约',
          desc: '立即预约服务，享受健康之旅',
          imgSrc: require(`@/images/order/${'To_be_book.png'}`)
        },
        [STORE_ORDER_STATUS.SUBMITTED]: {
          statusTitle: '待使用',
          desc: '',
          imgSrc: require(`@/images/order/${'To_be_used.png'}`)
        }
      }
      break
    case 2:
    case 4:
      config = {
        [STORE_ORDER_STATUS.PAYED]: {
          // statusTitle: '已付款',
          statusTitle: '待发货',
          desc: '订单支付成功，等待发货',
          imgSrc: require(`@/images/order/${'To_be_delivered.png'}`)
        },
        [STORE_ORDER_STATUS.SENDED]: {
          statusTitle: '待收货',
          desc: '',
          imgSrc: require(`@/images/order/${'To_be_received.png'}`)
        }
      }
  }

  return Object.assign({}, COMMON_ORDER_STATUS_CONFIG, config)
}

export default {
  name: 'order-detail',
  components: {
    DetailTop,
    ExpressCard,
    AppointmentPerson,
    AppointmentLocation,
    OrderNo,
    BottomBtn,
    OrderProcess,
    InvoiceSection,
    AfterSales,
    [CountDown.name]: CountDown,
    OrderProducts,
    AppointmentInformation
  },
  mixins: [bookingMixin, loadingMixin],
  data() {
    return {
      pageShow: false,
      details: {},
      showApplyRefund: false,
      ORDER_STATUS: ORDER_STATUS,
      phone_num: PHONE_NUM,
      showBookInfo: false,
      times: 0,
      showObj: {},
      STORE_ORDER_STATUS,
      GOODS_TYPE,
      disabledBtns: []
    }
  },
  created() {
    this.getOrderDetail()
  },
  methods: {
    handleBtn(btn) {
      BTN_HANDLER[btn.code].call(this, this.details)
    },

    submitBook() {
      return this.$api.store.reserve({ ...this.bookForm })
    },
    applyAfter(data) {
      this.$api.store.orderRefund(data).then((res) => {
        this.$toast(res.message)
        this.refresh()
        if (res.code === 200) {
        }
      })
    },
    setBtnStatus() {
      const info = this.$store.state.popup.dispatched
      const order_no = this.$route.query.order_no
      const today = new Date().getDate()
      if (info) {
        const date = info[order_no]
        // 检查是否点过
        if (date && date === today) {
          this.disabledBtns.push(DISPATCH)
        }
      }
    },
    getOrderDetail() {
      this.setLoading(true)
      this.$api.store
        .sub_orders(this.$route.query.order_no)
        .then((res) => {
          if (res.code === 200) {
            // res.data.order_info.order_status = STORE_ORDER_STATUS.PAYED
            const type = res.data.order_info.type
            COMMON_ORDER_STATUS_CONFIG = getConfig(type)
            this.getObj(res.data.order_info)
            this.details = res.data
            this.pageShow = true
            this.setBtnStatus()
            if (+this.order_status === +STORE_ORDER_STATUS.SENDED) {
              this.countdown()
            }
          }
        })
        .finally(() => {
          this.setLoading(false)
        })
    },

    refresh() {
      this.$router.replace({ path: '/redirect' + this.$route.fullPath })
    },
    timeOver() {
      this.refresh()
    },

    async pay() {
      if (this.canFillBookInfo && this.showBookInfo) {
        if (!this.checkBookForm()) return
        this.$toast.loading('加载中...')
        const res = await this.submitBook()
        this.$toast.clear()
        if (res.code !== 200) {
          this.$toast(res.message)
          return
        }
      }

      this.$router.push({
        path: `/pay?order_no=${this.$route.query.order_no}`
      })
    },
    use() {
      this.$router.push({ path: `/booking?order_no=${this.$route.query.order_no}` })
    },
    close(n) {
      if (n === 1) {
        this.getOrderDetail()
      }
      this.showApplyRefund = false
    },
    countdown() {
      this.timer = setTimeout(() => {
        const second = this.delivery.remain_time - 1
        if (second <= 0) {
          clearTimeout(this.timer)
          this.timeOver()
          return
        }
        this.$set(this.delivery, 'remain_time', second)
        this.countdown()
      }, 1000)
    },
    getObj(data) {
      // console.log('data', data)
      this.showObj = COMMON_ORDER_STATUS_CONFIG[data.order_status]
    }
  },
  computed: {
    get_isShow() {
      return this.showApplyRefund
    },
    canFillBookInfo() {
      return true
    },
    showCountDown() {
      if (+this.order_status === +STORE_ORDER_STATUS.WAIT_PAY && this.details.order_info.remain_time > 0) {
        return 'WAIT_PAY'
      } else if (+this.order_status === +STORE_ORDER_STATUS.SENDED) {
        return 'SENDED'
      } else {
        return ''
      }
    },
    order_status() {
      return this.details.order_info.order_status
    },
    delivery() {
      return this.details.delivery
    },
    receivedTime() {
      if (this.delivery.remain_time > 0) {
        const { days, hours, mins, seconds } = parseTimeData(this.delivery.remain_time)
        let text = ''
        if (days) {
          text = `${days}天${hours}小时`
        } else if (hours) {
          text = `${hours}小时`
        } else if (mins) {
          text = `${mins}分钟`
        } else {
          text = `${seconds}秒`
        }
        return `订单已发货，还剩${text}自动确认收货`
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url('~@/pages/order/booking');
@import url('~@/style/mixin');

.order-detail {
  padding-bottom: 124px;
  > div:nth-child(2) {
    border-radius: 24px 24px 0px 0px;
  }
  .btn-box {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 20px 28px;
    .safe-padding-bottom(20px);
    border-top: 1px solid #eee;
  }
  .van-count-down {
    font-size: 24px;
    color: #fff;
  }
}
</style>
