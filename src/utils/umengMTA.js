// 友盟统计代码


document.write(unescape("%3Cspan style='display:none' id='cnzz_stat_icon_1279569607'%3E%3C/span%3E%3Cscript style='display:none' src='https://v1.cnzz.com/z_stat.php%3Fid%3D1279569607%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));

// 单页面流量统计
export function _MTA() {
    if (window._czc) {
        let location = window.location
        let contentUrl = location.pathname + location.hash
        let refererUrl = '/'
        window._czc.push(['_trackPageview', contentUrl, refererUrl])
    }
}