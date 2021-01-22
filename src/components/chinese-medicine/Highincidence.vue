<template>
  <div class="content">
    <h3 class="title">高发病状</h3>
    <BetterScroll>
      <div class="items">
        <div v-for="(item, index) in list" :key="index" @click="toDetail(item.id)">{{ item.name }}</div>
      </div>
    </BetterScroll>
  </div>
</template>

<style lang="less" scoped>
.content {
  padding: 16px 0;
}
.title {
  position: relative;
  font-size: 36px;
  font-weight: 500;
  color: #262626;
  line-height: 50px;
  padding: 0 52px;
  margin-bottom: 16px;
}
.title:before {
  left: 30px;
  top: 50%;
  margin-top: -11px;
  content: '';
  position: absolute;
  height: 22px;
  width: 10px;
  background-color: #037cf7ff;
  border-radius: 4px;
}
.items {
  display: flex;
  div {
    font-size: 26px;
    color: #8c8c8cff;
    padding: 10px 44px;
    line-height: 26px;
    background-color: #fff;
    border-radius: 30px;
    margin-left: 16px;
  }
}
</style>

<script>
import BetterScroll from '@/base/BetterScroll/BetterScroll'
export default {
  components: {
    BetterScroll
  },
  props: {
    list: {
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    toDetail(id) {
      this.$emit('toDetail', id)
    }
  }
}
</script>
