// import * as types from './mutation-types'
// import api from '@/api'
// export const saveUserInfo = function({ commit, state }) {
//   if (state.user.id) {
//     return new Promise((resolve) => {
//       resolve(state.user)
//     })
//   } else {
//     return new Promise((resolve, reject) => {
//       api.user
//         .user_info_v2()
//         .then((res) => {
//           commit(types.SET_USER, res.data.user_info)
//           resolve(res.data.user_info)
//           if (res.code === 200) {
//           }
//         })
//         .catch((err) => {
//           console.log(err)
//         })
//     })
//   }
// }
