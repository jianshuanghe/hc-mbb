<template>
  <div class="aboutUs-content">
    <topBox>
      <p class="title-putIn">关于我们</p>
    </topBox>
    <div class="aboutUs">
      <!--logo-->
      <div class="AU-logo">
        <img :src="logo" alt="" class="img">
      </div>
      <!--介绍-->
      <div class="AU-box">
        <p class="AU-title">公司介绍</p>
        <div class="AU-company-img">
          <img :src="company" alt="" class="">
        </div>
        <div class="AU-company-text">
          <p class="">陌拜商机，一家专注于企业级流量共享推广的平台，公司总部设立于中国北京。</p>
          <p class="">我们是一家针对B端中小企业客户，专门做企业级商机推广，帮助企业从各大流量平台低价获客的平台，包含建站、投放、推广获客一系列服务。与此同时，我们与谷歌合作，帮助跨境企业扩大推广平台，获取大量海外客户资源，让企业花更少的钱获取更多的企业客户。</p>
          <p class="">我们相信，流量共享模式将是中小企业推广的福音，帮助中小企业拓宽流量获取渠道、降低推广成本，依据数据分析，精准撮合企业间合作是我们奋斗的目标。我们不仅让企业低价获客，还将协助企业获取上游合作商机以及政府的政策支持。</p>
        </div>
        <div class="line"></div>
      </div>
      <!--加入-->
      <div class="AU-box">
        <p class="AU-title">加入我们</p>
        <div class="AU-company-img">
          <img :src="recruit" alt="" class="img">
        </div>
      </div>
      <!--成为-->
      <div class="AU-box">
        <p class="AU-title">成为陌拜商机代理商，您可获得：</p>
        <div class="AU-CW">
          <p class="">1.引入企业的成为会员后可分得佣金；<br/>
            2.引入企业投放每次消耗都可分的佣金；<br/>
            3.每季度/年度优质代理商奖励；<br/>
            ……</p>
          <div class="AU-LX">
            <div class="AU-LX-items">
              <p class="left left-box-AU">招募人</p>
              <p class="left right-box-AU">王女士</p>
              <div class="clear"></div>
            </div>
            <div class="AU-LX-items">
              <p class="left left-box-AU">招募电话</p>
              <p class="left right-box-AU">400-618-2288</p>
              <div class="clear"></div>
            </div>
            <div class="AU-LX-items">
              <p class="left left-box-AU">申请邮箱</p>
              <p class="left right-box-AU">wangyameng01@hc360.com</p>
              <div class="clear"></div>
            </div>
          </div>
        </div>
        <div class="line"></div>
      </div>
      <!--联系-->
      <div class="AU-box">
        <p class="AU-title">联系我们</p>
        <div class="AU-company-img">
          <img :src="map" alt="" class="img">
        </div>
        <div class="AU-LX">
          <div class="AU-LX-items">
            <p class="left left-box-AU">服务热线</p>
            <p class="left right-box-AU">400-618-2288</p>
            <div class="clear"></div>
          </div>
          <div class="AU-LX-items">
            <p class="left left-box-AU">公司地址</p>
            <p class="left right-box-AU">北京市昌平区回龙观慧聪网总部</p>
            <div class="clear"></div>
          </div>
          <div class="AU-LX-items">
            <p class="left left-box-AU">工作时间</p>
            <p class="left right-box-AU">周一至周五8:30-18:00</p>
            <div class="clear"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import topBox from './../../../../common/topBox';
  import logo from '@/assets/images/business/home/personCenter/logo.png';
  import recruit from '@/assets/images/business/home/personCenter/recruit.png';
  import company from '@/assets/images/business/home/personCenter/company.png';
  import map from '@/assets/images/business/home/personCenter/map.png';
    export default {
        name: 'aboutUs',
        components: {
          topBox
        },
        data () {
          return {
            logo: logo,
            company: company,
            recruit: recruit,
            map: map
          };
        },
        created () {},
        mounted () {},
        methods: {
          goToNewsItemsDetail () {
            console.log('to消息详情');
            this.$router.push({
              path: '/newsItemsList',
              query: { }
            });
          }
        }
      };
</script>

<style scoped>
  .aboutUs-content{
    position: relative;
    width: 100%;
    min-height: 100vw;
    background: #fff;
  }
  .aboutUs{
    position: fixed;
    width: 100%;
    padding: 4vw;
    height: 98vh;
    padding-bottom: 15vh;
    overflow: scroll;
    -webkit-overflow-scrolling:touch;
  }
  .AU-logo{
    position: relative;
    width: 30vw;
    height: 11.2vw;
    margin: auto;
    margin-top: 6vw;
    margin-bottom: 3vw;
  }
  .AU-logo>img{
    position: relative;
    width: 100%;
  }
  .AU-box{
    position: relative;
    width: 100%;
    margin-top: 2vw;
  }
  .AU-title{
    font-family: PingFang-SC-Bold;
    font-size: 4.533vw;
    color: #2E2E30;
    letter-spacing: 0;
    line-height: 15vw;
  }
  .AU-company-img>img{
    position: relative;
    width: 100%;
  }
  .AU-company-text{
    position: relative;
    width: 100%;
    margin-bottom: 8vw;
  }
  .AU-company-text>p{
    font-family: PingFangSC-Regular;
    font-size: 3.5vw;
    color: #5D5D5D;
    line-height: 6vw;
    text-align: justify;
    margin-top: 3vw;
    margin-bottom: 3vw;
  }
  .AU-CW{
    position: relative;
    width: 100%;
  }
  .AU-CW>p{
    font-family: PingFang-SC-Medium;
    font-size: 3.5vw;
    color: #2E2E30;
    line-height: 9vw;
  }
  .AU-LX{
    position: relative;
    width: 100%;
    margin-bottom: 5vw;
    margin-top: 3vw;
  }
  .AU-LX-items{
    position: relative;
    width: 100%;
  }
  .left-box-AU{
    position: relative;
    width: 25%;
    font-family: PingFang-SC-Medium;
    font-size: 3.5vw;
    color: #2E2E30;
    line-height: 8vw;
  }
  .right-box-AU{
    position: relative;
    width: 70%;
    font-family: PingFangSC-Regular;
    font-size: 3.5vw;
    color: #5D5D5D;
    line-height: 8vw;
  }
</style>
