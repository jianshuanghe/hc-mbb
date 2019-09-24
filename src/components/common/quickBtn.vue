<template>
  <div class="content-quickBtn">
    <div class="quickBtn" @click="clickQuickBtn">
      <img src="./../../assets/images/common/quickBtn.png" alt="" class="img">
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
    export default {
        name: 'quickBtn',
        components: {
        },
        data () {
          return {
            quickNavShow: false // 快捷导航组件显示，默认为false
          };
        },
        methods: {
          ...mapMutations({
            setQuickNavShow: 'setQuickNavShow'
          }),
          clickQuickBtn () {
            if (!localStorage.getItem('landRegist')) {
              localStorage.setItem('tabItems', 1); // 缓存用户点击的按钮
              // 跳转到登录注册
              if (localStorage.getItem('UUID') && localStorage.getItem('bindPhone')) {
                let params = JSON.parse(localStorage.getItem('bindPhone'));
                this.$router.push({
                  path: '/bindPhone',
                  query: params
                });
              } else {
                this.$router.push({
                  path: '/landRegistration',
                  query: { }
                });
              }
              return;
            }
            this.quickNavShow = true;
            this.$store.commit('setQuickNavShow', this.quickNavShow);
            console.log('触发快捷导航按钮');
          }
        }
    };
</script>

<style scoped>
  .content-quickBtn{
    position: relative;
    width: 100%;
    margin-top: 1.5vw;
  }
  .quickBtn{
    position: relative;
    width: 4.48vw;
    height: 3.733vw;
  }
  .quickBtn>img{
    position: relative;
    width: 100%;
  }
</style>
