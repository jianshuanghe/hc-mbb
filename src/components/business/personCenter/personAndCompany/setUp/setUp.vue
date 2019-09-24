<template>
  <div class="setUp-content">
    <topBox>
      <p class="title-putIn">设置</p>
    </topBox>
    <div class="setUp-cont">
      <div class="MI-box">
        <div class="MI-items">
          <div class="MI-left left">
            <p class="">联系电话</p>
          </div>
          <div class="MI-right right" @click="goToRemoveBind(1)">
            <div class="right-Box-MI">
              <div class="img-MI left">
                <p :class="UserData.userPhone ? 'intro-MI2' : 'intro-MI'">{{UserData.userPhone || '未填写'}}</p>
              </div>
              <div class="arrow-img-MI left">
                <img :src="lineRightArrow" alt="" class="right">
              </div>
            </div>
          </div>
          <div class="clear"></div>
          <div class="line"></div>
        </div>
        <div class="MI-items">
          <div class="MI-left left">
            <p class="">联系邮箱</p>
          </div>
          <div class="MI-right right" @click="goToRemoveBind(2)">
            <div class="right-Box-MI">
              <div class="img-MI left">
                <p :class="UserData.userEmail ? 'intro-MI2' : 'intro-MI'">{{UserData.userEmail || '未填写'}}</p>
              </div>
              <div class="arrow-img-MI left">
                <img :src="lineRightArrow" alt="" class="right">
              </div>
            </div>
          </div>
          <div class="clear"></div>
          <div class="line"></div>
        </div>
        <div class="MI-items">
          <div class="MI-left left">
            <p class="">微信号</p>
          </div>
          <div class="MI-right right" @click="goToRemoveBind(3)">
            <div class="right-Box-MI">
              <div class="img-MI left">
                <p :class="UserData.wxId ? 'intro-MI2' : 'intro-MI'">{{UserData.wxId || '未填写'}}</p>
              </div>
              <div class="arrow-img-MI left">
                <img :src="lineRightArrow" alt="" class="right">
              </div>
            </div>
          </div>
          <div class="clear"></div>
          <div class="line"></div>
        </div>
        <div class="MI-items">
          <div class="MI-left left">
            <p class="">修改密码</p>
          </div>
          <div class="MI-right right" @click="goToRemoveBind(4)">
            <div class="right-Box-MI">
              <div class="img-MI left">
                <p class="intro-MI">去修改</p>
              </div>
              <div class="arrow-img-MI left">
                <img :src="lineRightArrow" alt="" class="right">
              </div>
            </div>
          </div>
          <div class="clear"></div>
        </div>
      </div>
      <div class="logOut"  @click="clickBackNav">
        <p class="">退出登录</p>
      </div>
    </div>

  </div>
</template>

<script>
  import topBox from './../../../../common/topBox';
  import lineRightArrow from '@/assets/images/common/line-right-arrow.png';
  import { mapMutations } from 'vuex';
  import { Toast } from 'mint-ui';
  import axios from 'axios';
  export default {
    name: 'setUp',
    components: {
      topBox
    },
    data () {
      return {
        lineRightArrow: lineRightArrow,
        UserData: {}
      };
    },
    created () {
      if (this.EVN === 'production') {
        axios.defaults.baseURL = this.apiProd2;
      }
      if (!localStorage.getItem('landRegist')) {
        this.$router.push({
          path: '/landRegistration',
          query: { }
        });
      } else {
        this.getUserData();
      };
    },
    mounted () {},
    methods: {
      ...mapMutations({
        setLoadingShow: 'setLoadingShow',
        setLoadingText: 'setLoadingText',
        setSetUpData: 'setSetUpData'
      }),
      goToRemoveBind (e) {
        console.log(e);
        if (e === 1) {
          console.log('to联系电话');
          this.$router.push({
            path: '/phoneBind',
            query: {content: e}
          });
        } else if (e === 2) {
          console.log('to联系邮箱');
          this.$router.push({
            path: '/removeBind',
            query: {content: e}
          });
        } else if (e === 3) {
          console.log('to微信号');
          this.$router.push({
            path: '/removeBind',
            query: {content: e}
          });
        } else if (e === 4) {
          console.log('to修改密码');
          // isRouter: modify, 为修改密码
          this.$router.push({
            path: '/forgetPassWord',
            query: {content: e, isRouter: 'modify'}
          });
        };
      },
      clickBackNav () {
        localStorage.removeItem('tabItems'); // 移除用户点击tabbar缓存数据
        localStorage.removeItem('UserData'); // 移除用户信息缓存数据
        localStorage.removeItem('landRegist'); // 移除用户登录缓存数据
        this.$store.commit('setClickItems', 1); // 更新vuex setClickItems
        localStorage.setItem('tabItems', 1); // 缓存用户点击的按钮
        this.$store.commit('setLoadingShow', false); // 更新vuex loading
        this.$router.push({
          path: '/',
          query: { }
        });
      },
      getUserData () {
        console.log('获取用户信息，全部');
        this.$store.commit('setLoadingShow', true); // 更新vuex loading
        let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
        console.log(landRegistLG.user.id);
        axios.get(this.api2 + '/rest-rp/user/' + landRegistLG.user.id).then((response) => {
          console.log(response);
          if (response.data.ret === '200') {
            this.$store.commit('setLoadingShow', false); // 更新vuex loading
            this.UserData = response.data.content;
            this.$store.commit('setSetUpData', this.UserData); // 更新vuex setSetUpData
          } else {
            this.$store.commit('setLoadingShow', false); // 更新vuex loading
            Toast(response.data.msg);
          }
        }).catch((error) => {
          this.$store.commit('setLoadingShow', false); // 更新vuex loading
          Toast('网络繁忙，请稍后');
          console.log(error, '网络繁忙，请稍后');
        });
      }
    }
  };
</script>

<style scoped>
  .setUp-content{
    position: fixed;
    width: 100%;
    min-height: 100vh;
    overflow: scroll;
    background: #F9F9F9;
    -webkit-overflow-scrolling:touch;
  }
  .setUp-cont{
    position: relative;
    width: 100%;
  }
  .logOut{
    position: relative;
    width: 100%;
    background: #fff;
  }
  .logOut>p{
    font-family: PingFangSC-Regular;
    font-size: 4.266vw;
    color: #FF4D6A;
    letter-spacing: 0;
    line-height: 12vw;
    text-align: center;
  }
  .MI-box{
    position: relative;
    width: 100%;
    padding: 0vw 5vw 0 5vw;
    background: #fff;
    margin-bottom: 1.5vw;
  }
  .MI-items{
    position: relative;
    width: 100%;
  }
  .MI-left{
    position: relative;
    width: 50%;
  }
  .MI-left>p{
    font-family: PingFangSC-Light;
    font-size: 3.733vw;
    color: #2E2E30;
    line-height: 15vw;
  }
  .MI-right{
    position: relative;
    width: 50%;
  }
  .right-Box-MI{
    position: relative;
    width: 100%;
  }
  .img-MI{
    position: relative;
    width: 90%;
  }
  .arrow-img-MI{
    position: relative;
    width: 10%;
  }
  .arrow-img-MI>img{
    position: relative;
    width: 3vw;
    height: 2.5vw;
    margin-top: 6.5vw;
    float: right;
  }
  .intro-MI{
    font-family: PingFangSC-Regular;
    font-size: 3.5vw;
    color: #D2D2D2;
    letter-spacing: 0;
    text-align: right;
    line-height: 15vw;
  }
  .intro-MI2{
    font-family: PingFangSC-Regular;
    font-size: 3.5vw;
    color: #2E2E30;
    letter-spacing: 0;
    text-align: right;
    line-height: 15vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
