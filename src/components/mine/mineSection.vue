<template>
  <div class="mineSection_box">
    <p class="section_title">{{ sectionConent.titles }}</p>
    <div class="section_items">
      <item v-if="item.show" v-for="(item, index) in sectionConent.items" :item="item" :key="index" />
    </div>
  </div>
</template>

<script>
import item from '@/components/mine/Item'

export default {
  name: 'mine-section',
  components: {
    item
  },
  props: {
    sectionConent: {
      type: Object,
      default() {
        return {
          titles: '常用工具',
          items: [
            {
              imgSrc: 'home_icon_evaluation.png',
              text: '文字',
              imgWidth: '32px',
              imgHeight: '32px',
              itemLink: '/'
            }
          ]
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.mineSection_box {
  width: 100%;
  background-color: #fff;
  margin-top: 24px;
  padding: 20px 30px 48px;

  .section_title {
    font-size: 32px;
    font-weight: 500;
  }

  .section_items {
    display: flex;
    margin-top: 32px;
    flex-wrap: wrap;
    .box {
      flex: 0 0 20%;
    }
  }
}
</style>
