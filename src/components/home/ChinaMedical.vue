<!--
 * @Author: Tan Xuan
 * @Date: 2020-09-22 11:15:54
 * @LastEditTime: 2020-09-22 16:55:43
 * @LastEditors: Tan Xuan
 * @Description: 首页-中医医典组件
-->
<!-- 中医医典 -->
<template>
  <div class="home-medical">
    <plate-title :info="info"></plate-title>
    <div class="imgs">
      <img
        v-for="(item, index) in arrs"
        :key="index"
        :src="item.img"
        @click="toList(item.label)"
        alt
      />
    </div>
  </div>
</template>
<script>
import PlateTitle from './PlateTitle'
export default {
  name: 'home-medical',
  components: {
    PlateTitle
  },
  data() {
    return {
      info: {
        name: '中医医典',
        tip: 'New',
        tipBg: '#f53134',
        tipColor: 'white',
        subName: '已收录专业医典数据3539条',
        subBg: '',
        subColor: ''
      },
      arrs: [
        {
          label: '疾病百科',
          img: require('@/images/home/jbbk.png')
        },
        {
          label: '中药大全',
          img: require('@/images/home/zydq.png')
        },
        {
          label: '中医方剂',
          img: require('@/images/home/zyfj.png')
        },
        {
          label: '中医食疗',
          img: require('@/images/home/zysl.png')
        }
      ]
    }
  },
  methods: {
    toList(tab) {
      this.$router.push({
        path: '/chinese-medicine/list',
        query: {
          tab
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.home-medical {
  background: #fff;

  .imgs {
    padding: 0 30px 24px;
    display: flex;
    justify-content: space-between;
    img {
      width: 164px;
      height: 180px;
    }
  }
}
</style>
