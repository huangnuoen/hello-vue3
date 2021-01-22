<template>
  <div>
    <div class="content">
      <van-tabs v-model="activeTabName" :color="variable.theme" :title-active-color="variable.theme" @click="tabsActive">
        <van-tab v-for="(item, index) in tabs" :key="index" :title="item.text" :name="item.text"></van-tab>
      </van-tabs>

      <!-- 搜索框 -->
      <Search :options="searchOptions" @chooseId="toDetail" :tab="this.activeTabName" :placeholder="searchPlaceholder" />
      <!-- 高发病状 -->
      <Highincidence @toDetail="toDetail" v-if="recommends.length > 0 && !loading" :list="recommends" />
      <!-- 病状列表筛选 -->
      <SymptomsList v-if="!loading" @toDetail="toDetail" :level="level" :items="classification" :details="classificationDetail" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.content {
}
</style>

<script>
import { Tab, Tabs } from 'vant'
import Highincidence from '@/components/chinese-medicine/Highincidence'
import SymptomsList from '@/components/chinese-medicine/SymptomsList'
import Search from '@/components/chinese-medicine/search.vue'
import LoadingMixin from '@/mixins/loadingMixin'
import variable from '@/style/variable.less'
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    Highincidence,
    SymptomsList,
    Search
  },
  mixins: [LoadingMixin],
  data() {
    //'疾病百科', '中药大全', '中医方剂', '中医食疗'
    return {
      searchPlaceholder: '',
      searchNameObj: {
        疾病百科: '疾病',
        中药大全: '中药',
        中医方剂: '方剂',
        中医食疗: '食疗配方'
      },
      tabs: [
        {
          text: '疾病百科',
          value: 1
        },
        {
          text: '中药大全',
          value: 2
        },
        {
          text: '中医方剂',
          value: 3
        },
        {
          text: '中医食疗',
          value: 4
        }
      ],
      searchOptions: {
        overflow: true
      },
      activeTabName: '',
      recommends: [],
      classification: [],
      classificationDetail: [],
      level: 1, // 疾病列表数据层级
      variable
    }
  },
  created() {
    this.activeTabName = this.$route.query.tab || this.tabs[0].text
    this.initData(this.$route.query.tab || this.tabs[0].text)
  },
  methods: {
    initData(type) {
      this.setLoading(true)
      Promise.all([
        // 疾病百科列表接口
        this.$api.chinese_medicine.getList(type),
        // 高发疾病接口
        this.$api.chinese_medicine.getRecommends(type)
      ]).then((res) => {
        if (res[0].code === 200 && res[1].code === 200) {
          this.setLoading(false)
          this.level = res[0].data.level
          this.searchPlaceholder = `${res[0].data.count}种${this.searchNameObj[this.activeTabName]}`
          // 层级为1则不需要转换数据
          if (+this.level === 1) {
            this.classificationDetail = res[0].data.list
          } else {
            // 重组疾病百科数据
            this.transfromData(res[0].data)
          }
          this.recommends = res[1].data
        } else {
          this.$toast(res[0].message || res[1].message)
        }
      })
    },
    transfromData(data) {
      let classification = []
      let classificationDetail = []
      for (let key in data.list) {
        classification.push({
          text: key
        })
        classificationDetail.push(data.list[key])
      }
      this.classification = classification
      this.classificationDetail = classificationDetail
    },
    tabsActive(name, index) {
      this.$router.replace({
        path: this.$route.path,
        query: {
          tab: name
        }
      })
      this.initData(name)
    },
    toDetail(id) {
      this.$router.push({
        path: '/chinese-medicine/detail',
        query: {
          tab: this.activeTabName,
          id
        }
      })
    }
  }
}
</script>