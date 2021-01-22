<!-- 科普视频-视频 -->
<template>
  <div class="video-item" @click="goVideoDetail">
    <div class="video">
      <img :src="videoItem.cover_url" alt />
      <ul>
        <li>
          <svg-icon class="icon" iconClass="video_icon_play"></svg-icon>
          <span>{{videoItem.view_count}}</span>
        </li>
        <li>
          <svg-icon class="icon" iconClass="video_icon_like"></svg-icon>
          <span>{{videoItem.like_count}}</span>
        </li>
      </ul>
    </div>
    <div class="info">
      <div class="title">{{videoItem.title}}</div>
      <p>{{author.name}} {{author.is_doctor*1 ? author.job_title : ''}}</p>
      <p>{{author.is_doctor*1 ? author.hospital : author.introduction}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'video-item',
  props: {
    videoItem: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    author() {
      let author = {
        name: '',
        job_title: '',
        hospital: ''
      }
      author = Object.assign(author, this.videoItem.author)
      return author
    }
  },
  methods: {
    goVideoDetail() {
      if (!this.videoItem.id) return
      this.$router.push(`/video-detail?id=${this.videoItem.id}`)
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/style/mixin.less';
.video-item {
  margin-top: 16px;
  width: 338px;
  height: 380px;
  background: #fff;
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  .video {
    height: 192px;
    width: 100%;
    position: relative;
    overflow: hidden;
    border-radius: 8px 8px 0 0;
    background: #ccc;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 1;
      height: 64px;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.05) 17%,
        rgba(0, 0, 0, 0.15) 32%,
        rgba(0, 0, 0, 0.3) 49%,
        rgba(0, 0, 0, 0.6) 100%
      );
      width: 100%;
    }

    & > img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    & > ul {
      z-index: 2;
      padding: 0 16px;
      position: absolute;
      left: 0;
      bottom: 0;
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
          font-size: 20px;
          font-family: @Regular;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 20px;
        }
      }
    }
  }

  .info {
    .title,
    & > p {
      padding: 0 16px;
      word-wrap: break-word;
    }
    .title {
      min-height: 72px;
      .ellipsis-line(100%, 2);
      font-size: 26px;
      font-family: @Medium;
      font-weight: 500;
      color: #404040;
      line-height: 36px;
      margin: 16px 0 12px 0;
    }
    & > p {
      font-size: 24px;
      color: #8c8c8c;
      line-height: 34px;
      margin-bottom: 4px;
    }
  }
}
</style>
