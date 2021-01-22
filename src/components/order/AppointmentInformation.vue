<template>
  <div class="appointment-information">
    <div class="title">
      <div class="title-left">
        <p>预约信息</p>
        <p>可在购买后90天内填写预约信息</p>
      </div>
      <div class="title-right">
        <p>暂不填写</p>
        <img src="@/images/order/info-input-close.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'appointment-information'
}
</script>

<style lang="less" scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  .title-left {
    p {
      &:first-child {
        font-size: 30px;
        color: @black-d;
        font-weight: 500;
        font-family: @Medium;
        margin-bottom: 8px;
      }

      &:last-child {
        color: @grey;
        font-size: 24px;
        font-family: @Regular;
      }
    }
  }

  .title-right {
    display: flex;
    align-items: center;

    p{
        color: #FA9716;
        font-size: 28px;
        margin-right: 16px;
        font-weight: 500;
        font-style: 28px;
    }

    img {
      width: 32px;
      height: 32px;
    }
  }
}
</style>