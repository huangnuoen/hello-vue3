<template>
  <div class="answer-page" v-if="isShow">
    <div class="main">
      <div class="progress-box">
        <div class="pro">
          <van-progress
            color="#FFAB11"
            :show-pivot="false"
            track-color="#E8E8E8"
            :percentage="percentage"
          />
        </div>
        <div class="pro-txt">{{`${percentage}%`}}</div>
      </div>

      <div class="question">
        <p class="question-nums">
          <em>{{questionNum}}</em>
          /{{question.length}}
        </p>
        <div class="pro-cls">{{question[questionNum-1].type === 1?'单选':'多选'}}</div>
        <p class="question-txt">{{question[questionNum-1].question}}</p>
      </div>

      <div class="tips">请选择和您情况相近的答案。</div>

      <div class="question-list">
        <!--问题模块-->

        <div
          :class="['list-item', answerArr.includes(item.id)?'selected':'']"
          @click="answerSelect(item)"
          v-for="(item,index) in question[questionNum-1].item"
          :key="index"
        >
          <p
            class="question-p"
            :class="answerArr.includes(item.id)?'question-p-selected':''"
          >{{item.desc}}</p>
          <div class="img-border">
            <img v-if="answerArr.includes(item.id)" src="@/images/health/selected.png" alt />
            <img v-else src="@/images/health/select-border.png" alt />
          </div>
        </div>
        <!--问题模块-->
      </div>
    </div>

    <footer-btn :btnSession="3" @upper="upper" @define="define">
      <template #left>
        <btn-item :btnText="'上一题'" style="opacity:.3;" v-if="questionNum === 1" />
        <div v-else :class="['btn-item','leftBtn']" id="leftBtn">上一题</div>
      </template>
      <template #right>
        <btn-item :btnText="'确定'" :clsName="'rightBtn'" />
      </template>
    </footer-btn>
  </div>
</template>

<script>
import { Icon, Progress } from 'vant'

import FooterBtn from '@/components/healthSelfTest/FooterBtn'
import BtnItem from '@/components/healthSelfTest/BtnItem'

export default {
  name: 'answer-page',
  data() {
    return {
      isShow: false, // 页面内容是否显示
      question: [],
      answerArr: [], // 用来改变央视的数组
      questionNum: 1, // 第几道题目
      allAnswer: [], // 存放答案的数组
      btnStyle: {}
    }
  },
  components: {
    [Icon.name]: Icon,
    [Progress.name]: Progress,
    FooterBtn,
    BtnItem
  },
  created() {
    this.getQuestion(this.$route.query.id)
  },
  computed: {
    // 计算进度条百分比
    percentage() {
      return parseInt((this.questionNum / this.question.length) * 100)
    }
  },
  methods: {
    // 点击选择答案
    answerSelect(item) {
      if (this.question[this.questionNum - 1].type === 1) {
        // type 为1时是单选 为2时是双选

        if (this.answerArr.includes(item.id)) {
          this.answerArr = []

          this.allAnswer[this.questionNum - 1] = []
        } else {
          this.answerArr = [item.id]
          this.allAnswer[this.questionNum - 1] = [item]
        }
      } else {
        const idx = this.answerArr.findIndex((value) => value === item.id)

        if (idx === -1) {
          this.answerArr.push(item.id)

          if (this.allAnswer[this.questionNum - 1]) {
            this.allAnswer[this.questionNum - 1].push(item)
          } else {
            this.allAnswer[this.questionNum - 1] = [item]
          }
        } else {
          this.answerArr = this.answerArr.filter((value) => value !== item.id)

          this.allAnswer[this.questionNum - 1].filter((value) => value.id !== item.id)
        }
      }
    },

    // 获取题目数据
    getQuestion(exam_id) {
      this.$store.commit('SET_LOADING', true)

      this.$api.exam.question(exam_id).then((res) => {
        if (res.code === 200) {
          this.question = res.data.question
          this.$store.commit('SET_LOADING', false)
          this.isShow = true
        }
      })
    },

    // 上一题
    upper() {
      if (this.questionNum === 1) {
        this.$toast('这是第一题，没有上一题哦')
      } else {
        this.questionNum--

        this.answerArr = []

        this.allAnswer[this.questionNum - 1].forEach((item) => {
          this.answerArr.push(item.id)
        })
      }
    },
    // 确定/下一题
    define() {
      if (this.questionNum >= this.question.length) {
        // 最后按确定便是提交了

        if (this.answerArr.length > 0) {
          this.commitAnswer()
        } else {
          this.$toast('您没有选择答案')
        }
      } else {
        if (this.answerArr.length > 0) {
          this.questionNum++
          this.answerArr = []

          if (this.allAnswer[this.questionNum - 1]) {
            this.allAnswer[this.questionNum - 1].forEach((item) => {
              this.answerArr.push(item.id)
            })
          }
        } else {
          this.$toast('您没有选择答案')
        }
      }
    },

    // 提交答案
    commitAnswer() {
      const data = {
        exam_id: this.$route.query.id,
        question: []
      }

      this.question.forEach((item, index) => {
        data.question.push({
          id: item.id,
          item: this.allAnswer[index]
        })
      })

      this.$api.exam
        .submit(data)
        .then((res) => {
          if (res.code === 200) {
            this.$router.push({ path: `/test-result?id=${res.data}&examId=${this.$route.query.id}` })
          } else if (res.code === 500) {
            this.$toast('分数有误')
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.answer-page {
  width: 100%;
  height: 100vh;
  margin-top: 3px;
  background-color: #fff;

  .main {
    width: 100%;
    background-color: #fff;

    .progress-box {
      width: 100%;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;

      .pro {
        width: 584px;
        height: 10px;
        margin-right: 20px;
      }

      .pro-txt {
        font-size: 24px;
        font-family: @Regular;
        color: @grey-l;
      }
    }

    .question {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 0 30px;

      font-size: 36px;
      font-family: @Medium;
      .question-nums {
        color: @grey;
        margin-right: 10px;
        line-height: 38px;

        em {
          color: @theme;
          font-size: 60px;
          font-weight: 500;
        }
      }

      .question-txt {
        color: @black-d;
        font-weight: 500;
        font-size: 36px;
        line-height: 50px;
        max-width: 460px;
      }

      .pro-cls {
        margin-top: 8px;
        padding: 3px 5px;
        border-radius: 4px;
        border: 1px solid #f58d25;
        text-align: center;
        font-size: 20px;
        color: #f58d25;
        margin-right: 10px;
      }
    }

    .tips {
      color: @grey;
      font-size: 24px;
      font-family: @Regular;
      margin-top: 40px;
      padding-left: 30px;
    }

    .question-list {
      width: 100%;
      padding: 0 30px 200px;

      .list-item {
        width: 690px;
        height: 100px;
        background: #f8f8f8;
        border-radius: 8px;
        margin-top: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 30px;

        &.selected {
          background: #fffcfa;
          box-shadow: 0px 0px 16px 0px rgba(255, 171, 17, 0.2);
        }

        .question-p {
          font-size: 32px;
          font-family: @Medium;
          font-weight: 500;
          color: @black-d;
        }

        .question-p-selected {
          color: @theme;
        }

        .img-border {
          width: 40px;
          height: 40px;

          img {
            width: 40px;
            height: 40px;
          }
        }
      }
    }
  }
}

#leftBtn {
  width: 310px;
  height: 88px;
  border-radius: 44px;
  text-align: center;
  line-height: 88px;
  font-family: @STYuanti;
  font-size: 30px;
  background-color: #ffab11;
  color: #fff;
}
</style>
