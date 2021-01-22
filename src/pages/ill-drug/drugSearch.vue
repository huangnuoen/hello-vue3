<template>
  <div class="main">
    <search :type="2" :str="str" @searchInfo="searchInfo" :changeKey="changeKey"></search>
    <div v-if="flag">
      <div class="hot">
        <div class="hot-top">
          <span>热门搜索</span>
          <img src="@/images/ill-drug/global_icon_hot@2x.png" alt />
        </div>
        <hot-search :type="'1'" :data="hotList" @searchInfo="searchInfo"></hot-search>
      </div>
      <div v-show="historyList.length" class="hot">
        <div class="hot-top">
          <div class="left">
            <span>搜索记录</span>
          </div>
          <div class="delete" @click="deleteAll">
            <img src="@/images/ill-drug/global_icon_del@2x.png" alt />
          </div>
        </div>
        <hot-search :data="historyList" @searchInfo="searchInfo"></hot-search>
      </div>
    </div>
    <div v-else-if="searchList.length" class="else-if">
      <div class="search-count">
        <span class="search-left">为您找到</span>
        <span class="search-num">{{total}}</span>
        <span>条搜索结果</span>
      </div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多相关结果了"
        @load="onLoad"
        :offset="10"
      >
        <div v-for="item in searchList" :key="item.id" class="result" @click="detail(item.id)">
          <div class="result-top" :id="item.id">
            <span v-html="item.common_name"></span>
          </div>
          <div class="result-bottom">
            <span>{{item.manufacturer}}</span>
          </div>
          <img src="@/images/ill-drug/global_icon_arrow@2x.png" alt class="dayu" />
        </div>
      </van-list>
    </div>
    <div v-else class="empty">
      <empty :desc="'暂未搜索到相关结果'"></empty>
    </div>
    <van-popup v-model="show">
      <div class="tanchu">
        <div class="title">
          <span>确定清空搜索历史吗?</span>
        </div>
        <div class="button">
          <div class="button-left" @click="cancelDelete">取消</div>
          <div class="button-right" @click="confirmDelete">确定</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Search from '@/components/ill-drug/SearchTwo'
import HotSearch from '@/components/ill-drug/HotSearch'
import Empty from '@/base/Empty/Empty'
import { Popup, List } from 'vant'
export default {
  name: 'drug-search',
  components: {
    Search,
    HotSearch,
    Empty,
    [Popup.name]: Popup,
    [List.name]: List
  },
  data() {
    return {
      str: '',
      hotList: [
        {
          name: '连花清瘟胶囊',
          id: 47557
        },
        {
          name: '双黄连口服液',
          id: 71880
        },
        {
          name: '布洛芬',
          id: 5858
        },
        {
          name: '板蓝根',
          id: 6079
        },
        {
          name: '六味地黄丸',
          id: 48109
        }
      ],
      historyList: [],
      searchList: [],
      flag: true,
      show: false,
      total: 0,
      page: 1,
      loading: false,
      finished: false
    }
  },
  methods: {
    deleteAll() {
      this.show = true
    },
    changeKey(val) {
      this.str = val
    },
    searchInfo(str) {
      this.str = str
      this.page = 1
      this.finished = false
      // 请求
      this.$api.illDrug
        .searchDrug({
          wd: str
        })
        .then((res) => {
          if (res.code === 200) {
            this.searchList = res.data.data.map((i) => ({
              ...i,
              common_name: this.brightKeyword(i.common_name)
            }))
            if (this.searchList.length < 10) {
              this.finished = true
            }
            this.total = res.data.total
            this.flag = false
          }
        })
    },
    detail(id) {
      this.$router.push({
        path: `/drug-detail/${id}`
      })
    },
    cancelDelete() {
      this.show = false
    },
    confirmDelete() {
      // 删除请求
      this.historyList = []
      // 隐藏
      this.show = false
    },
    brightKeyword(val) {
      const str = this.str
      if (val.indexOf(str) !== -1) {
        return val.replace(str, `<span style='color:rgba(24,144,255,1)'>${str}</span>`)
      } else {
        return val
      }
    },
    onLoad() {
      // 异步更新数据
      this.$api.illDrug
        .searchDrug({
          wd: this.str,
          page: ++this.page
        })
        .then((res) => {
          if (res.code === 200) {
            if (!res.data.data.length) {
              this.finished = true
              return
            }
            this.searchList = [
              ...this.searchList,
              ...res.data.data.map((i) => ({
                ...i,
                common_name: this.brightKeyword(i.common_name)
              }))
            ]
            this.count = res.data.count
            this.flag = false
            this.loading = false
            if (this.searchList.length >= this.total) {
              this.finished = true
            }
          }
        })
    }
  }
}
</script>

<style lang='less' scoped>
.main {
  background: rgba(255, 255, 255, 1);
  height: 100vh;
  .hot {
    width: 100%;
    margin-top: 42px;
    .hot-top {
      font-size: 30px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(38, 38, 38, 1);
      line-height: 42px;
      margin-left: 30px;
      height: 42px;
      position: relative;
      .left {
        float: left;
      }
      span {
        margin-right: 8px;
      }
      img {
        width: 32px;
        height: 32px;
        vertical-align: -10%;
      }
      .delete {
        float: right;
        margin-right: 32px;
        img {
          width: 32px;
          height: 32px;
        }
      }
    }
  }
  .else-if {
    width: 100%;
    overflow: hidden;
    .search-count {
      background: rgba(247, 247, 247, 1);
      height: 64px;
      line-height: 64px;
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(140, 140, 140, 1);
      .search-left {
        margin-left: 30px;
      }
      .search-num {
        font-size: 34px;
        font-family: Helvetica;
        color: rgba(250, 151, 22, 1);
        margin: 0 8px;
      }
    }
    .result {
      width: 750px;
      height: 120px;
      background: rgba(255, 255, 255, 1);
      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(64, 64, 64, 1);
      position: relative;
      overflow: hidden;
      .result-top {
        margin-left: 30px;
        height: 44px;
        margin-top: 22px;
      }
      .result-bottom {
        margin-left: 30px;
        margin-top: 8px;
        height: 22px;
        font-size: 22px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(122, 133, 153, 1);
        line-height: 22px;
      }
      .dayu {
        position: absolute;
        right: 48px;
        top: 48px;
        vertical-align: middle;
        width: 10px;
        height: 22px;
      }
    }
  }
  .empty {
    margin-top: 132px;
  }
  .van-popup {
    width: 540px;
    height: 256px;
    background: rgba(255, 255, 255, 1);
    border-radius: 16px;
    .tanchu {
      width: 100%;
      height: 100%;
      padding: 60px 32px 20px 32px;
      .title {
        height: 44px;
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(38, 38, 38, 1);
        line-height: 44px;
        text-align: center;
      }
      .button {
        margin-top: 62px;
        height: 70px;
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        line-height: 40px;
        overflow: hidden;
        text-align: center;
        line-height: 70px;
        .button-left {
          float: left;
          width: 220px;
          height: 70px;
          background: rgba(240, 242, 242, 1);
          border-radius: 40px;
          color: rgba(96, 98, 102, 1);
          margin-left: 12px;
        }
        .button-right {
          float: left;
          width: 218px;
          height: 70px;
          background: rgba(255, 171, 17, 1);
          border-radius: 40px;
          color: rgba(255, 255, 255, 1);
          margin-left: 14px;
        }
      }
    }
  }
}
</style>
