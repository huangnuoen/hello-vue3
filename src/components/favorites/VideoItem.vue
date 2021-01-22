<template>
  <div class="video-item disable favor-item" @click="$router.push(`video-detail?id=${item.id}`)">
    <div class="content">
      <div class="avatar">
        <img :src="item.img_cover||defaultGoods" class="avatar">
      </div>
      <div class="info">
        <h3>{{item.title}}</h3>
        <div class="text">
          <span>{{item.author.name}}</span>
          <span>{{item.author.is_doctor*1 ? item.author.hospital : item.author.introduction}}</span>
          <span v-if="item.author.is_doctor*1">{{item.author.department}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { GOODS_THESIS_STATUS } from '@/config/common'
import { SwipeCell } from 'vant'
export default {
  components: {
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
  }
}
</script>
<style lang="less" scoped>
.content {
  display: flex;
  background-color: #fff;
  padding: 32px 40px;
  border-bottom: 1px solid @border;
  &.disable {
    .avatar img,
    .info {
      opacity: 0.5;
    }
  }
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
    color: @black-d;
    h3 {
      font-size: 28px;
      font-weight: 500;
    }
    .text {
      span {
        padding-right: 10px;
      }
      font-size: 24px;
    }
  }
}
</style>
