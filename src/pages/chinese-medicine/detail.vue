<template>
  <div class="detail" v-show="!loading">
    <search @chooseId="getChooseId" :tab="this.tab" :placeholder="detail.name" />
    <header :class="{ 'no-img': !imgs.length }">
      <h2>{{ detail.name }}</h2>
      <div v-if="imgs.length" class="box">
        <div class="imgs" :style="{ width: 200 * imgs.length + 'px' }">
          <img v-for="(item, index) in imgs" :key="index" :src="item" />
        </div>
      </div>
    </header>
    <main>
      <!-- <h1>{{detail.title}}</h1> -->
      <article v-html="detail.context" />
    </main>
    <daishu-footer />
  </div>
</template>
<script>
import DaishuFooter from '@/base/daishu/DaishuFooter.vue'
import Search from '@/components/chinese-medicine/search.vue'
import LoadingMixin from '@/mixins/loadingMixin'
export default {
  name: 'chinese-medicine-detail',
  components: {
    DaishuFooter,
    Search
  },
  mixins: [LoadingMixin],
  data() {
    return {
      imgs: [],
      tab: '',
      id: 0,
      detail: {}
    }
  },
  created() {
    let { tab, id } = this.$route.query
    this.tab = tab
    this.id = id
    this.getDetail()
  },
  watch: {
    '$route.query.tab': {
      handler(val) {
        document.title = val
        this.$store.commit('SET_TITLE_BAR', {
          ...this.$store.state.titleBar,
          title: val
        })
      },
      immediate: true
    }
  },
  methods: {
    // 获取搜索到的id 并重新获取详情
    getChooseId(id) {
      this.id = id
      this.getDetail()
    },
    // 获取详情
    getDetail() {
      this.setLoading(true)
      const params = {
        id: this.id,
        tab: this.tab
      }
      this.$api.chinese_medicine
        .detail(params)
        .then((res) => {
          const { code, data, message } = res
          this.setLoading(false)
          if (code !== 200) {
            this.$toast(message)
          } else {
            this.detail = data || {}
            this.imgs = data.img || []
          }
        })
        .catch(() => {
          this.$toast('获取详情失败，请稍后再试~')
          this.setLoading(false)
        })
    }
  }
}
</script>
<style lang="less" scoped>
.detail {
  header {
    // background-color: skyblue;
    background: url('~@/images/home/medical_header.png') no-repeat;
    background-size: cover;
    height: 304px;
    overflow: hidden;

    &.no-img {
      display: flex;
      align-items: center;
      height: 224px;
    }

    h2 {
      font-size: 52px;
      line-height: 64px;
      color: white;
      margin: 24px 30px;
    }
    .box {
      width: 100%;
      overflow-x: auto;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .imgs {
      height: 160px;
      padding: 0 18px;
      overflow-y: hidden;
      overflow-x: auto;
      //   width: 324 * 3px;
      //   min-width: 100%;
      box-sizing: content-box;

      img {
        width: 300px;
        height: 160px;
        border-radius: 8px;
        // border: 2px solid red;
        margin: 0 12px;
        object-fit: cover;
      }
    }
  }
  main {
    padding: 32px 30px;
    background-color: #fff;
  }
  h1 {
    margin-top: 16px;
    font-size: 44px;
    color: #131313;
    font-weight: 700;
  }
  /deep/ article {
    h1 {
      margin-top: 24px;
      font-size: 44px;
      color: #131313;
      font-weight: 700;
    }
    h2 {
      margin-top: 24px;
      font-size: 38px;
      color: #262626;
      font-weight: 700;
    }
    h3 {
      margin-top: 24px;
      font-size: 34px;
      color: #262626;
      font-weight: 700;
    }
    p {
      margin-top: 20px;
      font-size: 30px;
      color: #404040;
      line-height: 48px;
    }
    ul,
    li {
      margin-top: 20px;
    }
    pre {
      width: 100%;
      margin-top: 20px;
    }
    code {
      display: block;
      white-space: pre-wrap;
      line-height: 48px;
      font-size: 30px;
      font-family: @Light;
    }
  }
}
</style>