<!-- 用药指南-药品 -->
<template>
  <div class="drug-card">
    <div>
      <i></i>
      <span>{{info.title}}</span>
    </div>
    <p>{{info.tip}}</p>
  </div>
</template>
<script>
export default {
  name: 'drug-card',
  props: ['info']
}
</script>
<style lang="less" scoped>
.drug-card {
  width:218px;
  height:128px;
  background:#f7f7f7;
  border-radius:8px;
  padding: 28px 14px;
  &>div {
    display: flex;
    align-items: center;
  }
  i {
    border-width: 3px;
    border-style: solid;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    margin-right: 12px;
    box-sizing: content-box;
  }
  span {
    font-size:28px;
    font-family:@Medium;
    font-weight:500;
    color:#262626;
    line-height:40px;
  }
  p {
    font-size:22px;
    color:#8c8c8c;
    line-height:32px;
    padding-left: 28px;
  }
  &:nth-child(1n) {
    i {
      border-color: #36CFC9;
    }
  }
  &:nth-child(2n) {
    i {
      border-color: #FF7875;
    }
  }
  &:nth-child(3n) {
    i {
      border-color: #40A9FF;
    }
  }
}
</style>
