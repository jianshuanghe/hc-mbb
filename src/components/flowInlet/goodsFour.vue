<template>
  <div class="content">
    <div class="goods-box">
      <div class="goods">
        <div class="goods-img left" align="center" v-for="(items, index) in msgData.adveLists" :key="index"  @click="clickFlowInletDetaile(items)">
          <div class="img-box-g">
            <img :src="items.banner01" alt="" class="Middle">
          </div>
          <p class="goods-name">{{items.title}}</p>
          <div class="price">
            <p class="price-text"  v-if="items.custType === '1'"><span class="">￥{{items.minMoeny || 0}}</span>-<span class="">{{items.maxMoeny || 0}}</span></p>
            <p class="price-text"  v-if="items.custType === '0'">价格面议</p>
          </div>
          <div class="lianxi-box">
            <p class="">立即联系</p>
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import address from '@/assets/images/business/home/findBusinessList/address.png';
  import doc from '@/assets/images/business/home/findBusinessList/doc.png';
  import doced from '@/assets/images/business/home/findBusinessList/doced.png';
  import find from '@/assets/images/business/home/findBusinessList/find.png';
  import finded from '@/assets/images/business/home/findBusinessList/finded.png';
  import like from '@/assets/images/business/home/findBusinessList/like.png';
  import liked from '@/assets/images/business/home/findBusinessList/liked.png';
  import love from '@/assets/images/business/home/findBusinessList/love.png';
  import loved from '@/assets/images/business/home/findBusinessList/loved.png';
  import share from '@/assets/images/business/home/findBusinessList/share.png';
  import shared from '@/assets/images/business/home/findBusinessList/shared.png';
  import tel from '@/assets/images/business/home/findBusinessList/tel.png';
  import teled from '@/assets/images/business/home/findBusinessList/teled.png';
  import banner from '@/assets/images/business/home/findBusinessList/banner.png';
  import describe from '@/assets/images/business/home/findBusinessList/describe.png';
  import goods from '@/assets/images/business/home/findBusinessList/goods.png';
    export default {
        name: 'goodsFour',
        data () {
          return {
            address: address,
            doc: doc,
            doced: doced,
            find: find,
            finded: finded,
            like: like,
            liked: liked,
            love: love,
            loved: loved,
            share: share,
            shared: shared,
            tel: tel,
            teled: teled,
            banner: banner,
            describe: describe,
            goods: goods,
            items: { // 用户缓存用户行为的子项
              instId: '', // id
              find: false, // 查看
              tel: false, // 电话
              doc: false, // 留言
              like: false, // 点赞
              share: false // 分享
            },
            clickRecordsArr: [] // 用户点击行为数组记录
          };
        },
        props: ['msgData'],
        created () {
          console.log(this.msgData, '子组件goodsFour获得数据');
          if (this.msgData.typeNames) {
            this.msgData.typeNames = String(this.msgData.typeNames).split(',');
            this.msgData.typeNames.pop();
          };
        },
        mounted () {},
        methods: {
          clickFlowInletDetaile (e) {
            console.log(e, '触发进入发现商机详情！');
            if (e.type !== '1') {
              let params = {
                href: '', // 用于用户从如何秀返回时使用
                source: 'FI', // 定义来源参数 FB：发现商机页面, FI流量承载页
                userId: '', // 用户id, 用来判断用户登录状态
                sessionId: '', // 记录用户sessionId， 从流量平台进入
                instrucId: e.instId,
                tempId: e.custType,
                instrucTitle: e.title,
                agin: 200
              };
              if (localStorage.getItem('landRegist')) {
                let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
                console.log(landRegistLG.user.id);
                params.userId = landRegistLG.user.id;
              }
              if (localStorage.getItem('queryFI')) {
                let queryFI = JSON.parse(localStorage.getItem('queryFI')); // 缓存中的参数
                params.href = window.location.href.split('R')[0] + '?adveId=' + Number(queryFI.adveId) + '&advertPlatform=' + queryFI.advertPlatform;
              }
              params.sessionId = localStorage.getItem('sessionId');
              if (e.custType === '1') {
                if (this.Rhxherf === 'http://10.158.41.177:8082') { // 測試環境
                  params.tempId = 65;
                }
                // tempType = 1 代表进入定制模板
                // http://127.0.0.1:8082/cust?source=FI&userId=&instrucId=1580&tempId=65&instrucTitle=%E5%AE%9A%E5%88%B6%E6%A8%A1%E6%9D%BF&agin=200&herf=http%3A%2F%2F127.0.0.1%3A8081%2F%23%2FflowInlet%3FadveId%3D78%26advertPlatform%3D0&sessionId=ae8edc50-b441-4ca5-81ca-8dbc03033384
                window.location.href = this.Rhxherf + '/helloWorld?tempType=1' + '&source=' + params.source + '&userId=' + params.userId + '&instrucId=' + params.instrucId + '&tempId=' + params.tempId + '&instrucTitle=' + params.instrucTitle + '&agin=200' + '&herf=' + encodeURIComponent(params.href) + '&sessionId=' + params.sessionId + '&like=' + this.items.like;
              } else {
                if (this.Rhxherf === 'http://10.158.41.177:8082') { // 測試環境
                  params.tempId = 45;
                }
                // tempType = 0 代表进入普通模板
                // http://127.0.0.1:8082/mitemp?source=FI&wxId=1.0&userId=&instrucId=1888&tempId=45&instrucTitle=%E5%AE%9A%E5%88%B6%E6%A8%A1%E6%9D%BF&agin=200&herf=http%3A%2F%2F127.0.0.1%3A8081%2F%23%2FflowInlet%3FadveId%3D78%26advertPlatform%3D0&sessionId=352d6529-346a-46ec-9510-d459c710d9c2
                window.location.href = this.Rhxherf + '/helloWorld?tempType=0' + '&wxId=1.0' + '&source=' + params.source + '&userId=' + params.userId + '&instrucId=' + params.instrucId + '&tempId=' + params.tempId + '&instrucTitle=' + params.instrucTitle + '&agin=200' + '&herf=' + encodeURIComponent(params.href) + '&sessionId=' + params.sessionId + '&like=' + this.items.like;
              };
            }
          }
        }
      };
</script>

<style scoped>
  .content{
    position: relative;
    width: 100vw;
    padding: 2vw 4vw;
    background: #fff;
    margin-bottom: 1.5vw;
  }
  .goods-box{
    position: relative;
    width: 100%;
    padding: 2vw 0 2vw 0;
  }
  .goods{
    position: relative;
    width: 100%;
  }
  .goods-img{
    position: relative;
    width: 33.3333%;
  }
  .img-box-g{
    position: relative;
    width: 100%;
    height: 20vw;
  }
  .img-box-g>img{
    position: relative;
    max-width: 80%;
    max-height: 100%;
    display: table-cell;
    vertical-align: middle;
    position: relative;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
  }
  .goods-name{
    position: relative;
    width: 100%;
    text-align: center;
    font-family: PingFang-SC-Medium;
    font-size: 3.7vw;
    color: #2E2E30;
    line-height: 5vw;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .price{
    position: relative;
    width: 100%;
    margin-bottom: 1vw;
    height: 6vw;
  }
  .price>p{
    font-family: PingFang-SC-Bold;
    position: relative;
    width: 100%;
    font-size: 3.2vw;
    line-height: 4vw;
    color:  #2E2E30;
  }
  .lianxi-box{
    position: relative;
    width: 88%;
    border: 1px solid #02C2A2;
    height: 6.9vw;
    /* float: right; */
    border-radius: 1px;
  }
  .lianxi-box>p{
    position: relative;
    width: 100%;
    text-align: right;
    font-family: PingFang-SC-Medium;
    font-size: 3vw;
    color: #02C2A2;
    text-align: center;
    line-height: 6.5vw;
  }
</style>
