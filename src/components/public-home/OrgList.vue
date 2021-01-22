<template>
  <div class="org-list" v-if="orgs.length">
    <ic-slider :autoplay="0" class="my-swipe">
      <ic-slider-item v-for="(item, index) in orgs" :key="index">
        <div class="org-item" v-for="orgItem in item" :key="orgItem.id" @click="linkto(orgItem)" :stop-propagation="false">
          <div class="img-box">
            <img :src="orgItem.small_pic_url" alt="" />
          </div>
          <div class="item-content">
            <p class="org-name">{{ orgItem.name }}</p>
            <div class="org-address">
              <p>{{ orgItem.address }}</p>
              <p v-show="orgItem.distance">{{ orgItem.distance }}km</p>
            </div>
            <div class="lable">
              <div class="lable-item" v-for="(org_tags_item, index) in orgItem.org_tags" :key="index">{{ org_tags_item }}</div>
            </div>
            <div class="money-packages">
              <div class="money">
                &yen; <i>{{ orgItem.min_price / 100 }}</i> 起
              </div>
              <div class="packages">体检套餐：{{ orgItem.count_package }}个</div>
            </div>
          </div>
        </div>
      </ic-slider-item>
    </ic-slider>
  </div>
</template>

<script>
import 'vue-better-slider/style.css'

import { Icon, Swipe, SwipeItem } from 'vant'
import { IcSlider, IcSliderItem } from 'vue-better-slider'
export default {
  props: {
    orgs: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    [Icon.name]: Icon,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    IcSlider,
    IcSliderItem
  },
  methods: {
    linkto(item) {
      this.$emit('linkto', item)
    }
  }
}
</script>

<style lang="less" scoped>
.org-list {
  padding: 0 30px 20px;
  width: 100%;
  .my-swipe {
    width: calc(100vw - 60px);
    padding-bottom: 20px;
    .org-item {
      width: 100%;
      background: #ffffff;
      box-shadow: 0px 8px 16px 0px rgba(160, 169, 178, 0.06);
      border-radius: 24px;
      padding: 24px 24px 20px;
      margin-bottom: 16px;

      display: flex;
      align-items: flex-start;
      justify-content: flex-start;

      .img-box {
        width: 80px;
        height: 80px;
        margin-right: 12px;

        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: contain;
        }
      }

      .item-content {
        flex: 1;
        height: 100%;

        .org-name {
          width: 100%;
          min-height: 28px;
          font-size: 28px;
          font-family: @Semibold;
          font-weight: bold;
          color: @black-m;
          .ellipsis-line(100% , 1);

          margin-bottom: 4px;
        }

        .org-address {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 24px;
          font-size: 24px;
          font-family: @Regular;
          color: @grey;
          margin-bottom: 10px;

          p {
            font-size: 24px;
            &:first-child {
              .ellipsis-line(416px , 1);
            }
          }
        }

        .lable {
          width: 100%;
          min-height: 32px;
          display: flex;
          align-items: center;
          justify-content: flex;
          margin-bottom: 16px;
          .lable-item {
            background: rgba(24, 144, 255, 0.1);
            border-radius: 4px;
            font-size: 20px;
            font-family: @Medium;
            font-weight: 500;
            color: @blue;
            padding: 4px 8px;
            margin-right: 7px;
          }
        }

        .money-packages {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          min-height: 28px;
          .money {
            font-size: 24px;
            font-family: @Semibold;
            color: #fa541c;
            vertical-align: bottom;
            i {
              font-size: 32px;
              font-style: initial;
              font-weight: bold;
            }
          }
          .packages {
            font-size: 22px;
            font-family: @Medium;
            font-weight: 500;
            color: #13c2c2;
          }
        }
      }
    }

    /deep/ .ic-slider__indicators{
      bottom: 1px;

      i{
        border-radius: 50% !important;
      }

      .ic-slider__indicator--active{
        background-color: @theme !important;
      }
    }
  }
}
</style>