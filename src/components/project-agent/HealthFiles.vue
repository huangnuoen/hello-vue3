<template>
  <div class="characteristic-component">
    <div>
      <img :src="require('@/images/project-agent/img_text_files.png')" alt="" />
    </div>

    <div class="files">
      <div>
        <img src="" alt="" />
        <div class="info">
          <p class="name">
            <span>张珊</span>
            <em>笨女人</em>
          </p>
          <p class="person-info">
            <span class="sex">女</span>
            <i></i>
            <span class="age">23岁</span>
            <i></i>
            <span class="full-file">档案完善度：</span>
            <span class="percent">-</span>
          </p>
        </div>
        <svg-icon icon-class="icon_arrow_rig"></svg-icon>
        <img class="bg" :src="require('@/images/project-agent/img_data_blue.png')" alt="" />
      </div>
    </div>

    <div class="add-files" @click="link_to(healthRecord.button)">
      <svg-icon icon-class="icon_add"></svg-icon>
      <span>新建健康档案</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    healthRecord: {
      default() {
        return {}
      }
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.characteristic-component {
  margin-top: 98px;
  & > div:nth-child(1) {
    text-align: center;
    margin-bottom: 30px;
    img {
      width: 248px;
    }
  }
  .files {
    & > div {
      display: flex;
      align-items: center;
      background: #ffffff;
      box-shadow: 0 * 2px 8 * 2px 12 * 2px 0 * 2px rgba(160, 169, 178, 0.06);
      border-radius: 12 * 2px;
      padding: 20 * 2px 16 * 2px 25 * 2px 16 * 2px;
      position: relative;
      overflow: hidden;
      margin-bottom: 12 * 2px;
      & > svg {
        font-size: 16 * 2px;
      }
      .bg {
        position: absolute;
        bottom: -25 * 2px;
        right: 9 * 2px;
        width: 62 * 2px;
        height: 62 * 2px;
      }
      & > img {
        width: 48 * 2px;
        height: 48 * 2px;
        border-radius: 50%;
        margin-right: 12 * 2px;
      }
      .info {
        flex-grow: 1;
        .name {
          display: inline-flex;
          align-items: center;
          span {
            font-size: 18 * 2px;
            font-weight: 600;
            color: #303233;
            margin-right: 8 * 2px;
          }
          em {
            font-size: 11 * 2px;
            font-weight: 500;
            color: #ffffff;
            line-height: 11 * 2px;
            background-color: #cca97a;
            border-radius: 2 * 2px;
            padding: 3 * 2px 3 * 2px;
          }
        }
        .person-info {
          display: flex;
          align-items: center;
          margin-top: 6 * 2px;
          i {
            height: 13 * 2px;
            width: 1 * 2px;
            background: #e8e8e8;
            margin: 0 8 * 2px;
          }
          .sex,
          .age,
          .full-file {
            font-size: 13 * 2px;
            font-weight: 400;
            color: #3d3e40;
          }
          .percent {
            font-size: 15 * 2px;
            font-weight: bold;
            color: #b87942;
          }
        }
      }
    }
  }
  .add-files {
    padding: 0 16 * 2px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 48 * 2px;
    background: #ffffff;
    box-shadow: 0 * 2px 8 * 2px 12 * 2px 0 * 2px rgba(160, 169, 178, 0.06);
    border-radius: 12 * 2px;
    justify-content: center;
    svg {
      font-size: 16 * 2px;
      margin-right: 8 * 2px;
    }
    span {
      font-size: 15 * 2px;
      font-weight: 500;
      color: #a38962;
    }
  }
}
</style>