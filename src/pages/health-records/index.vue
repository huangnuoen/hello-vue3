<template>
  <div class="health-records" v-show="pageShow">
    <div class="list" v-if="list.length">
      <div class="item" @click="$router.push(`/add-edit?id=${item.id}`)" v-for="item in list" :key="item.id">
        <div class="content">
          <div>
            <span class="name">{{ item.name }}</span>
            <span class="sex">{{ item.sex === 1 ? '男' : '女' }}</span>
            <span class="age">{{ item.age }}岁</span>
          </div>
          <div>
            <span class="card">{{ item.id_number }}</span>
            <span>|</span>
            <span class="phone-number">{{ item.phone }}</span>
          </div>
        </div>
        <div>
          <van-icon name="edit" size="30px" color="#fa9716" />
        </div>
      </div>
    </div>

    <div v-else class="empty-box">
      <empty desc="暂无健康档案" />
    </div>

    <footer>
      <div class="btn" @click="$router.push('add-edit')">新增档案</div>
    </footer>
  </div>
</template>

<script>
import { Icon } from 'vant'
import Empty from '@/base/Empty/Empty'

export default {
  name: 'health-records',
  components: {
    [Icon.name]: Icon,
    Empty
  },
  data() {
    return {
      pageShow: false,
      list: []
    }
  },
  created() {
    this.getHealthList()
  },
  methods: {
    getHealthList() {
      this.$store.commit('SET_LOADING', true)

      this.$api.health_records.familyList().then((res) => {
        
        this.list = res.data.data

        this.$store.commit('SET_LOADING', false)
        this.pageShow = true
      })
    }
  }
}
</script>

<style lang="less" scoped>
.health-records {
  padding-bottom: 140px;
  .list {
    background-color: #fff;
    border-top: 1px solid #e4e7ed;
    min-height: calc(100vh - 120px);
    .item {
      margin-left: 40px;
      width: calc(100% - 40px);
      border-bottom: 1px solid #e4e7ed;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 40px 30px 40px 0px;

      .content {
        > div {
          display: flex;
          align-items: center;
          justify-content: flex-start;

          &:first-child {
            font-family: @Medium;
            font-size: 36px;
            font-weight: 500;
            color: #1e1e1e;

            span {
              margin-right: 15px;
            }
          }

          &:last-child {
            color: #999;
            font-size: 26px;
            font-family: @Medium;
            margin-top: 20px;

            span {
              margin-right: 15px;
            }
          }
        }
      }
    }
  }

  .empty-box{
    width: 100%;
    margin-top: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
  }

  footer {
    position: fixed;
    bottom: 0;
    height: 120px;
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #e4e7ed;
    z-index: 999;

    .btn {
      width: 85%;
      height: 80px;
      border-radius: 40px;
      background-color: @theme2;
      text-align: center;
      line-height: 80px;
      color: #fff;
      font-size: 30px;
      font-weight: 500;
      font-family: @Medium;
    }
  }
}
</style>