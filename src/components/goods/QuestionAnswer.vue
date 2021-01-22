<template>
  <section class="qa">
    <h3 class="left-line">常见问题</h3>
    <ul>
      <li class="qa-item" :key="index" v-for="(item,index) in list">
        <div class="question">
          <span class="sequence-number">Q</span>
          {{item.question}}
        </div>
        <div class="answer">
          <span class="sequence-number blue">A</span>
          {{item.answer}}
        </div>
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  props: {
    list: Array
  }
}
</script>
<style lang="less" scoped>
@import '~@/pages/store/goods.less';
.qa {
  .qa-item {
    font-size: 26px;
    padding-top: 10px;
    padding-bottom: 14px;
    &:last-child {
      padding-bottom: 0;
    }
    .question {
      padding-bottom: 8px;
      color: @black-d;
      font-weight: 500;
    }
    .answer {
      color: @black-m;
    }
    .question,
    .answer {
      display: flex;
      align-items: baseline;
      .sequence-number {
        flex: 0 0 26px;
      }
    }
  }
}
</style>
