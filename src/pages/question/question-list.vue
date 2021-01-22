<template>
  <div class="question-list" :class="{'show-title-bar': $route.meta.titleBar}">
    <slide-tab v-if="isLoad" :arr="arr" :tab.sync="tab">
      <question-li :type="typeName" />
    </slide-tab>
  </div>
</template>

<script>
import SlideTab from '@/base/SlideTab/SlideTab'
import QuestionLi from '@/components/question/QuestionLi'

export default {
  name: 'question-list',
  components: {
    SlideTab,
    QuestionLi
  },
  data() {
    return {
      arr: [
        { id: 0, name: '全部' },
        { id: 1, name: '最新' }
      ],
      tab: 0,
      isLoad: false
    }
  },
  computed: {
    typeName() {
      return this.arr[this.tab].id
    }
  },
  created() {
    this.getCategory()
  },
  methods: {
    getCategory() {
      this.$store.commit('SET_LOADING', true)
      this.$api.category
        .list({
          type: 3
        })
        .then((res) => {
          this.isLoad = true
          this.$store.commit('SET_LOADING', false)
          if (res.code === 200) {
            const data = res.data
            this.arr = this.arr.concat(data)
            // console.log(this.arr)
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.question-list {
  min-height: 100vh;
  width: 100%;
}
.show-title-bar {
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 82px;
}
</style>
