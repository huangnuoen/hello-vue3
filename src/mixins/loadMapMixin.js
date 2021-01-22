const SECOND = 1000
const MIN = 60 * SECOND
const HOUR = 60 * MIN
const DAY = 24 * HOUR
const loadMapMixin = {
  mounted() {
    // 百度地图异步加载回调处理
    this.loadScript()
    window.onBMapCallback = () => {
      this.getLocation()
    }
  },
  methods: {
    refresh() {
      location.reload()
      // this.$router.replace({ path: '/redirect' + this.$route.fullPath })
    },
    loadScript() {
      if (!window.BMap || !window.BMap.Geolocation) {
        var script = document.createElement('script')
        script.src = '//api.map.baidu.com/api?v=2.0&ak=t2jUoVkKPPUY3zI2peMuApXT&callback=onBMapCallback'
        document.body.appendChild(script)
      } else {
        this.getLocation()
      }
    },
    getLocation() {
      const expires = this.$store.state.popup.localCityExpires
      const now = new Date().getTime()
      const overdue = expires ? expires < now : true
      // 定位是否过有效期
      if (!overdue && this.$store.state.localCity) {
        return
      }
      const vm = this
      var geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition(function (res) {
        if (this.getStatus() === BMAP_STATUS_SUCCESS) {
          const area_name = res.address.city.substr(0, res.address.city.length - 1)
          const {
            lat,
            lng
          } = res.point
          vm.$store.commit('SET_LOCAL_POINT', {
            lat,
            lng
          })
          vm.$store.commit('popup/SET_LOCAL_CITY_EXPIRES', now + HOUR * 1)
          vm.$api.city
            .position({
              name: area_name
            })
            .then((res) => {
              if (res.code === 200) {
                vm.$store.commit('SET_LOCAL_CITY', res.data)
                vm.showPopup(res.data)
              }
            })
        } else {
          vm.$toast('定位失败，请手动切换城市')
        }
      })
    },
    showPopup(localCity) {
      const vm = this
      // 当前城市不同时，判断是否过期
      const expires = this.$store.state.popup.toggleCityExpires
      const now = new Date().getTime()
      const overdue = expires ? expires < now : true
      // 这个判断为了兼容上版本currentcity.id默认200的bug， 2021.1.24后就可以删掉
      // 当area_name都是深圳时不弹框
      if (this.$store.state.currentCity.area_name.indexOf('深圳') > -1 && localCity.area_name.indexOf('深圳') > -1) {
        return
      }
      if (this.$store.state.currentCity.id !== localCity.id && overdue) {
        // 过期时间为1天
        const expires = now + DAY * 1
        this.$store.commit('popup/SET_TOGGLE_CITY_EXPIRES', expires)
        this.$dialog
          .confirm({
            title: '',
            message: '当前城市与定位城市不同，是否切换到定位城市'
          })
          .then(() => {

            // console.log(11)
            vm.$store.commit('SET_CUR_CITY', localCity)

            vm.$store.commit('PARTNER_CITY_SELECT', localCity)
            vm.refresh()
          })
          .catch(() => {
            // on cancel
          })
      }
    }
  }
}
export default loadMapMixin
