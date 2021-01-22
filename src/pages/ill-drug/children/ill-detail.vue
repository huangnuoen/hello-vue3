<template>
  <div class="drug-detail-wraper">
    <div class="content">
      <div class="title">
        <p>{{ detailInfo.doc_title }}</p>
      </div>
      <div class="tips">
        <van-notice-bar
          :text="tips"
          :left-icon="require('@/images/ill-drug/global_icon_remind@2x.png')"
        />
      </div>
      <div class="summary">
        <div v-html="detailInfo.html_data"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { NoticeBar } from 'vant'
export default {
  name: 'illDetail',
  components: { [NoticeBar.name]: NoticeBar },
  data() {
    return {
      tips: '本信息仅供参考，不作为诊疗或就医、用药的依据!',
      detailInfo: {
        doc_sections: '',
        json_data: {}
      }
    }
  },
  created() {
    const params = {
      id: this.$route.params.id
    }
    // 请求
    this.$api.illDrug.illsDetail(params).then((res) => {
      if (res.code === 200) {
        this.detailInfo = res.data[0]
        const str = this.detailInfo.html_data.replace(/\\"/g, "'").replace(/\\'/g, "'")
        this.detailInfo.html_data = str
      }
    })
  },
  computed: {
    arr() {
      const arr = this.detailInfo.doc_sections.split(',')
      return arr.map((i) => i.trim())
    }
  }
}
</script>
<style lang="less">
.drug-detail-wraper {
  .content {
    background-color: rgba(255, 255, 255, 1);
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
      p {
        font-size: 52px;
        color: #fff;
        font-weight: bold;
      }
    }
    .summary {
      /deep/ .content_1 {
        padding: 0px 30px;
        .img {
          padding-left: 24px;
          height: 50px;
          font-size: 36px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(38, 38, 38, 1);
          line-height: 50px;
          position: relative;
          font-weight: bold;
          margin-top: 48px;
          &::after {
            content: '';
            background-color: #037cf7;
            width: 10px;
            height: 22px;
            border-radius: 3px;
            font-weight: bold;
            position: absolute;
            left: 0px;
            top: 13px;
          }
        }
        h3 {
          font-size: 1.17em;
          font-weight: bold;
        }
        .content_topp {
          padding: 30px 0px;
          box-shadow: 0px 1px 0px #f0f2f5;
          font-size: 34px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(64, 64, 64, 1);
          line-height: 56px;
          word-break: break-all;
        }
      }

      /deep/ ._thema {
        margin-left: 24px;
        font-size: 2em;
        font-weight: bold;
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
