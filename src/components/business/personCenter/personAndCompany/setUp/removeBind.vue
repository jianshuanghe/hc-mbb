<template>
  <div class="removeBind-content">
    <topBox>
      <p class="title-putIn">{{title}}</p>
    </topBox>
    <div class="removeBind">
      <div class="RB-cont">
        <!--邮箱-->
        <div class="items-RB"v-if="this.$route.query.content === 2">
          <div class="input-RB">
            <x-input name="mobile" placeholder="请输入邮箱地址" keyboard="number" :show-clear='false'  v-model="UserData.userEmail"></x-input>
          </div>
          <div :class="UserData.userEmail ? 'btn-RB' : 'btn-RB2'" @click="clickUpData(1)">
            <p class="">保存</p>
          </div>
        </div>
        <!--微信绑定-->
        <div class="items-RB"v-if="this.$route.query.content === 3">
          <!--微信绑定-->
          <div class="" v-if="!UserWxId">
            <div class="input-RB">
              <x-input name="mobile" placeholder="请输入您要绑定的微信账号" keyboard="number"  :show-clear='false'  v-model="UserData.wxId"></x-input>
            </div>
            <div :class="UserData.wxId ? 'btn-RB' : 'btn-RB2'"  @click="clickUpData(2)">
              <p class="">保存</p>
            </div>
          </div>
          <!--微信解绑-->
          <div class="" v-if="UserWxId">
            <div class="input-RB">
              <x-input name="mobile" disabled  placeholder="默认显示已绑定的微信账号" keyboard="number"  :show-clear='false'  v-model="UserData.wxId"></x-input>
            </div>
            <div :class="UserData.wxId ? 'btn-RB' : 'btn-RB2'"  @click="clickUpData(3)">
              <p class="">解除绑定</p>
            </div>
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
    import { XInput, Confirm } from 'vux';
    import topBox from './../../../../common/topBox';
    import { mapMutations, mapGetters } from 'vuex';
    import { Toast } from 'mint-ui';
    import axios from 'axios';
    export default {
        name: 'removeBind',
        components: {
          topBox,
          XInput,
          Confirm
        },
        data () {
          return {
            title: '绑定邮箱', // 标题
            UserData: {},
            UserWxId: false, // 判断用户是否存在微信id
            confirmShow: false,
            confirmBtn: '确定',
            cancelBtn: '取消',
            confirmTitle: '提示',
            confirmText: '是否要解除微信绑定?'
          };
        },
        computed: {
          ...mapGetters(['SETUP'])
        },
        watch: {
          SETUP: {
            handler (a, b) {
              this.UserData = a.setUpData; // 基本信息
            },
            deep: true
          }
        },
        created () {
          if (this.EVN === 'production') {
            axios.defaults.baseURL = this.apiProd2;
          }
          this.UserData = this.SETUP.setUpData;
          if (this.$route.query.content === 3) {
            if (this.UserData.wxId) {
              this.UserWxId = true;
              this.title = '解除微信绑定';
            } else {
              this.UserWxId = false;
              this.title = '绑定微信';
            }
          }
        },
        mounted () {},
        methods: {
          ...mapMutations({
            setLoadingShow: 'setLoadingShow',
            setLoadingText: 'setLoadingText',
            setBasicInfor: 'setBasicInfor'
          }),
          onCancel () {
            console.log('触发取消');
          },
          onConfirm () {
            console.log('触发确定');
            let params = {
              wxId: ''
            };
            this.upDataUser(params);
          },
          clickUpData (e) {
            console.log('触发提交按钮');
            let UserData = this.UserData;
            let params = {};
            if (e === 1) { // 绑定邮箱
              if (UserData.userEmail === '') { // 校验邮箱不能为空
                Toast('邮箱不能为空');
                return false;
              };
              if (UserData.userEmail) {
                if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(UserData.userEmail)) { // 校验邮箱格式
                  Toast('邮箱格式有误');
                  return false;
                };
              };
              params = {
                userEmail: UserData.userEmail
              };
              this.upDataUser(params);
            };
            if (e === 3) { // 解绑微信
              this.confirmShow = true;
            };
            if (e === 2) { // 绑定微信
              if (UserData.wxId === '') { // 校验微信不能为空
                Toast('微信不能为空');
                return false;
              };
              params = {
                wxId: UserData.wxId
              };
              this.upDataUser(params);
            };
          },
          upDataUser (params) {
            console.log('更新数据');
            if (localStorage.getItem('landRegist')) {
              this.$store.commit('setLoadingShow', true); // 更新vuex loading
              let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
              console.log(landRegistLG.user.id);
              axios.post(this.api2 + '/rest-rp/user/' + landRegistLG.user.id, params).then((response) => {
                console.log(response);
                if (response.data.ret === '200') {
                  this.$store.commit('setLoadingShow', false); // 更新vuex loading
                  Toast('更新成功！');
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
          goToMaterial () {
            console.log('to个人资料');
            this.$router.push({
              path: '/personMaterial',
              query: { }
            });
          }
        }
      };
</script>

<style scoped>
  .removeBind-content{
    position: fixed;
    width: 100%;
    min-height: 100vh;
    background: #fff;
    overflow: scroll;
    -webkit-overflow-scrolling:touch;
  }
  .removeBind{
    position: relative;
    width: 100%;
    margin-top: 1.5vw;
  }
  .RB-cont{
    position: relative;
    width: 100%;
  }
  .items-RB{
    position: relative;
    width: 100%;
  }
  .input-RB{
    position: relative;
    width: 100%;
    background: #fff;
    padding: 2vw 5vw 2vw 5vw;
  }
  .btn-RB{
    position: relative;
    width: 100%;
    padding: 4vw;
    margin-top: 6vw;
  }
  .btn-RB>p{
    background: #02C2A2;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 4.266vw;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 12vw;
  }
  .btn-RB2{
    position: relative;
    width: 100%;
    padding: 4vw;
    margin-top: 6vw;
    opacity: 0.5;
  }
  .btn-RB2>p{
    background: #02C2A2;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 4.266vw;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 12vw;
  }
</style>
