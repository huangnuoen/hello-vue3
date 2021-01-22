<!-- 健康大真相 -->
<template>
  <div class="truth">
    <plate-title :info="{name: '健康大真相', tip: '', url: '/'}"></plate-title>
    <swiper class="swiper" :options="{
        autoplay: false,
        autoHeight: true,
        freeMode: true,
        slidesPerView: 'auto'
      }" :not-next-tick="true" >
      <swiperSlide class="swiper-li">
        <truth-li type="1"></truth-li>
      </swiperSlide>
      <swiperSlide class="swiper-li">
        <truth-li type="2"></truth-li>
      </swiperSlide>
      <swiperSlide class="swiper-li">
        <truth-li type="3"></truth-li>
      </swiperSlide>
      <swiperSlide class="swiper-li">
        <truth-li type="1"></truth-li>
      </swiperSlide>
    </swiper>
  </div>
</template>
<script>
import PlateTitle from './PlateTitle'
import TruthLi from './TruthLi'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper' // swiper组件
import 'swiper/css/swiper.css'
export default {
  name: 'home-truth',
  components: {
    PlateTitle,
    Swiper,
    SwiperSlide,
    TruthLi
  }
}
</script>
<style lang="less" scoped>
.truth {
}
.swiper {
  padding: 0 30px 48px;
  .swiper-li {
    width:470px;
    padding-right: 16px;
    &:last-child {
      padding-right: 0;
      width: 454px;
    }
  }
}
</style>
