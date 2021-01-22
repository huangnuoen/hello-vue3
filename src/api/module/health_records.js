import http from '../config'

const health_records = {
  familyList(params) {
    return http({
      url: 'user/family',
      params
    })
  },
  addFamily(data) {
    return http({
      method: 'post',
      url: 'user/family',
      data
    })
  },
  editFamily(data, id) {
    return http({
      method: 'put',
      url: `user/family/${id}`,
      data
    })
  },
  familyDetail(id) {
    return http({
      method: 'get',
      url: `user/family/${id}`,
    })
  },
  deleteFamily(id) {
    return http({
      method: 'delete',
      url: `user/family/${id}`,
    })
  },
}

export default health_records
