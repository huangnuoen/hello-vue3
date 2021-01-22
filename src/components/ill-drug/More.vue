<template>
  <div class="more">
    <div class="top">
      <div
        class="box"
        :style="{backgroundColor: (type == 1 ? 'rgba(3, 124, 247, 1)' : 'rgba(19,194,194,1)')}"
      ></div>
      <div class="str">
        <span>相关推荐</span>
      </div>
    </div>
    <div class="content">
      <div @click="toTijian">
        <div class="left">
          <img src="@/images/ill-drug/welfare_icon_examination@2x.png" alt />
        </div>
        <div class="right">
          <div class="right-top">
            <span>购买体检</span>
          </div>
          <div class="right-buttom">
            <span>定期检查 防范未然</span>
          </div>
        </div>
      </div>
      <div v-if="type==1" class="two" @click="topClick">
        <div class="left">
          <img src="@/images/ill-drug/ency_icon_medicine@2x.png" alt />
        </div>
        <div class="right">
          <div class="right-top">
            <span>药品百科</span>
          </div>
          <div class="right-buttom">
            <span>丰富药品 用药指南</span>
          </div>
        </div>
      </div>
      <div v-else class="two" @click="topClick">
        <div class="left">
          <img src="@/images/ill-drug/ency_icon_disease@2x.png" alt />
        </div>
        <div class="right">
          <div class="right-top">
            <span>疾病百科</span>
          </div>
          <div class="right-buttom">
            <span>科学态度 正视疾病</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { jumpLink } from '@/utils/tool'
export default {
  props: {
    type: {
      type: Number,
      default: ''
    }
  },
  methods: {
    topClick() {
      this.$emit('toOther')
    },
    toTijian() {
      localStorage.setItem('illOrGrugType', this.type)
      setTimeout(() => {
        jumpLink({ url: window.daishuUrl })
      }, 0)
    }
  }
}
</script>

<style lang='less' scoped>
.more {
  margin: 62px 28px 0 30px;
  .top {
    overflow: hidden;
    .box {
      float: left;
      width: 10px;
      height: 22px;
      margin: 14px 12px 14px 0;
      background: rgba(3, 124, 247, 1);
      border-radius: 4px;
    }
    .str {
      float: left;
      span {
        height: 50px;
        font-size: 36px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(38, 38, 38, 1);
        line-height: 50px;
      }
    }
  }
  .content {
    margin-top: 24px;
    overflow: hidden;
    & > div {
      width: 336px;
      height: 176px;
      background: rgba(255, 255, 255, 1);
      border-radius: 12px;
      opacity: 0.98;
      float: left;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .two {
      margin-left: 18px;
    }
    .left {
      width: 72px;
      height: 72px;
      margin: 52px 24px 52px 28px;
      img {
        width: 100%;
      }
    }
    .right {
      flex: 1;
      .right-top {
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(25, 37, 61, 1);
        line-height: 30px;
      }
      .right-buttom {
        margin-top: 16px;
        font-size: 22px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(122, 133, 153, 1);
      }
    }
  }
}
</style>