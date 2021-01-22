<template>
  <div class="project" v-if="homeData">
    <section class="header">
      <Top></Top>
      <Banner :homeData="homeData"></Banner>
    </section>
    <section class="body">
      <!-- 专属权益 -->
      <MyRight :benefits="homeData.benefits"></MyRight>
      <!-- 家庭档案 -->
      <HealthFiles></HealthFiles>
    </section>
  </div>
</template>

<style lang="less" scoped>
.project {
  min-height: 100vh;
  background-color: rgba(250, 247, 242, 1);
  .header {
    width: 100%;
  }
  .body {
    padding: 0 32px;
  }
}
</style>

<script>
import Top from '@/components/project-agent/Top'
import Banner from '@/components/project-agent/Banner'
import MyRight from '@/components/project-agent/MyRight'
import HealthFiles from '@/components/project-agent/HealthFiles'
export default {
  components: {
    Top,
    Banner,
    MyRight,
    HealthFiles
  },
  data() {
    return {
      homeData: null
    }
  },
  created() {
    // 获取体检权益
    // this.$api.project_agent.getCardBenefit().then((res) => {
    // 上架审核
    let res = {
      code: 200,
      message: '',
      data: {
        card_number: 'GDC000901832001',
        user_id: 3521999,
        id: 712,
        card_bg: 'https://public-10006067.file.myqcloud.com/upload/imagelist/ori/203b17701d2a02c9658be5da42274226.png',
        end_day: '2021年01月19日',
        days: 236,
        link_to: 'https://test.daishutijian.com/tijian5/apps/frontend/agent/h5/index.php#/home',
        benefits: [
          {
            logo: 'https://public-10006067.file.myqcloud.com/upload/imagelist/thumb/e71c36278e2ad13f93b636561b05960b.png',
            name: '体检预约',
            description: '专业体检预约',
            times: '1次',
            link_to: 'https://test.daishutijian.com/tijian5/apps/frontend/agent/h5/index.php#/home'
          },
          {
            logo: 'https://public-10006067.file.myqcloud.com//upload/imagelist/ori/878ef8f329f65483c0cfd32d62864a74.png',
            name: '专家问诊',
            description: '线上问诊更快捷',
            times: '12次',
            link_to: 'https://test.daishutijian.com/tijian5/apps/frontend/agent/h5/index.php#/home'
          },
          {
            logo: 'https://public-10006067.file.myqcloud.com//upload/imagelist/ori/878ef8f329f65483c0cfd32d62864a74.png',
            name: '报告解读',
            description: '线上报告解读',
            times: '不限',
            link_to: 'https://test.daishutijian.com/tijian5/apps/frontend/agent/h5/index.php#/home'
          }
        ]
      }
    }
    if (res.code == 200) {
      this.homeData = res.data
    }
    // })
  }
}
</script>