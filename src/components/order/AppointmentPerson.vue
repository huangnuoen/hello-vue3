<template>
  <div class="appointment-person">
    <div class="no-item">
      <div>
        <div class="item-name">服务机构</div>
        <div class="item-content">{{reservation.store_name}}</div>
      </div>
      <!--<div class="copy-btn">查看地图</div>-->
    </div>
    <div class="no-item">
      <div>
        <div class="item-name">预约时间</div>
        <div class="item-content">{{reservation.time}}</div>
      </div>
    </div>
    <div class="no-item">
      <div>
        <div class="item-name">预约人</div>
        <div class="item-content">{{reservation.name}}</div>
      </div>
    </div>
    <div class="no-item">
      <div>
        <div class="item-name">手机号码</div>
        <div class="item-content">{{reservation.mobile_phone}}</div>
      </div>
    </div>
    <div class="no-item">
      <div>
        <div class="item-name">机构地址</div>
        <div class="item-content">
          {{reservation.supplier.province+reservation.supplier.city+reservation.supplier.district+reservation.supplier.address}}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'appointment-person',
  props: {
    reservation: {
      type: Object,
      default: () => {
        return {
          mobile_phone: '',
          name: '',
          store_name: '',
          time: ''
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.appointment-person {
  width: 100%;
  background-color: #fff;
  padding: 30px;
  font-size: 26px;
  font-family: @Regular;
  color: @black-m;
  margin-bottom: 24px;

  .no-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;

    &:last-child {
      margin-bottom: 0;
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      &.copy-btn {
        width: 148px;
        height: 52px;
        background-color: #fff;
        justify-content: center;
        border-radius: 28px;
        border: 1px solid #ccc;
        line-height: 52px;
        font-size: 24px;
        color: @black-m;
      }

      > .item-name {
        margin-right: 72px;
        min-width: 110px;
      }
    }
  }
}
</style>
