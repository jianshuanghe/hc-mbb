<template>
  <div class="content">
    <div class="contact-box"  @click="clickFlowInletDetaile(msgData)">
      <div class="cont-text left">
        <p class="cont-title">{{msgData.title}}</p>
        <p class="cont-describe">{{msgData.content}}</p>
      </div>
      <div class="cont left">
        <div class="lianxi-box">
          <p class="">立即联系</p>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'contactBusiness',
        props: ['msgData'],
        data () {
          return {
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
        created () {
          console.log(this.msgData, '子组件contactBusiness获得数据');
        },
        mounted () {},
        methods: {
          clickFlowInletDetaile (e) {
            console.log(e, '触发进入发现商机详情！');
            if (e.type === '1') {
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
              };
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
    padding: 4vw 4vw;
    background: #fff;
    margin-bottom: 1.5vw;
  }
  .contact-box{
    position: relative;
    width: 100%;
  }
  .cont-text{
    position: relative;
    width: 70%;
  }
  .cont-title{
    position: relative;
    width: 100%;
    font-size: 4.5vw;
    font-family: PingFang-SC-Medium;
    color: #2E2E30;
    letter-spacing: 0;
    line-height: 9vw;
  }
  .cont-describe{
    position: relative;
    width: 100%;
    ont-family: PingFang-SC-Medium;
    font-size: 4vw;
    color: #9B9B9B;
    text-align: justify;
    line-height: 4.8vw;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    max-height: 9.6vw;
  }
  .cont{
    position: relative;
    width: 30%;
  }
  .lianxi-box{
    position: relative;
    width: 78%;
    border: 1px solid #02C2A2;
    height: 8vw;
    float: right;
    border-radius: 1vw;
    margin-top: 5vw;
  }
  .lianxi-box>p{
    position: relative;
    width: 100%;
    text-align: right;
    font-family: PingFang-SC-Medium;
    font-size: 3.75vw;
    color: #02C2A2;
    text-align: center;
    line-height: 8vw;
  }
</style>
