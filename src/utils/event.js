// error 事件
window.addEventListener(
  'error',
  (e) => {
    if (e.target.tagName && e.target.tagName.toUpperCase() === 'IMG') {
      e.target.src = brandConfig.globalDefaultlogo
    }
  },
  true
)
window.addEventListener('unhandledrejection', (e) => {
  console.log('unhandledrejection', e)
})
// // 埋点
// window.addEventListener(
//   'click',
//   (e) => {
//     const { mtaname } = e.target.dataset
//     if (typeof MtaH5 !== 'undefined' && MtaH5 && MtaH5.clickStat) {
//       if (mtaname) {
//         const key = findParentNodeAttr(e.target, 'mtakey')
//         const areaname = findParentNodeAttr(e.target, 'areaname')
//         MtaH5.clickStat(key, { name: mtaname, areaname: mtaname + '_' + areaname })
//         console.log(key, { name: mtaname, areaname: mtaname + '_' + areaname })
//       }
//     }
//   },
//   false
// )
// function findParentNodeAttr(node, attr) {
//   if (node.dataset[attr]) {
//     return node.dataset[attr]
//   } else {
//     const parentNode = node.parentNode
//     if (parentNode) {
//       return findParentNodeAttr(parentNode, attr)
//     } else {
//       return attr
//     }
//   }
// }
