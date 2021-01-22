<template>
  <div class="test-results">
    <div class="test-time">
      <div class="dot"></div>
      <p>完成测试时间：{{result.finish_time}}</p>
    </div>
    <div class="test-content">
      <div class="result">
        <p class="result_text">{{result.result.result_note}}</p>

        <img src="@/images/health/perfect_undeline.png" alt class="undeline_img" />
      </div>
      <div class="content-txt">{{result.result.show_note}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test-results',
  props: ['result'],
  components: {},
  mounted() {
  }
}
</script>

<style lang="less" scoped>
.test-results {
  width: 690px;
  border-radius: 8px;
  background-color: #fff;
  overflow: hidden;
  margin-top: 38px;

  .test-time {
    width: 100%;
    height: 72px;
    background-color: #40a9ff;

    display: flex;
    align-items: center;
    justify-self: start;
    padding-left: 30px;

    .dot {
      width: 12px;
      height: 12px;
      background: #fff;
      border-radius: 50%;
    }

    p {
      font-size: 24px;
      font-family: @STYuanti;
      color: #fff;
      font-size: 24px;
      margin-left: 10px;
    }
  }

  .test-content {
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;

    .result {
      width: 100%;
      height: 126px;
      margin-bottom: 26px;
      position: relative;
      background: url('~@/images/health/bg_blue.png') top left / 100% 100%;
      font-size: 40px;
      color: @black-d;
      display: flex;
      align-items: center;
      justify-content: center;

      .result_text {
        width: 610px;
        font-family: @Medium;
        font-weight: 500;
      }

      .undeline_img {
        position: absolute;
        left: 40px;
        bottom: -2px;
        width: 190px;
        height: 4px;
      }
    }

    .content-txt {
      font-size: 28px;
      color: @black-m;
      line-height: 48px;
      margin-bottom: 60px;
      padding: 0 36px;
    }
  }
}
</style>
