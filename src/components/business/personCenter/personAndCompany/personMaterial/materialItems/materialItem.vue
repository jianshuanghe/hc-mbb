<template>
    <div class="materialItem">
      <div class="topTips">
        <p class="">关于你，我们想多了解一点～～</p>
      </div>
      <div class="MI-box">
        <div class="MI-items">
          <div class="MI-left left">
            <p class="">头像</p>
          </div>
          <div class="MI-right right">
            <div class="right-Box-MI">
              <div class="img-MI left">
                <cube-upload
                  ref="upload"
                  v-model="files"
                  :action="action"
                  :processFile="processFile"
                  @files-added="addedHandler"
                  @file-error="errHandler"
                  @file-success="sucHandler">
                  <div class="clear-fix touxiang">
                    <!--<cube-upload-file class='imgTou'v-for="(file, i) in files" :file="file" :key="i"></cube-upload-file>-->
                    <cube-upload-btn :multiple="false">
                      <div>
                        <img :src="UserData.headImg  || 'http://style.iambuyer.com/img/rhx-mobile-normal@2x.png'" alt="" class="imgTouXiang right">
                      </div>
                    </cube-upload-btn>
                  </div>
                </cube-upload>
                <!--<img :src="touxiang" alt="" class="right">-->
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
            <p class="">姓名</p>
          </div>
          <div class="MI-right right">
            <div class="right-Box-MI">
              <div class="img-MI left">
                <input v-model="UserData.nickname" @blur.prevent="changeNickName()" type="text" name="lname" class="perInfoItemR" placeholder="嘿，姓名会显示在说明书的海报二维码中哦"/>
                <!--<input class="" type="text" minlength="2" maxlength="20" v-model="" placeholder="嘿，姓名会显示在说明书的海报二维码中哦">-->
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
            <p class="">个人简介</p>
          </div>
          <div class="MI-right right" @click="goToBriefIntro">
            <div class="right-Box-MI">
              <div class="img-MI left">
                <p :class="UserData.content ? 'intro-MI2' : 'intro-MI'">{{UserData.content || '请填写'}}</p>
              </div>
              <div class="arrow-img-MI left">
                <img :src="lineRightArrow" alt="" class="right">
              </div>
            </div>
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
</template>

<script>
  import touXiang from '@/assets/images/business/home/extendManageList/touxiang.png';
  import lineRightArrow from '@/assets/images/common/line-right-arrow.png';
  import { Toast } from 'mint-ui';
  import axios from 'axios';
  import lrz from 'lrz';
  import { mapMutations, mapGetters } from 'vuex';
    export default {
        name: 'materialItem',
        components: {
        },
        data () {
          return {
            touxiang: touXiang,
            lineRightArrow: lineRightArrow,
            action: 'http://img01.iambuyer.com/imgup/upLoad/fileUpload',
            nickname: '', // 昵称
            content: '', // 介绍
            UserData: '',
            files: []
          };
        },
        created () {
          if (this.EVN === 'production') {
            axios.defaults.baseURL = this.apiProd2;
          }
          this.UserData = this.PERSONCENTER.personMaterial;
        },
        computed: {
          ...mapGetters(['PERSONCENTER'])
        },
        watch: {
          PERSONCENTER: {
            handler (a, b) {
              this.UserData = b.personMaterial; // 侦听
            },
            deep: true
          }
        },
        mounted () {},
        methods: {
          ...mapMutations({
            setLoadingShow: 'setLoadingShow',
            setLoadingText: 'setLoadingText',
            setPersonMaterial: 'setPersonMaterial'
          }),
          goToBriefIntro () {
            console.log('to个人介绍');
            this.$router.push({
              path: '/briefIntro',
              query: { }
            });
          },
          // processFile
          processFile (file, next) {
            console.log(file);
            // 压缩图片
            lrz(file).then(resImg => {
              file = resImg.file;
              console.log(file);
              next(file);
            });
          },
          addedHandler () {
            const file = this.files[0];
            file && this.$refs.upload.removeFile(file);
            console.log(file);
          },
          errHandler (file) {
            // const msg = file.response.message
            Toast('上传失败！');
          },
          sucHandler (file) {
            console.log(file);
            console.log('更新用户头像');
            this.UserData.headImg = file.response.httpUrl;
            let params = {
              headImg: file.response.name
            };
            this.upUserData(params);
          },
          changeNickName () {
            console.log('跟新用户昵称');
            let params = {
              nickname: this.UserData.nickname
            };
            this.upUserData(params);
          },
          upUserData (params) {
            console.log('更新用户信息');
            this.$store.commit('setLoadingShow', true); // 更新vuex loading
            if (localStorage.getItem('landRegist')) {
              let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
              console.log(landRegistLG.user.id);
              axios.post(this.api2 + '/rest-rp/user/' + landRegistLG.user.id, params).then((response) => {
                console.log(response);
                if (response.data.ret === '200') {
                  this.$store.commit('setLoadingShow', false); // 更新vuex loading
                  this.$store.commit('setPersonMaterial', this.UserData); // 更新vuex setPersonMaterial
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
        }
    };
</script>

<style scoped>
  .materialItem{
    position: relative;
    width: 100%;
  }
  .topTips{
    position: relative;
    width: 100%;
    background: #F9F9F9;
  }
  .topTips>p{
    position: relative;
    width: 100%;
    font-family: PingFangSC-Light;
    font-size: 3.2vw;
    color: #9B9B9B;
    line-height: 8vw;
    text-align: center;
  }
  .MI-box{
    position: relative;
    width: 100%;
    padding: 0vw 4vw 0 4vw;
    background: #fff;
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
  .img-MI .touxiang{
    position: relative;
    width: 10.66vw;
    height: 10.66vw;
    margin-top: 2.1vw;
    float: right;
  }
  .imgTouXiang{
    position: relative;
    width: 10.66vw;
    height: 10.66vw;
    border-radius: 50%;
  }
  .arrow-img-MI{
    position: relative;
    width: 10%;
  }
  .arrow-img-MI>img{
    position: relative;
    width: 2vw;
    height: 2vw;
    margin-top: 6.5vw;
    float: right;
  }
  .perInfoItemR {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-family: PingFangSC-Regular;
    font-size: 3.733vw;
    color: #3C3C3F;
    letter-spacing: 0;
    /* height: 15vw; */
    padding: 5vw 0;
    /* margin: 5vw 0; */
    line-height: 5vw;
    text-align: right;
    margin-right: 1vw;
    float: left;
  }
  .intro-MI{
    font-family: PingFangSC-Regular;
    font-size: 3.733vw;
    color: #D2D2D2;
    letter-spacing: 0;
    text-align: right;
    line-height: 15vw;
  }
  .intro-MI2{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-family: PingFangSC-Regular;
    font-size: 3.733vw;
    color: #3C3C3F;
    letter-spacing: 0;
    text-align: right;
    line-height: 15vw;
  }
</style>
