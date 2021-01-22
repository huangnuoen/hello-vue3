<template>
  <section class="drug-info" >
    <h3 class="left-line">药品说明</h3>
    <ul class="instruction">
      <li>
        <div class="label">【规格】</div>
        <div class="value">{{item.specification|| '-'}}</div>
      </li>
      <li>
        <div class="label">【厂家】</div>
        <div class="value">{{item.company|| '-'}}</div>
      </li>
      <li>
        <div class="label">【药品名称】</div>
        <div class="value">
          通用名称：{{item.general_name||'无'}}，英文名称：{{item.english_name||'无'}}，汉语拼音：{{item.pinyin_name||'无'}}</div>
      </li>
      <li>
        <div class="label">【成分】</div>
        <div class="value">{{item.component|| '-'}}</div>
      </li>
      <li>
        <div class="label">【性状】</div>
        <div class="value">{{item.character|| '-'}}</div>
      </li>
      <li>
        <div class="label">【作用类别】</div>
        <div class="value">{{item.action_category|| '-'}}</div>
      </li>
      <li>
        <div class="label">【适应症】</div>
        <div class="value">{{item.indication|| '-'}}</div>
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  props: {
    item: Object
  }
}
</script>
<style lang="less" scoped>
@import '~@/pages/store/goods.less';

.drug-info {
  ul.instruction {
    li {
      display: flex;
      padding: 18px 0;
      font-size: 26px;
      color: @black-l;
      .label {
        flex: 0 0 168px;
        font-size: 28px;
        color: @black-d;
      }
    }
  }
}

</style>
