<template>
  <div class="recommend" v-if="list.length">
    <h3>特惠推荐</h3>
    <swiper :options="swiperOption" not-next-tick ref="mySwiper">
      <swiperSlide class="recommend-item" v-for="(item,index) in list" :key="index" @click.native="$emit('link',item)">
        <div class="img-wrap">
          <img src="../../images/global_defaultlogo.png" alt="">
        </div>
        <div class="title">{{item.name}}</div>
        <div class="tags">
          <span class="tag" v-for="(tag, i) in item.tags" :key="i">{{tag}}</span>
        </div>
        <div class="point"><em>{{item.point}}</em>积分</div>
        <div class="price">或 &yen; {{item.price | G_formatPrice}}</div>
      </swiperSlide>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper' // swiper组件
import 'swiper/css/swiper.css'

export default {
  components: { Swiper, SwiperSlide },
  props: {
    list: Array
  },
  data() {
    return {
      swiperOption: {
        autoplay: false,
        autoHeight: true,
        freeMode: true,
        slidesPerView: 'auto',
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true // 修改swiper的父元素时，自动初始化swiper
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/style/mixin.less';
.recommend {
  padding: 32px 0;
  h3 {
    font-size: 36px;
    color: @black-m;
    padding: 0 30px 24px 30px;
    font-weight: 500;
  }
  .swiper-container {
    width: 750px;
    padding: 0 30px 32px;
  }
  &-item {
    flex: 0 0 220px;
    width: 220px;
    margin-right: 16px;
    .img-wrap {
      position: relative;
      width: 220px;
      height: 220px;
      border-radius: 8px;
      border: 1px solid @border;
      margin-bottom: 12px;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
    .title {
      color: @black-m;
      font-size: 26px;
      .ellipsis-line(220px, 1);
    }
    .tags {
      .ellipsis-line(220px, 1);
      display: flex;
      padding: 8px 0;
      .tag {
        color: @grey;
        font-size: 20px;
        white-space: nowrap;
        padding-right: 6px;
        border-right: 1px solid #d9d9d9;
        padding-left: 6px;
        &:first-child {
          padding-left: 0;
        }
        &:last-child {
          border-right: none;
        }
      }
    }
    .point {
      color: @orange;
      font-size: 22px;
      line-height: 32px;
      em {
        vertical-align: bottom;
        font-size: 32px;
        padding-right: 4px;
        font-weight: 500;
      }
    }
    .price {
      color: @grey;
      font-size: 20px;
    }
  }
}
</style>
