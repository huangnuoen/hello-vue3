import api from '@/api'
import { Toast } from 'vant'
import store from '@/store'
// 百度地图异步加载回调处理
window.onBMapCallback = function() {
  console.log('百度地图脚本初始化成功...')
  const BMap = window.BMap
  // getLocalInfo(BMap)

  localStorage.setItem(
    'myLocationInfo',
    JSON.stringify({
      city_name: store.state.currentCity.area_name.replace('市', ''),
      city_id: store.state.currentCity.id,
      area_code: store.state.currentCity.area_code,
      date: Math.floor(new Date().getTime() / 1000)
    })
  )
}

function getLocalInfo(BMap) {
  var geolocation = new BMap.Geolocation()
  geolocation.getCurrentPosition(
    function(res) {
      if (this.getStatus() === window.BMAP_STATUS_SUCCESS) {
        let area_name = res.address.city.substr(0, res.address.city.length - 1)
        area_name = '广州'
        const { lat, lng } = res.point
        api.api
          .get_cityId_by_name({
            company_id: 0,
            area_name
          })
          .then((res) => {
            if (res.code === 200) {
              const id = res.data
              const myLocationInfo = {
                id,
                area_name,
                lat, // 纬度
                lng // 经度
              }
              console.log('定位中', myLocationInfo)
              store.commit('SET_CUR_CITY', myLocationInfo)
              sessionStorage.setItem('myLocationInfo', JSON.stringify(myLocationInfo))
            }
          })
      } else {
        Toast.fail('定位失败，请手动切换城市')
      }
    },
    function(res) {
      Toast.fail('定位失败，请手动切换城市')
    }
  )
}
