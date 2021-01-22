<template>
  <!-- 传入价格 单位分 -->
  <span class="base-price" :style="{color}">
    &yen; <em>{{priceArr[0]}}</em>.{{priceArr[1]}}
  </span>
</template>
<script>
export default {
  name: 'base-price',
  props: {
    price: [Number, String],
    color: String
  },
  mounted() {},
  computed: {
    priceArr() {
      const priceArr = (this.price / 100).toFixed(2).split('.')
      return priceArr
    }
  }
}
</script>
<style lang="less" scoped>
.base-price {
  color: @red;
  display: inline-block;
  font-weight: 500;
  font-size: 22px;
  em {
    font-size: 34px;
    font-weight: 500;
  }
}
</style>
