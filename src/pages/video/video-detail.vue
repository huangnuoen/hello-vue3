<template>
  <div class="video-detail" v-if="isShow">
    <div class="videoBox">
      <video class="videos" :poster="details.cover_url" controls x-webkit-airplay="true" x5-playsinline="true"
        webkit-playsinline="true" playsinline="true">
        <source :src="details.video_url" />
      </video>
    </div>

    <div class="video-title box">
      <p class="title">{{details.title}}</p>
      <div class="information">
        <p>发布于 {{details.publish_time}}</p>
        <div class="play-nums">
          <img src="@/images/video/video_icon_play2.png" alt />
          <p style="margin-left:5px">{{details.view_count}} 播放</p>
        </div>
      </div>
    </div>

    <div class="brief-introduction box">
      <div class="titles">简介</div>
      <div class="content">{{details.summary}}</div>
      <div class="flag">
        <!-- 最多三个 -->
        <div class="flag-item" v-for="(label,index) in details.labels" :key="index">{{label.name}}</div>
      </div>
    </div>

    <div class="doctor">
      <div class="doctor-info">
        <div class="left">
          <img class="imgs" :src="author.avatar || require('@/images/default-daishu.png')" :onerror="defaultAvatar"
            alt />
          <div class="info-name">
            <div class="name">
              <p class="p_name">{{author.name}}</p>
            </div>
            <div class="work">
              <p class="p_serving">{{author.is_doctor !== 0?author.job_title:author.introduction}}</p>
              <p style="marginLeft:5px;">{{author.hospital}} {{author.department}}</p>
            </div>
          </div>
        </div>
        <div v-if="author.is_doctor !== 0" class="right" :data-id="author.id">去咨询</div>
      </div>

      <div class="score" v-if="author.is_doctor !== 0">
        <p class="title">评分：</p>
        <div class="star">
          <img v-for="(item,index) in [0,1,2,3,4]" :Key="index"
            :src="item < author.score ? require('@/images/video/star.png') : require('@/images/video/un_star.png')"
            alt />
        </div>
        <p class="man_nums">服务人次 {{author.service_count}}</p>
        <p class="moneys">问诊咨询 ￥{{author.price}}起</p>
      </div>

      <div class="be-good-at" v-if="author.is_doctor !== 0">
        <p class="title">擅长：</p>
        <div class="content">{{author.good_at}}</div>
      </div>
    </div>

    <div class="commentList">
      <div class="comment-title">
        留言
        <em>({{comment.length}})</em>
      </div>

      <comment-item v-for="n in comment" :key="n.id" :comment="n" />

      <div class="no-comment" v-if="comment.length === 0">暂无留言</div>
    </div>

    <bottom />

    <comment-btn :detail="details" type="3" @send="getComment"></comment-btn>
  </div>
</template>

<script>
import CommentBtn from '@/components/news/CommentBtn'
import CommentItem from '@/components/news/CommentItem'
import Bottom from '@/components/news/Bottom'
import wechatSDK from '@/utils/wechatSDK'
import { Dialog } from 'vant'
import { toLogin } from '@/utils/auth'
export default {
  name: 'video-detail',
  components: {
    CommentBtn,
    CommentItem,
    Bottom,
    [Dialog.name]: Dialog
  },
  data() {
    return {
      isShow: false,
      details: {},
      author: {},
      isCollect: false,
      isLike: false,
      isEdit: false,
      commentValue: '',
      comment: [],
      id: '',
      defaultAvatar
    }
  },
  created() {
    this.id = this.$route.query.id

    this.getVideoDetail()

    this.getComment()
  },
  methods: {
    getVideoDetail() {
      this.$store.commit('SET_LOADING', true)
      this.$api.video
        .detail(this.id)
        .then((res) => {
          this.author = res.data.author
          this.details = res.data
          this.$store.commit('SET_LOADING', false)
          this.isShow = true

          wechatSDK({
            title: this.details.title,
            desc: this.details.summary,
            imgUrl: this.details.cover_url,
            hasSign: true
          })
        })
        .catch(() => {})
    },

    send(msg) {
      if (msg.trim() === '') {
        this.$toast('请填写留言后再点击留言按钮！')
      } else {
        this.$api.video.comment(this.details.id, { content: msg }).then((res) => {
          if (res.code === 510) {
            // toLogin(this.$route, res.data)
          }
        })
      }
    },

    // 获取评论列表
    getComment() {
      this.$api.video.commentList(this.id).then((res) => {
        if (res.code === 200) {
          this.comment = res.data
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  padding: 0 30px;
  background-color: #fff;
}

.video-detail {
  padding-bottom: 98px;
  .videoBox {
    width: 100%;
    height: 422px;
    > video {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .video-title {
    padding: 30px;

    .title {
      font-size: 32px;
      color: @black-d;
      font-family: @Medium;
      font-weight: 500;
    }

    .information {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: #a6a6a6;
      font-size: 24px;
      font-family: @Regular;
      margin-top: 13px;

      > .play-nums {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-left: 48px;

        > img {
          width: 24px;
          height: 24px;
        }
      }
    }
  }

  .brief-introduction {
    padding: 10px 30px 32px;

    .titles {
      font-size: 36px;
      color: @black-d;
      font-weight: 500;
      font-family: @Medium;
    }

    .content {
      font-size: 26px;
      color: @grey;
      font-family: @Regular;
      margin-top: 16px;
      margin-bottom: 16px;
      line-height: 44px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    .flag {
      display: flex;
      align-items: center;
      justify-self: start;

      .flag-item {
        width: 112px;
        height: 60px;
        background: @bg;
        border-radius: 12px;
        text-align: center;
        line-height: 60px;
        color: #737373;
        font-size: 26px;
        font-family: @Regular;
        margin-right: 16px;
      }
    }
  }

  .doctor {
    width: 100%;
    padding: 32px 30px;
    background-color: #fff;
    margin-top: 16px;

    .doctor-info {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .left {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        img {
          width: 80px;
          height: 80px;
          margin-right: 24px;
          border-radius: 50%;
        }

        .info-name {
          > .name {
            display: flex;
            align-items: center;
            justify-content: flex-start;

            .p_name {
              font-size: 32px;
              color: @black-d;
              font-family: @Medium;
              font-weight: 500;
              margin-right: 16px;
            }

            .p_serving {
              font-size: 24px;
              color: #404040;
              font-family: @Regular;
            }
          }

          .work {
            font-size: 24px;
            color: @grey;
            font-family: @Regular;
            margin-top: 2px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }
        }
      }

      .right {
        width: 142px;
        height: 56px;
        font-size: 26px;
        background: @theme;
        border-radius: 28px;
        text-align: center;
        line-height: 56px;
        color: #fff;
        font-family: @Medium;
        font-weight: 500;
      }
    }

    .score {
      display: flex;
      align-items: center;
      justify-self: start;
      font-size: 26px;
      font-family: @Regular;
      color: @black-m;
      margin-top: 32px;

      .title {
        min-width: 78px;
      }

      > .star {
        margin-right: 32px;
        display: flex;
        align-items: center;
        justify-self: start;
        img {
          width: 28px;
          height: 28px;
        }
      }

      .man_nums {
        margin-right: 32px;
      }
    }

    .be-good-at {
      display: flex;
      align-items: flex-start;
      justify-self: start;
      font-size: 26px;
      font-family: @Regular;
      color: @grey;
      margin-top: 16px;
      line-height: 44px;

      .title {
        min-width: 78px;
      }
    }
  }

  .commentList {
    .comment-title {
      font-family: @Medium;
      font-weight: 500;
      font-size: 36px;
      color: @black-d;
      margin-bottom: 28px;
      display: flex;
      align-items: center;

      em {
        font-size: 28px;
        margin-left: 8px;
      }
    }

    .no-comment {
      text-align: center;
      font-family: @Regular;
      color: @grey;
      padding: 50px 0;
      font-size: 28px;
    }

    padding: 30px;
    background-color: #fff;
    width: 100%;
    margin-top: 16px;
    // margin-bottom: 120px;
  }

  .l-msg {
    position: fixed;
    bottom: 0;
    left: 0;
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
}
</style>
