<template>
    <div class="findAll-content">
      <div class="findAll">
        <div class="pinJia-box">
          <div class="PJ-left1">
            <rater class="pingfen" v-model="params.feedbackNum" :min="1" :max="5" :disabled="true" active-color="#02C2A2"></rater>
          </div>
          <div class="YDWT">
            <p class="">{{params.backTypes}}</p>
          </div>
          <div class="textArea">
            <p class="">{{params.context}}</p>
          </div>
          <div class="phone-YD">
            <p class="">联系方式：{{params.phone || '无'}}</p>
          </div>
          <div class="img-box-Yg">
            <div class="img-box-YYG left" v-if="params.img001">
              <div class="YYG-img">
                <img :src="params.img001" alt="" class="">
              </div>
            </div>
            <div class="img-box-YYG left"  v-if="params.img002">
              <div class="YYG-img">
                <img :src="params.img002" alt="" class="">
              </div>
            </div>
            <div class="img-box-YYG left"  v-if="params.img003">
              <div class="YYG-img">
                <img :src="params.img003" alt="" class="">
              </div>
            </div>
            <div class="img-box-YYG left"  v-if="params.img004">
              <div class="YYG-img">
                <img :src="params.img004" alt="" class="">
              </div>
            </div>
            <div class="img-box-YYG left"  v-if="params.img005">
              <div class="YYG-img">
                <img :src="params.img005" alt="" class="">
              </div>
            </div>
            <div class="clear"></div>
          </div>
          <div class="tuCaoTime">
            <p class="">吐槽于 {{params.createTime}}</p>
          </div>
        </div>
        <div class="Btn-YJ">
          <div class="SC-YJ left" @click="clickDeleteFeedBack(params.id)">
            <div class="SC-box">
              <img :src="delete1" alt="" class="left">
              <p class="left">删除</p>
              <div class="clear"></div>
            </div>
          </div>
          <div class="SC-YJ left" @click="clickRetract">
            <div class="SC-box">
              <img :src="upArrow" alt="" class="left">
              <p class="left">收起</p>
              <div class="clear"></div>
            </div>
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
</template>

<script>
  import { Rater } from 'vux';
  import upArrow from '@/assets/images/business/home/personCenter/upArrow.png';
  import delete1 from '@/assets/images/business/home/personCenter/delete.png';
  import { Toast } from 'mint-ui';
  import axios from 'axios';
  import { mapMutations, mapGetters } from 'vuex';
    export default {
        name: 'findAll',
        components: {
          Rater
        },
        data () {
          return {
            delete1: delete1,
            upArrow: upArrow,
            params: {},
            businessData: {}, // 数据
            findIndex: '',
            isFindAll: true // 查看全部，默认false
          };
        },
        computed: {
          ...mapGetters(['FEEDBACK'])
        },
        created () {
          if (this.EVN === 'production') {
            axios.defaults.baseURL = this.apiProd2;
          }
          // console.log(this.businessData);
          this.params = this.FEEDBACK.myOpinion.myOpinionData[this.FEEDBACK.findIndex];
          console.log(this.params);
          this.$store.commit('setIsDelete', false); // 更新vuex setIsFindAll
        },
        mounted () {},
        methods: {
          ...mapMutations({
            setFeedBackSearch: 'setFeedBackSearch',
            setFeedBackPageNum: 'setFeedBackPageNum',
            setFeedBackItemsData: 'setFeedBackItemsData',
            setFindIndex: 'setFindIndex',
            setIsDelete: 'setIsDelete',
            setLoadingShow: 'setLoadingShow',
            setLoadingText: 'setLoadingText'
          }),
          clickDeleteFeedBack (e) {
            console.log(e, '触发删除按钮');
            this.$store.commit('setLoadingShow', true); // 更新vuex loading
            axios.delete(this.api2 + '/rest-rp/userFeedBack/' + e).then((response) => {
              console.log(response);
              if (response.data.ret === '200') {
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
                Toast('删除成功！');
                setTimeout(() => {
                  this.$store.commit('setIsFindAll', false); // 更新vuex setIsFindAll
                  this.$store.commit('setIsDelete', true); // 更新vuex setIsFindAll
                }, 1000);
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
          clickRetract () {
            console.log('触发收起按钮');
            this.$store.commit('setIsFindAll', false); // 更新vuex setIsFindAll
          }
        }
      };
</script>

<style scoped>
  .findAll-content{
    position: fixed;
    width: 100%;
    /* top: 0; */
    background: #fff;
    height: 100vh;
  }
  .findAll{
    position: relative;
    width: 100%;
  }
  .pinJia-box{
    position: fixed;
    width: 100vw;
    padding: 4vw 4vw 5vh 4vw;
    /* margin-left: 4vw; */
    /* margin-top: 12vw; */
    height: 90vh;
    overflow: scroll;
    -webkit-overflow-scrolling:touch;
  }
  .PJ-left1{
    position: relative;
    width: 100%;
  }
  .YDWT{
    position: relative;
    width: 100%;
  }
  .YDWT>p{
    font-family: PingFangSC-Regular;
    font-size: 3.2vw;
    color: #9B9B9B;
    line-height: 10vw;
  }
  .textArea{
    position: relative;
    width: 100%;
    margin-bottom: 4vw;
  }
  .textArea>p{
    position: relative;
    width: 100%;
    font-family: PingFangSC-Regular;
    font-size: 3.5vw;
    color: #2E2E30;
    text-align: justify;
    line-height: 7vw;
  }
  .phone-YD{
    position: relative;
    width: 100%;
  }
  .phone-YD>p{
    font-family: PingFangSC-Regular;
    font-size: 3.5vw;
    color: #2E2E30;
    line-height: 12vw;
  }
  .tuCaoTime{
    position: relative;
    width: 100%;
  }
  .tuCaoTime>p{
    font-family: PingFangSC-Regular;
    font-size: 3.2vw;
    color: #9B9B9B;
    line-height: 10vw;
  }
  .Btn-YJ{
    position: fixed;
    width: 100%;
    bottom: 0;
    background: rgba(255,255,255,0.90);
    box-shadow: 0 -1px 0 0 #F5F5F5;
  }
  .SC-YJ{
    position: relative;
    width: 50%;
  }
  .SC-box{
    position: relative;
    width: 17vw;
    margin: auto;
  }
  .SC-box>img{
    width: 5vw;
    margin-top: 3.5vw;
    margin-right: 1vw;
  }
  .SC-box>p{
    font-family: PingFangSC-Regular;
    font-size: 4.266vw;
    color: #2E2E30;
    letter-spacing: 0;
    line-height: 12vw;
  }
  .img-box-Yg{
    position: relative;
    width: 100%;
  }
  .img-box-YYG{
    width: 25%;
    margin-bottom: 3vw;
  }
  .YYG-img{
    position: relative;
    width: 96%;
    margin-left: 3%;
    height: 20vw;
  }
  .YYG-img>img{
    max-width: 100%;
    max-height: 100%;
    display: table-cell;
    vertical-align: middle;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
  }
</style>
