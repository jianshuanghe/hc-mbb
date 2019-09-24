<template>
    <div class="contentBox">
      <div class="homeContent">
        <!--发现商机-->
        <keep-alive>
          <findBusiness v-if="GET_HOME.tabItems === 1"></findBusiness>
        </keep-alive>
        <!--推广管理-->
        <extendManage v-if="GET_HOME.tabItems === 2"></extendManage>
        <!--消息中心-->
        <keep-alive>
          <newsCenter v-if="GET_HOME.tabItems === 3"></newsCenter>
        </keep-alive>
        <!--个人中心-->
        <keep-alive>
          <personCenter v-if="GET_HOME.tabItems === 4"></personCenter>
        </keep-alive>
      </div>
      <!--底部tabbar-->
      <tabbar></tabbar>
    </div>
</template>

<script>
  import tabbar from './../components/business/tabbar';
  import findBusiness from './../components/business/findBusiness/findBusiness';
  import extendManage from './../components/business/extendManage/extendManage';
  import newsCenter from './../components/business/newsCenter/newsCenter';
  import personCenter from './../components/business/personCenter/personCenter';
  import { mapMutations, mapGetters } from 'vuex';
    export default {
        name: 'home',
        components: {
          tabbar,
          findBusiness,
          extendManage,
          newsCenter,
          personCenter
        },
        computed: {
          ...mapGetters(['GET_UINFO', 'GET_HOME', 'QUICKNAV'])
        },
        data () {
          return {
            tabItems: '' // 用户点击的tabItems 默认显示第一个
          };
        },
        created () {
          if (localStorage.getItem('tabItems')) { // 防止用户在home页刷新，记录下用户在那个模块
            this.$store.commit('setHome', Number(localStorage.getItem('tabItems')));
          }
          this.queryParams = this.$route.query;
          if (localStorage.getItem('UUID') && localStorage.getItem('UUID') === this.queryParams.uuid) { // 存在UUID，说明是本手机触发的微信登录 校验uuid一致性
            let landRegist = {
              sign: this.queryParams.token,
              user: {
                id: Number(this.queryParams.userId)
              }
            };
            localStorage.setItem('landRegist', JSON.stringify(landRegist)); // 缓存用户登录信息
          }
          console.log(this.$route.query, '连接参数！');
        },
        mounted () {},
        methods: {
          ...mapMutations({
            setHome: 'setHome'
          }),
          goToNewsItemsDetail () {
            console.log('to消息详情');
            this.$router.push({
              path: '/newsItemsList',
              query: { }
            });
          }
        }
      };
</script>

<style scoped>
  .contentBox {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: #F6F6F6;
  }
  .homeContent{
    position: relative;
    width: 100%;
    -webkit-overflow-scrolling:touch;
  }
</style>
