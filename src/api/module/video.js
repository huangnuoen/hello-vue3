import http from '../config'
const video = {
  list(params) {
    return http({
      url: 'video/list',
      params
    })
  },
  detail(id) {
    return http({
      url: `video/detail/${id}`
    })
  },
  comment(id, data = {}, method = 'post') {
    return http({
      url: `video/comment/${id}`,
      method,
      data
    })
  },
  commentList(id) {
    return http({
      url: `video/commentList/${id}`
    })
  }
}
export default video
