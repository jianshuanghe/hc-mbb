<template>
  <div class="MCY-content">
    <div class="MCY-Box">
      <div class="MCY-top">
        <div class="title-MCY">
          <p class="">创意模版</p>
        </div>
      </div>
      <div class="MCY-cont">
        <div class="swiper-container" ref="slider">
          <div class="swiper-wrapper">
            <div class="swiper-slide"  v-for="(items, index) in vipTempList" @click="clickToCreateModel(items)">
              <div class="imgListSwiper">
                <img :src="items.img" alt="" class="imgListSwiper">
              </div>
              <br />
              <div class="MB-type">
                <p class="MB-type-text">{{items.title}}</p>
                <p class="MP-isFree">会员免费</p>
              </div>
            </div>
          </div>
          <!--<div class="swiper-pagination" ref="pagination"></div>-->
        </div>
      </div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
  // import Swiper from 'swiper';
  import Swiper from './../../../../../../../static/js/swiper.min.js';
  import list1 from '@/assets/images/business/home/personCenter/list1.png';
  import list2 from '@/assets/images/business/home/personCenter/list2.png';
  import { mapGetters } from 'vuex';
  import { Toast } from 'mint-ui';
  export default {
        name: 'memberCenterCreate',
        components: {
        },
        data () {
          return {
            vipTempList: [
              {
                img: list1,
                state: '0', // 已开放
                title: '定制模板'
              },
              {
                img: list2,
                state: '1', // 未开放
                title: '机械行业模板'
              }
            ],
            UserData: {} // 接口返回的会员数据
          };
        },
        created () {
        },
        watch: {
          MEMBERCENTER: {
            handler (a, b) {
              console.log(a, b, 'vuex数据会员');
              this.UserData = a.memberCenterData;
              this.vipTempList = a.memberCenterData.vipTempList; // 侦听
            },
            deep: true
          }
        },
        computed: {
          ...mapGetters(['MEMBERCENTER'])
        },
        mounted () {
          this.swiperInit();
        },
        methods: {
          swiperInit () {
            // eslint-disable-next-line
            new Swiper(this.$refs.slider, {
              slidesPerView: 'auto',
              spaceBetween: 30,
              pagination: {
                el: '.swiper-pagination',
                clickable: true
              }
            });
          },
          clickToCreateModel (e) {
            console.log(this.UserData, '触发去创意模板页面');
            if (e.state === '1') {
              Toast(e.title + '模板尚未开放!');
              return;
            }
            if (e.state === '0') {
              let params = {
                href: '', // 用于用户从如何秀返回时使用
                sourceMember: 'member', // 定义来源参数 FB：发现商机页面, FI流量承载页
                userId: '', // 用户id, 用来判断用户登录状态
                tempId: e.custType,
                isMember: false, // 是否为会员
                confirmEdit: 200
              };
              if (localStorage.getItem('landRegist')) {
                let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
                console.log(landRegistLG.user.id);
                params.userId = landRegistLG.user.id;
              }
              if (this.UserData.vipState !== '0' || this.UserData.vipState !== '3') { // 0代表不是会员，3代表已过期
                params.isMember = true;
              }
              params.href = window.location.href;
              if (e.custType === '1') {
                if (this.Rhxherf === 'http://10.158.41.177:8082') { // 測試環境
                  params.tempId = 65;
                }
                // tempType = 1 代表进入定制模板
                window.location.href = this.Rhxherf + '/sourceMemberCenterCreate?confirmEdit=200' + '&tempType=1' + '&sourceMember=' + params.sourceMember + '&userId=' + params.userId + '&tempId=' + params.tempId + '&isMember=' + params.isMember + '&herf=' + encodeURIComponent(params.href);
              }
            }
          }
        }
      };
</script>

<style scoped>
  .MCY-content{
    position: relative;
    width: 100%;
    background: #fff;
  }
  .MCY-Box{
    position: relative;
    width: 100%;
    padding: 4vw;
  }
  .MCY-top{
    position: relative;
    width: 100%;
  }
  .title-MCY{
    position: relative;
    width: 100%;
  }
  .title-MCY>p{
    font-family: PingFangSC-Semibold;
    font-size: 5.33vw;
    color: #2E2E30;
    text-align: left;
    line-height: 12vw;
  }
  .MCY-cont{
    position: relative;
    width: 100%;
    margin-bottom: 5vw;
    height: 55vw;
  }
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    width: 80%;
  }
  .swiper-slide:nth-child(2n) {
    width: 80%;
  }
  .swiper-slide:nth-child(3n) {
    width: 80%;
  }
  .imgListSwiper{
    position: relative;
    width: 100%;
    border-radius: 2vw;
    height: 40vw;
  }
  .MB-type{
    position: relative;
    width: 100%;
    margin-top: -2vw;
    padding-left: 2vw;
  }
  .MB-type-text{
    position: relative;
    width: 100%;
    font-family: PingFang-SC-Medium;
    font-size: 4vw;
    color: #2E2E30;
    line-height: 6vw;
    text-align: left;
  }
  .MP-isFree{
    position: relative;
    width: 100%;
    font-family: PingFang-SC-Regular;
    font-size: 3.5vw;
    color: #FAB100;
    line-height: 7vw;
    text-align: left;
  }
</style>
