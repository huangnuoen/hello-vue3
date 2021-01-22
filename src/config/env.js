const config = {
  dev: {
    daishu: '//dev.daishutijian.com/apps/',
    internalHospital: '//dev.gooddoc.com/',
    fuli: '//life.daishujiankang.com/app/#/',
    tijian: '//dev.daishutijian.com/'
  },
  test: {
    daishu: '//test.daishutijian.com/tijian/apps/',
    internalHospital: '//test.daishutijian.com/internet-hospital/',
    fuli: '//life.daishujiankang.com/app/#/',
    tijian: '//test.daishutijian.com/tijian/'
  },
  prod: {
    daishu: '//apps.daishutijian.com/',
    internalHospital: '//apps.daishutijian.com/internet-hospital/',
    fuli: '//fuli.daishujiankang.com/app/#/',
    tijian: '//apps.daishutijian.com/'
  }
}

function getEnv() {
  let ENV = 'dev'
  const baseUrl = location.href
  if (/dev\./.test(baseUrl)) {
    ENV = 'dev'
  } else if (/test\./.test(baseUrl)) {
    ENV = 'test'
  } else if (/apps\.daishutijian\.com/.test(baseUrl)) {
    ENV = 'prod'
  }
  return ENV
}
export const ENV = getEnv()
export const ENV_URL_PREFIX = config[ENV]
