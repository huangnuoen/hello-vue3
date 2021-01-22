<!-- 轮播 -->
<template>
  <div class="carousel">
    <van-swipe class="swiper" :autoplay="0" :indicator-color="theme">
      <van-swipe-item v-for="(group, key) in panelList" :key="key">
        <div class="icons">
          <div class="icon-item" v-for="item in group" :key="item.id" @click="link(item)">
            <img :src="item.icon" alt="" />
            <div class="text">{{ item.name }}</div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
import variable from '@/style/variable.less'
import { Swipe, SwipeItem } from 'vant'
export default {
  name: 'drug-class-entry',
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data() {
    return {
      panelList: {},
      theme: variable.theme
    }
  },
  mounted() {},
  methods: {
    link(item) {
      this.$emit('link', item)
    }
  },
  watch: {
    list(list) {
      const cnt = Math.ceil(list.length / 10)
      const panelList = {}
      for (let i = 0; i < cnt; i++) {
        panelList[i] = list.slice(i * 10, i * 10 + 10)
      }
      this.panelList = panelList
    }
  }
}
</script>
<style lang="less" scoped>
@import url("~@/style/mixin.less");
.carousel {
  padding: 16px 15px;
  background: #fff;
  .swiper {
    width: 720px;
    height: 352px;
    border-radius: 20px;
    .icons {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      .icon-item {
        flex: 0 0 20%;
        margin: 20px 0;
        text-align: center;
        img {
          width: 80px;
          height: 80px;
        }
        .text {
          font-size: 24px;
          // white-space: nowrap;
          color: @black-d;
          .ellipsis-line(100%,1)
          // text-align: center;
        }
      }
    }
  }
  /deep/ .van-swipe__indicators {
    .van-swipe__indicator {
      width: 8px;
      height: 8px;
      background: @border;
      opacity: 0.5;
    }
    .van-swipe__indicator--active {
      width: 22px;
      height: 8px;
      border-radius: 5px;
      opacity: 0.9;
    }
  }
}
</style>
