<template>
  <div class="search-drug">
    <form action="/">
      <van-search v-model="product_name" autofocus shape="round" placeholder="搜索药品名称" @search="onSearch"
        @cancel="onCancel" show-action>
        <!-- <template #action>
          <div @click="onSearch">{{product_name?'搜索':'取消'}}</div>
        </template> -->
      </van-search>
    </form>
    <section class="keys-wrap" v-if="!showResult">
      <div class="hot keys" v-show="hotKeyList.length">
        <h3>
          <span class="title">热门搜索</span>
          <svg-icon icon-class="global_icon_hot"></svg-icon>
        </h3>
        <div class="key-list">
          <SearchKey :text="item" v-for="item in hotKeyList" @click.native="chooseKey(item)"></SearchKey>
        </div>
      </div>
      <div class="history keys" v-show="historyList.length">
        <h3>
          <span class="title">搜索记录</span>
          <svg-icon icon-class="global_icon_del" @click="deleteHistory"></svg-icon>
        </h3>
        <div class="key-list">
          <SearchKey :text="item" v-for="item in historyList" @click.native="chooseKey(item)"></SearchKey>
        </div>
      </div>
    </section>
    <div class="search-result" v-else>
      <van-dropdown-menu :active-color="variable.theme" v-show="goodsList.length">
        <van-dropdown-item v-model="searchParams.order_type" :options="sortList" @change="chooseSort" />
      </van-dropdown-menu>
      <van-list v-if="goodsList.length" v-model="smallLoading" :immediate-check="false" :finished="finished"
        :finished-text="finishText" @load="onLoad">
        <GoodsItem v-for="item in goodsList" :item="item" :key="item.id" @click.native="toGoods(item)"></GoodsItem>
      </van-list>
      <Empty v-else-if="!loading" desc="暂未搜索到相关结果~" style="paddingTop:50px"></Empty>
    </div>

  </div>
</template>
<script>
import { Search, DropdownMenu, DropdownItem, List } from 'vant'
import variable from '@/style/variable.less'
import Empty from '@/base/Empty/Empty'
import * as types from '@/store/mutation-types'
import loadingMixin from '@/mixins/loadingMixin'
import GoodsItem from '@/components/mall/GoodsItem'
import DropMenu from '@/components/mall/DropMenu'
import SearchKey from '@/components/search/SearchKey'
import goodsListMixin from '@/mixins/goodsListMixin'

export default {
  name: 'search-drug',
  mixins: [loadingMixin, goodsListMixin],
  components: {
    [List.name]: List,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Search.name]: Search,
    SearchKey,
    GoodsItem,
    DropMenu,
    Empty
  },
  data() {
    return {
      variable,
      showResult: false,
      product_name: '',
      hotKeyList: []
    }
  },
  mounted() {
    this.getHotkey()
  },
  methods: {
    getHotkey() {
      this.$api.store.hot_keywords().then(res => {
        if (res.code === 200) {
          this.hotKeyList = res.data.hotKeyWord
        }
      })
    },
    getGoodsList(params) {
      this.finished = false
      this.smallLoading = true
      if (!this.goodsList.length) {
        this.setLoading(true)
      }

      this.$api.store.products({ params: { ...this.$route.query, ...params, page: this.page } }).then((res) => {
        this.smallLoading = false
        this.setLoading(false)
        if (res.code === 200) {
          this.goodsList = this.goodsList.concat(res.data.data)
          if (this.goodsList.length >= res.data.total) {
            this.$nextTick(() => {
              this.finishText = document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) ? '没有更多了~' : ''
            })
            this.finished = true
          } else {
            this.page++
          }
        }
      })
    },

    chooseKey(item) {
      this.onSearch(item)
    },
    onCancel() {
      if (this.showResult) {
        this.showResult = false
      } else {
        this.$router.back()
      }
    },
    onSearch(item) {
      if (!item) return
      this.product_name = item
      this.showResult = true
      this.page = 1
      this.goodsList = []
      this.$store.commit('search/ADD_DRUG_HISTORY', item)
      this.searchParams.product_name = item
      this.searchParams.order_type = ''
      this.getGoodsList(this.searchParams)
    },
    deleteHistory() {
      this.$dialog
        .confirm({
          message: '确定清空搜索记录？',
          confirmButtonText: '清空',
          cancelButtonText: '再想想'
        })
        .then(async () => {
          this.$store.commit('search/CLEAR_DRUG_HISTORY')
        })
        .catch(() => {})
    }
  },
  computed: {
    historyList() {
      return this.$store.state.search.drugHistory
    }
  }
}
</script>
<style lang="less" scoped>
@top: 80px;
.search-drug {
  flex: 1;
  background-color: #fff;
  form {
    position: sticky;
    top: @top;
    z-index: 10;
    background-color: #fff;
    border: none;
    border: 1px solid transparent;

  }
  .keys-wrap {

    .keys {
      padding: 0 30px 5px;
      &.history {
        h3 {
          display: flex;
          justify-content: space-between;
        }
      }
      h3 {
        .title {
          font-size: 30px;
          font-weight: 500;
          padding-right: 8px;
        }
        svg {
          font-size: 32px;
        }
        padding: 16px 0;
      }
      .key-list {
        display: flex;
        flex-wrap: wrap;
        max-height: 160px;
        overflow: hidden;
      }
    }
  }
  .search-result {
    position: relative;
    padding: 0 30px;
    .van-dropdown-menu {
      background-color: #fff;
      top: @top+100px;
      position: sticky;
      z-index: 10;

    }
  }
}
</style>
