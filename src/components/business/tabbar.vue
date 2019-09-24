<template>
    <div class="content cc-btn">
      <div class="tabbar-box">
        <div class="tabbar-cont">
          <div class="tabbar-item left" @click="tabbarClick(1)">
            <div class="item-img">
              <img :src="find" alt="" class="">
            </div>
            <div class="item-text">
              <p  >发现商机</p>
            </div>
          </div>
          <div class="tabbar-item left" @click="tabbarClick(2)">
            <div class="item-img">
              <img :src="putIn" alt="" class="">
            </div>
            <div class="item-text">
              <p  :class="clickItems === 2 ? 'class-a' : ''">推广管理</p>
            </div>
          </div>
          <div class="tabbar-item left" @click="tabbarClick(3)">
            <div class="item-img">
              <img :src="news" alt="" class="">
            </div>
            <div class="item-text">
              <p  :class="clickItems === 3 ? 'class-a' : ''">消息</p>
            </div>
          </div>
          <div class="tabbar-item left" @click="tabbarClick(4)">
            <div class="item-img">
              <img :src="my" alt="" class="">
            </div>
            <div class="item-text">
              <p  :class="clickItems === 4 ? 'class-a' : ''">我的</p>
            </div>
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
</template>

<script>
  import find1 from '@/assets/images/business/home/find1.png';
  import find2 from '@/assets/images/business/home/find2.png';
  import putIn1 from '@/assets/images/business/home/putIn1.png';
  import putIn2 from '@/assets/images/business/home/putIn2.png';
  import news1 from '@/assets/images/business/home/news1.png';
  import news2 from '@/assets/images/business/home/news2.png';
  import my1 from '@/assets/images/business/home/my1.png';
  import my2 from '@/assets/images/business/home/my2.png';
  import $ from 'jquery';
  import { mapMutations, mapGetters } from 'vuex';
    export default {
        name: 'tabbar',
        data () {
          return {
            clickItems: 1,
            tabbarItems: 1, // 记录用户切换的按钮
            find: find2, // 发现商机图片
            putIn: putIn1, // 推广管理
            news: news1, // 消息
            my: my1 // 个人中心
          };
        },
        computed: {
          ...mapGetters(['GET_HOME', 'TABCLICKITEMS'])
        },
        watch: {
          TABCLICKITEMS: {
            handler (a, b) {
              this.clickItems = a.clickItems; // 侦听切换类型消息
              console.log(a.clickItems, '用户切换');
              this.tabbarShow(this.clickItems);
              this.tabbarClick(this.clickItems);
            },
            deep: true
          }
        },
        created () {
          if (localStorage.getItem('tabItems')) { // 防止用户在home页刷新，记录下用户在那个模块
            this.clickItems = Number(localStorage.getItem('tabItems'));
            this.tabbarShow(this.clickItems);
            this.tabbarClick(this.clickItems);
          };
        },
        mounted () {
          var h = $(window).height();
          $(window).resize(function () {
            if ($(window).height() < h) {
              $('.cc-btn').hide();
            };
            if ($(window).height() >= h) {
              $('.cc-btn').show();
            };
          });
        },
        methods: {
          ...mapMutations({
            setHome: 'setHome',
            setClickItems: 'setClickItems'
          }),
          tabbarShow (e) {
            console.log(e, '刷新记录状态');
            if (e === 1) {
              this.find = find2;
              this.putIn = putIn1;
              this.news = news1;
              this.my = my1;
            } else if (e === 2) {
              this.find = find1;
              this.putIn = putIn2;
              this.news = news1;
              this.my = my1;
            } else if (e === 3) {
              this.find = find1;
              this.putIn = putIn1;
              this.news = news2;
              this.my = my1;
            } else if (e === 4) {
              this.find = find1;
              this.putIn = putIn1;
              this.news = news1;
              this.my = my2;
            };
          },
          tabbarClick (e) {
            console.log(e);
            this.clickItems = e;
            this.$store.commit('setHome', this.clickItems);
            this.$store.commit('setClickItems', this.clickItems); // 更新vuex setClickItems
            if (e !== 1) { // 点击的不是上级页面，需要判断用户是否登陆
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
              } else {
                localStorage.setItem('tabItems', this.clickItems); // 缓存用户点击的按钮
              }
            };
            localStorage.setItem('tabItems', this.clickItems); // 缓存用户点击的按钮
            if (e === 1) {
              this.find = find2;
              this.putIn = putIn1;
              this.news = news1;
              this.my = my1;
            } else if (e === 2) {
              this.find = find1;
              this.putIn = putIn2;
              this.news = news1;
              this.my = my1;
            } else if (e === 3) {
              this.find = find1;
              this.putIn = putIn1;
              this.news = news2;
              this.my = my1;
            } else if (e === 4) {
              this.find = find1;
              this.putIn = putIn1;
              this.news = news1;
              this.my = my2;
            };
          }
        }
    };
</script>

<style scoped>
  .content{
    position: fixed;
    width: 100vw;
    padding: 2vw 4vw;
    background: #fff;
    bottom: 0;
    z-index: 100;
    background: #FFFFFF;
    box-shadow: 0 -1px 0 0 #F5F5F5;
  }
  .tabbar-box{
    position: relative;
    width: 100%;
  }
  .tabbar-cont{
    position: relative;
    width: 100%;
  }
  .tabbar-item{
    position: relative;
    width: 25%;
  }
  .item-img{
    position: relative;
    width: 5vw;
    margin: 0 auto;
  }
  .item-img>img{
    position: relative;
    width: 6vw;
    height: 6vw;
  }
  .item-text{
    position: relative;
    width: 100%;
  }
  .item-text>p{
    position: relative;
    width: 100%;
    text-align: center;
    font-size: 3.2vw;
    line-height: 5vw;
    color: #000;
  }
  .class-a{
    color: #02C2A2 !important;
  }
</style>
