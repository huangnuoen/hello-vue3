import http from '../config'

const project_agent = {
    getCardBenefit(params) {
        return http({
            url: 'user/agent/card_benefit',
            params,
        })
    },
}
export default project_agent
