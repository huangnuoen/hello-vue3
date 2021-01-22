<!-- 健康大真相-文章 -->
<template>
  <div class="truth-li">
    <div class="content" :class="[styles[type].class]">
      <span class="express"></span>
      <div class="title">
        <span>谣言</span>
        <p>盐水漱口能预防病毒感染？</p>
      </div>
      <p>盐水漱口有利于清洁口腔和咽喉，对于咽喉炎有帮助。但是新型冠状病毒侵犯的部位在呼吸道，漱口没有办法清洁呼吸道混合还是四大皆空</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'truth-li',
  props: {
    type: {
      type: String,
      default: '2'
    }
  },
  data() {
    return {
      styles: {
        1: {
          name: '谣言',
          class: 'fake'
        },
        2: {
          name: '可信',
          class: 'truth'
        },
        3: {
          name: '未知',
          class: 'unknown'
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/style/mixin.less';
.truth-li {
  width:454px;
  height:474px;
  position: relative;
  .express {
    position: absolute;
    height: 104px;
    width: 112px;
    top: -20px;
    right: 28px;
  }
  .content {
    height: 100%;
    width: 100%;
    background: #fff;
    margin-top: 20px;
    box-shadow:0px 4px 20px 0px rgba(0,0,0,0.08);
    border-radius:12px;
    &>p {
      font-size:28px;
      color:#8C8C8C;
      line-height:44px;
      margin: 30px 24px;
      box-sizing: content-box;
      text-align: justify;
      .ellipsis-line(406px, 4);
    }
  }
  .title {
    height: 238px;
    font-family:@Semibold;
    font-weight:600;
    padding: 0 24px;
    border-radius: 12px 12px 0 0;
    span {
      font-size:56px;
      line-height:100px;
      margin-top: 10px;
    }
    p {
      font-size:36px;
      line-height:50px;
    }
  }
  .fake {
    .express {
      background: url('~@/images/home/home_icon_fake.png') no-repeat center center / 100% 100%;
    }
    .title {
      color: #EB212B;
      background: url('~@/images/home/home_bg_fake.png') no-repeat center center / 100% 100%;
    }
  }
  .truth {
    .express {
      background: url('~@/images/home/home_icon_truth.png') no-repeat center center / 100% 100%;
    }
    .title {
      color: #1890FF;
      background: url('~@/images/home/home_bg_truth.png') no-repeat center center / 100% 100%;
    }
  }
  .unknown {
    .express {
      background: url('~@/images/home/home_icon_unknown.png') no-repeat center center / 100% 100%;
    }
    .title {
      color: #C26400;
      background: url('~@/images/home/home_bg_unknown.png') no-repeat center center / 100% 100%;
    }
  }
}
</style>
