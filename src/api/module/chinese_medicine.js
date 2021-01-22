import http from '../config'
const chinese_medicine = {
    // type	是	string	页签分类,限定词：疾病百科，中药大全，中医方剂，中医食疗
    // 疾病百科列表接口
    getList(type) {
        return http({
            url: `medicalwiki/list?tab=${type}`,
        })
    },

    // 常见分类接口（高发疾病）
    // tab	是	string	页签分类,限定词：疾病百科，中药大全，中医方剂，中医食疗
    getRecommends(type) {
        return http({
            url: `medicalwiki/getRecommends?tab=${type}`,
        })
    },
    search(params) {
        return http({
            url: 'medicalwiki/search',
            params
        })
    },
    detail(params) {
        return http({
            url: 'medicalwiki/detail',
            params
        })
    }
}
export default chinese_medicine
