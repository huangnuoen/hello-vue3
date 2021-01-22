<template>
  <div class="home">
    <!-- 搜索栏 -->
    <TopSearchBar @toSearch="toSearch" placeholder="关爱父母健康体检">
      <template #left>
        <div class="city" @click="$router.push('city-list')">
          {{ currentCity.area_name }}
          <svg-icon icon-class="icon_arrow_down"></svg-icon>
        </div>
      </template>
      <template #right>
        <van-icon @click="$customerService.link_to()">
          <svg-icon icon-class="icon_service"></svg-icon>
        </van-icon>
        <van-icon dot @click="toInternalHospitalUrl">
          <svg-icon class="consulting-svg" iconClass="icon_news"></svg-icon>
        </van-icon>
      </template>
    </TopSearchBar>
    <!-- 轮播 -->
    <carousel :banners="banner" @link="linkto"></carousel>
    <!-- 健康资讯 -->
    <home-article class="item"></home-article>
    <!-- 科普视频 -->
    <home-video class="item"></home-video>
    <!-- 中医医典 -->
    <china-medical class="item" />
    <!-- 健康自测 -->
    <self-check class="item" :list="icon" @linkto="linkto"></self-check>
    <!-- 疾病百科 -->
    <!-- <plate-title :info="{name: '疾病百科', tip: '当季重点关注', more: '全部疾病', url: '/'}"></plate-title>
    <div class="item disease">
      <span v-for="(n, i) in diseaseList" :key="i">{{n}}</span>
    </div>-->
    <!-- 用药指南 -->
    <!-- <plate-title :info="{name: '用药指南', tip: '热门词条', more: '更多药品', url: '/'}"></plate-title>
    <div class="item drug">
      <drug-card v-for="(n, i) in drug" :key="i" :info="n"></drug-card>
    </div>-->
    <!-- 健康问答 -->
    <question :list="sub" @linkto="linkto"></question>
    <!-- 健康大真相 -->
    <!-- <truth class="item"></truth> -->
    <!-- 知识竞答 -->
    <!-- <internet-ads class="item"></internet-ads> -->
    <!-- 底部轮播 -->
    <carousel class="item-p" :banners="bannerBottom" v-if="bannerBottom.length" @link="linkto"></carousel>
    <!-- 底部 -->
    <DaishuFooter></DaishuFooter>
  </div>
</template>
<script>
import Search from '@/components/home/Search'
import Carousel from '@/components/home/Carousel'
import store from '@/store'
import PlateTitle from '@/components/home/PlateTitle'
import HomeArticle from '@/components/home/Article'
import HomeVideo from '@/components/home/Video'
import SelfCheck from '@/components/home/SelfCheck'
import DrugCard from '@/components/home/DrugCard'
import Question from '@/components/home/Question'
import DaishuFooter from '@/base/daishu/DaishuFooter'
import Truth from '@/components/home/Truth'
import InternetAds from '@/components/home/InternetAds'
import ChinaMedical from '@/components/home/ChinaMedical'
import TopSearchBar from '@/components/mall/TopSearchBar'
import { jumpLink } from '@/utils/tool'
import { Icon } from 'vant'
import customerService from '@/utils/customerService'
export default {
  name: 'health',
  components: {
    Search,
    Carousel,
    PlateTitle,
    HomeArticle,
    HomeVideo,
    SelfCheck,
    DrugCard,
    Question,
    Truth,
    InternetAds,
    DaishuFooter,
    [Icon.name]: Icon,
    ChinaMedical,
    TopSearchBar
  },
  data() {
    return {
      diseaseList: ['新冠肺炎', '抑郁症', '痛风', '湿疹', '失眠', '便秘'],
      drug: [
        { title: '吗丁啉', tip: '消化道不适' },
        { title: '易善复', tip: '脂肪肝' },
        { title: '盐酸赛诺', tip: '过敏性鼻炎' }
      ],
      banner: [],
      bannerBottom: [],
      icon: [],
      sub: []
    }
  },
  mounted() {
    // this.$api.home.home_operation_for_hmp()
    this.$api.pageconfig.getList({ type: 1 }).then((res) => {
      if (res.code === 200) {
        this.banner = res.data.banner_top || []
        this.bannerBottom = res.data.banner_bottom || []
        this.icon = res.data.operation_1 || []
        // 先做渠道硬编码，支撑演示，等待后期加了渠道功能再删除这里
        this.szMetro()
        // 硬编码结束
        this.sub = res.data.operation_2 || []
      }
    })
    this.$store.dispatch('user/getUserInfo', { withoutLogin: true }).then((res) => {
      if (res.code === 200) {
        if (!res.data.has_labels && !this.$store.state.user.skipDraw) {
          this.$router.push('/topic')
        }
      }
    })
  },
  methods: {
    toInternalHospitalUrl() {
      if (ENV === 'dev') {
        jumpLink({ url: 'http://dev.daishu-component.com/' + window.pathname + 'to_app/1028?attach[to]=home' })
        return
      }
      jumpLink({ url: window.baseUrl + window.pathname + 'to_app/1028?attach[to]=home' })
    },
    // 垃圾代码，
    szMetro() {
      if (this.$store.state.channel === '001_08_0001_0004_01') {
        const operation_1 = [
          {
            pic_url: 'https://public-10006067.file.myqcloud.com/upload/imagelist/ori/785abd2839124dd83666ad384e3ea4af.png',
            target_url: `${baseUrl}health/#/sz-metro/report`
          },
          {
            pic_url: 'https://public-10006067.file.myqcloud.com/upload/imagelist/ori/183fd7fad78efb34ebd236f54c6ebb3e.png',
            target_url: `${baseUrl}health/#/sz-metro/history`
          }
        ]
        const banner = [
          {
            pic_url: 'https://public-10006067.file.myqcloud.com/upload/imagelist/ori/2892f72ef7a396c2b6616a5f773eb81e.jpeg'
          }
        ]
        this.banner = banner
        this.icon.splice(2, 2)
        this.icon = this.icon.concat(operation_1)
      }
    },
    toSearch() {
      jumpLink({ url: window.daishuUrl + 'search' })
    },

    linkto(item) {
      if (!item.target_url) {
        this.$toast('暂未开放，敬请期待')
        return
      }
      jumpLink({ url: item.target_url })
    }
  },
  computed: {
    currentCity() {
      return this.$store.state.currentCity
    }
  },
  beforeRouteEnter(to, form, next) {
    if (store.state.thirdParty === '10000002') {
      next('/cmb-home')
      return
    }
    next()
  }
}
</script>
<style lang="less" scoped>
.home {
  background: @bg;
  .top-search-bar {
    .city {
      font-size: 28px;
      color: @black-d;
      svg {
        font-size: 24px;
        vertical-align: baseline;
      }
      .ellipsis-line(150px, 1);
    }
    .van-icon {
      &:last-child {
        margin-left: 20px;
      }
      svg {
        font-size: 52px;
      }
      /deep/ .van-info--dot {
        top: 6px;
        right: 8px;
      }
    }
  }
}
.item {
  margin-bottom: 16px;
  background: #fff;
}
.item-p {
  padding-bottom: 32px;
}
.disease {
  padding: 0 22px;
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  & > span {
    text-align: center;
    width: 33.3%;
    height: 48px;
    margin: 24px 0;
    font-size: 28px;
    color: #262626;
    line-height: 48px;
    border-right: 2px solid #e8e8e8;
    &:nth-child(3n) {
      border-right: none;
    }
  }
}
.drug {
  display: flex;
  padding: 0 30px 32px;
  justify-content: space-between;
}
</style>
