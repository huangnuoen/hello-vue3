<template>
  <div class="package-list" v-if="packages.length">
    <div class="titles">
      <div>热门套餐</div>
      <div @click="linkto(more)" class="all">查看全部 <svg-icon class="all_svg" iconClass="icon_arrow_rig"></svg-icon></div>
    </div>

    <div class="package-item" v-for="packageItem in packages" :key="packageItem.id" @click="linkto(packageItem)">
      <img :src="packageItem.p_img_small" alt="" />
      <div class="item-content">
        <div class="package-name">{{ packageItem.name }}</div>
        <div class="doc-name">
          {{
            packageItem.org_supplier_cnt < 2 ? `由 ${packageItem.org_name} 提供` : `由 ${packageItem.org_name} 等${packageItem.org_supplier_cnt}家医院提供`
          }}
        </div>
        <div class="tag-list">
          <span class="tag" v-for="tagItem in packageItem.package_tags_new" :key="tagItem">{{ tagItem }}</span>
        </div>
        <div class="number">
          <span class="money"
            >&yen; <em>{{ packageItem.min_price / 100 }}</em> 起</span
          >
          <span class="man">{{ packageItem.sold_cnt }}人已约</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    packages: {
      type: Array,
      default() {
        return []
      }
    },
    more: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    linkto(item) {
      this.$emit('linkto', item)
    }
  }
}
</script>

<style lang="less" scoped>
.package-list {
  background-color: #fff;
  margin-top: 10px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;

  .titles {
    padding: 40px 30px 48px;
  }

  .package-item {
    width: 100%;
    height: 272px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0 30px;

    > img {
      width: 136px;
      height: 136px;
      border-radius: 8px;
      margin-right: 24px;
      object-fit: cover;
    }

    .item-content {
      flex: 1;
      .package-name {
        font-size: 28px;
        font-family: @Medium;
        font-weight: 500;
        color: #3d3e40;
        // line-height: 28px;
        margin-bottom: 16px;
        .ellipsis-line(526px , 1);
      }

      .doc-name {
        font-size: 22px;
        font-family: @Regular;
        color: #85898c;
        // line-height: 22px;
        margin-bottom: 16px;
        .ellipsis-line(526px , 1);
      }

      .tag-list {
        min-height: 32px;
        margin-bottom: 48px;
        .tag {
          display: inline-block;
          padding: 2px 8px;
          // height: 32px;
          border-radius: 4px;
          border: 1px solid rgba(250, 144, 38, 0.5);
          font-size: 20px;
          font-family: @Regular;
          color: #fa9026;
          // line-height: 32px;
          text-align: center;
          margin-right: 8px;
        }
      }

      .number {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .money {
          font-size: 24px;
          font-family: @Semibold;
          color: #fa541c;
          line-height: 24px;

          em {
            font-weight: 600;
            font-size: 32px;
          }
        }

        .man {
          font-size: 22px;
          font-family: @Regular;
          color: #85898c;
          line-height: 22px;
        }
      }
    }
  }
}

.titles {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  color: #303233;
  font-size: 32px;

  .all {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #85898c;
    font-size: 24px;

    .all_svg {
      width: 24px;
      height: 24px;
    }
  }
}
</style>