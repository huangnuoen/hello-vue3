<!-- 轮播 -->
<template>
  <div class="carousel">
    <van-swipe class="swipe" :autoplay="3000" :indicator-color="theme">
      <van-swipe-item v-for="(b, i) in banners" :key="i">
        <!-- <img @click="link(b)" class="banner" :src="b.img" /> -->
        <img @click="link(b)" class="banner" :src="b.pic_url" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
import variable from '@/style/variable.less'
import { Swipe, SwipeItem } from 'vant'
export default {
  name: 'carousel',
  props: {
    banners: {
      type: Array,
      default() {
        return [{ img: '' }]
      }
    }
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data() {
    return {
      theme: variable.theme
    }
  },
  methods: {
    link(item) {
      // if (item.url) {
      if (item.target_url) {
        this.$emit('link', item)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.carousel {
  border-radius: 20px;
  overflow: hidden;
  .swipe {
    width: 710px;
    height: 267px;
    border-radius: 20px;
  }
  /deep/ .van-swipe__indicators {
    .van-swipe__indicator {
      width: 8px;
      height: 8px;
      background: #fff;
      opacity: 0.5;
    }
    .van-swipe__indicator--active {
      width: 22px;
      height: 8px;
      border-radius: 5px;
      opacity: 0.9;
    }
  }
  .banner {
    height: 100%;
    width: 100%;
    object-fit: cover;
    background: #f3f3f3;
  }
}
</style>
