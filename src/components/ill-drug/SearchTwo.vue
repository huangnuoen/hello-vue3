<template>
  <div class="top-search">
    <div class="left">
      <svg-icon class="search" iconClass="home_icon_search"></svg-icon>
      <input
        v-model="searchKey"
        :placeholder="`请输入您想搜索的${type === 1 ? '疾病' : '药品'}名称`"
        @keyup="enterSearch"
      />
      <img
        v-show="searchKey.length"
        src="@/images/ill-drug/global_icon_close@2x.png"
        alt
        @click="reset"
      />
    </div>
    <div class="right" @click="searchInfo">
      <span>搜索</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: Number,
      default: ''
    },
    str: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      searchKey: this.str
    }
  },
  watch: {
    str: function(newVal, oldVal) {
      this.searchKey = newVal
    },
    searchKey: function(newVal, oldVal) {
      this.$emit('changeKey', newVal)
    }
  },
  methods: {
    searchInfo() {
      this.$emit('searchInfo', this.searchKey)
    },
    reset() {
      this.searchKey = ''
    },
    enterSearch(e) {
      if (e.key === 'Enter') {
        this.searchInfo()
      }
    }
  }
}
</script>

<style lang='less' scoped>
.top-search {
  width: 750px;
  height: 120px;
  padding: 24px 30px;
  overflow: hidden;
  background: rgba(255, 255, 255, 1);
  .left {
    width: 602px;
    height: 72px;
    float: left;
    line-height: 72px;
    background: rgba(247, 247, 247, 1);
    border-radius: 30px;
    position: relative;
    input {
      width: 400px;
      height: 72px;
      font-size: 30px;
      color: #262626;
      padding: 0 16px;
    }
    .search {
      font-size: 32px;
      margin-left: 20px;
    }
    img {
      width: 32px;
      height: 32px;
      position: absolute;
      top: 20px;
      right: 32px;
    }
  }
  .right {
    width: 56px;
    height: 28px;
    font-size: 28px;
    margin: 22px 0;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(38, 38, 38, 1);
    line-height: 28px;
    float: right;
  }
}
</style>