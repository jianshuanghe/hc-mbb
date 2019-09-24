<template>
  <div class="buyMember-content">
    <div class="buyMember">
      <topBox>
        <p class="title-putIn">购买会员</p>
      </topBox>
      <div class="buyMember-cont">
        <div class="BM-top">
          <div class="BMT-left left">
            <img :src="UserData.compLogo || 'http://style.iambuyer.com/img/rhx-mobile-normal@2x.png'" alt="" class="img">
          </div>
          <div class="BMT-right left">
            <p class="title-BMT">{{UserData.userName || '用户昵称'}}</p>
            <!--未开通-->
            <p class="twzt-BMT" v-if="UserData.vipState === '0'">当前未开通会员服务</p>
            <!--过期-->
            <p class="twzt-BMT" v-if="UserData.vipState === '3'">当前会员服务已过期</p>
            <!--开通-->
            <p class="twzt-BMT" v-if="UserData.vipState === '1' || UserData.vipState === '2'">已开通会员</p>
          </div>
          <div class="clear"></div>
        </div>
        <div class="KT-people">
          <div class="KTP-cont">
            <div class="KTP-left left">
              <div class="KTP-list-img marg0" :class="'marg'+ index"  v-for="(items, index) in UserData.headImg" :key="index">
                <img :src="items || 'http://style.iambuyer.com/img/rhx-mobile-normal@2x.png'" alt="" class="">
              </div>
            </div>
            <div class="KTP-right left">
              <p class="">{{UserData.userCount}} <span class="KTP-text">人开通服务</span></p>
            </div>
            <div class="clear"></div>
          </div>
          <div class="line"></div>
        </div>
        <div class="BM-type-cont">
          <div :class="clickItemsIndex === 1 ? 'BM-buyChecked' : 'BM-buy'" @click="clickCheckitems(1)">
            <div class="BM-buy-cont">
              <div class="BM-buy-left left">
                <p class="">1年vip会员 <span class="zhekou">折扣</span></p>
              </div>
              <div class="BM-buy-right left">
                <p class="">¥ <span class="mony-BM-buy">999</span>.00</p>
              </div>
              <div class="clear"></div>
            </div>
            <div class="checked-bsp-img">
              <img :src="clickItemsIndex === 1 ? checkedItems : ''" alt="" class="img">
            </div>
          </div>
          <!--<div :class="clickItemsIndex === 2 ? 'BM-buyChecked' : 'BM-buy'"  @click="clickCheckitems(2)">-->
            <!--<div class="BM-buy-cont">-->
              <!--<div class="BM-buy-left left">-->
                <!--<p class="">1个月vip会员 <span class="zhekou">折扣</span></p>-->
              <!--</div>-->
              <!--<div class="BM-buy-right left">-->
                <!--<p class="">¥ <span class="mony-BM-buy">99</span>.00</p>-->
              <!--</div>-->
              <!--<div class="clear"></div>-->
            <!--</div>-->
            <!--<div class="checked-bsp-img">-->
              <!--<img :src="clickItemsIndex === 2 ? checkedItems : ''" alt="" class="img">-->
            <!--</div>-->
          <!--</div>-->
        </div>
        <div class="KJ-cont">
          <p class="LJ-title">快捷支付</p>
          <div class="KJ-Pay">
            <div class="WX" v-if="browserType === 'WX'">
              <div class="KJ-buy"  @click="checkType(2)">
                <div class="KJ-buy-left left">
                  <div class="KJ-ZorW">
                    <div class="KJ-img left">
                      <img :src="WXPay" alt="" class="">
                    </div>
                    <p class="left">微信支付</p>
                    <div class="clear"></div>
                  </div>
                </div>
                <div class="KJ-buy-right right">
                  <div class="KJ-check-img">
                    <img :src="WeiXin ? checked : check" alt="" class="">
                  </div>
                </div>
                <div class="clear"></div>
              </div>
            </div>
            <div class="FWX" v-if="browserType === 'FWX'">
              <div class="line"></div>
              <div class="KJ-buy"  @click="checkType(1)">
                <div class="KJ-buy-left left">
                  <div class="KJ-ZorW">
                    <div class="KJ-img left">
                      <img :src="ALIPay" alt="" class="">
                    </div>
                    <p class="left">支付宝支付</p>
                    <div class="clear"></div>
                  </div>
                </div>
                <div class="KJ-buy-right right">
                  <div class="KJ-check-img">
                    <img :src="ZhiFuBao ? checked : check" alt="" class="">
                  </div>
                </div>
                <div class="clear"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="LJ-buy-btn">
          <div class="LJ-cont" @click="clickImmedPay">
            <p class="">立即支付</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <confirm
        v-model="confirmShow"
        :show-cancel-button="true"
        :title=confirmTitle
        :confirm-text=confirmBtn
        :cancel-text=cancelBtn
        @on-cancel="onCancel"
        @on-confirm="onConfirm">
        <p style="text-align:center;">{{confirmText}}</p>
      </confirm>
    </div>
  </div>
</template>

<script>
  import wx from 'weixin-js-sdk';
  import topBox from './../../../../../../common/topBox';
  import { Confirm } from 'vux';
  import touxiang from '@/assets/images/business/home/extendManageList/touxiang.png';
  import WXPay from '@/assets/images/business/home/personCenter/WXPay.png';
  import ALIPay from '@/assets/images/business/home/personCenter/ALIPay.png';
  import check from '@/assets/images/business/home/extendManageList/dataReport/check.png';
  import checked from '@/assets/images/business/home/extendManageList/dataReport/checked.png';
  import checkedItems from '@/assets/images/business/home/extendManageList/dataReport/checkedItems.png';
  import { mapMutations, mapGetters } from 'vuex';
  import { Toast } from 'mint-ui';
  import axios from 'axios';
    export default {
        name: 'buyMember',
        components: {
          topBox,
          Confirm
        },
        data () {
          return {
            touxiang: touxiang,
            ALIPay: ALIPay,
            WXPay: WXPay,
            check: check, // type 选择按钮的未选中状态 img
            checked: checked, // type 选择按钮的选中状态 img
            checkedItems: checkedItems, // 选中会员购买年限
            UserData: {}, // 接口返回的会员数据
            ZhiFuBao: true,
            WeiXin: true,
            browserType: 0,
            applyVipNum: '', // 用于微信支付，存储链接参数
            PayMethod: 1, // 默认支付方式是支付宝， 2 为微信
            checkAll: false, // 记录全选状态 默认为false
            clickItemsIndex: 1, // 记录子项点击的index
            confirmShow: false,
            confirmBtn: '重新支付',
            cancelBtn: '联系客服',
            confirmTitle: '提示',
            confirmText: '未支付成功，若有疑问请拨打客服\n' +
              '热线：400-618-2288'
          };
        },
        created () {
          if (this.EVN === 'production') {
            axios.defaults.baseURL = this.apiProd2;
          }
          // console.log(WeixinJSBridge, 'wx');
          // alert(WeixinJSBridge);
          this.UserData = this.MEMBERCENTER.memberCenterData; // 侦听
          if (this.UserData !== {}) {
            this.getUserData();
          };
          if (localStorage.getItem('browserType') === 'WX') {
            this.browserType = 'WX';
            this.PayMethod = 2; // 微信状态默认时微信支付
          } else if (localStorage.getItem('browserType') === 'FWX') {
            this.browserType = 'FWX';
            this.PayMethod = 1; // 非微信状态默认是支付宝支付
          };
          if (localStorage.getItem('browserType') === 'WX') {
            if (this.$route.query.applyVipNum) {
              this.applyVipNum = this.$route.query.applyVipNum;
            };
            console.log(this.applyVipNum, 'this.applyVipNum');
          }
          // if (this.$route.query.appId) { // 拉起微信支付
          //   let params = {
          //     appId: this.$route.query.appId, // 必填，公众号的唯一标识
          //     timestamp: this.$route.query.timeStamp, // 必填，生成签名的时间戳
          //     nonceStr: this.$route.query.nonceStr, // 必填，生成签名的随机串
          //     signature: this.$route.query.signType, // 必填，调用js签名，nonceStr: param.nonceStr, // 支付签名随机串，不长于 32 位
          //     package: this.$route.query.packageValue, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          //     paySign: this.$route.query.paySign // 支付签名
          //   };
          //   console.log(params, '微信接口返回支付数据参数'); // 微信接口返回支付数据参数；
          //   this.WXpay(params);
          // }
        },
        computed: {
          ...mapGetters(['MEMBERCENTER'])
        },
        watch: {
          MEMBERCENTER: {
            handler (a, b) {
              this.UserData = b.memberCenterData; // 侦听
            },
            deep: true
          }
        },
        mounted () {},
        methods: {
          ...mapMutations({
            setLoadingShow: 'setLoadingShow',
            setLoadingText: 'setLoadingText',
            setMemberCenterData: 'setMemberCenterData'
          }),
          getUserData () {
            console.log('获取用户信息，全部');
            this.$store.commit('setLoadingShow', true); // 更新vuex loading
            let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
            console.log(landRegistLG.user.id);
            axios.get(this.api2 + '/rest-rp/vip/vipInfo?userId=' + landRegistLG.user.id).then((response) => {
              console.log(response);
              if (response.data.ret === '200') {
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
                let UserData = response.data.content;
                this.$store.commit('setMemberCenterData', UserData); // 更新vuex setPersonMaterial
              } else {
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
                Toast(response.data.msg);
              }
            }).catch((error) => {
              this.$store.commit('setLoadingShow', false); // 更新vuex loading
              Toast('网络繁忙，请稍后');
              console.log(error, '网络繁忙，请稍后');
            });
          },
          checkType (e) {
            if (e === 1) { // 支付宝
              console.log('支付宝');
              this.ZhiFuBao = !this.ZhiFuBao;
              if (this.WeiXin === true) {
                this.WeiXin = false;
              };
            } else if (e === 2) { // 微信
              console.log('微信');
              this.WeiXin = !this.WeiXin;
              if (this.ZhiFuBao === true) {
                this.ZhiFuBao = false;
              };
            }
            this.PayMethod === e ? this.PayMethod = '' : this.PayMethod = e; // 支付方式
          },
          zhiFuBaoPay (params) {
            console.log('支付宝支付');
            console.log(params);
            if (this.EVN === 'production') {
              window.location.href = this.apiProd2 + '/rest-rp/vip/createZfbPayOrder?applyVipNum=' + params;
            } else {
              window.location.href = this.api2 + '/rest-rp/vip/createZfbPayOrder?applyVipNum=' + params;
            }
          },
          WeiXinPay (params) {
            console.log('微信支付');
            // if (this.EVN === 'production') {
            //   window.location.href = this.apiProd2 + '/rest-rp/vip/createWxPayOrder?applyVipNum=' + params;
            // } else {
            //   window.location.href = this.api2 + '/rest-rp/vip/createWxPayOrder?applyVipNum=' + params;
            // }
            this.$store.commit('setLoadingShow', true); // 更新vuex loading
            axios.get(this.api2 + '/rest-rp/vip/createWxPayOrderDo?applyVipNum=' + params).then((response) => {
              console.log(response);
              if (response.data.ret === '200') {
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
                let paramsWx = response.data.content;
                this.WXpay(paramsWx);
              } else {
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
                Toast(response.data.msg);
              }
            }).catch((error) => {
              this.$store.commit('setLoadingShow', false); // 更新vuex loading
              Toast('网络繁忙，请稍后');
              console.log(error, '网络繁忙，请稍后');
            });
          },
          WXpay (e) {
            console.log(e, '拉起微信支付');
            let param = e;
            let _this = this;
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: param.appId, // 必填，公众号的唯一标识
              timestamp: param.timeStamp, // 必填，生成签名的时间戳
              nonceStr: param.nonceStr, // 必填，生成签名的随机串
              signature: param.signJs, // 必填，调用js签名，
              jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，这里只写支付的
            });
            wx.chooseWXPay({
              timestamp: param.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: param.nonceStr, // 支付签名随机串，不长于 32 位
              package: param.packageValue, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
              signType: 'MD5', // 签名方式，默认为´SHA1´，使用新版支付需传入´MD5´
              paySign: param.paySign, // 支付签名
              success: function (res) {
                _this.$store.commit('setLoadingShow', false); // 更新vuex loading
                if (res.errMsg === 'chooseWXPay:ok') {
                  Toast('支付成功');
                  setTimeout(() => {
                    _this.$router.push({
                      path: '/memberCenter',
                      query: { }
                    });
                  }, 500);
                } else {
                  _this.$store.commit('setLoadingShow', false); // 更新vuex loading
                  _this.confirmShow = true; // 重新支付
                }
              },
              cancel: function (res) {
                alert('取消支付');
              }
            });
          },
          clickCheckitems (e) {
            console.log(e, '点击的购买套餐index');
            this.clickItemsIndex === e ? this.clickItemsIndex = '' : this.clickItemsIndex = e;
          },
          clickImmedPay () {
            console.log('触发立即支付按钮');
            console.log(this.UserData, 'this.UserData');
            if (this.clickItemsIndex === '') {
              Toast('请选择购买套餐！');
              return;
            };
            if (this.PayMethod === '') {
              Toast('请选择支付方式！');
              return;
            };
            if (this.UserData.applyNum) {
              console.log('走继续支付流程');
              let params = this.UserData.applyNum;
              if (this.PayMethod === 1) {
                this.zhiFuBaoPay(params);
              } else {
                let params = this.applyVipNum; // 微信支付取链接参数
                this.WeiXinPay(params);
              };
            } else {
              console.log('走支付流程');
              this.createOrder();
            }
            // this.confirmShow = true; // 重新支付
          },
          createOrder () {
            console.log('创建订单');
            this.$store.commit('setLoadingShow', true); // 更新vuex loading
            let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
            console.log(landRegistLG.user.id);
            axios.get(this.api2 + '/rest-rp/vip/vipApply?userId=' + landRegistLG.user.id + '&lvId=' + this.UserData.lvId).then((response) => {
              console.log(response);
              if (response.data.ret === '200') {
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
                console.log('创建订单成功');
                let params = response.data.content;
                if (this.PayMethod === 1) {
                  this.zhiFuBaoPay(params);
                } else {
                  params = {
                    applyVipNum: this.applyVipNum
                  };
                  this.WeiXinPay(params);
                };
              } else {
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
                Toast(response.data.msg);
              }
            }).catch((error) => {
              this.$store.commit('setLoadingShow', false); // 更新vuex loading
              Toast('网络繁忙，请稍后');
              console.log(error, '网络繁忙，请稍后');
            });
          },
          onCancel () {
            console.log('触发联系客服');
          },
          onConfirm (msg) {
            console.log('重新支付');
            this.clickImmedPay();
          }
        }
    };
</script>

<style scoped>
  .buyMember-content{
    position: relative;
    width: 100vw;
    min-height: 100vw;
    background: #F9F9F9;
  }
  .buyMember{
    position: relative;
    width: 100%;
  }
  .buyMember-cont{
    position: relative;
    width: 100%;
  }
  .BM-top{
    position: relative;
    width: 100%;
    padding: 4vw;
    background: #fff;
    margin-bottom: 1.5vw;
  }
  .BMT-left{
    position: relative;
    width: 18%;
    margin-top: 1.5vw;
  }
  .BMT-left>img{
    width: 11.2vw;
    height: 11.2vw;
  }
  .BMT-right{
    position: relative;
    width: 70%;
  }
  .title-BMT{
    font-family: PingFang-SC-Bold;
    font-size: 4.8vw;
    color: #2E2E30;
    letter-spacing: 0;
    line-height: 9vw;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .twzt-BMT{
    position: relative;
    font-family: PingFang-SC-Medium;
    font-size: 3.5vw;
    color: #9B9B9B;
    letter-spacing: 0;
    line-height: 6vw;
  }
  .KT-people{
    position: relative;
    width: 100%;
  }
  .KTP-cont{
    position: relative;
    width: 100%;
    padding: 4vw;
    background: #fff;
  }
  .KTP-left{
    position: relative;
    width: 60%;
    margin-top: 4vw;
  }
  .KTP-list-img{
    width: 6.933vw;
    position: absolute;
  }
  .KTP-list-img>img{
    position: relative;
    width: 6.933vw;
    height: 6.933vw;
    border-radius: 50%;
  }
  .KTP-right{
    position: relative;
    width: 40%;
  }
  .KTP-right>p{
    font-family: PingFang-SC-Medium;
    font-size: 3.5vw;
    color: #02C2A2;
    text-align: right;
    line-height: 14vw;
  }
  .KTP-text{
    color: #9B9B9B;
  }
  .BM-type-cont{
    position: relative;
    width: 100%;
    padding: 1vw 4vw 4vw 4vw;
    background: #fff;
  }
  .BM-buy-cont{
    position: relative;
    width: 92%;
    margin-left: 4%;
    height: 17vw;
  }
  .BM-buy{
    position: relative;
    width: 100%;
    background: #FFFFFF;
    border: 1px solid #BDBDBD;;
    box-shadow: 0 1px 8px 0 #F5F5F5;
    border-radius: 4px;
    margin-top: 3vw;
  }
  .BM-buyChecked{
    position: relative;
    width: 100%;
    background: #FFFFFF;
    border: 1px solid #02C2A2;
    box-shadow: 0 1px 8px 0 #F5F5F5;
    border-radius: 4px;
    margin-top: 3vw;
  }
  .BM-buy-left{
    position: relative;
    width: 50%;
  }
  .BM-buy-left>p{
    font-family: PingFang-SC-Medium;
    font-size: 4.5vw;
    color: #2E2E30;
    letter-spacing: 0;
    line-height: 17vw;
  }
  .zhekou{
    background: #FAB100;
    border-radius: 3px;
    font-family: PingFang-SC-Medium;
    font-size: 2.7vw;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 17vw;
    padding: 0 1vw 0 1vw;
  }
  .BM-buy-right{
    position: relative;
    width: 50%;
  }
  .BM-buy-right>p{
    font-family: PingFang-SC-Medium;
    font-size: 4.8vw;
    color: #02C2A2;
    line-height: 17vw;
    text-align: right;
  }
  .mony-BM-buy{
    position: relative;
    font-family: PingFang-SC-Medium;
    font-size: 5.6vw;
    color: #02C2A2;
    line-height: 17vw;
  }
  .KJ-cont{
    position: relative;
    width: 100%;
    padding: 4vw;
    background: #fff;
  }
  .LJ-title{
    position: relative;
    width: 100%;
    font-family: PingFang-SC-Medium;
    font-size: 3.2vw;
    color: #9B9B9B;
    letter-spacing: 0;
    line-height: 10vw;
  }
  .KJ-buy{
    position: relative;
    width: 100%;
  }
  .KJ-Pay{
    position: relative;
    width: 100%;
  }
  .KJ-buy-left{
    position: relative;
    width: 60%;
  }
  .KJ-ZorW{
    position: relative;
    width: 100%;
  }
  .KJ-img{
    position: relative;
    width: 20%;
    margin-top: 2.5vw;
  }
  .KJ-img>img{
    position: relative;
    width: 6.66vw;
  }
  .KJ-ZorW>p{
    font-family: PingFang-SC-Medium;
    font-size: 3.5vw;
    color: #2E2E30;
    letter-spacing: 0;
    line-height: 12vw;
  }
  .KJ-buy-right{
    position: relative;
    width: 40%;
  }
  .KJ-check-img{
    float: right;
    position: relative;
    width: 13%;
    margin-top: 4vw;
  }
  .KJ-check-img>img{
   width: 4.5vw;
    height: 4.5vw;
  }
  .LJ-buy-btn{
    position: fixed;
    width: 100%;
    padding: 0 4vw;
    height: 12vw;
    bottom: 0;
    margin-bottom: 1vw;
  }
  .LJ-cont{
    position: relative;
    width: 100%;
  }
  .LJ-cont>p{
    font-family: PingFangSC-Regular;
    font-size: 3.5vw;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 12vw;
    background: #02C2A2;
    border-radius: 2px;
    text-align: center;
  }
  .checked-bsp-img{
    position: absolute;
    bottom: 0;
    right: 0vw;
    width: 4.8vw;
    height: 4.8vw;
  }
  .checked-bsp-img>img{
    position: relative;
    width: 100%;
  }
  .marg1{
    margin-left: 4vw;
  }
  .marg2{
    margin-left: 8vw;
  }
  .marg3{
    margin-left: 12vw;
  }
  .marg4{
    margin-left: 16vw;
  }
  .marg5{
    margin-left: 20vw;
  }
  .marg6{
    margin-left: 24vw;
  }
  .marg7{
    margin-left: 28vw;
  }
  .marg8{
    margin-left: 32vw;
  }
  .marg9{
    margin-left: 36vw;
  }
  .marg10{
    margin-left: 40vw;
  }
  .marg11{
    margin-left: 44vw;
  }
  .marg12{
    margin-left: 48vw;
  }
  .marg13{
    margin-left: 52vw;
  }
  .marg14{
    margin-left: 56vw;
  }
  .marg15{
    margin-left: 60vw;
  }
  .marg16{
    margin-left: 64vw;
  }
  .marg17{
    margin-left: 68vw;
  }


</style>
