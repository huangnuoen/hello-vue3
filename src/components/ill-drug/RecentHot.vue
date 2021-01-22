<template>
  <div class="recent">
    <div class="top">
      <div
        class="box"
        :style="{backgroundColor: (type == 1? 'rgba(3, 124, 247, 1)' : 'rgba(19,194,194,1)')}"
      ></div>
      <div class="str">
        <span>近期热点</span>
      </div>
    </div>
    <div class="content" v-if="type == 1">
      <div @click='toDetail(1,2336)'>
        <div class="img">
          <img src="@/images/ill-drug/ency_icon_blue1@2x.png" alt />
        </div>
        <div class="title">新型冠状病毒</div>
        <div class="des">抗击疫情 人人有责</div>
      </div>
      <div @click='toDetail(1,2479)'>
        <div class="img">
          <img src="@/images/ill-drug/ency_icon_blue2@2x.png" alt />
        </div>
        <div class="title">过敏性鼻炎</div>
        <div class="des">花粉季节 防预鼻炎</div>
      </div >
      <div @click='toDetail(1,3892)' class="three">
        <div class="img">
          <img src="@/images/ill-drug/ency_icon_blue3@2x.png" alt />
        </div>
        <div class="title">湿疹</div>
        <div class="des">春夏季容易频繁复发</div>
      </div>
    </div>
    <div class="content" v-else>
      <div @click='toDetail(2,47557)'>
        <div class="img">
          <img src="@/images/ill-drug/ency_icon_green1@2x.png" alt />
        </div>
        <div class="title">连花清瘟胶囊</div>
        <div class="des">清瘟解毒 宣肺泄热</div>
      </div>
      <div @click='toDetail(2,71880)'>
        <div class="img">
          <img src="@/images/ill-drug/ency_icon_green2@2x.png" alt />
        </div>
        <div class="title">双黄连口服液</div>
        <div class="des">金银花 黄芩 连翘</div>
      </div>
      <div @click='toDetail(2,5858)' class="three">
        <div class="img">
          <img src="@/images/ill-drug/ency_icon_green3@2x.png" alt />
        </div>
        <div class="title">布洛芬</div>
        <div class="des">解热镇痛类药品</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'recent-hot',
  props: {
    type: {
      type: Number,
      default: ''
    }
  },
  methods: {
    toDetail(i, id) {
      localStorage.setItem('illOrGrugType', this.type)
      this.$router.push({
        path: i === 2 ? `/drug-detail/${id}` : `/ill-detail/${id}`
      })
    }
  },
}
</script>

<style lang='less' scoped>
.recent {
  margin: 86px 28px 0 30px;
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
      float: left;
      margin-right: 16px;
      width: 220px;
      height: 224px;
      background: rgba(255, 255, 255, 1);
      border-radius: 12px;
      text-align: center;
      .img {
        width: 60px;
        height: 60px;
        margin: 44px auto 22px;
        img {
          width: 100%;
        }
      }
      .title {
        height: 40px;
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(38, 38, 38, 1);
        line-height: 40px;
      }
      .des {
        height: 40px;
        width: 100%;
        font-size: 22px;
        margin-top: 8px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(168, 176, 191, 1);
        line-height: 42px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .three {
      margin-right: 0;
    }
  }
}
</style>