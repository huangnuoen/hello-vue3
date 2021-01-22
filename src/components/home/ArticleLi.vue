<!-- 今日推荐-文章 -->
<template>
  <div class="article" @click="goDetail(info.id)">
    <template v-if="!isSkeleton">
      <div class="msg">
        <p>{{ info.title }}</p>
        <div class="tags">
          <span>{{ author.name }}</span>
          <span>{{ author.is_doctor * 1 ? author.hospital : author.introduction }}</span>
          <span v-if="author.is_doctor * 1">{{ author.department }}</span>
        </div>
      </div>
      <img class="img" :src="info.cover_url" />
    </template>
    <!-- 骨架屏 -->
    <template v-else>
      <div class="msg">
        <p class="skeleton-ele"></p>
        <p class="skeleton-ele" style="width: 30%;"></p>
        <div class="tags">
          <p class="skeleton-ele"></p>
        </div>
      </div>
      <div class="img skeleton-ele"></div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'article-li',
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    },
    isSkeleton: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    author() {
      let author = {
        name: '',
        is_doctor: 0,
        introduction: ''
      }
      author = Object.assign(author, this.info.author)
      return author
    }
  },
  data() {
    return {}
  },
  methods: {
    goDetail(id) {
      if (!id) return

      if (this.$route.query.from) {
        this.$router.push(`/article-detail?id=${id}&from=1`)
      } else {
        this.$router.push(`/article-detail?id=${id}`)
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/style/mixin.less';
.article {
  padding: 32px 0 36px;
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid #e8e8e8;
  min-height: 210px;
  .msg {
    flex: 1;
    & > p {
      .ellipsis-line(430px, 2);
      font-size: 30px;
      font-family: @Medium;
      font-weight: 500;
      color: #262626;
      line-height: 42px;
      min-height: 84px;
    }
  }
  .tags {
    margin-top: 18px;
    & > span {
      display: inline;
      font-size: 24px;
      color: #8c8c8c;
      line-height: 34px;
      margin-right: 24px;
    }
  }
  & > .img {
    flex: 0 0 auto;
    margin-left: 40px;
    width: 220px;
    height: 136px;
    border-radius: 8px;
    overflow: hidden;
    background: #f3f3f3;
    object-fit: contain;
  }
  // 骨架屏
  .msg {
    & > .skeleton-ele {
      height: 30px;
      background: #eee;
      margin: 6px 0;
      min-height: 0;
    }
  }
  .tags {
    & > .skeleton-ele {
      height: 24px;
      background: #f2f3f5;
      margin: 5px 0;
    }
  }
  .img.skeleton-ele {
    background: #ccc;
  }
}
</style>
