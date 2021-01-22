<template>
  <div class="test-introduce" v-if="isShow">
    <div class="top-img">
      <top-img :topImg="question" />
    </div>
    <div class="content">
      <div class="content-titles">
        <div class="jian">
          <img src="@/images/health/jian.png" alt />
        </div>
        <p class="titles-txt">{{question.title}}</p>
      </div>
      <div class="content-txt">{{question.introduction}}</div>
    </div>

    <footer-btn v-if="question.user_result_count > 0" :btnSession="1">
      <template #left>
        <btn-item :btnText="'自测记录'" />
      </template>
      <template #right>
        <btn-item :btnText="'开始测试'" :clsName="'rightBtn'" />
      </template>
    </footer-btn>

    <footer-btn :center="false" :btnSession="1" v-else>
      <div class="goTest">开始测试</div>
    </footer-btn>
  </div>
</template>

<script>
import FooterBtn from '@/components/healthSelfTest/FooterBtn'
import BtnItem from '@/components/healthSelfTest/BtnItem'

import TopImg from '@/components/healthSelfTest/TopImg'

export default {
  name: 'test-introduce',
  components: {
    FooterBtn,
    BtnItem,
    TopImg
  },
  data() {
    return {
      question: {},
      isShow: false
    }
  },
  created() {
    // this.$store.commit('UPDATE_TITLE_BAR_TITLE', '你好')
    this.getQuestion()
  },
  methods: {
    getQuestion() {
      this.$store.commit('SET_LOADING', true)

      this.$api.exam.question(this.$route.query.id).then((res) => {
        if (res.code === 200) {
          this.question = res.data

          this.$store.commit('SET_LOADING', false)
          this.isShow = true
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.test-introduce {
  background-color: #fff;
  padding: 30px 30px;
  height: 100vh;
  .top-img {
    width: 690px;
    height: 192px;
    border-radius: 8px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .content {
    margin-top: 44px;
    width: 690px;

    .content-titles {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;

      .jian {
        width: 32px;
        height: 32px;
        margin-top: 4px;
        // margin-left: 12px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .titles-txt {
        color: @black-d;
        font-family: @Medium;
        font-weight: 500px;
        font-size: 32px;
        line-height: 40px;
        margin-left: 12px;
        width: 634px;
      }
    }

    .content-txt {
      font-size: 28px;
      color: @black-m;
      font-family: PingFangSC-Regular, PingFang-SC;
      margin-top: 22px;
      line-height: 48px;
      margin-left: 8px;
    }
  }

  .goTest {
    width: 642px;
    height: 88px;
    background: @theme;
    border-radius: 44px;
    font-size: 34px;
    font-family: @Medium;
    font-weight: 500;
    text-align: center;
    line-height: 88px;
    color: #fff;
  }
}
</style>
