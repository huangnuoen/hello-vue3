<template>
  <div class="topic">
    <main class="main-box">
      <!--跳过-->
      <div class="skip" @click="skipLink">
        <p>跳过</p>
        <img class="skip-img" src="@/images/topic/skip.png" alt />
      </div>

      <!--title-->
      <div class="title">
        <p>选择您感兴趣的内容</p>
        <p>根据兴趣，为您定制私人专属首页</p>
      </div>

      <!--选择分类-->
      <div class="content">
        <div
          class="item"
          :class="checkedList.includes(item.id)?'checked':''"
          v-for="(item, index) in itemList"
          :key="index"
          @click="checkThis(item.id)"
        >
          <div class="img-box" :class="checkedList.includes(item.id)?'checked':''">
            <img :src="item.imgSrc" alt />
            <div class="borders" v-show="checkedList.includes(item.id)"></div>
            <div
              v-show="checkedList.includes(item.id)"
              class="checkedNum"
            >{{checkedList.indexOf(item.id) + 1}}</div>
          </div>
          <p :class="checkedList.includes(item.id)?'checked':''">{{item.name}}</p>
        </div>
      </div>
    </main>

    <!--底部按钮-->
    <div class="bottom-btn">
      <div class="btn" :class="{'checked':checkedList.length}" @click="confirm">
        <p>确认</p>
        <p v-show="checkedList.length">({{checkedList.length}})</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'topic',

  data() {
    return {
      itemList: [],
      checkedList: [],
      imgList: [
        require('@/images/topic/01.png'),
        require('@/images/topic/02.png'),
        require('@/images/topic/03.png'),
        require('@/images/topic/04.png'),
        require('@/images/topic/05.png'),
        require('@/images/topic/06.png'),
        require('@/images/topic/07.png')
      ]
    }
  },
  created() {
    // this.isShow = true

    this.getList()
  },
  methods: {
    getList() {
      this.$api.labels.list().then((res) => {
        this.itemList = res.data.map((item, index) => {
          item.imgSrc = this.imgList[index]

          return item
        })
      })
    },

    checkThis(id) {
      const idx = this.checkedList.indexOf(id)

      if (idx === -1) {
        this.checkedList.push(id)
      } else {
        this.checkedList.splice(idx, 1)
      }
    },

    skipLink() {
      this.$store.commit('user/SET_SKIP_DRAW', true)
      this.$router.back()
    },

    confirm() {
      if (this.checkedList.length) {
        this.$api.labels.like(this.checkedList.join(',')).then((res) => {
          console.log(res)
          if (res.code === 200) {
            this.$router.back()
          }
        })
      } else {
        this.$toast('您还未选择您喜欢的内容')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.topic {
  position: relative;

  .main-box {
    width: 100%;
    height: calc(100vh - 140px);
    background-color: #fff;
    position: relative;

    .skip {
      position: absolute;
      right: 36px;
      top: 30px;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      p {
        font-family: @Regular;
        font-size: 28px;
        color: @grey;
        margin-right: 20px;
        line-height: 40px;
      }

      .skip-img {
        width: 10px;
        height: 20px;
        margin-top: 5px;
      }
    }

    .title {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      position: absolute;
      top: 100px;
      left: 0px;

      p {
        &:first-child {
          font-family: @Medium;
          font-size: 40px;
          font-weight: 500;
          color: #19253d;
        }

        &:last-child {
          font-family: @Medium;
          font-size: 22px;
          color: #7a8599;
          margin-top: 16px;
        }
      }
    }

    .content {
      width: 100%;
      position: absolute;
      top: 280px;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 0 0 72px;

      .item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        margin-bottom: 42px;
        margin-right: 76px;
        opacity: 0.6;

        &.checked {
          opacity: 1;
        }

        &:nth-child(3n) {
          margin-right: 0px;
        }

        .img-box {
          width: 152px;
          height: 152px;
          border-radius: 8px;
          position: relative;
          overflow: hidden;

          .borders {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            border: 2px solid @theme;
            border-radius: 8px;
          }

          // &.checked {
          //   border: 2px solid @theme;
          // }

          .checkedNum {
            position: absolute;
            bottom: 0px;
            right: 0px;
            height: 30px;
            background-color: @theme;
            text-align: center;
            line-height: 30px;
            width: 30px;
            color: #fff;
            font-size: 20px;
            font-weight: 500;
            border-top-left-radius: 8px;
            border-bottom-right-radius: 8px;
          }

          img {
            width: 100%;
            height: 100%;
            border-radius: 8px;
          }
        }

        p {
          font-family: @Medium;
          font-size: 28px;
          font-weight: 500;
          margin-top: 18px;
          color: @grey;

          &.checked {
            color: @theme;
          }
        }
      }
    }
  }

  .bottom-btn {
    width: 100%;
    height: 120px;
    background-color: #fff;
    position: fixed;
    bottom: 0px;
    left: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;

    .btn {
      width: 642px;
      height: 80px;
      background: @theme;
      border-radius: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      opacity: 0.6;

      &.checked {
        opacity: 1;
      }

      p {
        &:first-child {
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
