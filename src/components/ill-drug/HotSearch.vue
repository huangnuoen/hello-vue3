<template>
  <div class="content">
    <div v-for="(item, index) in data" :key="index" class="box" @click="search(item.id)">
      <span>{{item.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: []
    },
    type: {
      type: String,
      default: ''
    }
  },
  methods: {
    search(id) {
      this.$router.push({
        path: this.type == '1' ? `/drug-detail/${id}` : `/ill-detail/${id}`
      })
    }
  }
}
</script>

<style lang='less' scoped>
.content {
  overflow: hidden;
  padding: 16px 30px;
  .box {
    float: left;
    margin: 16px 24px 24px 0px;
    background: rgba(247, 247, 247, 1);
    border-radius: 30px;
    padding: 12px 44px 12px 46px;
    font-size: 26px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(115, 115, 115, 1);
    line-height: 36px;
  }
}
</style>