<template>
  <div class="appointment-location">
    <div class="content-box">
      <img class="position-img" src="@/images/order/position.png" alt="">
      <div class="position-txt">请于{{item.reservation.time}} 前往 深圳市福田区莲花路1120号 北京大学深圳医院</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'appointment-location',
  props: {
    item: Object
  }
}
</script>

<style lang="less" scoped>
.appointment-location {
  padding: 48px 36px;
  background-color: #fff;
  margin-bottom: 24px;

  .content-box {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .position-img {
      width: 64px;
      height: 64px;
      margin-right: 24px;
    }

    .position-txt {
      width: 596px;
      color: #0080ff;
      font-size: 26px;
      font-family: @Regular;
      line-height: 36px;
    }
  }
}
</style>
