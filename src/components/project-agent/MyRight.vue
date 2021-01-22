<template>
  <div class="components">
    <div class="title">
      <img :src="require('@/images/project-agent/img_text_rights.png')" alt="" />
      <div class="introduced" @click="linkTo(benefits[0])">
        <span>权益介绍</span>
        <svg-icon icon-class="icon_arrow_rig"></svg-icon>
      </div>
    </div>
    <div class="items">
      <div v-for="(item, index) in benefits" :key="index" @click="linkTo(item)">
        <div class="icons">
          <img :src="item.logo" alt="" />
          <p v-if="item.times">{{ item.times }}</p>
        </div>
        <div class="text">
          <p>{{ item.name }}</p>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.components {
  margin-top: 34px;
  .title {
    position: relative;
    text-align: center;
    margin-bottom: 56px;
    height: 40px;
    & > img {
      width: 248px;
      height: 40px;
    }
    .introduced {
      position: absolute;
      right: 0;
      top: 0;
      line-height: 38px;
      span {
        height: 24px;
        font-size: 24px;
        font-weight: 400;
        color: #52483e;
        line-height: 24px;
      }
      svg {
        font-size: 24px;
        margin-left: 4px;
      }
    }
  }
  .items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    & > div {
      margin-bottom: 84px;
      display: flex;
      align-items: center;
      width: 328px;
      .icons {
        flex: 0 0 80px;
        margin-right: 16px;
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
        }
        p {
          text-align: center;
          width: 64px;
          height: 32px;
          line-height: 31px;
          background: linear-gradient(135deg, #fbd996 0%, #f5b952 100%);
          border-radius: 16px;
          font-size: 22px;
          font-weight: 500;
          color: #524a3e;
          margin: -20px auto 0 auto;
          position: relative;
        }
      }
      .text {
        p:nth-child(1) {
          font-size: 34px;
          font-weight: 600;
          color: #3d362e;
          line-height: 34px;
        }
        p:nth-child(2) {
          font-size: 24px;
          font-weight: 400;
          color: rgba(61, 54, 46, 0.5);
          line-height: 24px;
          margin-top: 16px;
        }
      }
    }
  }
}
</style>

<script>
export default {
  props: {
    benefits: {
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    linkTo(item) {
      window.location.href = item.link_to
    }
  }
}
</script>