<template>
  <div class="address-card" @click="$emit('select')">
    <div class="info">
      <span class="name bold">{{item.name}}</span>
      <span class="phone">{{item.phone}}</span>
    </div>
    <div class="address">{{item.province}} {{item.city}} {{item.area}} {{item.address}} </div>
    <button @click.stop="$emit('edit')">
      <svg-icon icon-class="global_icon_edit"></svg-icon>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  }
}
</script>
<style lang="less" scoped>
.address-card {
  position: relative;
  padding: 34px 120px 34px 30px;
  background-color: #fff;
  margin-bottom: 24px;
  .info {
    color: @black-d;
    font-size: 28px;
    padding-bottom: 8px;
    .name {
      font-size: 32px;
      padding-right: 28px;
    }
  }
  .address {
    color: @black-m;
    font-size: 26px;
  }
  button {
    position: absolute;
    right: 0px;
    top: 50%;
    width: 120px;
    height: 120px;
    transform: translateY(-50%);
    svg {
      font-size: 40px;
    }
  }
}
</style>
