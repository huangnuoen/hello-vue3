import http from '../config'
const labels = {
  list() {
    return http({
      url: "labels/list"
    })
  },
  like(like) {
    return http({
      url: "labels/like",
      params:{like}
    })
  }
}

export default labels
