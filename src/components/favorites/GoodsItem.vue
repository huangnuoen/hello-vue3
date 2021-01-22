<template>
  <div class="goods-item favor-item" :class="{disable:!item.is_valid}" @click="tolink">
    <!-- <van-swipe-cell> -->
    <div class="content">
      <div class="avatar">
        <img :src="item.img_cover||defaultGoods" alt="" class="avatar">
        <div class="tips" v-show="!item.is_valid">已失效</div>
      </div>
      <div class="info">
        <h3>{{item.title}}</h3>
        <BasePrice :price="item.selling_price" color="#262626"></BasePrice>
      </div>
    </div>
    <!-- <template #right>
        <button class="delete" @click.stop="$emit('delete',item)">取消收藏</button>
      </template>
    </van-swipe-cell> -->
  </div>
</template>
<script>
import { GOODS_THESIS_STATUS } from '@/config/common'
import BasePrice from '@/base/BasePrice/BasePrice'
import { SwipeCell } from 'vant'
export default {
  components: {
    BasePrice,
    [SwipeCell.name]: SwipeCell
  },
  data() {
    return {
      GOODS_THESIS_STATUS,
      defaultGoods
    }
  },
  props: {
    item: Object
  },
  methods: {
    tolink() {
      if (this.item.is_valid) {
        this.$router.push(`goods/${this.item.id}`)
      } else {
        this.$toast('商品已失效')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.disable {
  .content {
    .avatar img,
    .info {
      opacity: 0.5;
    }
  }
}
.content {
  display: flex;
  background-color: #fff;
  padding: 32px 40px;
  border-bottom: 1px solid @border;
  .avatar {
    position: relative;
    height: 140px;
    flex: 0 0 140px;
    border-radius: 8px;
    img {
      display: inline-block;
      width: 100%;
      height: 100%;
      background-color: @bg;
      object-fit: cover;
    }
    .tips {
      text-align: center;
      position: absolute;
      bottom: 0;
      left: 0;
      color: @grey;
      font-size: 22px;
      width: 140px;
      height: 40px;
      background: rgba(242, 242, 242, 1);
      border-radius: 0px 0px 8px 8px;
    }
  }
  .info {
    margin-left: 20px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
