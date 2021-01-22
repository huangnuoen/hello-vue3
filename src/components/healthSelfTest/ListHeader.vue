<template>
  <div class="list-header" @click="clickCheck($event)">
    <van-icon name="arrow-left" class="return" @click="$router.go(-1)" />
    <div class="center">
      <div class="all">{{headerText}}</div>
      <div class="triangle"></div>
    </div>

    <div class="header-item" v-show="showItem">
      <div class="item">
        <van-icon name="arrow-left" class="return" @click="$router.go(-1)" />
        <div class="center">
          <div class="all">{{headerText}}</div>
          <div class="triangle"></div>
        </div>
      </div>
      <div class="item" @click="checked(0,'全部')">
        <div class="center" :class="{'add-color':type===0}">
          <div class="all">全部</div>
        </div>
      </div>
      <div class="item" @click="checked(1,'仅看未测')">
        <div class="center" :class="{'add-color':type===1}">
          <div class="all">仅看未测</div>
        </div>
      </div>
      <div class="item" @click="checked(2,'已测')">
        <div class="center" :class="{'add-color':type===2}">
          <div class="all">已测</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant'

export default {
  name: 'list-header',
  components: {},
  props: ['type'],
  data() {
    return {
      showItem: false,
      headerText: '已测'
    }
  },
  components: {
    [Icon.name]: Icon
  },
  methods: {
    clickCheck(e) {
      if (e.target.className === 'return') {
      } else {
        this.showItem = !this.showItem
      }
    },
    checked(n, txt) {
      this.headerText = txt

      this.$emit('update:type', n)
    }
  }
}
</script>

<style lang="less" scoped>
.list-header {
  height: 88px;
  width: 100%;
  background-color: #fff;
  position: fixed;
  top: 0px;
  left: 0px;

  > .return {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 32px;
  }

  > .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: @black-m;
    display: flex;
    align-items: center;
    justify-content: center;
    .all {
      font-size: 28px;
    }

    > .triangle {
      width: 0px;
      height: 0px;
      border: 8px solid #000;
      border-top-color: @grey-l;
      border-bottom-color: transparent;
      border-left-color: transparent;
      border-right-color: transparent;
      margin-left: 10px;
      margin-top: 16px;
    }
  }

  > .header-item {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
    width: 100%;
    min-height: 100vh;

    > .item {
      height: 88px;
      width: 100%;
      background-color: #fff;
      border-bottom: 1px solid #e8e8e8;
      position: relative;

      > .return {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 32px;
      }

      > .center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        color: @black-m;

        > .triangle {
          width: 0px;
          height: 0px;
          border: 8px solid #000;
          border-top-color: @theme;
          border-bottom-color: transparent;
          border-left-color: transparent;
          border-right-color: transparent;
          margin-left: 10px;
          margin-top: 16px;
        }
      }

      .add-color {
        color: @theme;
      }

      &:first-child {
        .center {
          color: @theme;
          .all {
            font-size: 28px;
          }

          .triangle {
            margin-left: 8px;
          }
        }
      }
    }
  }
}
</style>
