<template>
  <div class="form-item">
    <slot></slot>
  </div>
</template>
<style lang="less" scoped>
.form-item {
  padding: 28px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.label {
  flex: 0 0 200px;
  width: 200px;
  font-size: inherit;
  font-weight: 400;
  line-height: 40px;
  white-space: nowrap;
  text-align: left;
}
.value {
  width: 80%;
  text-align: right;
  color: @grey-l;
  font-size: inherit;
  padding-right: 16px;
}
</style>
