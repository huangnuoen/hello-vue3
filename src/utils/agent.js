import api from '@/api'
import store from '@/store'


export const getAgentInfo = () => {

  if (store.state.user.authStatus) {

    Promise.all([api.user.agent_active_card_show(), api.user.agent_is_buy_card()]).then(res => {
      console.log(res)

      let homeShow
      let centerPartnerStatus
      let phone
      let end_day

      if (res[0].code === 200) {
        homeShow = res.data.show || 0
        end_day = res.data.end_day || ''
      }

      if (res[1].code === 200) {
        centerPartnerStatus = res[1].data.status || null
        phone = res[1].phone || ''
      }

      store.commit('SET_AGENT_INFO', {
        got: true,
        end_day,
        homeShow,
        centerPartnerStatus,
        phone
      })
    })
  }

}
