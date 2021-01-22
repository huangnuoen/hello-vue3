<template>
  <div>
    <back-img :img="type == 1 ? $brandConfig.encyImgV1 : $brandConfig.encyImgV2"></back-img>
    <search :type="type" @search="search"></search>
    <recent-hot :type="type"></recent-hot>
    <more :type="type" @toOther="toDrug"></more>
  </div>
</template>

<script>
import Search from '@/components/ill-drug/Search'
import BackImg from '@/components/ill-drug/BackImg'
import More from '@/components/ill-drug/More'
import RecentHot from '@/components/ill-drug/RecentHot'

export default {
  components: {
    Search,
    BackImg,
    More,
    RecentHot
  },
  data() {
    return {
      type: 1
    }
  },
  mounted() {
    this.type = Number(this.$route.query.type)
    let a = localStorage.getItem('illOrGrugType')
    if (a) {
      this.type = Number(a)
      localStorage.removeItem('illOrGrugType')
    }
  },
  watch: {
    type: {
      handler: function (a, b) {
        this.$store.commit('UPDATE_TITLE_BAR_TITLE', a == 1 ? '疾病百科' : '药品百科')
      },
      immediate: true
    }
  },
  methods: {
    toDrug() {
      this.type = this.type == 1 ? 2 : 1
      localStorage.setItem('illOrGrugType', this.type)
      console.log(this.type)
    },
    search() {
      localStorage.setItem('illOrGrugType', this.type)
      this.$router.push({
        path: this.type == 1 ? '/ill-search' : '/drug-search'
      })
    }
  }
}
</script>

<style>
</style>