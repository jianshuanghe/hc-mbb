<template>
  <div class="leaveMessage-content">
    <div class="leaveMessage">
      <div class="LM-top">
        <p class="">询盘</p>
        <div class="close-img" @click="clickClose">
          <img :src="close" alt="" class="">
        </div>
      </div>
      <div class="LM-cont">
        <div class="LM-items">
          <div class="LM-It">
            <p class="">直接询盘</p>
            <div class="textAarea-box">
              <x-textarea :class="isFocusText ? 'introduceM' : 'introduceM2'"  placeholder="请留下您想对我们说的话…" :rows="8" :cols="30" v-model="leaveMessage.msgContent" @on-focus="onFocus" ></x-textarea>
            </div>
            <div class="line"></div>
          </div>
          <div class="LM-items">
            <div class="LM-It">
              <p class="">姓名</p>
              <x-input name="mobile" placeholder="如何称呼您？" :show-clear='false'  v-model="leaveMessage.userName"></x-input>
              <div class="line"></div>
            </div>
          </div>
          <div class="LM-items">
            <div class="LM-It">
              <p class="">电话</p>
              <x-input name="mobile" placeholder="请留下您的联系方式..." :show-clear='false'  v-model="leaveMessage.mobile"></x-input>
              <div class="line"></div>
            </div>
          </div>
        </div>
        <div class="LMC-top">
          <!--<p class="title">直接留言</p>-->
          <!--<p class="derc">-->
            <!--如您有任何疑问或者想咨询业务相关，请在上方留言，我们会尽快给您反馈哦～-->
          <!--</p>-->
        </div>
      </div>
      <div class="BIF1-bottom cc-btn">
        <div class="BIF1-btn" @click="clickUpMessage">
          <p class="">提交</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { XInput, XTextarea } from 'vux';
  import { mapMutations, mapGetters } from 'vuex';
  import close from '@/assets/images/business/close.png';
  import { Toast } from 'mint-ui';
  import axios from 'axios';
  import $ from 'jquery';
  var querystring = require('querystring');
  export default {
    name: 'leaveMessage',
    components: {
      XInput,
      XTextarea
    },
    data () {
      return {
        content: '',
        close: close, // img
        isFocusText: false, // false时为默认字体颜色灰色， true 为字体黑色
        leaveMessage: {
        }
      };
    },
    computed: {
      ...mapGetters(['LEAVEMESSAGE'])
    },
    directives: {
      focus (el) {
        console.log(el, '获取input焦点');
        // console.log(el.children[1].children[0], '获取input焦点');
        // el.children[1].children[0].focus();
      }
    },
    created () {
      if (this.EVN === 'production') {
        axios.defaults.baseURL = this.apiProd2;
      }
      if (localStorage.getItem('UserData')) { // 获取缓存中的用户信息
        this.content = JSON.parse(localStorage.getItem('UserData')).content;
      };
      console.log(this.LEAVEMESSAGE, 'LEAVEMESSAGE'); // LEAVEMESSAGE
      this.leaveMessage = this.LEAVEMESSAGE;
      console.log(document.location.hash.split('?')[0], '当前是否是流量承载页');
    },
    // watch: {
    //   LEAVEMESSAGE: {
    //     handler (a, b) {
    //       console.log(a, b);
    //       this.leaveMessage = a; // 侦听留言模块数据变化
    //       console.log(this.leaveMessage, 'vuex中留言数据');
    //     },
    //     deep: true
    //   }
    // },
    mounted () {
      var h = $(window).height();
      $(window).resize(function () {
        if ($(window).height() < h) {
          $('.cc-btn').hide();
        };
        if ($(window).height() >= h) {
          $('.cc-btn').show();
        };
      });
      if (localStorage.getItem('UserData')) { // 获取缓存中的用户信息
        if (this.leaveMessage.mobile === '' || String(this.leaveMessage.mobile) === 'undefined') { // 如果取到的veux中手机号为空，则取缓存中的用户手机号
          this.leaveMessage.mobile = JSON.parse(localStorage.getItem('UserData')).userPhone;
        }
      }
      if (localStorage.getItem('landRegist')) {
        let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
        this.leaveMessage.userId = landRegistLG.user.id;
      }
      if (localStorage.getItem('leaveMessage')) { // 缓存用户评论信息 此针对用户再次进来时 此优先级高于获取缓存的手机号
        console.log(JSON.parse(localStorage.getItem('leaveMessage')).userId, this.leaveMessage.userId);
        if (JSON.parse(localStorage.getItem('leaveMessage')).userId === this.leaveMessage.userId) { // 如果缓存中留言者的id 和用户登录的id一直 则缓存中留言者的信息为最高级
          this.leaveMessage.mobile = JSON.parse(localStorage.getItem('leaveMessage')).mobile;
          this.leaveMessage.userName = JSON.parse(localStorage.getItem('leaveMessage')).userName;
        } else {
          if (localStorage.getItem('UserData')) { // 获取缓存中的用户信息
            this.leaveMessage.mobile = JSON.parse(localStorage.getItem('UserData')).userPhone;
            this.leaveMessage.userName = '';
          }
        }
      }
    },
    methods: {
      ...mapMutations({
        setLeaveMessageShow: 'setLeaveMessageShow',
        setLeaveMessageDoc: 'setLeaveMessageDoc',
        setLeaveMessageIsPostDoc: 'setLeaveMessageIsPostDoc',
        setLeaveMessageInstrucId: 'setLeaveMessageInstrucId',
        setLeaveMessageUserId: 'setLeaveMessageUserId',
        setLeaveMessageMobile: 'setLeaveMessageMobile',
        setLeaveMessageUserName: 'setLeaveMessageUserName',
        setLeaveMessageMsgContent: 'setLeaveMessageMsgContent',
        setLoadingShow: 'setLoadingShow',
        setLoadingText: 'setLoadingText'
      }),
      clickClose () {
        console.log('触发关闭留言模块');
        this.$store.commit('setLeaveMessageShow', false); // 更新vuex 隐藏留言模块
        this.$store.commit('setLeaveMessageDoc', false); // 更新vuex setLeaveMessageDoc
        this.$store.commit('setLeaveMessageIsPostDoc', false); // 更新vuex setLeaveMessageIsPostDoc // 留言成功才会增加留言数
        this.$store.commit('setLeaveMessageMobile', this.leaveMessage.mobile); // 更新vuex setLeaveMessageMobile
        this.$store.commit('setLeaveMessageUserName', this.leaveMessage.userName); // 更新vuex setLeaveMessageUserName
        this.$store.commit('setLeaveMessageMsgContent', ''); // 更新vuex setLeaveMessageMsgContent
      },
      onFocus () {
        console.log('对焦时');
        this.isFocusText = true; // 改变留言字体颜色
        this.leaveMessage.msgContent = ''; // 对焦是，默认留言为空
      },
      upLeaveMessage () {
        console.log('跟新用户行为数据');
        let params = { // 记录留言
          type: '3',
          sessionId: localStorage.getItem('sessionId'),
          instId: this.leaveMessage.instrucId
        };
        axios.post(this.api2 + '/rest-rp/adve/setAdveData', params).then((response) => {
          if (response.data.ret === '200') {
            console.log('1');
          } else {
            Toast({
              message: response.data.msg,
              duration: 1000
            });
          }
        });
      },
      clickUpMessage () {
        console.log('触发更新留言模块');
        if (this.leaveMessage.userName === '') {
          Toast({
            message: '姓名不能为空！',
            duration: 1000
          });
          return;
        };
        if (this.leaveMessage.mobile === '') {
          Toast({
            message: '联系电话不能为空！',
            duration: 1000
          });
          return;
        };
        if (!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(this.leaveMessage.mobile)) { // 联系电话不能为空
          Toast({
            message: '联系电话格式有误',
            duration: 1000
          });
          return false;
        };
        if (this.leaveMessage.msgContent === '') {
          Toast({
            message: '留言内容不能为空！',
            duration: 1000
          });
          return;
        };
        this.$store.commit('setLoadingShow', true); // 更新vuex loading
        let params = {
          instrucId: this.leaveMessage.instrucId, // id
          mobile: this.leaveMessage.mobile, // 电话
          userName: this.leaveMessage.userName, // 姓名
          msgContent: this.leaveMessage.msgContent // 留言内容
        };
        axios.post(this.api2 + '/rest-rp/msg/add', querystring.stringify(params)).then((response) => {
          console.log(response);
          if (response.data === 'success') {
            if (document.location.hash.split('?')[0] === '#/flowInletReal') { // 流量承载页的留言需要记录留言量,用户从流量承载页进入详情，再返回时会带sessionId
              this.upLeaveMessage();
            };
            this.$store.commit('setLoadingShow', false); // 更新vuex loading
            Toast({
              message: '留言成功！',
              duration: 500
            });
            this.$store.commit('setLeaveMessageShow', false); // 更新vuex setLeaveMessageShow
            this.$store.commit('setLeaveMessageDoc', true); // 更新vuex setLeaveMessageDoc
            this.$store.commit('setLeaveMessageIsPostDoc', true); // 更新vuex setLeaveMessageIsPostDoc // 留言成功才会增加留言数
            this.$store.commit('setLeaveMessageMobile', this.leaveMessage.mobile); // 更新vuex setLeaveMessageMobile
            this.$store.commit('setLeaveMessageUserName', this.leaveMessage.userName); // 更新vuex setLeaveMessageUserName
            this.$store.commit('setLeaveMessageMsgContent', ''); // 更新vuex setLeaveMessageMsgContent
            localStorage.setItem('leaveMessage', JSON.stringify(this.leaveMessage)); // 缓存用户评论信息
          } else {
            this.$store.commit('setLoadingShow', false); // 更新vuex loading
            this.$store.commit('setLeaveMessageIsPostDoc', false); // 更新vuex setLeaveMessageIsPostDoc // 留言成功才会增加留言数
            Toast({
              message: response.data.msg,
              duration: 1000
            });
          }
        }).catch((error) => {
          this.$store.commit('setLoadingShow', false); // 更新vuex loading
          this.$store.commit('setLeaveMessageIsPostDoc', false); // 更新vuex setLeaveMessageIsPostDoc // 留言成功才会增加留言数
          Toast({
            message: '网络繁忙，请稍后',
            duration: 1000
          });
          console.log(error, '网络繁忙，请稍后');
        });
      }
    }
  };
</script>

<style scoped>
  .leaveMessage-content{
    position: absolute;
    width: 100%;
    background: #fff;
    height: 100vh;
    top: 0;
    z-index: 10000;
  }
  .leaveMessage{
    position: relative;
    width: 100%;
    background: #fff;
    height: 100vh;
  }
  .close-img{
    position: absolute;
    top: 4vw;
    right: 4vw;
    float: right;
  }
  .close-img>img{
    position: relative;
    width: 4.16vw;
    height: 4.16vw;
    margin-top: 3vw;
  }
  .LM-top{
    position: relative;
    width: 100%;
    height: 10vw;
    padding: 4vw;
  }
  .LM-top>p{
    font-family: PingFangSC-Regular;
    font-size: 4.266vw;
    color: #2E2E30;
    letter-spacing: 0;
    text-align: center;
    line-height: 12vw;
  }
  .LM-cont{
    position: relative;
    width: 100%;
    margin-top: 4vw;
  }
  .LMC-top{
    position: relative;
    width: 100%;
    padding: 4vw;
    background: #FFFFFF;
  }
  .title{
    font-family: PingFangSC-Medium;
    font-size: 5.33vw;
    color: #2E2E30;
    line-height: 12vw;
  }
  .derc{
    position: relative;
    width: 100%;
    font-family: PingFangSC-Light;
    font-size: 3.5vw;
    color: #9B9B9B;
    letter-spacing: 0;
    line-height: 6vw;
    background: #fff;
  }
  .LM-items{
    position: relative;
    width: 100%;
  }
  .LM-It{
    position: relative;
    width: 100%;
    background: #fff;
    padding: 1vw 4vw;
  }
  .LM-It>p{
    font-family: PingFangSC-Regular;
    font-size: 4vw;
    color: #2E2E30;
    letter-spacing: 0;
    line-height: 9vw;
    background: #fff;
  }
  .weui-cell:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 0px solid #D9D9D9 !important;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
  }
  .textAarea-box{
    position: relative;
    width: 100%;
    background: #F9F9F9 !important;
  }
  .introduceM {
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: #fff;
    height: 30vw;
  }
  .introduceM textarea {
    color: #000;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    background: #fff !important;
    height: 30vw !important;
  }
  .introduceM>div>textarea{
    background: #fff !important;
  }
  .introduceM2 {
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: #fff;
    height: 30vw;
  }
  .introduceM2 textarea {
    color: #BDBDBD;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    background: #fff !important;
    height: 30vw !important;
  }
  .introduceM2>div>textarea{
    background: #fff !important;
  }
  .BIF1-bottom{
    position: fixed;
    width: 92vw;
    /*margin-bottom: 2vw;*/
    margin:1.5vw 4vw 1.5vw 4vw;
    bottom: 0;
    z-index: 105;
    background: #fff;
  }
  .BIF1-btn{
    position: relative;
    width: 100%;
    background: #02C2A2;
    border-radius: 2px;
    font-family: PingFangSC-Regular;
    font-size: 3.733vw;
    color: #FFFFFF;
    text-align: center;
    letter-spacing: 0;
    line-height: 12vw;
  }
  .weui-input{
    font-size: 3.7vw !important;
  }
</style>
