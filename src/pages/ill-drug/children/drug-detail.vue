<template>
  <!-- 疾病百科 -->
  <div class="drug-detail-wraper">
    <div class="content">
      <div
        class="title"
        :style="{backgroundImage: detailInfo.properties === '处方药' ? 'url(' + require('@/images/ill-drug/bg_pink@2x.png') + ')' : 'url(' + require('@/images/ill-drug/bg_green@2x.png') + ')'}"
      >
        <div class="left">
          <img :src="require('@/images/ill-drug/ency_img_medecine@2x.png')" alt />
        </div>
        <div class="right">
          <p class="p1">{{ detailInfo.common_name }}</p>
          <p class="p2">{{ detailInfo.specifications }}</p>
        </div>
        <div
          class="chufang"
          :style="{background: detailInfo.properties === '处方药' ? 'rgba(218, 11, 76, 1)' : 'rgba(31,172,78,1)'}"
        >
          <span>{{ detailInfo.properties === '处方药' ? '处方药' : 'OTC'}}</span>
        </div>
      </div>
      <div class="tips">
        <van-notice-bar
          :text="this.tips"
          :left-icon="require('@/images/ill-drug/global_icon_remind@2x.png')"
        />
      </div>
      <div class="summary">
        <div class="tip">
          <div class="title">药品分类</div>
          <div class="content">{{ this.detailInfo.drugs_classification }}</div>
        </div>
        <div class="tip">
          <div class="title">生产厂商</div>
          <div class="content">{{ this.detailInfo.manufacturer }}</div>
        </div>
        <div class="tip">
          <div class="title">药品性质</div>
          <div class="content">{{ this.detailInfo.properties }}</div>
        </div>
        <div class="tip">
          <div class="title">相关疾病</div>
          <div class="content">{{ this.detailInfo.related_diseases }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { NoticeBar } from 'vant'
export default {
  name: 'DrugDetail',
  components: { [NoticeBar.name]: NoticeBar },
  data() {
    return {
      tips: '本信息仅供参考，不作为诊疗或就医、用药的依据!',
      detailInfo: {}
    }
  },
  mounted() {
    const params = {
      id: this.$route.params.id
    }
    // 请求
    this.$api.illDrug.drugsDetail(params).then((res) => {
      if (res.code === 200) {
        this.detailInfo = res.data[0]
      }
    })
  }
}
</script>
<style lang="less" scoped>
.drug-detail-wraper {
  background: rgba(255, 255, 255, 1);
  .content {
    > .title {
      height: 224px;
      width: 100%;
      background-image: url('./../../../images/ill-drug/bg_blue@2x.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center center;
      display: flex;
      align-items: center;
      padding-left: 30px;
      overflow: hidden;
      position: relative;
      .left {
        float: left;
        img {
          width: 112px;
          height: 112px;
        }
      }
      .right {
        float: left;
        margin-left: 24px;
        .p1 {
          font-size: 40px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          line-height: 56px;
        }
        .p2 {
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 34px;
        }
      }
      .chufang {
        position: absolute;
        width: 100px;
        height: 40px;
        top: 14px;
        right: 0;
        background: rgba(218, 11, 76, 1);
        border-radius: 20px 0px 0px 20px;
        font-size: 24px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 40px;
        text-align: center;
      }
    }
    .summary {
      padding: 0 30px;
      .tip {
        background: rgba(247, 247, 247, 1);
        border-radius: 12px;
        margin-top: 40px;
        width: 690px;
        padding: 24px 0 32px 24px;
        .title {
          padding-left: 24px;
          height: 50px;
          font-size: 36px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(38, 38, 38, 1);
          line-height: 50px;
          position: relative;
          font-weight: bold;
          &::after {
            content: '';
            background-color: rgba(19, 194, 194, 1);
            width: 10px;
            height: 22px;
            border-radius: 3px;
            font-weight: bold;
            position: absolute;
            left: 0px;
            top: 13px;
          }
        }
        .content {
          padding: 30px 0px 0 0;
          font-size: 34px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(64, 64, 64, 1);
          line-height: 56px;
        }
      }
    }
  }

  .foot {
    text-align: center;
    margin: 48px 0;
    p {
      font-size: 26px;
      color: #8c8c8c;
      line-height: 36px;
      margin-bottom: 8px;
    }
  }
}
</style>
