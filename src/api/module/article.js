import http from '../config'
const article = {
  videoList(params) {
    return http({
      url: 'article/videoList',
      params
    })
  },
  detail(id) {
    return http({
      url: `article/detail/${id}`
    })
  },
  comment(id, data = {}, method = 'Post') {
    return http({
      url: `article/comment/${id}`,
      method,
      data
    })
  },
  list(params) {
    return http({
      url: 'article/list',
      params
    })
  },
  commentList(id) {
    return http({
      url: `article/commentList/${id}`
    })
  }
}
export default article
