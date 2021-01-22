<!--
 * @Author: Tan Xuan
 * @Date: 2020-09-22 15:34:36
 * @LastEditTime: 2020-09-23 18:25:45
 * @LastEditors: Tan Xuan
 * @Description: 中医百科-快速搜索
-->
<template>
  <div class="search">
    <div class="box">
      <van-search v-model="keyword" shape="round" @input="onSearch" @clear="onClear" @cancel="onCancel" show-action :placeholder="placeholder" />
      <van-cell-group class="list-box" v-if="showList">
        <van-cell v-for="(item, index) in chooseList" :key="index" :title="item.name" @click="chooseItem(item)" is-link />
      </van-cell-group>
    </div>
    <div class="overlow" v-if="showList && options.overflow"></div>
  </div>
</template>
<script>
import { Search, CellGroup, Cell } from 'vant'
import { debounce } from '@/utils/tool'
export default {
  name: 'medicine-search',
  components: {
    [Search.name]: Search,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell
  },
  props: {
    placeholder: {
      type: String,
      default: '请输入搜索关键词'
    },
    tab: {
      type: String,
      default: '疾病百科'
    },
    // options: {
    //   overflow: true // 遮罩
    // }
    options: {
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      keyword: '',
      showList: false,
      chooseList: []
    }
  },
  created() {
    this.onSearch = debounce(this.doSearch, 500)
    let { keyword } = this.$route.query
    this.keyword = keyword
  },
  methods: {
    // 搜索词条列表
    searchList() {
      let params = {
        tab: this.tab,
        keyword: this.keyword
      }
      if (!this.keyword) return false
      this.$api.chinese_medicine.search(params).then((res) => {
        const { code, data, message } = res
        if (code !== 200) {
          this.$toast(message)
        } else {
          this.chooseList = data
          this.showList = !!this.chooseList.length
        }
      })
    },
    // 搜索
    doSearch() {
      this.searchList()
    },
    // 选择词条
    chooseItem(item) {
      const { id, name } = item
      this.keyword = name
      this.$emit('chooseId', id)
      this.showList = false
    },
    onClear() {
      this.keyword = ''
      this.showList = false
    },
    // 点击取消
    onCancel() {
      // console.log(this.$route)
      this.keyword = ''
      if (this.$route.name === 'chinese-medicine-list') {
        this.showList = false
      } else {
        this.$router.back()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.search {
  position: relative;
}
.box {
  position: relative;
  z-index: 4;
}
.overlow {
  z-index: 3;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
}
.list-box {
  position: absolute;
  background-color: #fff8ef;
  top: 108px;
  left: 0;
  right: 0;
  z-index: 1;
  max-height: 340px;
  overflow: hidden;
  overflow-y: auto;

  .item {
    padding: 10px 16px;
    font-size: 15px;
    color: @black-m;

    &:first-of-type {
      margin-top: 6px;
    }
    &:last-of-type {
      margin-bottom: 6px;
    }
  }
}
</style>