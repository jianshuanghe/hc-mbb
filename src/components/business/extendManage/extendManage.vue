<template>
    <div class="content-extend">
      <div class="extentBox">
        <account :msgData="accountData"></account>
        <Statistics :msgData="accountData"></Statistics>
        <dataTrendKanban ></dataTrendKanban>
        <gadget></gadget>
      </div>

      <div>
        <confirm
          v-model="confirmShow1"
          :show-cancel-button="false"
          :title=confirmTitle
          :confirm-text=confirmBtn1
          @on-confirm="onConfirm">
          <p style="text-align:center;">{{confirmText}}</p>
        </confirm>
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
    import account from './extendManageList/account';
    import Statistics from './extendManageList/Statistics';
    import dataTrendKanban from './extendManageList/dataTrendKanban';
    import gadget from './extendManageList/gadget';
    import { Confirm, Loading } from 'vux';
    import axios from 'axios';
    import { Toast } from 'mint-ui';
    import { mapMutations, mapGetters } from 'vuex';
    export default {
        name: 'extendManage',
        components: {
          Confirm,
          Loading,
          account,
          Statistics,
          dataTrendKanban,
          gadget
        },
        data () {
          return {
            loadingShow: false, // loading
            confirmShow1: false,
            confirmBtn1: '好的，知道了',
            confirmShow: false,
            confirmBtn: '去认证',
            cancelBtn: '暂不认证',
            confirmTitle: '提示',
            confirmText: '您的公司还未认证，无法进行广告投放，快去提交公司认证信息吧～～～',
            accountData: '' // 个人账户信息数据
          };
        },
        props: ['msgData'],
        computed: {
          ...mapGetters(['TRENDKANBAN'])
        },
        created () {
          if (this.EVN === 'production') {
            axios.defaults.baseURL = this.apiProd2;
          }
          this.getAccountData();
        },
        mounted () {},
        methods: {
          ...mapMutations({
            setPersonTitle: 'setPersonTitle',
            setLoadingShow: 'setLoadingShow',
            setLoadingText: 'setLoadingText'
          }),
          onCancel () {
            this.confirmShow = true;
            console.log('暂不设置');
            this.$store.commit('setHome', 1);
            localStorage.setItem('tabItems', 1); // 缓存用户点击的按钮
            this.$store.commit('setClickItems', 1); // 更新vuex setClickItems
          },
          onConfirm (msg) {
            this.confirmShow = true;
            console.log('去认证');
            if (this.accountData.rpCompanyAuth === '0') { // 未认证状态
              this.$router.push({
                path: '/companyInforEdit',
                query: {personTitle: 2}
              });
            };
            if (this.accountData.rpCompanyAuth === '3') { // 认证失败
              this.$store.commit('setPersonTitle', 2);
              this.$router.push({
                path: '/companyInfor',
                query: {personTitle: 2}
              });
            };
            if (this.accountData.rpCompanyAuth === '1') { // 认证中
              this.$store.commit('setPersonTitle', 2);
              this.$router.push({
                path: '/companyInfor',
                query: {personTitle: 2}
              });
            };
          },
          getAccountData () { // 获取账户信息
            console.log('获取账户信息');
            this.$store.commit('setLoadingShow', true); // 更新vuex loading
            let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
            console.log(landRegistLG.user.id);
            axios.get(this.api2 + '/rest-rp/putIn/' + landRegistLG.user.id).then((response) => {
              console.log(response);
              if (response.data.ret === '200') {
                this.accountData = response.data.content;
                if (this.accountData.rpCompanyAuth === '0') { // 未认证状态
                  this.confirmShow = true;
                };
                if (this.accountData.rpCompanyAuth === '1') { // 待认证审核中
                  this.confirmShow1 = true;
                  this.confirmText = '您公司的认证信息正在审核中，请耐心等待～～～';
                };
                if (this.accountData.rpCompanyAuth === '3') { // 认证失败
                  this.confirmShow = true;
                  this.confirmText = '您的公司认证审核未通过，无法进行推广，快去重新提交认证信息吧～～～';
                };
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
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
  .content-extend{
    position: relative;
    margin-bottom: 24vw;
  }
</style>
