<template>
  <div class="tab-bar" v-show="showTabBar && !loading">
    <template v-for="tab in tabBarList">
      <router-link v-if="!tab.redirect" class="tab" :to="tab.link" :key="tab.id" v-slot="{ href, route, navigate, isActive }">
        <a :href="href" @click="navigate" :class="[isActive && 'router-link-active']">
          <!-- 当tab的激活icon无法通过’router-link-active‘控制样式才需要activeIcon -->
          <!-- 优先用class控制svg样式 -->
          <svg-icon class-name="icon" :icon-class="isActive ? tab.activeIcon : tab.icon"></svg-icon>
          <span class="text">{{ tab.text }}</span>
        </a>
      </router-link>
      <!-- 跳转外链 -->
      <p v-else class="tab" @click="link_to(tab)" :key="tab.id">
        <a>
          <!-- 当tab的激活icon无法通过’router-link-active‘控制样式才需要activeIcon -->
          <!-- 优先用class控制svg样式 -->
          <svg-icon class-name="icon" :icon-class="tab.icon"></svg-icon>
          <span class="text">{{ tab.text }}</span>
        </a>
      </p>
    </template>
  </div>
</template>
<script>
import store from '@/store'
import { CHANNEL } from '@/config/common.js'

const companyConfig = {
  id: 5,
  icon: 'tabbar_icon_ent_def',
  activeIcon: 'tabbar_icon_tuanjian_sel',
  redirect: true, // 是否跳转外链
  text: '团检',
  link: '/mine'
}

export default {
  name: 'tab-bar',
  props: {},
  data() {
    return {
      loading: true,
      tabBarList: [
        {
          id: 0,
          icon: 'tabbar_icon_home_def',
          text: '首页',
          activeIcon: 'tabbar_icon_home_sel',
          link: '/home'
        },
        {
          id: 1,
          icon: 'tabbar_icon_shop_def',
          activeIcon: 'tabbar_icon_shop_sel',
          text: '商城',
          link: '/mall'
        },
        {
          id: 2,
          icon: 'tabbar_icon_heal_def',
          activeIcon: 'tabbar_icon_heal_sel',
          text: '健康',
          link: '/health'
        },
        {
          id: 3,
          icon: 'tabbar_icon_mine_def',
          activeIcon: 'tabbar_icon_mine_sel',
          text: '我的',
          link: '/mine'
        }
      ]
    }
  },
  created() {
    this.loading = true
    this.getUserInfo()
  },
  computed: {
    showTabBar() {
      return this.tabBarList.findIndex((item) => item.link === this.$route.path) > -1
    }
  },
  methods: {
    link_to(item) {
      window.location.href = item.link
    },
    getUserInfo() {
      let params
      if (store.state.channel === CHANNEL) {
        params = {
          with_point: 1,
          with_tijian: 1,
          channel: CHANNEL
        }
      } else {
        params = {
          with_point: 1,
          with_tijian: 1
        }
      }

      if (sessionStorage.getItem('zhongtai-userinfo')) {
        this.loading = false
        let company = JSON.parse(sessionStorage.getItem('zhongtai-userinfo')).company
        if (company && company.length !== 0) {
          let arr = this.tabBarList.slice()
          companyConfig.link = company.link_to
          companyConfig.text = company.sub_name
          this.tabBarList.splice(2, 0, companyConfig)
        }
        return
      }

      this.$store.dispatch('user/getUserInfo', { params: params, withoutLogin: true }).then((res) => {
        this.loading = false
        if (res.code === 200) {
          // 保存用户信息，为了团检用户进入时底部栏能早点出来不用再请求接口
          sessionStorage.setItem('zhongtai-userinfo', JSON.stringify(res.data))
          let company = res.data.company
          if (company && company.length !== 0) {
            let arr = this.tabBarList.slice()
            companyConfig.link = company.link_to
            companyConfig.text = company.sub_name
            this.tabBarList.splice(2, 0, companyConfig)
          }
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/style/mixin.less';
.tab-bar {
  position: fixed;
  bottom: 0px;
  left: 0;
  width: 100%;
  height: 100px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px -2px 8px 0px rgba(138, 145, 153, 0.1);
  border-top: 1px solid @border;
  display: flex;
  z-index: 1;
  box-sizing: content-box;
  .safe-padding-bottom(0px);
  .tab {
    flex: 1;
    text-align: center;
    font-size: 0;
    &.router-link-active {
      .icon,
      span {
        color: @theme;
        fill: currentColor;
      }
    }
    .text {
      font-size: 22px;
      color: @black-d;
    }
    .icon {
      height: 54px;
      width: 54px;
      margin: 10px 0 8px;
      fill: @black-l;
      font-size: 40px;
      svg {
        font-size: 58px;
      }
    }
    span {
      display: block;
      font-size: 20px;
      color: @black-l;
      line-height: 24px;
    }
  }
}
</style>
