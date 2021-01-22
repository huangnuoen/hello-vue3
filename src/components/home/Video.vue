<!-- 科普视频 -->
<template>
  <div class="home-video">
    <plate-title :info="{name: '科普视频', url: '/video-list'}"></plate-title>
    <swiper
      class="swiper"
      :options="{
        autoplay: false,
        autoHeight: true,
        freeMode: true,
        slidesPerView: 'auto'
      }"
      :not-next-tick="true"
    >
      <swiperSlide v-for="n in list" :key="n.id" class="swiper-li">
        <video-li :isSkeleton="isLoad" :info="n"></video-li>
      </swiperSlide>
    </swiper>
  </div>
</template>
<script>
import PlateTitle from './PlateTitle'
import VideoLi from './VideoLi'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper' // swiper组件
import 'swiper/css/swiper.css'
export default {
  name: 'home-video',
  components: {
    PlateTitle,
    Swiper,
    SwiperSlide,
    VideoLi
  },
  data() {
    return {
      page: 1,
      pageSize: 3,
      list: [{}, {}],
      isLoad: false
    }
  },
  created() {
    this.getList()
  },

  methods: {
    getList() {
      this.isLoad = true
      this.$api.video
        .list({
          by_label: 1,
          page: this.page,
          pageSize: this.pageSize
        })
        .then((res) => {
          if (res.code === 200) {
            // this.list = this.list.concat(res.data.data)
            this.list = res.data.data
            // this.page++
          }

          this.isLoad = false
        })
    }
  }
}
</script>
<style lang="less" scoped>
.home-video {
  background: #fff;
}
.swiper {
  padding: 0 28px 32px;
  .swiper-li {
    width: 354px;
    padding-right: 16px;
    &:last-child {
      padding-right: 0;
      width: 338px;
    }
  }
}
</style>
