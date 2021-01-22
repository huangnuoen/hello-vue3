<template>
  <div class="comment-item">
    <div class="user">
      <img :src="user.avatar" :onerror="defaultAvatar" alt />
      <div class="text">
        <p class="user-name">{{user.username || user.mobile_phone | fPhone}}</p>
        <p class="times">{{comment.ctime ? comment.ctime.split(' ')[0] : ''}}</p>
      </div>
    </div>
    <div class="comment-content">{{comment.content}}</div>
  </div>
</template>

<script>
export default {
  name: 'comment-item',
  props: {
    comment: {
      type: Object
    }
  },
  data() {
    return {
      defaultAvatar
    }
  },
  computed: {
    user() {
      return this.comment.user || ''
    }
  },
  filters: {
    fPhone(val) {
      if (!val) return ''
      val = val.replace(/(\d{3})\d*(\d{4})/g, '$1****$2')
      return val
    }
  }
}
</script>

<style lang="less" scoped>
.comment-item {
  padding: 32px 0;
  width: 690px;

  .user {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    img {
      width: 80px;
      height: 80px;
      margin-right: 16px;
      border-radius: 50%;
    }

    .text {
      font-size: 24px;
      font-family: @Regular;
      color: @grey;

      .user-name {
        font-size: 26px;
        color: @black-m;
      }
    }
  }

  .comment-content {
    margin-top: 16px;
    font-size: 28px;
    font-family: @Regular;
    color: @black-m;
    line-height: 48px;
    text-align: justify;
  }
}
</style>
