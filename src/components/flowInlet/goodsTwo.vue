<template>
  <div class="content">
    <div class="goods-box"  @click="clickFlowInletDetaile(items)">
      <div class="" @click="setClickRecord('find', items, msgData)">
        <div class="title-box">
          <p class="">{{msgData.title}}</p>
        </div>
        <div class="location"  v-if="msgData.address !== '未选择省市区地址信息！'">
          <div class="icon left">
            <img :src="address"  alt="" class="">
          </div>
          <div class="loca-text left">{{msgData.address}}</div>
          <div class="clear"></div>
        </div>
        <div class="goods">
          <div class="goods-img1 left" align="center">
            <img :src="msgData.banner01" alt="" class="Middle">
          </div>
          <div class="goods-img left" align="center">
            <img :src="msgData.banner02" alt="" class="Middle">
          </div>
          <div class="goods-img2 left" align="center">
            <img :src="msgData.banner03" alt="" class="Middle">
          </div>
          <div class="clear"></div>
        </div>
        <div class="price">
          <p class="price-text"  v-if="msgData.custType === '1'"><span class="">￥{{msgData.minMoeny || 0}}</span>-<span class="">{{msgData.maxMoeny || 0}}</span></p>
          <p class="price-text"  v-if="msgData.custType === '0'">价格面议</p>
        </div>
        <div class="ensure">
          <div class="ensure-item left" :class="'color'+ index" v-for="(items, index) in msgData.typeNames" :key="index">
            <p class="">{{items}}</p>
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="icon-list">
      <div class="left lists">
        <div class="list-item"  @click="setClickRecord('find', items, msgData)">
          <div class="icon-img left">
            <img :src="items.find ? finded : find" alt="" class="">
          </div>
          <div class="icon-text left">
            <p class="">{{msgData.infoCount}}</p>
          </div>
          <div class="clear"></div>
        </div>
      </div>
      <div class="left lists">
        <a class="" :href='"tel:" + msgData.contactTelphone' @click="setClickRecord('tel', items, msgData)">
          <div class="list-item">
            <div class="icon-img left">
              <img :src="items.tel ? teled : tel" alt="" class="">
            </div>
            <div class="icon-text left">
              <p class="">{{msgData.telCount}}</p>
            </div>
            <div class="clear"></div>
          </div>
        </a>
      </div>
      <div class="left lists">
        <div class="list-item"  @click="setClickRecord('doc', items, msgData)">
          <div class="icon-img left">
            <img :src="items.doc ? doced : doc" alt="" class="">
          </div>
          <div class="icon-text left">
            <p class="">{{msgData.msgCount}}</p>
          </div>
          <div class="clear"></div>
        </div>
      </div>
      <div class="left lists"  @click="setClickRecord('like', items, msgData)">
        <div class="list-item">
          <div class="icon-img left">
            <img :src="items.like ? liked : like" alt="" class="">
          </div>
          <div class="icon-text left">
            <p class="">{{msgData.likeCount}}</p>
          </div>
          <div class="clear"></div>
        </div>
      </div>
      <!--<div class="left lists">-->
      <!--<div class="list-item">-->
      <!--<div class="icon-img left">-->
      <!--<img :src="love" alt="" class="">-->
      <!--</div>-->
      <!--<div class="icon-text left">-->
      <!--<p class="">{{msgData.}}</p>-->
      <!--</div>-->
      <!--<div class="clear"></div>-->
      <!--</div>-->
      <!--</div>-->
      <div class="right lists2"  @click="setClickRecord('share', items, msgData)">
        <div class="list-item">
          <div class="icon-img left">
            <img :src="items.share ? shared : share" alt="" class="">
          </div>
          <div class="icon-text left">
            <p class="">{{msgData.shareCount}}</p>
          </div>
          <div class="clear"></div>
        </div>
      </div>
      <div class="clear"></div>
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
  import { Toast } from 'mint-ui';
  import axios from 'axios';
  import { mapMutations, mapGetters } from 'vuex';
    export default {
        name: 'goodsTwo',
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
        computed: {
          ...mapGetters(['LEAVEMESSAGE'])
        },
        watch: {
          LEAVEMESSAGE: {
            handler (a, b) {
              console.log(a, 'vuex数据');
              if (Number(this.items.instId) === Number(a.instrucId)) {
                this.items.doc = a.doc; // 侦听留言变化
                if (a.isPostDoc === true) { // 留言成功才会走这个方法
                  if (this.items.doc === true) {
                    console.log(this.items, '新数据，用户行为');
                    this.msgData.msgCount = this.msgData.msgCount + 1;
                    this.resetClickRecord(this.items);
                  }
                } else {
                  this.getClickRecord();
                }
              }
            },
            deep: true
          }
        },
        created () {
          if (this.EVN === 'production') {
            axios.defaults.baseURL = this.apiProd2;
          }
          console.log(this.msgData, '子组件goodsTwo获得数据');
          let address = '';
          for (let i in this.msgData.address.split(',')) {
            address += this.msgData.address.split(',')[i];
          };
          this.msgData.address = address;
          if (this.msgData.typeNames) {
            this.msgData.typeNames = String(this.msgData.typeNames).split(',');
            this.msgData.typeNames.pop();
            let typeList = []; // 盛放截取的数组
            if (this.msgData.typeNames.length > 0) {
              this.msgData.typeNames.map((items, index) => {
                if (index <= 4) {
                  typeList.push(items);
                }
              });
              this.msgData.typeNames = typeList; // 重置数据
            }
          };
          this.getClickRecord();
        },
        mounted () {},
        methods: {
          ...mapMutations({
            setLeaveMessageShow: 'setLeaveMessageShow',
            setLeaveMessageDoc: 'setLeaveMessageDoc',
            setLeaveMessageIsPostDoc: 'setLeaveMessageIsPostDoc',
            setLeaveMessageInstrucId: 'setLeaveMessageInstrucId',
            setLeaveMessageMobile: 'setLeaveMessageMobile',
            setLeaveMessageUserName: 'setLeaveMessageUserName',
            setLeaveMessageMsgContent: 'setLeaveMessageMsgContent',
            setLoadingShow: 'setLoadingShow',
            setLoadingText: 'setLoadingText'
          }),
          getClickRecord () {
            console.log('获取缓存中的用户点击行为数组记录');
            if (localStorage.getItem('clickRecordsArr')) {
              this.clickRecordsArr = JSON.parse(localStorage.getItem('clickRecordsArr')); // 获取缓存中的用户点击行为数组记录
              this.clickRecordsArr.map((item, index) => {
                if (item.instId === this.msgData.instId) { // 取出缓存中存在的状态
                  console.log(item.instId, '取出缓存中存在的状态');
                  this.items = item;
                }
              });
            }
          },
          setClickRecord (e, items, evn) {
            console.log(e, items, evn, '记录用户行为');
            if (e === 'find') { // 查看
              this.items.find = true; // 点击之后状态变化
              this.resetClickRecord(items);
              this.clickFlowInletDetaile(evn);
            } else if (e === 'tel') { // 拨打电话
              this.items.tel = true; // 点击之后状态变化
              this.msgData.telCount = this.msgData.telCount + 1; // 电话数加一
              this.msgData.infoCount = this.msgData.infoCount + 1; // 查看数加一
              this.resetClickRecord(items);
              this.upDataTel(evn);
            } else if (e === 'doc') { // 留言
              // this.items.doc = true; // 点击之后状态变化
              this.$store.commit('setLeaveMessageShow', true); // 更新vuex 展示留言模块
              this.$store.commit('setLeaveMessageMsgContent', '我对' + evn.title + '感兴趣'); // 更新vuex setLeaveMessageMsgContent
              this.$store.commit('setLeaveMessageInstrucId', evn.instId); // 更新vuex setLeaveMessageInstrucId
              this.msgData.infoCount = this.msgData.infoCount + 1; // 查看数加一
              this.upDataInfoCount(evn);
            } else if (e === 'like') { // 喜欢
              if (this.items.like === false) {
                this.items.like = true; // 点击之后状态变化
                this.msgData.likeCount = this.msgData.likeCount + 1;
                this.upDataIsLike(evn);
                this.resetClickRecord(items);
              }
            } else if (e === 'share') { // 分享
              // this.items.share = true; // 点击之后状态变化
              this.resetClickRecord(items);
              this.clickFlowInletDetaile(evn);
            };
          },
          resetClickRecord (e) {
            console.log(e, '重置缓存中用户行为数据');
            if (localStorage.getItem('clickRecordsArr')) {
              this.clickRecordsArr = JSON.parse(localStorage.getItem('clickRecordsArr')); // 获取缓存中的用户点击行为数组记录
              this.clickRecordsArr.map((item, index) => {
                if (item.instId === e.instId) { // 取出缓存中存在的状态
                  this.clickRecordsArr[index] = e; // 重置数据
                  localStorage.setItem('clickRecordsArr', JSON.stringify(this.clickRecordsArr)); // 缓存用户点击行为数组记录
                  this.$store.commit('setLeaveMessageIsPostDoc', false); // 更新vuex setLeaveMessageIsPostDoc // 留言成功才会增加留言数
                }
              });
            }
          },
          upDataIsLike (e) {
            console.log('跟新用户行为数据');
            axios.get(this.api2 + '/rest-rp/instruc/instrucLike?instrucId=' + e.instId).then((response) => {
              console.log(response);
            }).catch((error) => {
              Toast('网络繁忙，请稍后');
              console.log(error, '网络繁忙，请稍后');
            });
          },
          upDataTel (e) {
            console.log('跟新用户行为数据');
            let params = { // 记录电话
              type: '1',
              sessionId: localStorage.getItem('sessionId'),
              instId: e.instId
            };
            axios.post(this.api2 + '/rest-rp/adve/setAdveData', params).then((response) => {
              if (response.data.ret === '200') {
                console.log('1');
              } else {
                Toast(response.data.msg);
              }
            });
            this.upDataInfoCount(e);
          },
          upDataInfoCount (e) {
            console.log('用于记录访问量');
            let params = { // 记访问量
              type: '0',
              sessionId: localStorage.getItem('sessionId'),
              instId: e.instId
            };
            axios.post(this.api2 + '/rest-rp/adve/setAdveData', params).then((response) => {
              if (response.data.ret === '200') {
                console.log('1');
              } else {
                Toast(response.data.msg);
              }
            });
            axios.get(this.api2 + '/rest-rp/instruc/instrucDate?type=0' + '&id=' + e.instId).then((response) => { // 及访问
              console.log(response);
            }).catch((error) => {
              Toast('网络繁忙，请稍后');
              console.log(error, '网络繁忙，请稍后');
            });
          },
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
    padding: 2vw 4vw;
    background: #fff;
    margin-bottom: 1.5vw;
  }
  .goods-box{
    position: relative;
    width: 100%;
    padding: 2vw 0 2vw 0;
  }
  .title-box{
    position: relative;
    width: 100%;
  }
  .title-box>p{
    position: relative;
    width: 100%;
    font-size: 4.5vw;
    line-height: 6.5vw;
    color:#2E2E30;
    font-family: PingFang-SC-Medium;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .location{
    position: relative;
    width: 100%;
    padding: 1.5vw 0 1vw 0;
    transform: scale(0.9);
    margin-left: -4.5vw;
  }
  .location .icon{
    position: relative;
    width: 4vw;
  }
  .location .icon>img{
    position: relative;
    width: 3vw;
    /* height: 4.5vw; */
    margin-top: 0.8vw;
  }
  .loca-text{
    font-family: PingFang-SC-Medium;
    width: 90%;
    position: relative;
    font-size: 3.2vw;
    line-height: 5vw;
    color:  #9B9B9B;
  }
  .goods{
    position: relative;
    width: 100%;
  }
  .goods-img{
    position: relative;
    width: 33.3333%;
    height: 20vw;
  }
  .goods-img>img{
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
  .goods-img2{
    position: relative;
    width: 33.3333%;
    height: 20vw;
  }
  .goods-img2>img{
    position: relative;
    max-width: 80%;
    max-height: 100%;
    display: table-cell;
    vertical-align: middle;
    position: relative;
    margin: 0;
    position: absolute;
    top: 50%;
    right: 0%;
    transform: translate(0%, -50%);
    -webkit-transform: translate(0%, -50%);
  }
  .goods-img1{
    position: relative;
    width: 33.3333%;
    height: 20vw;
  }
  .goods-img1>img{
    position: relative;
    max-width: 80%;
    max-height: 100%;
    display: table-cell;
    vertical-align: middle;
    position: relative;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(0%, -50%);
    -webkit-transform: translate(0%, -50%);
  }
  .price{
    position: relative;
    width: 100%;
    margin-bottom: 3vw;
    margin-top: 2vw;
  }
  .price>p{
    font-family: PingFang-SC-Bold;
    position: relative;
    width: 100%;
    font-size: 3.5vw;
    line-height: 4vw;
    color:  #2E2E30;
  }
  .ensure{
    position: relative;
    width: 100%;
  }
  .ensure .ensure-item{
    position: relative;
    margin-bottom: 1vw;
    margin-right: 1.6vw;
  }
  .ensure .ensure-item>p{
    position: relative;
    /* width: 93%; */
    font-size: 3.2vw;
    line-height: 4.5vw;
    text-align: center;
    border: 1px solid #ccc;
    padding: 0.2vw 1.43vw 0.2vw 1.43vw;
    /* margin-right: 1.5vw; */
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }
  .color0{
    background: rgba(2, 194, 162, 0.12);
  }
  .color0>p{
    color: #02C2A2 !important;
    border: 0px solid #F26130 !important;
  }
  .color1{
    background: rgba(67, 170, 255, 0.16);
  }
  .color1>p{
    color: #43AAFF !important;
    border: 0px solid #FABA1F !important;
  }
  .color2{
    background: rgba(233, 30, 99, 0.12);
  }
  .color2>p{
    color: #E91E63 !important;
    border: 0px solid #4CAF50 !important;
  }
  .color3{
    background: rgba(250, 186, 31, 0.13);
  }
  .color3>p{
    color: #FABA1F !important;
    border: 0px solid #43AAFF !important;
  }
  .color4{
    background: rgba(2, 194, 162, 0.12);
  }
  .color4>p{
    color: #02C2A2 !important;
    border: 0px solid #F26130 !important;
  }
  .color5{
    background: rgba(67, 170, 255, 0.16);
  }
  .color5>p{
    color: #43AAFF !important;
    border: 0px solid #FABA1F !important;
  }
  .color6{
    background: rgba(233, 30, 99, 0.12);
  }
  .color6>p{
    color: #E91E63 !important;
    border: 0px solid #4CAF50 !important;
  }
  .color7{
    background: rgba(250, 186, 31, 0.13);
  }
  .color7>p{
    color: #FABA1F !important;
    border: 0px solid #43AAFF !important;
  }
  .color8{
    background: rgba(2, 194, 162, 0.12);
  }
  .color8>p{
    color: #02C2A2 !important;
    border: 0px solid #F26130 !important;
  }
  .color9{
    background: rgba(67, 170, 255, 0.16);
  }
  .color9>p{
    color: #43AAFF !important;
    border: 0px solid #FABA1F !important;
  }
  .color10{
    background: rgba(233, 30, 99, 0.12);
  }
  .color10>p{
    color: #E91E63 !important;
    border: 0px solid #4CAF50 !important;
  }
  .color11{
    background: rgba(250, 186, 31, 0.13);
  }
  .color11>p{
    color: #FABA1F !important;
    border: 0px solid #43AAFF !important;
  }
  .color12{
    border: 0px solid #F26130 !important;
  }
  .color12>p{
    color: #02C2A2 !important;
    background: rgba(2, 194, 162, 0.12);
  }
  .color13{
    background: rgba(67, 170, 255, 0.16);
  }
  .color13>p{
    color: #43AAFF !important;
    border: 0px solid #FABA1F !important;
  }
  .color{
    background: rgba(233, 30, 99, 0.12);
  }
  .color14>p{
    color: #E91E63 !important;
    border: 0px solid #4CAF50 !important;
  }
  .color15{
    background: rgba(250, 186, 31, 0.13);
  }
  .color15>p{
    color: #FABA1F !important;
    border: 0px solid #43AAFF !important;
  }
  .icon-list{
    position: relative;
    width: 100%;
    margin-top: 4vw;
  }
  .lists{
    position: relative;
    width: 21.8%;
  }
  .list-item{
    position: relative;
    width: 100%;
  }
  .icon-img{
    position: relative;
    width: 30%;
  }
  .icon-img>img{
    position: relative;
    width: 4.8vw;
  }
  .icon-text{
    position: relative;
    width: 40%;
  }
  .icon-text>p{
    position: relative;
    width: 100%;
    font-size: 3.2vw;
    line-height: 5vw;
    color: #9B9B9B;
  }
  .lists2{
    position: relative;
    width: 12.5%;
  }
  .lists2 .icon-text{
    position: relative;
    width: 50%;
  }
  .lists2 .icon-text>p{
    position: relative;
    width: 100%;
    font-size: 3.2vw;
    line-height: 5vw;
    color: #9B9B9B;
    text-align: right;
  }
</style>
