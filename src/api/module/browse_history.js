import http from '../config'
const browse_history = {
  list(params) {
    return http({
      url: 'browse_history/browse_histories',
      params
    })
  },
  delete(data) {
    return http({
      url: 'browse_history/browse_history/batch_delete',
      method: 'post',
      data
    })
  }
}
export default browse_history
