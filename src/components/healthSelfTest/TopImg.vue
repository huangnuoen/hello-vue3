<template>
  <div class="top-img">
    <img class="bgImg" :src="topImg.card_url" alt="">

    <p class="problem">{{topImg.title}}</p>
    <p class="frequency">
      已测
      <!--<em>{{topImg.testing_count !== null?topImg.testing_count:0}}</em> 次-->
      <em>{{topImg.user_result_count}}</em> 次
    </p>
  </div>
</template>

<script>
export default {
  name: 'top-img',
  props:{
    topImg:{
      type:Object,
      default:()=>{
        return{
          title:"默认值",
          testing_count:"0",
          card_url:'https://public-10006067.cos.ap-shanghai.myqcloud.com/tmp/0327f31a2a3bcf6f05618790d2fb57b9.jpeg'
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.top-img {
  width: 690px;
  height: 192px;
  border-radius: 8px;
  position: relative;

  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding-left: 26px;

  font-family: @Medium;
  color: #fff;

  .bgImg{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .problem {
    font-size: 32px;
    margin-bottom: 12px;
    font-weight: 500;
    z-index: 2;
  }

  .frequency {
    font-size: 24px;
    z-index: 2;
    em {
      color: #fa9716;
    }
  }
}
</style>
