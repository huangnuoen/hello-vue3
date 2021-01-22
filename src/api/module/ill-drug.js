import http from '../config'
const illDrug = {
  searchDrug(params) {
    return http({
      url: 'baike/search/drugs',
      params,
      method: 'post'
    })
  },
  searchIll(params) {
    return http({
      url: 'baike/search/disease',
      params,
      method: 'post'
    })
  },
  drugsDetail(params) {
    return http({
      url: 'baike/detail/drugs',
      params,
      method: 'get'
    })
  },
  illsDetail(params) {
    return http({
      url: 'baike/detail/disease',
      params,
      method: 'get'
    })
  }
}

export default illDrug
