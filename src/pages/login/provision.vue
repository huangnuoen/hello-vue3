<template>
  <div class="provision">
    <div class="container">
      <h2>袋鼠健康用户隐私保密协议</h2>
      <div class="list">
        <p>1、我公司只会收集我公司认为有助于了解本网站用户的体检需求的个人资料，以利于我公司为本网站用户提供更优质的产品和服务。</p>
        <p>
          2、我公司可能会将收集到的本网站用户的个人资料转交我公司的分支机构(或经用户预约的体检机构)，但会在法律许可的范围内进行；我公司可能会将上述个人资料提供给与我公司联合提供业务的合作伙伴及体检机构，但该合作伙伴或体检机构仍需对相关信息进行保密；在法律规定的情况下，如司法机关、监管机构及其他相关机构要求提供上述个人资料，我公司将按照法律规定和相关机构的要求提供上述个人资料。
        </p>
        <p>3、本网站用户在本网站及相关网页注册，即视为同意我公司及我公司的合作伙伴或体检机构向注册时填写的电子邮箱发送与我公司产品和服务有关的电子邮件，短信及用户协议。</p>
      </div>
    </div>
    <div class="footer">
      <img src="@/images/agrement-logo.png">
      <p class="text">©2015 - {{new Date().getFullYear()}} 讯康信息技术(深圳)有限公司</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // isWechatSubscription
    }
  }
}
</script>
<style lang="less" scoped>
.provision {
  .container {
    margin: 40px 30px;
    padding: 50px;
    height: 1040px;
    background-color: #fff;
    border: 1px solid #eee;
    h2 {
      font-weight: normal;
      text-align: center;
      font-size: 34px;
      margin-bottom: 34px;
      padding-bottom: 34px;
    }
    .list {
      p {
        margin-top: 30px;
        color: rgb(110, 110, 110);
        font-size: 26px;
        line-height: 40px;
      }
    }
  }
  .footer {
    text-align: center;
    img {
      width: 64px;
      height: 76px;
    }
    p {
      font-size: 24px;
      color: #b1b1b1;
      margin-bottom: 60px;
    }
  }
}
</style>
