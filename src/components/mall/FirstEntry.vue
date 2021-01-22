<template>
  <div class="first-entry">
    <div class="skeleton" v-if="loading">
      <div class="item" v-for="item in 10">
        <div></div>
      </div>
    </div>
    <div class="list">
      <div class="first-entry-item" v-for="(item,index) in list" :key="index" @click="$emit('link',item)" v-waves>
        <img :src="item.pic_url" class="icon" :data-mtaname="item.title">
        <div class="text">{{item.title}}</div>
      </div>
    </div>
  </div>

</template>
<script>
import { Skeleton } from 'vant'
export default {
  name: 'first-entry',
  components: { [Skeleton.name]: Skeleton },
  props: {
    list: Array,
    loading: Boolean
  },
  methods: {}
}
</script>
<style lang="less" scoped>
@import url('~@/style/transtion.less');
.first-entry {
  padding: 24px 20px 0px;
  .list,
  .skeleton {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .first-entry-item,
    .item {
      font-size: 0;
      flex: 0 0 142px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 34px;
      .icon {
        width: 80px;
        height: 80px;
        object-fit: contain;
        margin-bottom: 8px;
      }
      .text {
        font-size: 24px;
        color: @black-m;
      }
    }
  }
  .skeleton {
    justify-content: space-around;
    animation: fade 1.2s infinite alternate;
    .item {
      height: 80px;
      flex: 0 0 142px;
      div {
        width: 80px;
        height: 100%;
        background-color: @border;
      }
    }
  }
}
</style>
