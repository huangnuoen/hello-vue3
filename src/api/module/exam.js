import http from '../config'
const exam = {
  list(params) {
    return http({
      url: 'exam/list',
      params
    })
  },

  index(params) {
    return http({
      url: 'exam/index',
      params
    })
  },
  cover(exam_id) {
    return http({
      url: `exam/cover/exam_id=${exam_id}`
    })
  },
  resultList(params) {
    return http({
      url: 'exam/resultList',
      params
    })
  },
  question(exam_id) {
    return http({
      url: `exam/question/${exam_id}`
    })
  },

  submit(data) {
    return http({
      url: 'exam/submit',
      method: 'post',
      data,
      contentType: 'application/json;charset=UTF-8'
    })
  },

  result(result_id) {
    return http({
      url: `exam/result/${result_id}`
    })
  }
}
export default exam
