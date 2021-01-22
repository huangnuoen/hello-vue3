<template>
  <div class="comment-btn">
    <input
      :class="{'isgrow': isEdit}"
      v-model="msg"
      placeholder="添加留言..."
      @blur="scrollDown"
      @focus="getFocus"
    />
    <div class="operate" v-if="!isEdit">
      <div class="collect" @click="collect">
        <i :class="{'collected': isCollect}"></i>
        <span>收藏</span>
      </div>
      <div class="like" @click="like">
        <i :class="{'liked': isLike}"></i>
        <span>点赞 {{like_count}}</span>
      </div>
    </div>
    <button v-else class="send" @click="send">发送</button>
  </div>
</template>
<script>
import { scrollDown } from '@/utils/tool'
import { toLogin } from '@/utils/auth'
export default {
  name: 'comment-btn',
  props: {
    detail: {
      type: Object
    },
    // 1问答2文章3视频34自测
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      msg: '',
      isCollect: this.detail.is_collected,
      isCollecting: false,
      isLike: this.detail.is_like ? this.detail.is_like : JSON.parse(sessionStorage.getItem(`like_${this.$route.query.id}`)) === true,
      like_count: sessionStorage.getItem(`likeCount_${this.$route.query.id}`) || this.detail.like_count,
      isLiking: false,
      isEdit: false,
      isSend: false
    }
  },

  methods: {
    getFocus() {
      if (!this.$store.state.user.authStatus) {
        toLogin(this.$route)
      }

      this.isEdit = true
    },
    scrollDown() {
      setTimeout(() => {
        this.isEdit = false
      }, 100)
      scrollDown()
    },
    // 收藏
    collect() {
      if (this.isCollecting) return

      this.isCollecting = true

      this.handleCollect()
        .then((res) => {
          if (res.code === 200) {
            this.$toast(`${this.isCollect ? '取消收藏' : '已收藏'}`)
            this.isCollect = !this.isCollect
            this.$emit('collect', this.isCollect)
          // } else if (res.code === 510) {
            // toLogin(this.$route, res.data)
          } else {
            this.$toast(res.message)
          }
        })
        .finally(() => {
          this.isCollecting = false
        })
    },
    handleCollect() {
      const data = {
        id: this.$route.query.id,
        type: this.type
      }
      if (this.isCollect) {
        return this.$api.user.collectUnset(data)
      }
      return this.$api.user.collectSet(data)
    },
    // 点赞
    like() {
      // this.isLike = !this.isLike
      this.$emit('like', this.isLike)

      if (this.isLiking) return

      this.isLiking = true

      const data = {
        id: this.$route.query.id,
        type: this.type
      }
      if (this.isLike) {
        this.$api.user.likeUnset(data)
        this.like_count--
      } else {
        this.$api.user.likeSet(data)
        this.like_count++
      }

      this.isLiking = false

      this.isLike = !this.isLike

      sessionStorage.setItem(`like_${this.$route.query.id}`, JSON.stringify(this.isLike))
      sessionStorage.setItem(`likeCount_${this.$route.query.id}`, this.like_count)
    },
    // 发送
    send() {
      if (this.isSend) return

      if (this.msg.trim() === '') {
        this.$toast('留言内容不能为空')
        return
      }

      this.isSend = true

      this.$api.article
        .comment(this.$route.query.id, {
          content: this.msg
        })
        .then((res) => {
          if (res.code === 510) {
            toLogin(this.$route, res.data)
            return
          }
          if (res.code !== 200) {
            this.$toast(res.message)
            return
          }
          this.isEdit = false
          this.msg = ''
          this.$emit('send', this.msg)
        })
        .finally(() => {
          this.isSend = false
        })
    }
  }
}
</script>
<style lang="less" scoped>
.comment-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  border-top: 1px solid #e8e8e8;
  height: 98px;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 30px;
  & > input {
    width: 464px;
    height: 72px;
    background: #f2f2f2;
    border-radius: 36px;
    border: 0;
    outline: 0;
    padding: 0 32px;
    flex: 0 0 auto;
    font-size: 30px;
    color: #262626;
  }
  & > .isgrow {
    flex: 1 1 auto;
  }
  .operate {
    display: flex;
    align-items: center;
    flex: 1;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      i {
        height: 40px;
        width: 40px;
      }
      span {
        white-space: nowrap;
        font-size: 20px;
        color: #404040;
        line-height: 28px;
        margin-top: 2px;
      }
    }
    .collect i {
      background: url('~@/images/news/global_icon_collect_nor.png') no-repeat center center / 100% 100%;
    }
    .like i {
      background: url('~@/images/news/global_icon_like_nor.png') no-repeat center center / 100% 100%;
    }
    .collect .collected {
      background: url('~@/images/news/global_icon_collect_sel.png') no-repeat center center / 100% 100%;
    }
    .like .liked {
      background: url('~@/images/news/global_icon_like_sel.png') no-repeat center center / 100% 100%;
    }
  }
  .send {
    width: 128px;
    height: 72px;
    background: @theme;
    border-radius: 36px;
    font-size: 28px;
    color: #fff;
    line-height: 72px;
    text-align: center;
    margin-left: 16px;
  }
}
</style>
