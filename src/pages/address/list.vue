<template>
  <div class="address-list">
    <div class="address-list-content" v-if="addressList.length">
      <AddressCard
        v-for="item in addressList"
        :item="item"
        :key="item.id"
        @select="selectAddr(item)"
        @edit="$router.push(`/address-edit?id=${item.id}`)"
      ></AddressCard>
      <footer>
        <button v-waves @click="$router.push('/address-edit')">添加地址</button>
      </footer>
    </div>
    <Empty v-if="!addressList.length && !loading" desc="暂无收货地址" img="oder_img_empty" style="paddingtop: 93px">
      <button class="add-btn" @click="$router.push('/address-edit')" v-waves>添加地址</button>
    </Empty>
  </div>
</template>
<script>
import AddressCard from '@/components/address/AddressCard'
import loadingMixin from '@/mixins/loadingMixin'
import Empty from '@/base/Empty/Empty'
export default {
  name: 'address-list',
  mixins: [loadingMixin],
  components: {
    AddressCard,
    Empty
  },
  data() {
    return {
      addressList: []
    }
  },
  mounted() {
    this.setLoading(true)
    this.getAddress()
  },
  methods: {
    selectAddr(item) {
      // 记录下点击地址卡片操作
      this.selectAddrCard = true
      this.$store.commit('user/SET_ADDRESS', item)
      this.$router.back()
    },
    getAddress() {
      this.$api.address
        .shipping_addresses({ params: { app_id: this.$store.state.appId } })
        .then((res) => {
          this.addressList = res.data.data
        })
        .finally(() => {
          this.setLoading(false)
        })
    }
  },
  beforeRouteLeave(to, from, next) {
    // 如果是点击地址卡片操作引起的路由跳转，且跳转链接不是确认订单页，则阻止跳转
    if (this.selectAddrCard && to.name !== 'order-confirm') {
      next(false)
    } else {
      next()
    }
    this.selectAddrCard = false
  }
}
</script>
<style lang="less" scoped>
@import '~@/style/mixin.less';

.address-list {
  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 750px;
    height: 120px;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: content-box;
    .safe-padding-bottom(0px);
    button {
      background-color: @theme;
      color: #fff;
      width: 642px;
      height: 80px;
      border-radius: 40px;
    }
  }

  .empty {
    .add-btn {
      width: 642px;
      height: 80px;
      background: rgba(255, 171, 17, 1);
      border-radius: 40px;
      background-color: @theme;
      color: #fff;
    }
  }
}
</style>
