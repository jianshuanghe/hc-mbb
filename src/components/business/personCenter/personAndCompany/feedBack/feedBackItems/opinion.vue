<template>
  <div class="opinion-content">
      <div class="opinion-cont">
        <div class="top-score">
          <div class="ping-op left">
            <p class="">请给陌拜商机评分</p>
          </div>
          <div class="ping-op left">
            <rater class="pingfen" v-model="params.feedbackNum" :min="1" :max="5" active-color="#02C2A2"></rater>
          </div>
          <div class="clear"></div>
        </div>
        <div class="problem-cont">
          <div class="pro-op-title">
            <p class="">请描述您遇到的问题</p>
          </div>
          <div class="pro-op-cont">
            <div class="pro-items left" :class="items.colorShow ? 'checkedItems1' : ''"  v-for="(items, index) in conTextCode" :key="index" @click="clickContext(index)">
              <p :class="items.colorShow ? 'checkedItems2' : ''">{{items.content}}</p>
            </div>
            <div class="clear"></div>
          </div>
          <div class="miaoShu-pro">
            <div class="textAarea-box">
              <x-textarea class="introduce1" v-model="params.context" :max="300" placeholder="请描述您的问题" :rows="8" :cols="30"></x-textarea>
              <div class="line"></div>
            </div>
          </div>
          <div class="contant-op">
            <x-input name="mobile" placeholder="请输入联系方式(选填)" keyboard="number":show-clear='false'  v-model="params.phone"></x-input>
            <div class="line"></div>
          </div>
          <div class="upImg-op">
            <div class="EBI-uploadImg">
              <cube-upload
                class="EBI-feedUpload"
                v-model="files"
                :action="action"
                :max="5"
                :simultaneous-uploads="1"
                @file-submitted="fileClick"
                :processFile="processFile"
                @files-added="addedHandler"
                @file-error="errHandler"
                @file-success="sucHandlerOther"
                @file-removed="delHandler(files)">
              </cube-upload>
            </div>
          </div>
        </div>
        <div class="LJ-buy-btn1">
          <div class="LJ-cont" @click="clickSubmitOpinion">
            <p class="">提交</p>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
    import { Rater, XTextarea, XInput } from 'vux';
    import { mapMutations, mapGetters } from 'vuex';
    import { Toast } from 'mint-ui';
    import axios from 'axios';
    import lrz from 'lrz';
    export default {
        name: 'opinion',
        components: {
          Rater,
          XTextarea,
          XInput
        },
        data () {
          return {
            params: {
              feedbackNum: 1,
              userId: '',
              img001: '',
              img002: '',
              img003: '',
              img004: '',
              img005: '',
              phone: '',
              context: '',
              backTypes: []
            },
            conTextCode: [], // 遇到的问题
            imgData: [],
            files: [],
            text: '',
            num: '', // 记录上传图片张数
            action: 'http://img01.iambuyer.com/imgup/upLoad/fileUpload'
          };
        },
        created () {
          if (this.EVN === 'production') {
            axios.defaults.baseURL = this.apiProd2;
          }
          this.getFeedBackType();
        },
        computed: {
          ...mapGetters(['FEEDBACK', 'IMGDATA'])
        },
        watch: {
          FEEDBACK: {
            handler (a, b) {
              console.log(a, b);
            },
            deep: true
          },
          IMGDATA: {
            handler (a, b) {
              this.params.img001 = a.img001; // 附件信息
              this.params.img002 = a.img002; // 附件信息
              this.params.img003 = a.img003; // 附件信息
              this.params.img004 = a.img004; // 附件信息
              this.params.img005 = a.img005; // 附件信息
            },
            deep: true
          }
        },
        mounted () {
        },
        methods: {
          ...mapMutations({
            setLoadingShow: 'setLoadingShow',
            setLoadingText: 'setLoadingText',
            setFeedBackEdit: 'setFeedBackEdit',
            setFeedBackTitle: 'setFeedBackTitle',
            setImg001: 'setImg001',
            setImg002: 'setImg002',
            setImg003: 'setImg003',
            setImg004: 'setImg004',
            setImg005: 'setImg005'
          }),
          getFeedBackType () {
            console.log('获取反馈类型');
            axios.get(this.api2 + '/rest-rp/userFeedBack/types').then((response) => {
              console.log(response);
              if (response.data.ret === '200') {
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
                let backTypeData = response.data.content;
                backTypeData.map((items, index) => {
                  items.colorShow = false;
                });
                this.conTextCode = backTypeData;
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
          clickContext (e) {
            console.log(e, '勾选问题');
            this.conTextCode[e].colorShow = !this.conTextCode[e].colorShow;
          },
          fileClick () {
            console.log('点击图片');
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
          sucHandlerOther (file) {
            console.log(file, '添加按钮');
            this.num++;
            switch (this.num) {
              case 1:
                this.$store.commit('setImg001', file.response.name);
                break;
              case 2:
                this.$store.commit('setImg002', file.response.name);
                break;
              case 3:
                this.$store.commit('setImg003', file.response.name);
                break;
              case 4:
                this.$store.commit('setImg004', file.response.name);
                break;
              case 5:
                this.$store.commit('setImg005', file.response.name);
                break;
            }
          },
          // delete img
          delHandler (e) {
            this.num--;
            this.$store.commit('setImg001', ''); // 更新vuex setImg001
            this.$store.commit('setImg002', ''); // 更新vuex setImg002
            this.$store.commit('setImg003', ''); // 更新vuex setImg003
            this.$store.commit('setImg004', ''); // 更新vuex setImg004
            this.$store.commit('setImg005', ''); // 更新vuex setImg005
            console.log(e, this.num, '删除按钮');
            for (let i = 0; i < this.num; i++) {
              if (i === 0) {
                console.log(e[i], '第1个');
                this.$store.commit('setImg001', e[i].response.name); // 更新vuex setImg001
              };
              if (i === 1) {
                console.log(e[i], '第2个');
                this.$store.commit('setImg002', e[i].response.name); // 更新vuex setImg002
              };
              if (i === 2) {
                console.log(e[i], '第3个');
                this.$store.commit('setImg003', e[i].response.name); // 更新vuex setImg003
              };
              if (i === 3) {
                console.log(e[i], '第3个');
                this.$store.commit('setImg004', e[i].response.name); // 更新vuex setImg004
              };
              if (i === 4) {
                console.log(e[i], '第3个');
                this.$store.commit('setImg005', e[i].response.name); // 更新vuex setImg005
              };
            };
            //   console.log(this.params,this.num);
          },
          clickSubmitOpinion () {
            console.log('触发提交按钮');
            let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
            console.log(landRegistLG.user.id);
            let params = this.params;
            this.conTextCode.map((items, index) => {
              if (items.colorShow === true) {
                params.backTypes.push(items.id);
              }
            });
            params.userId = landRegistLG.user.id;
            if (params.feedbackNum === '' || params.feedbackNum < 1) { // 校验手机号不能为空
              Toast('至少选择一颗星');
              return false;
            };
            if (params.phone) {
              if (!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(params.phone)) { // 联系电话不能为空
                Toast('联系电话格式有误');
                return false;
              };
            };
            this.SubmitOpinion(params);
          },
          SubmitOpinion (params) {
            console.log('更新数据');
            if (localStorage.getItem('landRegist')) {
              this.$store.commit('setLoadingShow', true); // 更新vuex loading
              axios.post(this.api2 + '/rest-rp/userFeedBack', params).then((response) => {
                console.log(response);
                if (response.data.ret === '200') {
                  this.$store.commit('setLoadingShow', false); // 更新vuex loading
                  Toast('提交成功！');
                  this.resetData();
                  this.$store.commit('setFeedBackTitle', 2);
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
          },
          resetData () {
            console.log('重置数据');
            this.$store.commit('setImg001', ''); // 更新vuex setImg001
            this.$store.commit('setImg002', ''); // 更新vuex setImg002
            this.$store.commit('setImg003', ''); // 更新vuex setImg003
            this.$store.commit('setImg004', ''); // 更新vuex setImg004
            this.$store.commit('setImg005', ''); // 更新vuex setImg005
            this.params = {
              feedbackNum: 1,
                userId: '',
                img001: '',
                img002: '',
                img003: '',
                img004: '',
                img005: '',
                phone: '',
                context: '',
                backTypes: []
            };
          }
        }
      };
</script>

<style scoped>
  .opinion-content{
    position: fixed;
    width: 100%;
    padding: 4vw;
    height: 91vh;
    overflow: scroll;
    background: #fff;
    -webkit-overflow-scrolling:touch;
  }
  .opinion-cont{
    position: relative;
    width: 100%;
  }
  .checkedItems1{
    border: 1px solid #12f3cd40 !important;
    background: #12f3cd40 !important;
  }
  .checkedItems2{
    color: #02C2A2 !important;
  }
  .top-score{
    position: relative;
    width: 100%;
    margin-top: 4vw;
  }
  .ping-op{
    position: relative;
    width: 50%;
  }
  .ping-op>p{
    font-family: PingFangSC-Regular;
    font-size: 4.266vw;
    color: #2E2E30;
    letter-spacing: 0;
    line-height: 7vw;
  }
  .problem-cont{
    position: relative;
    width: 100%;
  }
  .pro-op-title{
    position: relative;
    width: 100%;
    margin-top: 6vw;
  }
  .pro-op-title>p{
    font-family: PingFangSC-Regular;
    font-size: 4.266vw;
    color: #2E2E30;
    letter-spacing: 0;
    line-height: 16vw;
  }
  .pro-op-cont{
    position: relative;
    width: 100%;
  }
  .pro-items{
    position: relative;
    padding: 0 4vw 0 4vw;
    background: #FFFFFF;
    border: 1px solid #E2E2E2;
    margin-right: 4vw;
    margin-bottom: 4vw;
  }
  .pro-items>p{
    position: relative;
    font-family: PingFangSC-Regular;
    font-size: 3.5vw;
    color: #2E2E30;
    letter-spacing: 0;
    line-height: 8vw;
    text-align: center;
  }
  .miaoShu-pro{
    position: relative;
    width: 100%;
  }
  .textAarea-box{
    position: relative;
    width: 100%;
  }
  .contant-op{
    position: relative;
    width: 100%;
    /* height: 30vw; */
    padding-top: 7vw;
  }
  .upImg-op{
    position: relative;
    width: 100%;
    min-height: 30vw;
    margin-top: 5vw;
    margin-bottom: 15vh;
  }

  .EBI-uploadImg{
    position: relative;
    width: 100%;
  }




  .LJ-buy-btn1{
    position: fixed;
    /* width: 100%; */
    width: 92vw;
    padding: 0 vw;
    height: 12vw;
    bottom: 0;
    margin-bottom: 1vw;
    z-index: 109;
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
</style>
