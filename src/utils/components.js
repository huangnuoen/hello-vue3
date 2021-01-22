import Vue from 'vue'

// 首字母大写
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// 对符合'xx/xx.vue'组件格式的组件取组件名
function validateFileName(str) {
  return (/^\S+\.vue$/.test(str) && str.indexOf('Base') !== -1)
    ? str.replace(/^\S+\/(\w+)\/(\w+)\.vue$/, (rs, $1, $2) => {
      const str = $2.toLowerCase() === 'index' ? $1 : $2
      return capitalizeFirstLetter(str)
    }) : ''
}

const requireComponent = require.context('@/base', true, /\.vue$/)
requireComponent.keys().forEach(filePath => {
  const componentConfig = requireComponent(filePath)
  const componentName = validateFileName(filePath)
  componentName && Vue.component(componentName, componentConfig.default || componentConfig)
})
