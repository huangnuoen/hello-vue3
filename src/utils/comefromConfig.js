const comefromConfig = {
    dev: {
        // 3.0健康平台
        health: {
            name: "health", //第三方唯一标识符
            usercenter: "http://dev.daishu-component.com/health/#/mine", // 个人中心
            home: "http://dev.daishu-component.com/health/#/" // 首页
        },
        // 团检入口
        tuanjian: {
            name: "tuanjian", //第三方唯一标识符
            usercenter: "http://dev.daishu-component.com/health/#/mine", // 个人中心
            home: "http://dev.tuanjian.com/common#/" // 首页
        },
    },
    test: {
        // 3.0健康平台
        health: {
            name: "health", //第三方唯一标识符
            usercenter: "https://test.daishutijian.com/services_component/health/#/mine", // 个人中心
            home: "https://test.daishutijian.com/services_component/health/#/" // 首页
        },
        // 团检入口
        tuanjian: {
            name: "tuanjian", //第三方唯一标识符
            usercenter: "https://test.daishutijian.com/services_component/health/#/mine", // 个人中心
            home: "https://test.daishutijian.com/tuanjian1/public/#/" // 首页
        },
    },
    apps: {
        // 3.0健康平台
        health: {
            name: "health", //第三方唯一标识符
            usercenter: "https://apps.daishutijian.com/daishu_component/public/health/#/mine", // 个人中心
            home: "https://apps.daishutijian.com/daishu_component/public/health/#/home" // 首页
        },
        // 团检入口
        tuanjian: {
            name: "tuanjian", //第三方唯一标识符
            usercenter: "https://apps.daishutijian.com/daishu_component/public/health/#/mine", // 个人中心
            home: "https://apps.daishutijian.com/company/public/common#/" // 首页
        },
    },
}

function getEvn() {
    if (process.env.NODE_ENV === 'development') return "dev"
    return location.host.split('.')[0] || "apps"
}


export default comefromConfig[getEvn()]