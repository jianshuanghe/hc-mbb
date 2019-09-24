<template>
    <div class="content-quick">
      <div class="mask-popup" @click="clickCloseMask">
      </div>
      <div class="quickBox-cont">
        <div class="quickNavigation">
          <div class="navigation">
            <div class="navigation-box">
              <div class="accout-nav">
                <div class="touxiang-nav">
                  <img :src="UserData.headImg || 'http://style.iambuyer.com/img/rhx-mobile-normal@2x.png'" alt="" class="img">
                </div>
                <p class="name-nav">{{UserData.nickname}}</p>
                <p class="company-nav">{{UserData.companyName || '未填写公司名称'}}</p>
              </div>
              <div class="quick-box">
                <div class="item-quick">
                  <div class="text-nav left"  @click="tabbarClick(1)">
                    <p class="text">发现商机</p>
                  </div>
                  <div class="right-quick-arrow left">
                    <img src="./../../assets/images/common/line-right-arrow.png" alt="" class="img">
                  </div>
                  <div class="clear"></div>
                  <div class="line"></div>
                </div>
                <div class="item-quick">
                  <div class="text-nav left" @click="tabbarClick(2)">
                    <p class="text">推广管理</p>
                  </div>
                  <div class="right-quick-arrow left">
                    <img src="./../../assets/images/common/line-right-arrow.png" alt="" class="img">
                  </div>
                  <div class="clear"></div>
                  <div class="line"></div>
                </div>
                <div class="item-quick">
                  <div class="text-nav left"  @click="tabbarClick(3)">
                    <p class="text">消息中心</p>
                  </div>
                  <div class="right-quick-arrow left">
                    <img src="./../../assets/images/common/line-right-arrow.png" alt="" class="img">
                  </div>
                  <div class="clear"></div>
                  <div class="line"></div>
                </div>
                <div class="item-quick">
                  <div class="text-nav left"  @click="tabbarClick(4)">
                    <p class="text">我的</p>
                  </div>
                  <div class="right-quick-arrow left">
                    <img src="./../../assets/images/common/line-right-arrow.png" alt="" class="img">
                  </div>
                  <div class="clear"></div>
                </div>
              </div>
              <div class="back-box-nav" @click="clickBackNav">
                <div class="back-nav">
                  <p class="">退出登录</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex';
    export default {
        name: 'quickNavigation',
        components: {
        },
        data () {
          return {
            quickNavShow: false, // 快捷导航组件显示，默认为false
            clickItems: 1,
            UserData: {} // 用户信息全部
          };
        },
        computed: {
          ...mapGetters(['TABCLICKITEMS'])
        },
        watch: {
          TABCLICKITEMS: {
            handler (a, b) {
              this.clickItems = a.clickItems; // 侦听切换类型消息
            },
            deep: true
          }
        },
        created () {
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
          }
          if (localStorage.getItem('UserData')) { // 获取缓存中的用户信息
            this.UserData = JSON.parse(localStorage.getItem('UserData'));
          };
        },
        methods: {
          ...mapMutations({
            setQuickNavShow: 'setQuickNavShow',
            setClickItems: 'setClickItems'
          }),
          clickCloseMask () {
            this.$store.commit('setQuickNavShow', false);
            console.log('触发快捷导航按钮');
          },
          tabbarClick (e) {
            console.log(e);
            this.clickItems = e;
            this.$store.commit('setHome', this.clickItems);
            if (e !== 1) { // 点击的不是上级页面，需要判断用户是否登陆
              if (!localStorage.getItem('landRegist')) {
                localStorage.setItem('tabItems', 1); // 缓存用户点击的按钮
                this.$store.commit('setClickItems', 1); // 更新vuex setClickItems
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
              } else {
                localStorage.setItem('tabItems', this.clickItems); // 缓存用户点击的按钮
                this.$store.commit('setClickItems', this.clickItems); // 更新vuex setClickItems
                this.$router.push({
                  path: '/',
                  query: { }
                });
              }
            } else {
              localStorage.setItem('tabItems', this.clickItems); // 缓存用户点击的按钮
              this.$router.push({
                path: '/',
                query: { }
              });
              this.$store.commit('setClickItems', this.clickItems); // 更新vuex setClickItems
            }
            this.clickCloseMask();
          },
          clickBackNav () {
            localStorage.removeItem('tabItems'); // 移除用户点击tabbar缓存数据
            localStorage.removeItem('UserData'); // 移除用户信息缓存数据
            localStorage.removeItem('landRegist'); // 移除用户登录缓存数据
            this.clickCloseMask();
            this.$store.commit('setClickItems', 1); // 更新vuex setClickItems
            this.$router.push({
              path: '/',
              query: { }
            });
          }
        }
      };
</script>

<style scoped>
  .content-quick{
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 109;
    top: 0;
  }
  .mask-popup{
    position: relative;
    width: 100%;
    background: rgba(19, 9, 9, 0.59);
    height: 100vh;
  }
  .quickBox-cont{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 104;
  }
  .quickNavigation{
    position: relative;
    width: 64vw;
    height: 100vh;
    background: #fff;
  }
  .navigation{
    position: relative;
    width: 100%;
    padding-top: 16vw;
  }
  .navigation-box{
    position: relative;
    width: 100%;
  }
  .accout-nav{
    position: relative;
    width: 35vw;
    margin: 0 auto;
  }
  .touxiang-nav{
    position: relative;
    width: 16vw;
    margin: 0 auto;
  }
  .touxiang-nav>img{
    position: relative;
    width: 16vw;
    height: 16vw;
    border-radius: 50%;
  }
  .name-nav{
    font-family: PingFangSC-Medium;
    font-size: 5.3vw;
    color: #3C3D3F;
    letter-spacing: 0;
    text-align: center;
    line-height: 10vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .company-nav{
    ont-family: PingFangSC-Light;
    text-align: center;
    font-size: 3.466vw;
    color: #3C3D3F;
    letter-spacing: 0;
    line-height: 5vw;
  }
  .quick-box{
    position: relative;
    width: 84%;
    margin-left: 8%;
    margin-top: 5vw;
  }
  .item-quick{
    position: relative;
    width: 100%;
  }
  .text-nav{
    position: relative;
    width: 90%;
  }
  .text-nav>p{
    position: relative;
    width: 100%;
    font-family: PingFangSC-Light;
    font-size: 3.733vw;
    color: #2E2E30;
    line-height: 14vw;
  }
  .right-quick-arrow{
    position: relative;
    width: 10%;
  }
  .right-quick-arrow>img{
    position: relative;
    width: 4vw;
    margin-top: 5vw;
  }
  .back-box-nav{
    position: relative;
    width: 100%;
    margin-top: 7vh;
  }
  .back-nav{
    position: relative;
    width: 51.2vw;
    margin: 0 auto;
  }
  .back-nav>p{
    position: relative;
    width: 100%;
    font-family: PingFangSC-Regular;
    font-size: 4.266vw;
    color: #02C2A2;
    letter-spacing: 0;
    line-height: 12vw;
    border: 1px solid #15D49F;
    text-align: center;
  }

</style>
