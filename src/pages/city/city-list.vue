<template>
  <transition name="slider">
    <div class="city-list-wrapper">
      <div class="city-list">
        <div class="location-city" ref="locationCity">
          <h4>当前城市</h4>
          <div class="active">
            <span @click="chooseCity(currentCity)">{{ currentCity.area_name }}</span>
          </div>
        </div>
        <div class="hot-city" ref="hotCity" v-show="hotCity.length">
          <h4>热门城市</h4>
          <div class="hot-city-list">
            <span :key="item.id" :class="{ active: item.id === currentCity.id }" @click="chooseCity(item)" v-for="item in hotCity">{{
              item.area_name
            }}</span>
          </div>
        </div>
        <ul class="all-city">
          <li class="all-city-item" :key="key" v-for="(val, key) in cityList" ref="listGroup">
            <h4 class="city-title">{{ key }}</h4>
            <ul>
              <li @click="chooseCity(item)" class="city-item" v-for="item in val" :key="item.id" :data-id="item.id">
                {{ item.area_name }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="list-shortcut" @touchstart="onShortcutTouchStart($event)" @touchmove.stop.prevent="onShortcutTouchMove($event)">
        <ul>
          <li ref="shortcut" :data-index="index" :key="index" class="item" v-for="(item, index) in shortcutList">
            {{ item }}
          </li>
        </ul>
      </div>
      <!-- <div class="list-fixed" v-show="fixedTitle">
        <h4 class="fixed-title">{{fixedTitle}}</h4>
      </div>-->
    </div>
  </transition>
</template>

<script>
import { mapMutations } from 'vuex'
// import { cityList } from '@/config/cityList'
export default {
  name: 'city-list',
  beforeRouteEnter(to, from, next) {
    // console.log(to, from, next)
    //申请成为合伙人过来的
    next((vm) => {
      if (from.name === 'partner') {
        vm.isPartnerFrom = true
      }
    })
  },
  data() {
    return {
      cityList: [],
      currentIndex: '',
      diff: '',
      scrollY: '',
      localCity: { area_name: '深圳市' },
      isPartnerFrom: false
    }
  },
  created() {
    this.touch = {}
    this.listHeight = []

    document.addEventListener('scroll', this.scroll)
  },
  beforeRouteLeave(to, from, next) {
    document.removeEventListener('scroll', this.scroll)
    next()
  },
  mounted() {
    this.$api.city.areas().then((res) => {
      if (res.code === 200) {
        this.cityList = res.data
      }
    })
  },

  methods: {
    back() {
      this.$router.back(-1)
    },

    chooseCity(item) {
      if (!item.id) return
      if (!item.name && !item.area_name) return
      if (this.hasChooseCity) {
        return
      }
      this.hasChooseCity = true

      if (this.isPartnerFrom) {
        this.isPartnerFrom = false
        this.setPartnerCity(item)
      } else {
        this.setCurCity(item)
      }

      this.back()
      setTimeout(() => {
        this.hasChooseCity = false
      }, 500)
    },
    // 触摸右侧栏时
    onShortcutTouchStart(e) {
      // 获取目标元素data-index
      const i = e.target.getAttribute('data-index')
      const firstT = e.touches[0]
      this.touch.y1 = firstT.clientY
      this.touch.anchorIndex = i
      this.scrollTo(this.touch.anchorIndex)
    },
    onShortcutTouchMove(e) {
      // 获取右侧入口单个索引高度
      const indexHeight = this.$refs.shortcut[0].clientHeight
      const firstT = e.touches[0]
      this.touch.y2 = firstT.clientY
      const delta = (this.touch.y2 - this.touch.y1) / indexHeight
      const index = parseInt(this.touch.anchorIndex) + Math.round(delta)
      this.scrollTo(index)
    },
    // 滚动到相应元素
    scrollTo(i) {
      if (!i && i !== 0) {
        return
      }
      // touchmove到Li区域外时
      if (i < 0) {
        i = 0
      } else if (i > this.listHeight.length - 3) {
        i = this.listHeight.length - 2
      }
      this.currentIndex = i
      window.scrollTo(0, this.listHeight[i])
    },
    // 计算左侧城市列表高度
    calculateHeight() {
      this.listHeight = []
      const list = this.$refs.listGroup
      const height1 = this.$refs.locationCity.clientHeight
      let height = height1 + this.$refs.hotCity.clientHeight
      this.listHeight.push(height1, height)
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    scroll() {
      this.scrollY = window.scrollY
    },
    ...mapMutations({
      setCurCity: 'SET_CUR_CITY',
      setPartnerCity: 'PARTNER_CITY_SELECT'
    })
  },
  computed: {
    hotCity() {
      var hotCity = []
      // 获取热门城市
      for (const key in this.cityList) {
        hotCity = hotCity.concat(
          this.cityList[key].filter((val) => {
            return val.is_hot === 1
          })
        )
      }
      return hotCity
    },
    shortcutList() {
      var shortcutList = []
      for (const key in this.cityList) {
        shortcutList.push(key)
      }
      if (shortcutList.length && this.hotCity.length) {
        shortcutList.unshift('热')
      }
      return shortcutList
    },
    fixedTitle() {
      return this.shortcutList[this.currentIndex]
    },
    currentCity() {
      // return this.$store.state.currentCity
      return this.isPartnerFrom ? this.$store.state.partnerCity : this.$store.state.currentCity
    }
  },
  watch: {
    cityList() {
      setTimeout(() => {
        this.calculateHeight()
      }, 20)
    }
  }
}
</script>

<style lang="less" scoped>
.city-list-wrapper {
  background: #fff;
  position: relative;
  .city-list {
    .location-city,
    .hot-city {
      padding: 0 30px;
      h4 {
        padding: 26px 0;
        color: #909090;
        font-size: 30px;
      }
      div {
        span {
          color: #4c4c4c;
          font-size: 28px;
          // line-height: 52px;
          padding: 6px 0;
          width: 116px;
          text-align: center;
          margin: 0 19px 20px 0;
          display: inline-block;
          border: 1px solid #e0e0e0;
          border-radius: 1px;
          &.active {
            border-color: @theme;
            color: @theme;
          }
        }
        &.active {
          span {
            border-color: @theme;
            color: @theme;
          }
        }
      }
    }
    .location-city {
      .active {
        span {
          width: auto;
          padding: 6px 28px;
        }
      }
    }
    .hot-city {
      h4 {
        padding-top: 10px;
      }
    }
    .all-city {
      .all-city-item {
        .city-title {
          font-size: 30px;
          color: #909090;
          height: 84px;
          line-height: 84px;
          padding: 0 30px;
          border-bottom: 1px solid #eee;
          margin-bottom: -1px;
        }
        ul {
          padding-left: 30px;
          border-bottom: 1px solid #eee;
          .city-item {
            height: 86px;
            line-height: 86px;
            border-top: 1px solid #eee;
            color: @black-m;
            font-size: 28px;
            &:first-child {
              border-top: none;
            }
          }
        }
      }
    }
  }
  .list-shortcut {
    position: fixed;
    z-index: 30;
    right: 0;
    top: 50%;
    color: @theme;
    font-size: 24px;
    transform: translateY(-50%);
    text-align: center;
    ul {
      .item {
        width: 42px;
        height: 34px;
        line-height: 34px;
        padding: 0 6px;
      }
    }
  }
  .list-fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 30;
    .fixed-title {
      font-size: 30px;
      color: #909090;
      height: 84px;
      line-height: 84px;
      padding: 0 30px;
      margin-bottom: -1px;
    }
  }
}
.slider-leave-active {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 30;
  transition: all 0.3s;
}
.slider-enter,
.slider-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
