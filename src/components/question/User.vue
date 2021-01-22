<template>
  <div class="user">
    <img class="img-avg" :src="answer.avatar" alt v-if="getImgSrc" />
    <img class="img-avg" src="@/images/global_doctor_default.png" v-else alt />
    <div class="user-info">
      <div class="user-name">{{answer.name}}</div>
      <div class="user-work" v-if="answer.is_doctor === 0 && answer.introduction !== ''">
        <span v-if="answer.is_doctor === 0">{{answer.introduction}}</span>
        <span v-else>{{answer.hospital}} {{answer.job_title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user',
  props: ['answer'],
  mounted() {
  },
  computed: {
    getImgSrc() {
      return this.answer.avatar !== null
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .img-avg {
    width: 80px;
    height: 80px;
    margin-right: 24px;
  }

  .user-info {
    .user-name {
      font-family: @Medium;
      font-size: 32px;
      color: @black-d;
      font-weight: 500;
    }

    .user-work {
      font-family: @Regular;
      color: @grey;
      font-size: 24px;
      margin-top: 5px;
    }
  }
}
</style>
