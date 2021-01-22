<template>
  <div class="goods-info">
    <div class="notice-bar" v-if="+item.type === +GOODS_TYPE.PRESCRIPTION">此药品为处方药，需咨询医生开具处方购买</div>
    <!-- <van-swipe class="banner" :autoplay="3000" indicator-color="white" @change="onChange">
      <van-swipe-item>
        <img :src="item.img_cover" class="banner">
      </van-swipe-item>
      <van-swipe-item>
        <img :src="item.img_cover" class="banner">
      </van-swipe-item>
      <van-swipe-item>
        <img :src="item.img_cover" class="banner">
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">
          {{ current + 1 }}/4
        </div>
      </template>
    </van-swipe> -->
    <img :src="item.img_cover || defaultGoods" :data-goods-type="item.type" class="banner" />
    <section>
      <div class="price">
        <span class="new"
          >&yen; <em>{{ item.selling_price }}</em>
        </span>
        <span class="points">或 {{ item.score }}积分</span>
        <span class="old" v-if="item.original_price && +item.original_price > +item.selling_price">原价 &yen; {{ item.original_price }}</span>
      </div>
      <div class="name bold">{{ item.title }}</div>
      <div class="remark">{{ item.selling_point }}</div>
      <div class="bottom">
        <div class="addr" v-if="item.supplier && item.supplier.city">{{ item.supplier.city + ' ' + item.supplier.district }}</div>
        <div class="cnt" v-if="item.type !== GOODS_TYPE.SERVICE">运费: &yen; {{ item.delivery_fee }}</div>
        <div class="cnt">已售 {{ item.quantity_sold }}</div>
      </div>
    </section>
    <section class="org">
      <span class="label">服务机构</span>
      <span v-if="item.supplier">{{ item.supplier.name }}</span>
    </section>
    <section class="drug-tips" v-show="isDrug">
      <svg-icon icon-class="goods_icon_warning"></svg-icon>
      <div class="text">请仔细阅读药品的作用说明，并在药师指导下购买和使用。</div>
    </section>
    <DrugInfo :item="drug_info" v-if="drug_info"></DrugInfo>
    <!-- <section class="goods-detail" v-if="item.description">
      <h3 class="left-line">套餐详情</h3>
      <div class="description"> -->
    <!-- 暂时这么区分，后面都改成富文本 -->
    <!-- <div class="text" v-html="item.description">
        </div>
      </div>
    </section> -->
  </div>
</template>
<script>
import { GOODS_TYPE } from '@/config/common'
import { Swipe, SwipeItem } from 'vant'
import DrugInfo from '@/components/goods/DrugInfo'

export default {
  name: 'goods-info',
  components: { [Swipe.name]: Swipe, [SwipeItem.name]: SwipeItem, DrugInfo },
  data() {
    return {
      GOODS_TYPE,
      current: 0,
      defaultGoods
    }
  },
  props: {
    item: Object
  },
  methods: {
    onChange(index) {
      this.current = index
    }
  },
  computed: {
    isDrug() {
      return this.item.type === GOODS_TYPE.PRESCRIPTION || this.item.type === GOODS_TYPE.NON_PRESCRIPTION
    },
    drug_info() {
      return this.item.drug_info
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/pages/store/goods.less';
.banner {
  width: 100%;
  height: 400px;
  object-fit: contain;
  background-color: #fff;
  font-size: 0;
  display: block;
}
section {
  padding: 32px 30px;
  background-color: #fff;
  margin-bottom: 24px;
  &.org {
    span {
      font-size: 28px;
    }
  }
  .label {
    margin-right: 48px;
  }
  .price {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    .old {
      color: @grey-l;
      font-size: 24px;
      text-decoration: line-through;
    }
    .new {
      color: @orange;
      font-size: 28px;
      line-height: 52px;
      font-weight: 500;
      padding-right: 24px;
      em {
        font-size: 44px;
        padding-right: 8px;
        vertical-align: baseline;
      }
    }
    .points {
      font-size: 28px;
      color: @black-d;
      padding-right: 16px;
    }
  }
  .name {
    color: @black-d;
    font-size: 32px;
  }
  .remark {
    font-size: 24px;
    color: @grey;
    padding: 8px 0 24px;
  }
  .bottom {
    display: flex;
    font-size: 24px;
    justify-content: space-between;
    color: @grey;
    align-items: center;
    div {
      // flex: 1;
    }
  }
  .label {
  }
}
.drug-tips {
  color: @theme2;
  font-size: 24px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  svg {
    // font-size: 28px;
    transform: scale(1.3);
    margin-right: 20px;
  }
}
.goods-detail {
  img {
    width: 100%;
    object-fit: cover;
  }
}

.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 4px 20px;
  font-size: 24px;
  color: #fff;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 32px;
}
.notice-bar {
  position: sticky;
  top: 80px;
  font-size: 26px;
  text-align: center;
  width: 100%;
  height: 76px;
  background: rgba(240, 249, 255, 1);
  color: #40a9ff;
  padding: 20px 0;
}
</style>
<style lang="less">
.description {
  img {
    width: 100%;
    object-fit: cover;
  }
  .text {
    white-space: pre-wrap;
    word-break: break-all;
  }
}
</style>
