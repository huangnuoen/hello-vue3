import http from '../config'
const qa = {
  answers(params) {
    return http({
      url: 'qa/answers',
      params
    })
  },
  questions({ id = 0, params }) {
    if (id === 0) {
      return http({
        url: 'qa/questions',
        params
      })
    } else {
      return http({
        url: `qa/questions/${id}`
      })
    }
  },
  question_uncollect(question_id) {
    return http({
      url: 'qa/question/uncollect',
      method: 'post',
      data: {
        question_id
      }
    })
  },
  question_collect(question_id) {
    return http({
      url: 'qa/question/collect',
      method: 'post',
      data: {
        question_id
      }
    })
  }
}
export default qa
