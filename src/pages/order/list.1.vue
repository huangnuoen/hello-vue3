<template>
  <div class="order-list" :class="{'show-title-bar': $route.meta.titleBar}">
    <list-tab :tab.sync="tab" @topShow="topShow">
      <ord-list :type="getType" :show="show" />
    </list-tab>
  </div>
</template>

<script>
import ListTab from '@/components/order/ListTab'
import OrdList from '@/components/order/OrdList'

export default {
  name: 'order-list',
  data() {
    return {
      tab: 0,
      show: false
    }
  },
  created() {
    if (localStorage.getItem('orderTab') && localStorage.getItem('orderTab') !== '') {
      this.tab = Number(localStorage.getItem('orderTab'))
      return
    }
    if (this.$route.query.order_status) {
      this.tab = Number(this.$route.query.order_status)
    }
  },
  components: {
    ListTab,
    OrdList
  },
  computed: {
    getType() {
      // console.log('computed',this.tab)
      return this.tab
    }
  },
  methods: {
    topShow(show) {
      this.show = show
    }
  }
}
</script>

<style lang="less" scoped>
.order-list {
  width: 100%;
  min-height: 100vh;
}

.show-title-bar {
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 82px;
}
</style>
