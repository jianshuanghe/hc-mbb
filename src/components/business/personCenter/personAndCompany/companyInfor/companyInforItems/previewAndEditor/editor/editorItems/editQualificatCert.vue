<template>
  <div class="editBasicInfor-content">
    <div class="editBasicInfor">
      <div class="editBasicInfor-box">
        <div class="MI-box M-Bttom">
          <!--品牌名称-->
          <div class="MI-items">
            <div class="MI-left-EBI left">
              <img :src="xing" alt="" class="img">
              <p class="">品牌名称</p>
            </div>
            <!--<p class="error-tips-EBI">未填写</p>-->
            <div class="MI-right right">
              <div class="right-Box-MI">
                <div class="img-MI EBI-img-MI left">
                  <input type="text" name="lname"  maxlength="18" v-model="UserData.authBrandName" class="perInfoItemR" placeholder="请输入"/>
                </div>
                <div class="arrow-img-MI left">
                  <!--<img :src="lineRightArrow" alt="" class="right">-->
                </div>
              </div>
            </div>
            <div class="clear"></div>
            <div class="line"></div>
          </div>
          <!--推广内容-->
          <div class="">
            <div class="MI-left-EBI left">
              <img :src="xing" alt="" class="img">
              <p class="">推广内容</p>
            </div>
            <div class="textAarea-box">
              <x-textarea class="introduce2" v-model="UserData.authBrandContent" :max="300" placeholder="请简单描述您要推广的内容" :rows="8" :cols="30"></x-textarea>
            </div>
            <div class="line"></div>
          </div>
          <!--验证类型-->
          <div class="MI-items">
            <div class="MI-left-EBI left">
              <img :src="xing" alt="" class="img">
              <p class="">验证类型</p>
            </div>
            <div class="MI-right right">
              <div class="right-Box-MI">
                <div class="img-MI left" @click="screenDataPopup(1)">
                  <p class="intro-MI" v-if="!UserData.authCompType">点击选择</p>
                  <p :class="UserData.authCompType ? 'intro-MI2' : 'intro-MI'" v-else>{{authCompTypeText || '点击选择'}}</p>
                </div>
                <div class="arrow-img-MI left">
                  <img :src="lineRightArrow" alt="" class="right">
                </div>
              </div>
            </div>
            <div class="clear"></div>
            <div class="line"></div>
          </div>
          <!--物资类型-->
          <div class="MI-items">
            <div class="MI-left-EBI left">
              <img :src="xing" alt="" class="img">
              <p class="">资质类型</p>
            </div>
            <div class="MI-right right">
              <div class="right-Box-MI">
                <div class="img-MI left" @click="screenDataPopup(2)">
                  <p class="intro-MI" v-if="!UserData.authQualType">点击选择</p>
                  <p :class="UserData.authQualType ? 'intro-MI2' : 'intro-MI'" v-else>{{authQualTypeText || '点击选择'}}</p>
                </div>
                <div class="arrow-img-MI left">
                  <img :src="lineRightArrow" alt="" class="right">
                </div>
              </div>
            </div>
            <div class="clear"></div>
            <div class="line"></div>
          </div>
          <!--资质图片-->
          <div class="MI-items">
            <div class="items-box-EQI">
              <div class="MI-left-EBI left">
                <img :src="xing" alt="" class="img">
                <p class="">资质图片</p>
              </div>
              <div class="MI-right right">
                <div class="right-Box-MI">
                  <div class="img-MI left"  @touchstart="goTouchStart('faRen', UserData.authQualImg)" @touchmove="goTouchMove('faRen')" @touchend="goTouchend('faRen')">
                    <cube-upload
                      ref="upload"
                      v-model="files"
                      :action="action"
                      :processFile="processFile"
                      @files-added="addedHandler"
                      @file-error="errHandler"
                      @file-success="sucQualImg">
                      <div class="clear-fix touxiang">
                        <!--<cube-upload-file class='imgTou'v-for="(file, i) in files" :file="file" :key="i"></cube-upload-file>-->
                        <cube-upload-btn :multiple="false">
                          <div>
                            <p class="imgKongText" v-if="!UserData.authQualImg">点击上传</p>
                            <img :src="UserData.authQualImg" alt="" class="imgTouXiang right" v-else>
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
            </div>
            <div class="tips-EQI">
              <p class="">请上传相应资质图片，小于2M</p>
            </div>
            <div class="line"></div>
          </div>
          <!--资质号码-->
          <div class="MI-items">
            <div class="MI-left-EBI left">
              <img :src="xing" alt="" class="img">
              <p class="">资质号码</p>
            </div>
            <div class="MI-right right">
              <div class="right-Box-MI">
                <div class="img-MI EBI-img-MI left">
                  <input type="number" name="lname" v-model="UserData.authQualNum" class="perInfoItemR" placeholder="点击填写"/>
                </div>
                <div class="arrow-img-MI left">
                  <!--<img :src="lineRightArrow" alt="" class="right">-->
                </div>
              </div>
            </div>
            <div class="clear"></div>
            <div class="line"></div>
          </div>
          <!--法人身份证-->
          <div class="MI-items">
            <div class="items-box-EQI">
              <div class="MI-left-EBI left">
                <img :src="xing" alt="" class="img">
                <p class="">法人身份证</p>
              </div>
              <div class="MI-right right">
                <div class="right-Box-MI">
                  <div class="img-MI left" @touchstart="goTouchStart('faRen', UserData.authLegalNum)" @touchmove="goTouchMove('faRen')" @touchend="goTouchend('faRen')">
                    <cube-upload
                      ref="upload"
                      v-model="files2"
                      :action="action"
                      :processFile="processFile"
                      @files-added="addedHandler"
                      @file-error="errHandler"
                      @file-success="sucLegalNum">
                      <div class="clear-fix touxiang">
                        <!--<cube-upload-file class='imgTou'v-for="(file, i) in files" :file="file" :key="i"></cube-upload-file>-->
                        <cube-upload-btn :multiple="false">
                          <div>
                            <p class="imgKongText" v-if="!UserData.authLegalNum">点击上传</p>
                            <img :src="UserData.authLegalNum" alt="" class="imgTouXiang right" v-else>
                          </div>
                        </cube-upload-btn>
                      </div>
                    </cube-upload>
                  </div>
                  <div class="arrow-img-MI left">
                    <img :src="lineRightArrow" alt="" class="right">
                  </div>
                </div>
              </div>
              <div class="clear"></div>
            </div>
            <div class="tips-EQI">
              <p class="">请上传法人身份证的正面照</p>
            </div>
            <div class="line"></div>
          </div>
          <!--资质材料补充-->
          <div class="MI-items">
            <div class="items-box-EQI">
              <div class="MI-left-EBI left">
                <p class="">资质材料补充</p>
              </div>
              <div class="MI-right right">
                <div class="right-Box-MI">
                </div>
              </div>
              <div class="clear"></div>
            </div>
            <div class="EBI-uploadImg">
              <cube-upload
                class="EBI-feedUpload"
                v-model="files3"
                :action="action"
                :max="3"
                :simultaneous-uploads="1"
                @file-submitted="fileClick"
                :processFile="processFile"
                @files-added="addedHandler"
                @file-error="errHandler"
                @file-success="sucHandlerOther"
                @file-removed="delHandler(files3)">
              </cube-upload>
            </div>
            <div class="tips-EQI">
              <p class="">请上传其他必要的资质图片，小于2M</p>
            </div>
            <div class="line"></div>
          </div>
        </div>
      </div>

    </div>
    <div class="BIF-bottom">
      <div class="BIF-btn"  @click="clickSaveQualificatCert">
        <p class="">保存并提交审核</p>
      </div>
    </div>
    <mt-popup
      v-model="authTypePopup"
      popup-transition="popup-fade"
      position="bottom" class="mint-datetime">
      <mt-picker
        :slots="authType"
        @change="onValuesChangeAuthType"
        valueKey='text'show-toolbar>
        <span class="mint-datetime-action mint-datetime-cancel" @click="authTypePopup = false">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="confirmAuthType">确定</span>
      </mt-picker>
    </mt-popup>
    <mt-popup
      v-model="qualificationTypePopup"
      popup-transition="popup-fade"
      position="bottom" class="mint-datetime">
      <mt-picker
        :slots="qualificationType"
        @change="onValuesChangeQualificationType"
        valueKey='text'show-toolbar>
        <span class="mint-datetime-action mint-datetime-cancel" @click="qualificationTypePopup = false">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="confirmQualificationType">确定</span>
      </mt-picker>
    </mt-popup>
    <div>
      <confirm
        v-model="confirmShow"
        :show-cancel-button="false"
        :title=confirmTitle
        :confirm-text=confirmBtn
        @on-confirm="onConfirm">
        <p style="text-align:center;">{{confirmText}}</p>
      </confirm>
    </div>
    <!--图片预览组件-->
    <previewImg :previewImgSrc="ImgSrc"  @sendValueToParent = "getValueFromChild"v-if="previewImgShow"></previewImg>
  </div>
</template>

<script>
  import touXiang from '@/assets/images/business/home/extendManageList/touxiang.png';
  import lineRightArrow from '@/assets/images/common/line-right-arrow.png';
  import xing from '@/assets/images/common/xing.png';
  import previewImg from './../../../../../../../../common/previewImg';
  import { authType, qualificationType } from '@/utils/code.js';
  import { XTextarea, Confirm } from 'vux';
  import { mapMutations, mapGetters } from 'vuex';
  import { Toast, Popup } from 'mint-ui';
  import axios from 'axios';
  import lrz from 'lrz';
  export default {
    name: 'editQualificatCert',
    components: {
      Confirm,
      previewImg,
      XTextarea,
      Popup
    },
    data () {
      return {
        touxiang: '',
        touxiang1: touXiang,
        lineRightArrow: lineRightArrow,
        xing: xing,
        text: '',
        timeOutEvent: 0, // 定时器
        previewImgShow: false, // 预览组件显示，默认为false
        ImgSrc: '', // 预览图片路径参数
        num: '', // 记录上传图片张数
        action: 'http://img01.iambuyer.com/imgup/upLoad/fileUpload',
        files: [],
        files2: [],
        files3: [],
        confirmShow: false,
        confirmBtn: '知道了',
        confirmTitle: '提示',
        confirmText: '您的认证信息已提交，审核需要1-2个工作日，请耐心等待～',
        authTypePopup: false,
        qualificationTypePopup: false,
        authType: [ // 验证类型
          {
            flex: 1,
            values: authType,
            textAlign: 'center'
          }
        ],
        qualificationType: [ // 资质类型
          {
            flex: 1,
            values: qualificationType,
            textAlign: 'center'
          }
        ],
        authCompTypeText: '', // 验证类别显示
        authQualTypeText: '', // 资质类型显示
        authTypeData: {
          code: '',
          text: ''
        },
        qualificationTypeData: {
          code: '',
          text: ''
        },
        UserData: {},
        imgData: {}
      };
    },
    created () {
      if (this.EVN === 'production') {
        axios.defaults.baseURL = this.apiProd2;
      }
    },
    computed: {
      ...mapGetters(['PERSONCENTER', 'IMGDATA'])
    },
    watch: {
      PERSONCENTER: {
        handler (a, b) {
          this.UserData = a.qualificatCertEdit; // 基本信息
          let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
          console.log(landRegistLG.user.id);
          this.UserData.ssoUserId = landRegistLG.user.id;
          this.UserData.authCompType === '0' ? this.authCompTypeText = '企业' : this.authCompTypeText = '个体工商户';
          this.UserData.authQualType === '0' ? this.authQualTypeText = '企业营业执照' : this.authQualTypeText = '企业营业执照';
        },
        deep: true
      },
      IMGDATA: {
        handler (a, b) {
          this.imgData = a; // 附件信息
        },
        deep: true
      }
    },
    mounted () {
      console.log(authType);
      this.getUserData();
    },
    methods: {
      ...mapMutations({
        setLoadingShow: 'setLoadingShow',
        setLoadingText: 'setLoadingText',
        setQualificatCertEdit: 'setQualificatCertEdit',
        setHeadImg: 'setHeadImg',
        setAuthQualImg: 'setAuthQualImg',
        setAuthLegalNum: 'setAuthLegalNum',
        setAuthEnclosureImg01: 'setAuthEnclosureImg01',
        setAuthEnclosureImg02: 'setAuthEnclosureImg02',
        setAuthEnclosureImg03: 'setAuthEnclosureImg03'
      }),
      screenDataPopup (e) { // 切换数据日期
        console.log(e);
        if (e === 1) {
          this.authTypePopup = true;
          console.log(this.authTypePopup);
        } else if (e === 2) {
          this.qualificationTypePopup = true;
        };
      },
      onValuesChangeAuthType (picker, values) { // 验证类型
        console.log(values);
        this.authTypeData = values[0];
      },
      onValuesChangeQualificationType (picker, values) { // 资质类型
        console.log(values);
        this.qualificationTypeData = values[0];
      },
      confirmAuthType () {
        console.log('触发验证类型确定');
        this.authTypePopup = false;
        this.authCompTypeText = this.authTypeData.text; // 显示
        this.UserData.authCompType = this.authTypeData.code; // 更新数据
      },
      confirmQualificationType () {
        console.log('触发资质类型确定');
        this.qualificationTypePopup = false;
        this.authQualTypeText = this.qualificationTypeData.text; // 显示
        this.UserData.authQualType = this.qualificationTypeData.code; // 更新数据
      },
      goToBriefIntro () {
        console.log('to个人介绍');
        this.$router.push({
          path: '/briefIntro',
          query: { }
        });
      },
      getUserData () {
        console.log('获取用户信息，全部');
        this.$store.commit('setLoadingShow', true); // 更新vuex loading
        let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
        console.log(landRegistLG.user.id);
        axios.get(this.api2 + '/rest-rp/compAuth/' + landRegistLG.user.id).then((response) => {
          console.log(response);
          if (response.data.ret === '200') { // 后台返有数据
            this.$store.commit('setLoadingShow', false); // 更新vuex loading
            if (response.data.content) {
              this.$store.commit('setQualificatCertEdit', response.data.content); // 更新vuex loading
              let urlData1 = {
                url: '',
                response: {
                  name: ''
                }
              };
              let urlData2 = {
                url: '',
                response: {
                  name: ''
                }
              };
              let urlData3 = {
                url: '',
                response: {
                  name: ''
                }
              };
              if (response.data.content.authEnclosureImg01 !== '' && response.data.content.authEnclosureImg01 !== null) {
                urlData1.url = response.data.content.authEnclosureImg01;
                urlData1.response.name = response.data.content.authEnclosureImg01;
                this.files3.push(urlData1);
                this.num = 1;
              };
              if (response.data.content.authEnclosureImg02 !== '' && response.data.content.authEnclosureImg02 !== null) {
                urlData2.url = response.data.content.authEnclosureImg02;
                urlData2.response.name = response.data.content.authEnclosureImg02;
                this.files3.push(urlData2);
                this.num = 2;
              };
              if (response.data.content.authEnclosureImg03 !== '' && response.data.content.authEnclosureImg03 !== null) {
                urlData3.url = response.data.content.authEnclosureImg03;
                urlData3.response.name = response.data.content.authEnclosureImg03;
                this.files3.push(urlData3);
                this.num = 3;
              };
              console.log(this.files3);
              this.$store.commit('setAuthQualImg', response.data.content.authQualImg); // 更新vuex setAuthQualImg
              this.$store.commit('setAuthLegalNum', response.data.content.authLegalNum); // 更新vuex setAuthLegalNum
              this.$store.commit('setAuthEnclosureImg01', response.data.content.authEnclosureImg01); // 更新vuex setAuthEnclosureImg01
              this.$store.commit('setAuthEnclosureImg02', response.data.content.authEnclosureImg02); // 更新vuex setAuthEnclosureImg02
              this.$store.commit('setAuthEnclosureImg03', response.data.content.authEnclosureImg03); // 更新vuex setAuthEnclosureImg03
            } else { // 返回无数据，用户第一次认证
              let content = {
                ssoUserId: 0,
                authBrandName: '',
                authBrandContent: '',
                authCompType: '',
                authQualType: '',
                authQualImg: '',
                authQualNum: '',
                authLegalNum: '',
                authEnclosureImg01: '',
                authEnclosureImg02: '',
                authEnclosureImg03: ''
              };
              this.$store.commit('setQualificatCertEdit', content); // 更新vuex loading
            }
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
      // 开始长按
      goTouchStart (e, imgSrc) {
        let that = this;
        clearTimeout(that.timeOutEvent); // 清除定时器
        that.timeOutEvent = 0;
        that.timeOutEvent = setTimeout(function () {
          // 执行长按要执行的内容，
         that.longPress(e, imgSrc);
        }, 600); // 这里设置定时
      },
      // 手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
      goTouchend (e) {
        clearTimeout(this.timeOutEvent);
        if (this.timeOutEvent !== 0) {
          // 这里写要执行的内容（尤如onclick事件）
        }
      },
      // 如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
      goTouchMove (e) {
        clearTimeout(this.timeOutEvent); // 清除定时器
        this.timeOutEvent = 0;
      },
      // 真正长按后应该执行的内容
      longPress (item, imgSrc) {
        this.timeOutEvent = 0;
        // 执行长按要执行的内容，如弹出菜单
        console.log(item, '触发长按行为');
        if (item === 'faRen') {
          if (imgSrc === '') { // 预览的地方没有图片
            return false;
          } else {
            this.ImgSrc = imgSrc;
            this.previewImgShow = true; // 显示预览状态
          }
        }
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
      sucQualImg (file) {
        console.log(file);
        console.log('更新资质图片');
        this.UserData.authQualImg = file.response.httpUrl;
        this.$store.commit('setAuthQualImg', file.response.name); // 更新vuex setAuthQualImg
      },
      sucLegalNum (file) {
        console.log(file);
        console.log('更新法人身份证');
        this.UserData.authLegalNum = file.response.httpUrl;
        this.$store.commit('setAuthLegalNum', file.response.name); // 更新vuex setAuthLegalNum
      },
      sucHandlerOther (file) {
        console.log(file, '添加按钮');
        this.num++;
        switch (this.num) {
          case 1:
            this.$store.commit('setAuthEnclosureImg01', file.response.name);
            break;
          case 2:
            this.$store.commit('setAuthEnclosureImg02', file.response.name);
            break;
          case 3:
            this.$store.commit('setAuthEnclosureImg03', file.response.name);
            break;
        }
      },
      // delete img
      delHandler (e) {
        this.num--;
        this.$store.commit('setAuthEnclosureImg01', ''); // 更新vuex setAuthEnclosureImg01
        this.$store.commit('setAuthEnclosureImg02', ''); // 更新vuex setAuthEnclosureImg02
        this.$store.commit('setAuthEnclosureImg03', ''); // 更新vuex setAuthEnclosureImg03
        console.log(e, this.num, '删除按钮');
        for (let i = 0; i < this.num; i++) {
          if (i === 0) {
            console.log(e[i], '第1个');
            this.$store.commit('setAuthEnclosureImg01', e[i].response.name); // 更新vuex setAuthEnclosureImg01
          };
          if (i === 1) {
            console.log(e[i], '第2个');
            this.$store.commit('setAuthEnclosureImg02', e[i].response.name); // 更新vuex setAuthEnclosureImg02
          };
          if (i === 2) {
            console.log(e[i], '第3个');
            this.$store.commit('setAuthEnclosureImg03', e[i].response.name); // 更新vuex setAuthEnclosureImg03
          };
        };
        //   console.log(this.params,this.num);
      },
      clickSaveQualificatCert () {
        console.log('触发保存认证信息按钮');
        let params = JSON.parse(JSON.stringify(this.UserData));
        console.log(this.imgData, 'this.imgData');
        params.authQualImg = this.imgData.authQualImg;
        params.authLegalNum = this.imgData.authLegalNum;
        params.authEnclosureImg01 = this.imgData.authEnclosureImg01;
        params.authEnclosureImg02 = this.imgData.authEnclosureImg02;
        params.authEnclosureImg03 = this.imgData.authEnclosureImg03;
        delete params.id;
        delete params.authEnclosure;
        delete params.authEnclosurePath;
        delete params.authState;
        delete params.authStateTime;
        delete params.authTimeStr;
        delete params.authContent;
        console.log(params, 'params');
        if (params.authBrandName === '') { // 品牌名称不能为空
          Toast('品牌名称不能为空');
          return false;
        };
        if (params.authBrandContent === '') { // 品牌内容不能为空
          Toast('品牌内容不能为空');
          return false;
        };
        if (params.authCompType === '') { // 验证类型不能为空
          Toast('验证类型不能为空');
          return false;
        };
        if (params.authQualType === '') { // 资质类型不能为空
          Toast('资质类型不能为空');
          return false;
        };
        if (params.authQualImg === '') { // 资质图片不能为空
          Toast('资质图片不能为空');
          return false;
        };
        if (params.authQualNum === '') { // 资质号码不能为空
          Toast('资质号码不能为空');
          return false;
        };
        if (params.authLegalNum === '') { // 法人身份证不能为空
          Toast('法人身份证不能为空');
          return false;
        };
        this.upUserData(params);
      },
      upUserData (params) {
        console.log('更新认证信息');
        this.$store.commit('setLoadingShow', true); // 更新vuex loading
        if (localStorage.getItem('landRegist')) {
          let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
          console.log(landRegistLG.user.id);
          axios.post(this.api2 + '/rest-rp/compAuth/submitAuth', params).then((response) => {
            console.log(response);
            if (response.data.ret === '200') {
              this.$store.commit('setLoadingShow', false); // 更新vuex loading
              this.confirmShow = true;
              setTimeout(() => {
                this.$router.back(-1);
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
        }
      },
      onConfirm (msg) {
        console.log('on confirm');
        setTimeout(() => {
          this.$router.back(-1);
        }, 500);
      },
      getValueFromChild (e) {
        this.previewImgShow = e; // 关闭预览
      }
    }
  };
</script>

<style scoped>
  .editBasicInfor-content{
    position: relative;
    width: 100%;
    background: #F9F9F9;
  }
  .editBasicInfor{
    position: relative;
    width: 100%;
    background: #F9F9F9;
    padding-bottom: 5vh;
    -webkit-overflow-scrolling:touch;
  }
  .editBasicInfor-box{
    position: relative;
    width: 100%;
    margin-bottom: 35vw;
  }
  .topTips{
    position: relative;
    width: 100%;
    background: #F9F9F9;
    padding: 0 4vw 0 4vw;
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
  .EBI-textArea{
    position: relative;
    width: 100%;
    background: #fff;
    padding: 0 4vw 0 4vw;
  }
  .textAarea-box{
    position: relative;
    width: 100%;
  }
  .introduce2{
    position: relative;
    width: 96%;
    margin-left: 4%;
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
  .MI-left-EBI{
    position: relative;
    width: 50%;
    height: 11vw;
  }
  .MI-left-EBI>img{
    position: relative;
    width: 2vw;
    float: left;
    top: 5.5vw;
    margin-right: 1vw;
    left: 0;
    display: inline-block;
  }
  .MI-left-EBI>p{
    position: absolute;
    font-family: PingFangSC-Light;
    font-size: 3.733vw;
    color: #2E2E30;
    line-height: 15vw;
    margin-left: 4vw;
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
  .EBI-img-MI{
    width: 100% !important;
  }
  .img-MI .touxiang{
    position: relative;
    width: 100%;
    float: right;
  }
  .imgTouXiang{
    position: relative;
    width: 10.66vw;
    height: 10.66vw;
    margin-top: 2.1vw;
  }
  .imgKongText{
    position: relative;
    width: 100%;
    font-family: PingFang-SC-Medium;
    font-size: 3.733vw;
    color: #D2D2D2;
    letter-spacing: 0;
    text-align: right;
    line-height: 15vw;
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
  .BIF-bottom{
    position: fixed;
    width: 100%;
    padding: 1.5vw 4vw 1.5vw 4vw;
    bottom: 0;
    z-index: 105;
    background: #fff;
  }
  .BIF-btn{
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
  .error-tips-EBI{
    position: absolute;
    top: 10vw;
    left: 4vw;
    font-family: PingFangSC-Light;
    font-size: 3.2vw;
    color: #FF4D6A;
    line-height: 4vw;
  }
  .tips-EQI{
    position: relative;
    width: 100%;
    padding-left: 4vw;
    height: 9vw;
  }
  .tips-EQI>p{
    font-family: PingFangSC-Light;
    font-size: 3.7vw;
    color: #9b9b9b;
    line-height: 8vw;
  }
  .EBI-uploadImg{
    position: relative;
    width: 100%;
    padding-left: 4vw;
  }
</style>
