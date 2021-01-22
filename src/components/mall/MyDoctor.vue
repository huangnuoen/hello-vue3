<template>
  <div class="my-doctor">
    <h3>
      <div class="text">我的医生</div><button class="more">查看全部</button>
    </h3>
    <swiper :options="swiperOption" not-next-tick ref="mySwiper">
      <swiperSlide class="my-doctor-item" v-for="(item,index) in new Array(5)" :key="index">
        <div class="info">
          <img src="../../images/global_defaultlogo.png" alt="">
          <div class="info-instr">
            <div class="info-instr-top">
              <span class="name">李</span>
              <span class="level">主任医师</span>
            </div>
            <div class="info-instr-bottom">北京协和医院 儿科</div>
          </div>
          <button class="ask">立即咨询</button>
        </div>
        <div class="brief">
          <h4>医生简介</h4>
          <div class="brief-text">医学博士，毕业于北京大学八年制本博连读专业。从事儿科临床、教学和科研二十余年，…医学博士，毕业于北京大学八年制本博连读专业。从事儿科临床、教学和科研二十余年，…</div>
        </div>

      </swiperSlide>
    </swiper>

  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper' // swiper组件
import 'swiper/css/swiper.css'

export default {
  components: { Swiper, SwiperSlide },
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
  mounted() {
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
.my-doctor {
  padding: 32px 0;
  h3 {
    font-size: 36px;
    color: @black-m;
    padding: 0 30px 24px 30px;
    display: flex;
    font-weight: 500;
    justify-content: space-between;
    .more {
      color: @grey-l;
      font-size: 28px;
    }
  }
  .swiper-container {
    width: 750px;
    padding: 10px 30px;
  }
  &-item {
    box-shadow: 0px 4px 24px 0px rgba(184, 190, 204, 0.3);
    border-radius: 12px;
    flex: 0 0 572px;
    width: 572px;
    padding: 30px 20px;
    height: 272px;
    margin-right: 16px;
    .info {
      border-radius: 8px;
      display: flex;
      align-items: center;
      padding-bottom: 26px;
      img {
        width: 68px;
        height: 68px;
        object-fit: contain;
        margin-right: 16px;
        background-color: @bg;
        border-radius: 50%;
      }
      &-instr {
        color: @black-m;
        &-top {
          .name {
            font-size: 30px;
            font-weight: 500;
            padding-right: 16px;
          }
          .level {
            font-size: 22px;
          }
        }
        &-bottom {
          font-size: 22px;
        }
      }
      button.ask {
        position: absolute;
        right: 30px;
        color: @blue;
        background-color: @blue-l;
        width: 144px;
        height: 50px;
        border-radius: 25px;
        font-size: 24px;
      }
    }
    .brief {
      font-size: 26px;
      h4 {
        color: @blue;
        font-size: 26px;
        line-height: 40px;
      }
      &-text {
        font-size: 26px;
        color: @grey;
        .ellipsis-line(532px, 2);
      }
    }
  }
}
</style>
