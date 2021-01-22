<!-- 科普视频-视频 -->
<template>
  <div class="video-li" @click="goDetail(info.id)">
    <template v-if="!isSkeleton">
      <div class="video video-shadow">
        <img :src="info.cover_url"/>
        <ul>
          <li>
            <svg-icon class="icon" iconClass="video_icon_play"></svg-icon>
            <span>{{info.view_count || 0}}</span>
          </li>
          <li>
            <svg-icon class="icon" iconClass="video_icon_like"></svg-icon>
            <span>{{info.like_count || 0}}</span>
          </li>
        </ul>
      </div>
      <div class="info">
        <div class="title">{{info.title}}</div>
        <p>{{author.name}} {{author.is_doctor*1 ? author.job_title : ''}}</p>
        <p>{{author.is_doctor*1 ? author.hospital : author.introduction}}</p>
      </div>
    </template>
    <!-- 骨架屏 -->
    <template v-else>
      <div class="video skeleton-ele"></div>
      <div class="info">
        <div class="title">
          <p class="skeleton-ele"></p>
          <p class="skeleton-ele" style="width: 30%;"></p>
        </div>
        <p class="skeleton-ele" style="width: 60%;"></p>
        <p class="skeleton-ele" style="width: 80%;"></p>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'video-li',
  props: {
    isSkeleton: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    author() {
      let author = {
        name: '',
        job_title: '',
        hospital: ''
      }
      author = Object.assign(author, this.info.author)
      return author
    }
  },
  data() {
    return {
    }
  },
  methods: {
    goDetail(id) {
      if (!id) return
      this.$router.push(`/video-detail?id=${id}`)
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/style/mixin.less';
.video-li {
  width:338px;
  height:380px;
  background:#fff;
  box-shadow:0px 2px 16px 0px rgba(0,0,0,0.08);
  border-radius:8px;
  .video {
    height: 192px;
    width: 100%;
    position: relative;
    overflow: hidden;
    border-radius: 8px 8px 0 0;
    background: #ccc;
    &.video-shadow {
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1;
        height:64px;
        background:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0.05) 17%,rgba(0,0,0,0.15) 32%,rgba(0,0,0,0.3) 49%,rgba(0,0,0,0.6) 100%);
        width: 100%;
      }
    }
    &>img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    &>ul {
      padding: 0 16px;
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 2;
      height: 44px;
      width: 44px;
      display: flex;
      align-items: center;
      li {
        margin-right: 24px;
        display: flex;
        align-items: center;
        .icon {
          margin-right: 4px;
          font-size: 24px;
        }
        span {
          font-size:20px;
          font-family:SFProDisplay-Regular,SFProDisplay;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:20px;
        }
      }
    }
  }
  .info {
    padding: 16px 16px 0;
    .title {
      min-height: 72px;
      .ellipsis-line(100%, 2);
      font-size:26px;
      font-family:@Medium;
      font-weight:500;
      color:#404040;
      line-height:36px;
      margin-bottom: 12px;
    }
    &>p {
      font-size:24px;
      color:#8C8C8C;
      line-height:34px;
      margin-bottom: 4px;
    }
  }
  // 骨架屏
  .info {
    .title {
      &>.skeleton-ele {
        height: 26px;
        margin: 5px 0;
        background: #eee;
      }
    }
    &>.skeleton-ele {
      height: 24px;
      margin: 5px 0 9px;
      background: #f2f3f5;
    }
  }
}
</style>
