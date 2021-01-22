
import {
  convertObjectToArray
} from '@/utils/tool'
// 子商城类型：普通/药品
export const SUBMALL_TYPE = {
  COMMON: 1,
  DRUG: 2
}
export const ID_TYPE = {
  1: '身份证',
  2: '护照',
  3: '回乡证',
  4: '台胞证',
  5: '其他'
}
export const SEX_TYPE = {
  0: '未知',
  1: '男',
  2: '女'
}
export const MARRIAGE_TYPE = {
  1: '未婚',
  2: '已婚'
}
export const GOODS_TYPE = {
  SERVICE: 1,
  PHYSICAL: 2,
  PRESCRIPTION: 3,
  NON_PRESCRIPTION: 4
}
// 收藏夹type
export const COLLECT_TYPE = {
  6: '商品',
  2: '文章',
  3: '视频',
  // 4: '草稿',
  // 5: '自测',
  1: '健康问答'
}
export const GOODS_THESIS_STATUS = {
  UP: 1,
  DOWN: 2
}
export const ID_TYPE_ARR = convertObjectToArray(ID_TYPE)
export const SEX_TYPE_ARR = convertObjectToArray(SEX_TYPE)
export const MARRIAGE_TYPE_ARR = convertObjectToArray(MARRIAGE_TYPE)
export const COLLECT_TYPE_ARR = convertObjectToArray(COLLECT_TYPE)
// 客服电话
export const PHONE_NUM = brandConfig.daishuPhone
export const defaultMenu = [{
  icon: 'global_icon_home',
  text: '首页',
  link: '/home'
},
{
  icon: 'global_icon_welfare',
  text: '福利',
  link: '/mall'
},
{
  icon: 'global_icon_mine',
  text: '我的',
  link: '/mine'
},
{
  icon: 'global_icon_cart_white',
  text: '购物车',
  link: '/cart'
}
]
// 首页优惠券channel值
export const CHANNEL = '004_01_0009_0001_01'
