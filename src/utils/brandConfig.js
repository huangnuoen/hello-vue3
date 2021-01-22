import lianxin from '@/utils/lianxinConfig.js'
// 平台标识配置
// 默认是袋鼠
global.brandConfig = {
  logo: require('@/images/login/logo.png'),
  daishuPhone: '4001-0755-70',
  companyName: '袋鼠健康',
  originCompany: '讯康信息技术（深圳）有限公司',
  companyName2: '袋鼠健康(海南)互联网医院有限公司',
  showDaishu: true,
  encyImgV1: require('@/images/ill-drug/ency_img_2@2x.png'),
  encyImgV2: require('@/images/ill-drug/ency_img_1@2x.png'),
  dmi: true,
  goodDoctor: true,
  medicalCard: true,
  shareImg: 'https://public-10006067.file.myqcloud.com/imgpath/WechatIMG395.png',
  globalDefaultlogo: require('@/images/global_defaultlogo.png') // 全局默认图
}

function getUrlSpecifiedParam(paraName) {
  let url = document.location.toString()
  const replace = url.match(/#(\S*)\?/) // 获取#到？之间的一个数组
  replace && (url = url.replace(`#${replace[1]}?`, '?')) // 把url#后面的name值去掉，保留？后面的参数

  let arrObj = url.split('?')
  if (arrObj.length >= 3) {
    url = ''
    for (let i = 0, len = arrObj.length; i < len; i++) {
      url += i === 0 ? arrObj[0] + '?' : '&' + arrObj[i]
    }
    arrObj = url.split('?')
  }
  if (arrObj.length > 1) {
    const arrPara = arrObj[1].split(/[&#]/)
    let arr
    for (let i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split('=')
      if (arr != null && arr[0] == paraName) {
        return arr[1]
      }
    }
    return ''
  } else {
    return ''
  }
}

const channelConfig = {
  '004_01_0010_0001_01': lianxin // 莲心健康
}

;(() => {
  const channel = getUrlSpecifiedParam('channel') || sessionStorage.getItem('channel')
  if (channelConfig[channel]) {
    brandConfig = { ...brandConfig, ...channelConfig[channel] }
  }
})()

export default brandConfig
