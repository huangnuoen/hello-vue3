/* 表单验证 */
import cardArea from '@/config/areaCode'
// 检验手机号
export function phoneCheck(phone) {
  return phone.match(/^1\d{10}$/gi)
}
export function invoiceCodeCheck(code) {
  const creg = /^[a-zA-Z0-9]{15,20}$/
  return creg.test(this.code)
}
// 检验身份证
export function IdCardCheck(sId) {
  if (!sId) {
    return '请输入证件号码'
  }
  sId = String(sId)
  if (!sId.match(/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/gi)) {
    return '身份证号格式不正确'
  }

  var iSum = 0
  var cardInfo = Array(2)
  sId = sId.replace(/x$/i, 'a')
  if (sId.length === 0) {
    return '身份证为空'
  }

  if (cardArea[parseInt(sId.substr(0, 2))] == null) {
    return '非法证件，你的地区填写有错误请仔细填写'
  }
  var sBirthday = sId.substr(6, 4) + '/' + Number(sId.substr(10, 2)) + '/' + Number(sId.substr(12, 2))
  var d = new Date(sBirthday)
  if (sBirthday !== d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate()) {
    return '非法证件，请仔细填写'
  }

  for (var i = 17; i >= 0; i--) {
    iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11)
  }

  if (iSum % 11 !== 1 || sId.length > 19) {
    return '非法证号，请认真填写'
  }

  var age = new Date().getFullYear() - d.getFullYear()
  cardInfo[0] = cardArea[parseInt(sId.substr(0, 2))]
  cardInfo[1] = sBirthday
  cardInfo[2] = age
  cardInfo[3] = sId.substr(16, 1) % 2 ? 1 : 2

  return cardInfo
}

// 校验邮箱
export function emailCheck(email) {
  /* eslint-disable */
  const ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
  /* eslint-disable */
  return ePattern.test(email)
}

// 银行卡验证
export function luhnCheck(num) {
  const arr = (num + '')
    .split('')
    .reverse()
    .map((x) => parseInt(x))
  const lastDigit = arr.splice(0, 1)[0]
  let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9), 0)
  sum += lastDigit
  return sum % 10 === 0
}
