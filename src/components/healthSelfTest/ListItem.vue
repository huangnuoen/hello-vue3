<template>
  <div class="list-item" @click="goIntroduce">
    <div class="content">
      <div class="content-img">
        <img class="item-img" :src="item.cover_url" alt />
      </div>
      <div class="texts">
        <p class="titles">{{item.title}}</p>
        <p class="txts">{{item.introduction}}</p>
      </div>
    </div>
    <div class="item-footer">
      <div class="nums">
        <div class="dot"></div>
        <p>
          {{item.question_count}}个问题 | 约{{item.takeup_minute === 0 ?item.takeup_minute + 1:item.takeup_minute}}分钟 |
          <em>{{item.user_result_count !== null?item.user_result_count:0}}</em>人已自测
        </p>
      </div>
      <div class="btn">点击测试</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'list-item',
  props: ['item', 'type'],
  methods: {
    goIntroduce() {
      this.$router.push({
        path: `/test-introduce?type=${this.type}&id=${this.item.id}`
      })
    }
  }
}
</script>

<style lang="less" scoped>
.list-item {
  width: 690px;
  height: 272px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  padding: 30px;
  box-sizing: border-box;
  margin-top: 24px;

  .content {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .content-img {
      width: 130px;
      height: 130px;
      margin-right: 20px;

      .item-img {
        width: 130px;
        height: 130px;
      }
    }

    .texts {
      .titles {
        font-size: 32px;
        color: @black-d;
        font-family: @Medium;
        font-weight: 500;
        margin-bottom: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }

      .txts {
        font-size: 28px;
        color: @grey;
        font-family: @STYuanti;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }

  .item-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 36px;

    .nums {
      display: flex;
      align-items: center;
      justify-self: flex-start;

      .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: @theme;
        margin-right: 8px;
      }

      p {
        font-size: 24px;
        color: @grey;

        em {
          color: @theme;
          font-weight: 500;
        }
      }
    }

    .btn {
      width: 164px;
      height: 56px;
      background-color: #ffeecf;
      color: #fa9716;
      text-align: center;
      line-height: 56px;
      font-size: 24px;
      font-weight: 500;
      font-family: @Medium;
      border-radius: 28px;

      &.tested {
        background-color: #fff;
        border: 2px solid @theme;
      }
    }
  }
}
</style>
