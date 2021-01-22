<template>
  <div class="cart-item">
    <van-swipe-cell>
      <div class="content">
        <!-- <van-checkbox icon-size="18px" :checked-color="variable.theme" v-model="item.checked" @change="$emit('change')"></van-checkbox> -->
        <BaseCheckbox :checked="checked" @change="change"></BaseCheckbox>
        <img :src="item.img_cover" onerror="this.src=defaultGoods" @click="$emit('select',item)">
        <div class="info" @click="$emit('select',item)">
          <h3>{{item.title}}</h3>
          <!-- <div class="select">
            <span class="text">sfs</span>
            <svg-icon icon-class="cart_icon_more_grey"></svg-icon>
          </div> -->
          <div class="info-footer">
            <!-- <BasePrice price="8888"></BasePrice> -->
            <div class="price">
              <span class="point">
                <em>{{item.score}}</em>积分
              </span>
              <span>或 &yen; {{item.price | G_formatPrice}}</span>
            </div>
            <!-- 计步器 -->
            <van-stepper @click.native.stop button-size="20px" integer input-width="32px" :max="max" @plus="plus"
              @minus="minus" @blur="blur" :value="item.num" async-change @change="onChange" />
          </div>
        </div>
      </div>
      <template #right>
        <!-- <van-button square text="删除" type="danger" class="delete-button" /> -->
        <button class="delete" @click.stop="$emit('delete',item)">删除</button>
      </template>
    </van-swipe-cell>
  </div>
</template>
<script>
import { SwipeCell, Stepper } from 'vant'
import BaseCheckbox from '@/base/BaseCheckbox/BaseCheckbox'
import BasePrice from '@/base/BasePrice/BasePrice'
import variable from '@/style/variable.less'
export default {
  name: 'cart',
  components: { [SwipeCell.name]: SwipeCell, [Stepper.name]: Stepper, BaseCheckbox, BasePrice },
  props: {
    item: Object,
    chosen: Array
  },
  data() {
    return {
      defaultGoods
    }
  },
  mounted() {},
  methods: {
    minus(e) {
      this.$emit('changeNum', { item: this.item, num: this.item.num - 1 })
    },
    plus(e) {
      this.$emit('changeNum', { item: this.item, num: this.item.num + 1 })
    },
    blur(e) {
      this.$emit('changeNum', { item: this.item, num: +e.target.value })
    },
    change(val) {
      // this.$emit('change', val)
      this.$emit('checked', this.item)
    },
    onChange(val, detail) {
      // 检查库存
      // this.item.cnt = val
    }
  },
  computed: {
    variable() {
      return variable
    },
    checked() {
      // return this.chosen.includes(this.item.id)
      return this.chosen.includes(this.item.id)
    },
    max() {
      // 设置步进器最大值，无限库存设为99，有库存则为库存值，最大不超过99
      if (this.item.is_infinite === 1) {
        return 99
      } else {
        return this.item.quantity > 99 ? 99 : this.item.quantity
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/style/mixin.less';
.cart-item {
  height: 212px;
  padding: 26px 0 32px;
  .content {
    display: flex;
    // height: 100%;
    padding-right: 18px;
    img {
      width: 140px;
      height: 140px;
      border-radius: 8px;
      margin-right: 16px;
      margin-left: 16px;
      object-fit: cover;
    }
    .info {
      position: relative;
      flex: 1;
      height: 150px;
      h3 {
        .ellipsis-line(500px, 2);
        font-size: 28px;
        color: @black-m;
      }
      .select {
        display: inline-block;
        font-size: 24px;
        color: @grey;
        background-color: @bg;
        padding: 4px;
        svg {
          margin-left: 10px;
        }
      }
      &-footer {
        width: 100%;
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: 0px;
        z-index: 10;
        .price {
          color: @grey;
          font-size: 24px;
          span {
            font-weight: 400;
          }
          .point {
            color: @orange;
            padding-right: 8px;
            font-weight: 500;
            em {
              font-weight: 500;
              font-size: 28px;
              padding-right: 4px;
            }
          }
        }
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
<style lang="less">
.van-stepper__input {
  font-size: 22px;
}
.van-stepper__minus,
.van-stepper__plus {
  transform: scale(0.6);
  background-color: transparent;
}
</style>
