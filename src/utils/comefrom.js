// 第三方入口进来的标识
; (function () {
    // 获取入口标识，然后存储在store里面
    let comefrom = getUrlSpecifiedParam('appName') || sessionStorage.getItem("comefrom")
    if (comefrom) {
        sessionStorage.setItem("comefrom", comefrom)
    }
})();

function getUrlSpecifiedParam(paraName) {
    let url = document.location.toString()
    let replace = url.match(/#(\S*)\?/) // 获取#到？之间的一个数组
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
        let arrPara = arrObj[1].split(/[&#]/)
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