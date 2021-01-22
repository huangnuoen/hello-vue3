
<template>
  <div class="userAssets_box">
    <div
      class="userAssetsItem_box"
      @click="linkTo(item)"
      v-for="(item,index) in items"
      :key="index"
    >
      <p class="nums">{{item.itemNums}}</p>
      <p class="names">{{item.itemNames}}</p>
    </div>
  </div>
</template>

<script>
import { jumpLink } from '@/utils/tool'
import userAssetsItem from '@/components/mine/userAssetsItem'
const daishuUrl = window.daishuUrl
const fuliUrl = window.fuliUrl
export default {
  name: 'user-assets',
  data() {
    return {
      items: [
        { itemNums: 1000, itemNames: 'D米', itemLink: daishuUrl + 'mydmi' },
        { itemNums: 2, itemNames: '卡包', itemLink: daishuUrl + 'assets/medical-card' },
        { itemNums: 8000, itemNames: '积分', itemLink: fuliUrl + 'usercenter' },
        { itemNums: 5, itemNames: '优惠券', itemLink: daishuUrl + 'assets/coupon' }
      ]
    }
  },
  methods: {
    linkTo(item) {
      console.log(this.$store.state.channel, '1111')
      jumpLink({ url: item.itemLink })
    }
  },
  components: {
    userAssetsItem
  }
}
</script>
<style lang="less" scoped>
.userAssets_box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  margin-top: 48px;
  .userAssetsItem_box {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: @black-d;

    .nums {
      font-size: 36px;
      font-weight: 500;
      margin-bottom: 4px;
    }

    .names {
      font-size: 24px;
    }
  }
}
</style>
