<template>
  <div class="briefIntro-content">
    <topBox>
      <p class="title-putIn">简单介绍</p>
    </topBox>
    <div class="line"></div>
    <div class="briefIntro-box">
      <div class="textAarea-box">
        <x-textarea class="introduce" v-model="content" :max="300" placeholder="用一段话介绍自己吧" :rows="8" :cols="30"></x-textarea>
      </div>
      <div :class="content ? 'btn-box-BI2' : 'btn-box-BI'" @click="ckickUpdataBriefIntro">
        <p class="">保存</p>
      </div>
    </div>
  </div>

</template>

<script>
  import { XTextarea } from 'vux';
  import topBox from './../../../../../common/topBox';
  import { mapMutations } from 'vuex';
  import { Toast } from 'mint-ui';
  import axios from 'axios';
    export default {
        name: 'briefIntro',
        components: {
          topBox,
          XTextarea
        },
        data () {
          return {
            content: ''
          };
        },
        computed: {},
        created () {
          if (this.EVN === 'production') {
            axios.defaults.baseURL = this.apiProd2;
          }
          if (localStorage.getItem('UserData')) { // 获取缓存中的用户信息
            this.content = JSON.parse(localStorage.getItem('UserData')).content;
          };
        },
        mounted () {},
        methods: {
          ...mapMutations({
            setLoadingShow: 'setLoadingShow',
            setLoadingText: 'setLoadingText'
          }),
          ckickUpdataBriefIntro () {
            if (this.content === '') {
              Toast('简单介绍不能为空');
              return;
            };
            if (localStorage.getItem('landRegist')) {
              this.$store.commit('setLoadingShow', true); // 更新vuex loading
              let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
              console.log(landRegistLG.user.id);
              let params = {
                content: this.content
              };
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
          }
        }
      };
</script>

<style scoped>
  .briefIntro-content{
    position: fixed;
    width: 100%;
    min-height: 100vh;
    background: #fff;
  }
  .briefIntro-box{
    position: relative;
    width: 100%;
    padding: 4vw 4vw 0 4vw;
  }
  .textAarea-box{
    position: relative;
    width: 100%;
    background: #F9F9F9 !important;
  }
  .introduce {
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: #F9F9F9;
    height: 49.33vw;
  }

  .introduce>div>textarea{
    background: #F9F9F9 !important;
  }
  .btn-box-BI{
    position: relative;
    width: 100%;
    margin-top: 10vw;
  }
  .btn-box-BI>p{
    position: relative;
    width: 100%;
    background: #02C2A2;
    opacity: 0.5;
    font-family: PingFangSC-Regular;
    font-size: 4.266vw;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 11vw;
    text-align: center;
  }
  .btn-box-BI2{
    position: relative;
    width: 100%;
    margin-top: 10vw;
  }
  .btn-box-BI2>p{
    position: relative;
    width: 100%;
    background: #02C2A2;
    opacity: 1;
    font-family: PingFangSC-Regular;
    font-size: 4.266vw;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 11vw;
    text-align: center;
  }
</style>
