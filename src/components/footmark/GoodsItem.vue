<template>
  <div class="goods-item" :class="{edit}">
    <van-swipe-cell :disabled="edit">
      <BaseCheckbox v-show="edit" :checked="checked" @change="change"></BaseCheckbox>
      <div class="content">
        <!-- <van-checkbox icon-size="18px" :checked-color="variable.theme" v-model="item.checked" @change="$emit('change')"></van-checkbox> -->
        <div class="info" @click="change">
          <h3>{{item.title}}</h3>
          <div class="org">{{item.supplier_name}}</div>
          <div class="price"> &yen; <em>{{item.price | G_formatPrice}}</em></div>
        </div>
        <button class="link" @click.stop="$emit('link',item)">详情<svg-icon icon-class="order_icon_arrow1"></svg-icon>
        </button>
      </div>
      <template #right>
        <!-- <van-button square text="删除" type="danger" class="delete-button" /> -->
        <button class="delete" @click.stop="$emit('delete',item)">删除</button>
      </template>
    </van-swipe-cell>
  </div>
</template>
<script>
import BaseCheckbox from '@/base/BaseCheckbox/BaseCheckbox'

import { SwipeCell } from 'vant'

export default {
  components: { [SwipeCell.name]: SwipeCell, BaseCheckbox },
  props: {
    edit: Boolean,
    chosen: Array,
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  methods: {
    change(val) {
      // this.checked = val
      this.$emit('select', this.item)
    }
  },
  computed: {
    checked: {
      get() {
        return this.chosen.includes(this.item.id)
      }

    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/style/mixin.less';
.goods-item {
  position: relative;
  // padding: 24px 0;
  &.edit {
    .content .info {
      transform: translateX(60px);
    }
  }
  .base-checkbox {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.2s;
    left: 0px;
    margin-right: 32px;
  }
  .content {
    display: flex;
    .info {
      border-bottom: 1px solid @border;
      position: relative;
      transition: all 0.2s;
      padding: 24px 0;
      flex: 1;
      h3 {
        .ellipsis-line(500px, 2);
        font-size: 32px;
        color: @black-m;
      }
      .org {
        font-size: 22px;
        color: @grey;
      }
      .price {
        padding-top: 4px;
        color: @theme;
        font-size: 20px;
        em {
          font-weight: bold;
          font-size: 36px;
        }
      }
    }
    button.link {
      padding-right: 32px;
      font-size: 22px;
      border-bottom: 1px solid @border;
      color: @grey;
      align-self: flex-end;
      padding-bottom: 24px;
      svg {
        margin-left: 10px;
        font-size: 16px;
        vertical-align: baseline;
      }
    }
  }
  .delete {
    color: #fff;
    background-color: @red;
    height: 100%;
    padding: 0 20px;
  }
}
</style>
