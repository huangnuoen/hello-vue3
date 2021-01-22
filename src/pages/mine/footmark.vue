<template>
  <div class="footmark">
    <header>
      <div v-if="editStatus">已选中 {{chosenGoods.length}} 个商品</div>
      <div v-else>共浏览 {{goodsList.length}} 个商品</div>
      <div class="btns" v-if="goodsList.length">
        <button v-show="!editStatus" @click="clearAll">清空</button>
        <button @click="toggleStatus">{{editStatus?'取消':'编辑'}}</button>
      </div>
    </header>
    <div class="list">
      <van-list v-if="goodsList.length" v-model="smallLoading" :immediate-check="false" :finished="finished"
        finished-text="没有更多了" @load="loadmore">
        <GoodsItem v-for="item in goodsList" :edit="editStatus" :chosen="chosenGoods" :item="item" :key="item.id"
          @link="toGoodsDetail" @select="selectTheGoods" @delete="deleteTheGoods">
        </GoodsItem>
      </van-list>
    </div>
    <!-- 底部栏 -->
    <SliderTranstion>
      <CartSubmitBar v-show="editStatus">
        <BaseCheckbox v-model="checkall" @change="selectAllGroup">全选</BaseCheckbox>
        <template slot="btns">
          <div>
            <button @click="batchDelete(chosenGoods)" class="red">删除</button>
          </div>
        </template>
      </CartSubmitBar>
    </SliderTranstion>
    <Empty desc="您还没有浏览记录哦~" v-show="!loading&&!goodsList.length">
      <button class="theme" @click="$router.push('/mall')">逛一逛</button>
    </Empty>
  </div>
</template>
<script>
import BaseCheckbox from '@/base/BaseCheckbox/BaseCheckbox'
import CartSubmitBar from '@/components/cart/CartSubmitBar'
import GoodsItem from '@/components/footmark/GoodsItem'
import Empty from '@/base/Empty/Empty'
import loadingMixin from '@/mixins/loadingMixin'
import SliderTranstion from '@/base/Transition/SliderTranstion'
import { removeInFlatArr, jumpLink } from '@/utils/tool'
import { List } from 'vant'
export default {
  components: {
    GoodsItem,
    BaseCheckbox,
    CartSubmitBar,
    SliderTranstion,
    Empty,
    [List.name]: List
  },
  mixins: [loadingMixin],
  data() {
    return {
      editStatus: false,
      chosenGoods: [],
      goodsList: [],
      smallLoading: false,
      finished: false,
      page: 1
    }
  },
  mounted() {
    this.syncBrowse()
    this.setLoading(true)
  },
  methods: {
    async syncBrowse() {
      if (this.$store.state.user.footmarkList.length) {
        const res = await this.$api.store.syncBrowse({ ids: this.$store.state.user.footmarkList })
        if (res.code === 200) {
          this.getBrowseList()
          this.$store.commit('user/CLEAR_FOOTMARK_LIST')
        }
      } else {
        this.getBrowseList()
      }
    },
    loadmore() {
      this.getBrowseList()
    },
    getBrowseList() {
      this.smallLoading = true
      this.$api.browse_history.list({ page: this.page }).then((res) => {
        this.smallLoading = false
        this.setLoading(false)
        if (res.code === 200) {
          this.goodsList = this.goodsList.concat(res.data.data)
          if (this.goodsList.length >= res.data.total) {
            this.finished = true
          }
          this.page++
        }
      })
    },
    toGoodsDetail(item) {
      // this.$router.push(`/goods/${item.app_resource_id}`)
      jumpLink({ url: item.detail_url })
    },
    toggleStatus() {
      this.editStatus = !this.editStatus
    },
    selectTheGoods(item) {
      const i = this.chosenGoods.indexOf(item.id)
      if (i > -1) {
        removeInFlatArr(this.chosenGoods, item.id)
      } else {
        this.chosenGoods.push(item.id)
      }
    },
    clearAll() {
      const list = this.goodsList.map((item) => {
        return item.id
      })
      this.batchDelete(list)
    },
    deleteTheGoods(item) {
      const list = [item.id]
      this.batchDelete(list)
    },
    batchDelete(list) {
      if (!list.length) {
        this.$toast('您还未选择商品')
        return
      }
      this.$dialog
        .confirm({
          message: `确定删除这${list.length}条记录？`,
          confirmButtonText: '删除',
          cancelButtonText: '再想想'
        })
        .then(() => {
          this.$toast.loading({ message: '删除中...' })
          this.$api.browse_history.delete({ ids: list }).then((res) => {
            if (res.code === 200) {
              this.$toast('删除成功')
              list.forEach((id) => {
                const i = this.goodsList.findIndex((item) => {
                  return item.id === id
                })
                this.goodsList.splice(i, 1)
                this.editStatus = false
              })
              this.chosenGoods = []
            } else {
              this.$toast(res.message)
            }
          })
        })
        .catch(() => {})
    },
    selectAllGroup(checked) {
      this.goodsList.forEach((goods, i) => {
        if (checked) {
          this.chosenGoods.push(goods.id)
          this.chosenGoods = [...new Set(this.chosenGoods)]
        } else {
          this.chosenGoods = []
        }
      })
    }
  },
  computed: {
    checkall: {
      get() {
        // 检查是否全选
        return this.chosenGoods.length === this.goodsList.length
      },
      set(val) {
        return val
      }
    }
  }
}
</script>
<style lang="less" scoped>
.footmark {
  position: relative;
  flex: 1;
  background-color: #fff;
  header {
    background-color: #fff;
    position: sticky;
    top: 80px;
    display: flex;
    justify-content: space-between;
    padding: 48px 32px;
    border-bottom: 1px solid @border;
    z-index: 10;
    div {
      font-size: 24px;
    }
    .btns {
      color: @theme;
      button {
        padding: 0 14px;
        font-weight: bold;
      }
    }
  }
  .list {
    padding-left: 32px;
    padding-bottom: 120px;
  }
}
.empty {
  button {
    width: 310px;
    height: 88px;
    background: rgba(240, 242, 242, 1);
    border-radius: 44px;
    font-size: 30px;
    margin-right: 10px;
    color: #606266;
    &.theme {
      color: @theme;
      background-color: @theme;
      color: #fff;
    }
  }
}
</style>
