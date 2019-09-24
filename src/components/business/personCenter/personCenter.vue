<template>
  <div class="presonCenter-content">
    <topBox>
      <p class="title-putIn">个人中心</p>
    </topBox>
    <div class="perBox-cont">
      <personInfor></personInfor>
      <accontInfor></accontInfor>
    </div>
  </div>
</template>

<script>
    import topBox from './../../common/topBox';
    import personInfor from './personAndCompany/personInfor';
    import accontInfor from './personAndCompany/accontInfor';
    import { mapMutations } from 'vuex';
    import { Toast } from 'mint-ui';
    import axios from 'axios';
    export default {
        name: 'personCenter',
        components: {
          topBox,
          personInfor,
          accontInfor
        },
        data () {
          return {
          };
        },
        created () {
          if (this.EVN === 'production') {
            axios.defaults.baseURL = this.apiProd2;
          }
          this.getUserData();
        },
        mounted () {},
        methods: {
          ...mapMutations({
            setLoadingShow: 'setLoadingShow',
            setLoadingText: 'setLoadingText'
          }),
          getUserData () {
            console.log('获取用户信息，全部');
            let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
            console.log(landRegistLG.user.id);
            this.$store.commit('setLoadingShow', true); // 更新vuex loading
            axios.get(this.api2 + '/rest-rp/user/' + landRegistLG.user.id).then((response) => {
              console.log(response);
              if (response.data.ret === '200') {
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
                let UserData = response.data.content;
                localStorage.setItem('UserData', JSON.stringify(UserData)); // 缓存用户信息
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
  .presonCenter-content{
    /*position: fixed;*/
    /*margin-bottom: 15vh;*/
    /*height: 90vh;*/
    /*overflow: scroll;*/
    /*-webkit-overflow-scrolling:touch;*/
  }
  .perBox-cont{
    width: 100%;
    position: relative;
  }
</style>
