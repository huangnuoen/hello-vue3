<template>
  <!--顶部状态栏-->
  <div class="title-bar-placeholder">
    <div class="title-bar" @click.stop="hide" @touchstart.stop>
      <!--返回上一页-->
      <div class="icon icon-back" @click="$router.go(-1)">
        <svg-icon icon-class="global_icon_back"></svg-icon>
      </div>
      <!--标题(自身标题权重大于传入的标题)-->
      <h1 class="title">{{config.title||$route.meta.title}}</h1>
      <!--菜单按钮-->
      <div
        class="icon icon-menu"
        v-if="config.hasMenu && $store.state.thirdParty !== '10000002'"
        :class="{ 'active': showMenu }"
        @click.stop="showMenu = !showMenu"
      >
        <ul class="bar-list">
          <li class="bar"></li>
          <li class="bar"></li>
          <li class="bar"></li>
          <li class="bar"></li>
          <li class="bar"></li>
        </ul>
        <!--下拉面板-->
        <ul class="drop-down" @click.stop>
          <li class="item" v-for="(item,i) in config.menu" :key="i" @click="tolink(item)">
            <svg-icon :icon-class="item.icon"></svg-icon>
            <span class="text">{{item.text}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'title-bar',
  props: {
    config: {
      type: Object,
      default() {
        return {
          title: '',
          hasMenu: false,
          menu: [
            {
              icon: 'global_icon_mine',
              text: '我的',
              link: '/mine'
            }
          ]
        }
      }
    }
  },
  data() {
    return {
      showMenu: false // 是否显示菜单
    }
  },
  methods: {
    hide() {
      this.showMenu = false
    },
    tolink(item) {
      this.showMenu = false
      if (item.link === this.$route.path) return
      this.$router.push(item.link)
    },
    setTitle(title) {
      this.title = title
    }
  },
  created() {
    this.setTitle(this.$route.meta.title)
    window.addEventListener('click', this.hide)
  },
  destroyed() {
    window.removeEventListener('click', this.hide)
  },
  mounted() {},
  watch: {
    $route(route) {
      this.setTitle(route.meta.title)
    }
  }
}
</script>

<style lang="less" scoped>
@image: '../../assets/images/';
.title-bar-placeholder {
  flex: 0 0 82px;
  height: 82px;
}
.title-bar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 82px;
  line-height: 80px;
  // border-bottom: 1px solid #eee;
  background-color: #fff;

  .title {
    height: 100%;
    padding: 0 100px;
    font-size: 30px;
    color: @black-d;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .icon {
    position: absolute;
    top: 0;

    &.active {
      .drop-down {
        opacity: 1;
        pointer-events: auto;
        transform: translate3d(0, 0, 0);

        .item {
          .icon,
          .text {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
      }
    }
    &.icon-back {
      left: 32px;
    }
    &.icon-menu {
      right: 0;
    }
    .drop-down {
      position: absolute;
      right: 8px;
      top: 100%;
      width: 160px;
      border-radius: 8px;
      margin-top: 18px;
      background-color: #414141;
      opacity: 0;
      pointer-events: none;
      transform: translate3d(0, -12px, 0);
      transition: all 0.35s;

      &:before {
        content: '';
        position: absolute;
        left: 117px;
        top: -12px;
        width: 0;
        height: 0;
        border-width: 0 12px 12px;
        border-style: solid;
        border-color: transparent transparent #333;
      }
      .item {
        position: relative;
        height: 68px;
        line-height: 68px;
        font-size: 26px;
        color: #b0b0b0;
        font-weight: 400;
        border-bottom: 1px solid #b0b0b0;
        padding-left: 20px;
        svg {
          font-size: 30px;
        }
        &:last-child {
          border-bottom: none;
        }
        &:nth-child(1) {
          .icon,
          .text {
            transition: all 0.2s ease;
          }
        }
        &:nth-child(2) {
          .icon,
          .text {
            transition: all 0.3s ease;
          }
        }
        &:nth-child(3) {
          .icon,
          .text {
            transition: all 0.4s ease;
          }
        }
        &:nth-child(4) {
          .icon,
          .text {
            transition: all 0.5s ease;
          }
        }
        .icon {
          position: absolute;
          left: 22px;
          top: 50%;
          width: 28px;
          height: 28px;
          margin-top: -17px;
          background-size: 100% 100%;
          opacity: 0;
          transform: translate3d(50px, 0, 0);
        }
        .text {
          position: absolute;
          left: 68px;
          opacity: 0;
          transform: translate3d(50px, 0, 0);
        }
      }
    }
  }
  .icon-back,
  .icon-menu {
    flex-shrink: 0;
    width: 80px;
    height: 100%;
  }
  .icon-back {
    svg {
      font-size: 40px;
    }
  }
  .icon-menu {
    &.active .bar-list .bar {
      &:nth-child(1) {
        opacity: 0;
        transform: rotate(135deg);
      }
      &:nth-child(2) {
        opacity: 0;
        left: -30px;
      }
      &:nth-child(3) {
        opacity: 0;
        transform: rotate(-135deg);
      }
      &:nth-child(4) {
        opacity: 1;
        transform: rotate(135deg);
      }
      &:nth-child(5) {
        opacity: 1;
        transform: rotate(-135deg);
      }
    }
    .bar-list {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 22px;
      height: 18px;
      margin: -9px 0 0 -11px;

      .bar {
        position: absolute;
        left: 0;
        width: 100%;
        height: 1px;
        opacity: 1;
        background-color: #4e4e4e;
        transform: rotate(0deg);
        transition: all 0.4s;

        &:nth-child(1) {
          top: 0;
        }
        &:nth-child(2),
        &:nth-child(4),
        &:nth-child(5) {
          top: 50%;
          transform: translateY(-50%);
        }
        &:nth-child(3) {
          bottom: 0;
        }
        &:nth-child(4) {
          opacity: 0;
          transform: rotate(0deg);
        }
        &:nth-child(5) {
          opacity: 0;
          transform: rotate(-0deg);
        }
      }
    }
  }
}
</style>
