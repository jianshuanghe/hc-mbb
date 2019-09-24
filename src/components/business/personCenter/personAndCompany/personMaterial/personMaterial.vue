<template>
  <div class="personMaterial-content">
    <topBox>
      <p class="title-putIn">个人资料</p>
    </topBox>
    <materialItem ></materialItem>
  </div>
</template>

<script>
    import topBox from './../../../../common/topBox';
    import materialItem from './materialItems/materialItem';
    import { mapMutations } from 'vuex';
    import { Toast } from 'mint-ui';
    import axios from 'axios';
    export default {
        name: 'personMaterial',
        components: {
          topBox,
          materialItem
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
            setLoadingText: 'setLoadingText',
            setPersonMaterial: 'setPersonMaterial'
          }),
          getUserData () {
            console.log('获取用户信息，全部');
            this.$store.commit('setLoadingShow', true); // 更新vuex loading
            if (!localStorage.getItem('landRegist')) {
              this.$router.push({
                path: '/landRegistration',
                query: { }
              });
            }
            let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
            console.log(landRegistLG.user.id);
            axios.get(this.api2 + '/rest-rp/user/' + landRegistLG.user.id).then((response) => {
              console.log(response);
              if (response.data.ret === '200') {
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
                let UserData = response.data.content;
                this.$store.commit('setPersonMaterial', UserData); // 更新vuex setPersonMaterial
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
  .personMaterial-content{
    position: fixed;
    min-height: 100vh;
    background: #F9F9F9;
    width: 100%;
  }
</style>
