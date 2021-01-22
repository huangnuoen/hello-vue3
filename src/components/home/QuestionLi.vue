<!-- 健康问答-文章 -->
<template>
  <div class="qus-arcticle" @click="toDetail(info.id)">
    <template v-if="!isSkeleton">
      <div class="qus">
        <em>问</em>
        <p>{{info.content}}</p>
      </div>
      <div class="ans">
        <em>答</em>
        <p>{{info.answer}}</p>
      </div>
    </template>
    <!-- 骨架屏 -->
    <template v-else>
      <div class="qus skeleton">
        <em class="skeleton-ele">问</em>
        <div>
          <p class="skeleton-ele"></p>
          <p class="skeleton-ele" style="width: 30%;"></p>
        </div>
      </div>
      <div class="ans skeleton">
        <em class="skeleton-ele">答</em>
        <div>
          <p class="skeleton-ele"></p>
          <p class="skeleton-ele" style="width: 30%;"></p>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'qus-arcticle',
  props: {
    info: {
      type: Object
    },
    isSkeleton: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toDetail(id) {
      if (!id) return
      this.$router.push(`/question-detail?id=${id}`)
    }
  },
}
</script>
<style lang="less" scoped>
@import '~@/style/mixin.less';
.qus-arcticle {
  border-bottom: 1px solid #E8E8E8;
  padding: 32px 0 40px;
  em {
    display: inline-block;
    height: 32px;
    width: 32px;
    background: #1890FF;
    color: #fff;
    margin-right: 12px;
    font-size: 24px;
    line-height: 36px;
    text-align: center;
    border-radius: 3px;
  }
  p {
    display: inline;
    text-align: justify;
    word-break: break-all;
  }
  .qus {
    margin-bottom: 8px;
    .ellipsis-line(690px, 2);
    em {
      background: @theme2;
    }
    p {
      font-size:32px;
      font-family:@Medium;
      font-weight:500;
      color:#262626;
      line-height:44px;
    }
  }
  .ans {
    .ellipsis-line(690px, 2);
    p {
      display: inline;
      font-size:28px;
      color:#404040;
      line-height:48px;
    }
  }
  // 骨架屏
  .qus.skeleton, .ans.skeleton {
    display: flex;
    div {
      flex: 1;
    }
    em {
      background: #eee;
    }
  }
  .qus.skeleton {
    p.skeleton-ele {
      flex: 1;
      display: block;
      height: 32px;
      margin-bottom: 12px;
      background: #eee;
    }
  }
  .ans.skeleton {
    p.skeleton-ele {
      display: block;
      height: 32px;
      margin-bottom: 12px;
      background: #f2f3f5;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
