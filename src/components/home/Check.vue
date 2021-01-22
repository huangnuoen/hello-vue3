<!-- 健康自测-自测 -->
<template>
  <div class="check">
    <div class="card" @click="$router.push(`/test-introduce?id=${data.id}`)">
      <template v-if="!isSkeleton">
        <div class="intro">
          <img class="img" :src="data.cover_url" />
          <div class="msg">
            <p class="title">{{data.title}}</p>
            <p>{{data.introduction}}</p>
          </div>
        </div>
        <div class="sta">
          <div>
            <span>{{data.question_count}}个问题 |</span>
            <span>约{{data.takeup_minute}}分钟 |</span>
            <span>
              <em>{{data.user_result_count || 0}}</em>人已测
            </span>
          </div>
          <button v-waves="{color: 'rgba(255, 255, 255, 0.2)'}">点击测试</button>
        </div>
      </template>
      <!-- 骨架屏 -->
      <template v-else>
        <div class="intro">
          <div class="img skeleton-ele"></div>
          <div class="msg">
            <p class="title skeleton-ele"></p>
            <p class="skeleton-ele"></p>
          </div>
        </div>
        <div class="sta skeleton">
          <div class="skeleton-ele"></div>
          <button class="skeleton-ele"></button>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'check',
  data() {
    return {
      isSkeleton: true,
      data: {}
    }
  },
  created() {
    this.getExam()
  },
  methods: {
    getExam() {
      this.$api.exam
        .index({
          page: 1,
          pageSize: 1
        })
        .then((res) => {
          this.isSkeleton = false
          if (res.code === 200) {
            let data = res.data.data[0]
            this.data = data
          }
        })
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/style/mixin.less';

.check {
  padding: 0 30px 32px;
  .card {
    padding: 30px;
    width: 100%;
    height: auto;
    background: #fff;
    box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.08);
    border-radius: 12px;
  }
  .intro {
    display: flex;
    align-items: center;
    & > .img {
      flex: 0 0 auto;
      margin-right: 20px;
      width: 130px;
      height: 130px;
      border-radius: 20px;
      background: #f3f3f3;
    }
    .msg {
      flex: 1;
      p {
        font-size: 28px;
        color: #8c8c8c;
        line-height: 40px;
        .ellipsis-line(480px, 2);
      }
      .title {
        font-size: 32px;
        font-family: @Medium;
        font-weight: 500;
        color: #262626;
        line-height: 44px;
        margin-bottom: 20px;
        .ellipsis-line(480px, 1);
      }
    }
  }
  .sta {
    margin-top: 26px;
    display: flex;
    align-items: center;
    &::before {
      content: '';
      height: 12px;
      width: 12px;
      border-radius: 50%;
      display: block;
      background: @theme;
      margin-right: 10px;
    }
    span {
      font-size: 24px;
      color: #8c8c8c;
      line-height: 34px;
      white-space: pre-wrap;
      em {
        color: @theme2;
      }
    }
    & > button {
      margin-left: auto;
      width: 164px;
      height: 56px;
      background: rgba(255, 238, 207, 1);
      border-radius: 28px;
      font-size: 24px;
      font-family: @Medium;
      font-weight: 500;
      color: @theme2;
      line-height: 56px;
      text-align: center;
    }
  }
  // 骨架屏
  .intro {
    .skeleton-ele {
      background: #f2f3f5;
    }
    .msg .skeleton-ele {
      &.title {
        background: #eee;
        width: 50%;
      }
      height: 24px;
      width: 100%;
    }
  }
  .sta.skeleton {
    &::before {
      background: #f2f3f5;
    }
    & > div.skeleton-ele {
      height: 24px;
      flex: 1;
      margin-right: 50px;
    }
    .skeleton-ele {
      background: #f2f3f5;
    }
  }
}
</style>
