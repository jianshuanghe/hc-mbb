<template>
  <div class="accontInfor-content">
    <div class="accontInfor">
      <div class="company-aI" @click="goToCompanyInfor">
        <div class="text-aI">
          <p class="">公司信息</p>
          <img :src="lineRightArrow" alt="" class="">
        </div>
        <div class="line"></div>
      </div>
      <div class="company-aI">
        <div class="text-aI" @click="goToMemberCenter">
          <p class="">会员中心</p>
          <img :src="lineRightArrow" alt="" class="">
        </div>
        <div class="line"></div>
      </div>
      <div class="company-aI">
        <div class="text-aI"  @click="goToAccountCenter">
          <p class="">账户中心</p>
          <img :src="lineRightArrow" alt="" class="">
        </div>
        <div class="line"></div>
      </div>
      <div class="company-aI">
        <div class="text-aI" @click="goToSetUp">
          <p class="">设置</p>
          <img :src="lineRightArrow" alt="" class="">
        </div>
      </div>
    </div>
    <div class="aboutCompany">
      <div class="company-aI">
        <div class="text-aI" @click="goToAboutUs">
          <p class="">关于陌拜商机</p>
          <img :src="lineRightArrow" alt="" class="">
        </div>
        <div class="line"></div>
      </div>
      <div class="company-aI">
        <div class="text-aI" @click="goToFeedBack">
          <p class="">意见反馈</p>
          <img :src="lineRightArrow" alt="" class="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import lineRightArrow from '@/assets/images/common/line-right-arrow.png';
    import { mapMutations, mapGetters } from 'vuex';
    import { Toast } from 'mint-ui';
    import axios from 'axios';
    export default {
        name: 'accontInfor',
        components: {},
        data () {
          return {
            UserData: '',
            lineRightArrow: lineRightArrow
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
          };
          this.getUserData();
        },
      computed: {
      ...mapGetters(['PERSONCENTER'])
      },
      watch: {
        PERSONCENTER: {
          handler (a, b) {
            this.UserData = a.basicInfor; // 基本信息
          },
          deep: true
        }
      },
        mounted () {},
        methods: {
          ...mapMutations({
            setLoadingShow: 'setLoadingShow',
            setLoadingText: 'setLoadingText'
          }),
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
          goToCompanyInfor () {
            console.log(this.UserData, 'to公司信息');
            if (!this.UserData.companyName) { // 后台返回数据
              this.$router.push({ // 公司信息为空
                path: '/companyInforEdit',
                query: {personTitle: 1}
              });
            } else {
              this.$router.push({
                path: '/companyInfor',
                query: {}
              });
            }
          },
          goToMemberCenter () {
            console.log('to会员中心');
            this.$router.push({
              path: '/memberCenter',
              query: { }
            });
          },
          goToAccountCenter () {
            console.log('to账户中心');
            this.$router.push({
              path: '/accountCenter',
              query: { }
            });
          },
          goToSetUp () {
            console.log('to设置');
            this.$router.push({
              path: '/setUp',
              query: { }
            });
          },
          goToAboutUs () {
            console.log('to关于我们');
            this.$router.push({
              path: '/aboutUs',
              query: { }
            });
          },
          goToFeedBack () {
            console.log('to意见反馈');
            this.$router.push({
              path: '/feedBack',
              query: { }
            });
          }
        }
      };
</script>

<style scoped>
  .accontInfor-content{
    position: relative;
    width: 100%;
    margin-bottom: 14vh;
  }
  .accontInfor{
    position: relative;
    width: 100%;
    padding: 0 4vw 0 4vw;
    background: #fff;
    margin-bottom: 1.5vw;
  }
  .aboutCompany{
    position: relative;
    width: 100%;
    padding: 0 4vw 0 4vw;
    background: #fff;
  }
  .company-aI{
    position: relative;
    width: 100%;
  }
  .text-aI{
    position: relative;
    width: 100%;
  }
  .text-aI>p{
    font-family: PingFangSC-Light;
    font-size: 3.733vw;
    color: #2E2E30;
    line-height: 14vw;
  }
  .text-aI>img{
    position: absolute;
    width: 3vw;
    height: 3vw;
    right: 0;
    top: 5.5vw;
  }
</style>
