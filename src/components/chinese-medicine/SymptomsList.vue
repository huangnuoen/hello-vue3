<template>
  <div ref="content">
    <!-- level 为1只有一层数据，展示效果和2，3层的不一样 -->
    <div v-if="level === 1" class="van_tree_select van_tree_select1" :style="{ height: maxHeight }">
      <div class="tab" v-for="(tab, index) in details" :key="index" @click="toDetail(tab)">
        <span>{{ tab.name }}</span>
        <svg-icon class="arrow" icon-class="order_icon_arrow1"></svg-icon>
      </div>
    </div>
    <van-tree-select v-else class="van_tree_select" :height="maxHeight" :items="items" :main-active-index.sync="active">
      <template #content>
        <div class="tab-content" v-for="(items, index) in details" :key="index" v-show="+active === +index">
          <div v-if="+level === 2">
            <div class="tab-detail" v-for="(tab, idx) in items" :key="idx" @click="toDetail(tab)">
              <span>{{ tab.name }}</span>
              <svg-icon class="arrow" icon-class="order_icon_arrow1"></svg-icon>
            </div>
          </div>

          <div v-else>
            <div v-for="(tab, idx) in items" :key="idx">
              <h5 class="tab-title">
                <i></i>
                <span>{{ idx }}</span>
                <i></i>
              </h5>
              <div class="tab-detail" v-for="innerTab in tab" :key="innerTab.id" @click="toDetail(innerTab)">
                <span>{{ innerTab.name }}</span>
                <svg-icon class="arrow" icon-class="order_icon_arrow1"></svg-icon>
              </div>
            </div>
          </div>
        </div>
      </template>
    </van-tree-select>
  </div>
</template>

<style lang="less" scoped>
.van_tree_select {
  width: 100%;
  //   position: absolute;
  //   top: 260px;
  //   left: 0;
  //   right: 0;
  //   bottom: 0;
  overflow-y: auto;
  .van-sidebar-item--select {
    border-color: #fff;
    color: #1890ffff;
  }
}
.van_tree_select1 {
  background-color: #fff;
  padding: 0 30px;
  .tab {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 36px 0;
    border-top: solid 1px #e8e8e8ff;
    svg.arrow {
      color: @grey-l;
      font-size: 24px;
    }
    span {
      font-size: 32px;
      color: #404040ff;
    }
  }
  .tab:first-child {
    border-top: none;
  }
}
.tab-content {
  .tab-title {
    display: flex;
    align-items: center;
    span {
      flex: 0 0 auto;
      padding: 0 30px;
      font-size: 24px;
      color: #bfbfbfff;
    }
    i {
      height: 1x;
      flex-grow: 1;
      border-top: solid 1px #d8d8d8ff;
    }
  }
  .tab-detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0;
    span {
      font-size: 28px;
      color: #404040ff;
    }
    svg.arrow {
      color: @grey-l;
      font-size: 24px;
    }
  }
  padding: 40px;
}
</style>

<script>
import { TreeSelect, Icon } from 'vant'
export default {
  components: {
    [TreeSelect.name]: TreeSelect,
    [Icon.name]: Icon
  },
  props: {
    level: {
      default: 2
    },
    items: {
      default() {
        return [{ text: '分组 1' }, { text: '分组 2' }]
      }
    },
    details: {
      default() {
        return []
      }
    }
  },
  data() {
    return {
      active: 0,
      maxHeight: '0px'
    }
  },
  created() {
    this.$nextTick(() => {
      this.maxHeight = `${document.body.clientHeight - this.$refs.content.offsetTop}px`
      console.log(this.maxHeight)
    })
  },
  methods: {
    toDetail(params) {
      this.$emit('toDetail', params.id)
    }
  }
}
</script>