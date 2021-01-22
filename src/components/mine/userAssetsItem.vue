<template>
  <div class="userAssetsItem_box" @click="linkTo">
    <p class="nums">{{items.itemNums}}</p>
    <p class="names">{{items.itemNames}}</p>
  </div>
</template>

<script>
export default {
  name: 'userAssetsItem',
  props: {
    items: Object
  },
  methods: {
    linkTo() {
      if (this.items.itemLink === '') {
        this.$toast('暂未开放')
      } else {
        window.location.href = this.items.itemLink
      }
    }
  }
}
</script>

<style lang="less" scoped>
.userAssetsItem_box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: @black-d;

  .nums {
    font-size: 36px;
    font-weight: 500;
    margin-bottom: 4px;
  }

  .names {
    font-size: 24px;
  }
}
</style>
