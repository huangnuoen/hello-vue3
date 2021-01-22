<template>
  <div class="goods-recommend">
    <div class="list skeleton" v-if="loading">
      <div class="col" v-for="item in 2">
        <div class="goods-item">
          <div></div>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="col" v-for="li in showList">
        <div class="goods-item" v-for="item in li" :key="item.id" @click="$router.push(`/goods/${item.id}`)">
          <img class="avatar" :src="item.img_cover||defaultGoods">
          <div class="text">
            <div class="name">
              <img src="../../images/mall/product_tag@2x.png" alt="" class="tag">
              {{item.title}}
            </div>
            <div class="shop">{{item.supplier_name}}</div>
            <div class="price">
              <span class="red">&yen; <em>{{item.selling_price}}</em></span>
              <span class="point">或{{item.score}}积分</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Empty v-show="!loading&&list&&!list.length" desc="当前分类暂无商品"></Empty>
  </div>
</template>
<script>
import Empty from '@/base/Empty/Empty'
export default {
  components: { Empty },
  props: {
    loading: Boolean,
    list: Array
  },
  data() {
    return {
      defaultGoods
    }
  },
  computed: {
    showList() {
      if (!this.list) {
        return [[], []]
      }
      const list1 = []
      const list2 = []
      this.list.forEach((item, index) => {
        index % 2 ? list2.push(item) : list1.push(item)
      })
      return [list1, list2]
    }
  }
}
</script>
<style lang="less" scoped>
@import url('~@/style/transtion.less');
.goods-recommend {
  padding: 0 23px;
  .skeleton {
    .col {
      .goods-item {
        height: 528px;
        background-color: #fff;
        animation: fade 1.2s infinite alternate;
        div {
          width: 100%;
          height: 334px;
          background-color: @border;
          border-radius: 24px 24px 0 0;
          margin-bottom: 10px;
        }
        span {
          display: inline-block;
          height: 34px;
          background-color: @bg;
          width: 80%;
          margin-top: 10px;
          margin-left: 10px;
        }
      }
    }
  }
  .list,
  .skeleton {
    display: flex;
    flex-direction: row;
    .col {
    }
    .goods-item {
      width: 334px;
      background-color: #fff;
      box-shadow: 0px 16px 24px 0px rgba(160, 169, 178, 0.06);
      border-radius: 24px;
      margin: 0 9px 18px;
      .avatar {
        border-radius: 24px 24px 0 0;
        width: 100%;
        height: 334px;
        object-fit: contain;
      }
      .text {
        padding: 0 16px 18px 16px;
        .tag {
          width: 60px;
          height: 32px;
          float: left;
          margin-right: 8px;
          margin-top: 2px;
        }
        .name {
          font-size: 26px;
          .ellipsis-line(100%, 2);
          color: @black-m;
        }
        .shop {
          font-size: 22px;
          color: @grey;
          padding: 10px 0 4px;
        }
        .price {
          font-size: 24px;
          .red {
            color: @red;
            font-weight: bold;
            em {
              font-size: 32px;
            }
          }
          .point {
            font-size: 22px;
            color: @grey;
            padding-left: 8px;
          }
        }
      }
    }
  }
  .empty {
  }
}
</style>
