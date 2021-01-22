<template>
  <div class="physical-examination" v-show="pageShow">
    <div class="top" @click="$router.go(-1)">
      <svg-icon class="return" iconClass="icon_arrow_lef"></svg-icon>
      <span>所有服务</span>
    </div>

    <main>
      <div class="main-content">
        <div class="item" v-for="(item, index) in allServiceList" :key="index" @click="linkto(item)">
          <img :src="item.pic_url" alt="" />
          <p>{{ item.title }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { jumpLink } from '@/utils/tool'

export default {
  name: 'physical-examination',
  data() {
    return {
      pageShow: false,
      allServiceList: []
    }
  },
  created() {
    this.getConfig()
  },
  methods: {
    getConfig() {
      this.$store.commit('SET_LOADING', true)

      this.$api.home.home_operation().then((res) => {
        if (res.code === 200) {
          this.allServiceList = res.data.home_operation_1 || []

          this.$store.commit('SET_LOADING', false)
          this.pageShow = true
        }
      })
    },
    linkto(item) {
      if (!item.target_url && !item.redirect_url) {
        this.$toast('暂未开放，敬请期待')
        return
      } else if (item.target_url) {
        jumpLink({ url: item.target_url })
      } else if (item.redirect_url) {
        jumpLink({ url: item.redirect_url })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.physical-examination {
  width: 100%;
  min-height: 100%;
  background-color: #f8f9fa;

  .top {
    padding: 40px 32px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #303233;
    .return {
      width: 40px;
      height: 40px;
      margin-right: 6px;
    }
    > span {
      font-size: 32px;
      font-family: @Semibold;
      font-weight: 600;
      color: #303233;
      line-height: 32px;
    }
  }

  main {
    padding: 0 32px;
    .main-content {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-wrap: wrap;
      background-color: #fff;
      box-shadow: 0px 8px 16px 0px rgba(160, 169, 178, 0.08);
      border-radius: 24px;
      padding-top: 40px;
      .item {
        width: 25%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        margin-bottom: 48px;

        img {
          margin-bottom: 18px;
          width: 80px;
          height: 80px;
        }

        p {
          font-size: 24px;
          font-family: @Regular;
          color: #3d3e40;
          line-height: 24px;
        }
      }
    }
  }
}
</style>