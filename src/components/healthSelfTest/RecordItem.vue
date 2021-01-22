<template>
  <div class="record-item">
    <div class="title">
      <div class="big-dot"></div>
      <p>{{item.result.result_note}}</p>
    </div>
    <div class="content">{{item.result.show_note}}</div>
    <div class="time">
      <div class="dot"></div>
      <p>完成测试时间：{{item.finish_time}}</p>
    </div>
    <div class="btn-box">
      <div class="btn" @click="goResult">查看详情</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'record-item',
  props: ['item'],
  methods: {
    goResult() {
      if (this.item.result_id === null) {
      } else {
        this.$router.push({ path: `/test-result?id=${this.item.id}&examId=${this.item.exam_id}` })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.record-item {
  width: 690px;
  background: #fff;
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  margin-top: 30px;
  padding: 24px 30px;
  box-sizing: border-box;

  .title {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .big-dot {
      width: 30px;
      height: 30px;
      background: linear-gradient(180deg, rgba(255, 240, 118, 1) 0%, rgba(255, 174, 25, 1) 100%);
      border-radius: 50%;
      margin-right: 8px;
    }

    p {
      color: @black-d;
      font-size: 32px;
      font-weight: 500;
      font-family: @Medium;
    }
  }

  .content {
    font-size: 28px;
    font-family: @Regular;
    color: @black-m;
    line-height: 48px;
    margin-top: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .time {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 16px;
    font-size: 24px;
    font-family: @Regular;
    color: @grey;

    .dot {
      width: 12px;
      height: 12px;
      background: @theme;
      border-radius: 50%;
      margin-right: 8px;
    }
  }

  .btn-box {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 12px;

    .btn {
      width: 164px;
      height: 56px;
      background: #ffeecf;
      border-radius: 28px;
      text-align: center;
      line-height: 56px;
      color: #fa9716;
      font-weight: 500;
      font-size: 24px;
    }
  }
}
</style>
