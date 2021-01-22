<template>
  <div class="article-detail" v-if="!$store.state.loading">
    <!-- 文章 -->
    <article class="article">
      <header>
        <h1>{{ detail.title }}</h1>
        <div class="msg">
          <img :onerror="defaultDoctorAvatar" :src="author.avatar || require('@/images/default-daishu.png')" />
          <div>
            <p>{{ author.name }}</p>
            <p>{{ author.is_doctor * 1 ? author.hospital : author.introduction }}</p>
          </div>
        </div>
      </header>
      <section class="content" id="articleContent" v-html="detail.content"></section>
      <div class="tags" v-if="detail.labels.length">
        <span v-for="t in detail.labels" :key="t.id">{{ t.name }}</span>
      </div>
      <footer class="foot">
        发布于
        <time>{{ detail.publish_time }}</time>
      </footer>
    </article>
    <!-- 留言 -->
    <section class="comment">
      <div class="title">
        留言
        <span>({{ comment.length || 0 }})</span>
      </div>
      <div v-if="comment.length">
        <comment-item v-for="n in comment" :key="n.id" :comment="n"></comment-item>
      </div>
      <span v-if="!comment.length ? !loadV2 : !comment.length" class="noComment">文章对你有什么帮助嘛，说点什么吧</span>
      <LoadingV2 v-if="loadV2"></LoadingV2>
    </section>

    <bottom />

    <!-- 输入框 -->
    <comment-btn :detail="detail" type="2" @send="getComment"></comment-btn>
  </div>
</template>
<script>
import CommentBtn from '@/components/news/CommentBtn'
import CommentItem from '@/components/news/CommentItem'
import Bottom from '@/components/news/Bottom'
import LoadingV2 from '@/base/loading/LoadingV2'
import wechatSDK from '@/utils/wechatSDK'
import * as types from '@/store/mutation-types'
export default {
  name: 'article-detail',
  components: {
    CommentBtn,
    CommentItem,
    Bottom,
    LoadingV2
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.$route.query.from) {
        vm.$store.commit(types.SET_TITLE_BAR, {
          title: '健康资讯',
          hasMenu: false
        })
      }
    })
  },
  data() {
    return {
      defaultDoctorAvatar,
      id: '',
      detail: {},
      comment: [],
      loadV2: false
    }
  },
  computed: {
    author() {
      let author = {
        name: '',
        is_doctor: 0,
        introduction: ''
      }
      author = Object.assign(author, this.detail.author)
      return author
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getDetail()
    this.getComment()
  },
  methods: {
    // 详情
    getDetail() {
      this.$store.commit('SET_LOADING', true)
      this.$api.article.detail(this.id).then((res) => {
        this.$store.commit('SET_LOADING', false)
        if (res.code === 200) {
          const data = res.data
          data.publish_time = data.publish_time.split(' ')[0]
          this.detail = data
          // 设置微信分享
          this.$nextTick(() => {
            let desc = document.getElementById('articleContent').textContent
            desc.length && (desc = desc.substr(0, 100))
            wechatSDK({
              title: data.title,
              desc,
              imgUrl: data.cover_url,
              hasSign: true
            })
          })
        }
      })
    },
    // 获取评论列表
    getComment() {
      this.loadV2 = true
      this.$api.article.commentList(this.id).then((res) => {
        this.loadV2 = false
        if (res.code === 200) {
          this.comment = res.data
        }
      })
    }
  }
}
</script>
<style lang="less">
.article-detail {
  padding-bottom: 98px;
  .article,
  .comment {
    // margin-bottom: 16px;
    background: #fff;
  }
  .article {
    padding: 16px 30px 48px;
    h1 {
      font-size: 40px;
      font-family: @Medium;
      font-weight: 500;
      color: rgba(38, 38, 38, 1);
      line-height: 56px;
      margin-bottom: 40px;
    }
    .msg {
      display: flex;
      align-items: center;
      margin-bottom: 40px;
      img {
        height: 80px;
        width: 80px;
        border-radius: 50%;
        object-fit: contain;
      }
      & > div {
        margin-left: 24px;
        p {
          font-size: 24px;
          color: #8c8c8c;
          line-height: 34px;
        }
        p:first-child {
          font-size: 32px;
          font-family: @Medium;
          font-weight: 500;
          color: #262626;
          line-height: 44px;
          margin-bottom: 4px;
        }
      }
    }
    .content {
      margin-bottom: 32px;
      word-break: break-all;
      overflow: hidden;
      p {
        font-size: 34px;
        color: #404040;
        line-height: 56px;
        margin-bottom: 64px;
        text-align: justify;
        word-break: break-all;
      }
      img {
        height: auto;
        width: 100%;
        border-radius: 12px;
        margin-bottom: 64px;
      }
    }
    .tags {
      margin-bottom: 32px;
      span {
        padding: 12px 16px;
        background: #f7f7f7;
        border-radius: 12px;
        margin-right: 16px;
        font-size: 26px;
        color: #737373;
        line-height: 36px;
        margin-top: 10px;
      }
    }
    .foot {
      font-size: 26px;
      color: #8c8c8c;
      line-height: 36px;
    }
  }
  .comment {
    padding: 32px 30px 0;
    .title {
      font-size: 36px;
      font-family: @Medium;
      font-weight: 500;
      color: #262626;
      line-height: 50px;
      span {
        font-size: 28px;
        line-height: 40px;
      }
    }
    .noComment {
      display: block;
      font-size: 26px;
      text-align: center;
      padding: 80px 0;
      color: #737373;
    }
  }
}
</style>
