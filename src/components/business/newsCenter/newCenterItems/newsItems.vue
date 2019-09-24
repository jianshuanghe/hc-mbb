<template>
  <div class="newSitemsList">
    <!--动态渲染随机-->
    <div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
      <v-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <ul class="list" v-for="(items, index) in NEWSCEBNTER.system.newsItemsData" :key="index">
          <li>
            <div class="newsItems-box" @click="goToNewsItemsDetail(items.id)">
              <div class="time-NT">
                <p class="left"> {{items.createTimeStr}}</p>
                <div class="clear"></div>
              </div>
              <div class="NT-content">
                <div :class="items.isRead === '0' ? 'isReadNews' : 'noReadNews'"></div>
                <div class="title-NT">
                  <p class="">{{items.title}}</p>
                </div>
                <!--<div class="img-NT">-->
                  <!--<img :src="newsImg" alt="" class="img">-->
                <!--</div>-->
                <div class="introduce-NT">
                  <p class="">{{items.content}}</p>
                </div>
                <div class="line"></div>
                <div class="lock-introduce">
                  <div class="lock-box">
                    <p class="">查看详情</p>
                    <img :src="rightArrow" alt="" class="">
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </v-loadmore>
    </div>
    <empty v-if="pageList.length === 0">当前没有数据！</empty>
  </div>
</template>

<script>
    import empty from './../../../common/empty';
    import rightArrow from '@/assets/images/business/home/newsCenter/rightArrow.png';
    import newsImg from '@/assets/images/business/home/newsCenter/newsImg.jpg';
    import { Loading } from 'vux';
    import { Toast, Loadmore } from 'mint-ui';
    import axios from 'axios';
    import { mapMutations, mapGetters } from 'vuex';
    export default {
        name: 'newsItems',
        components: {
          'v-loadmore': Loadmore, // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
          Loading,
          empty
        },
        computed: {
          ...mapGetters(['NEWSCEBNTER'])
        },
        data () {
          return {
            newsImg: newsImg,
            rightArrow: rightArrow,
            loadingShow: false, // loading
            businessData: [], // vuex中后台返回的数据
            searchCondition: {  // 分页属性
              page: '1',
              userId: 56
            },
            pageNum: 0, // 数据总页数
            pageList: [], // 后台返回数据
            allLoaded: false,  // 是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
            scrollMode: 'auto'  // 移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
          };
        },
        created () {
          if (this.EVN === 'production') {
            axios.defaults.baseURL = this.apiProd2;
          }
          let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
          console.log(landRegistLG.user.id);
          this.searchCondition.userId = landRegistLG.user.id; // 用户id
          this.loadPageList(); // 初次访问查询列表
          this.businessData = this.NEWSCEBNTER;
        },
        watch: {
          NEWSCEBNTER: {
            handler (a, b) {
              this.businessData = a.system.newsItemsData; // 更新的数据
              this.pageNum = a.system.pageNum; // 总页数
            },
            deep: true
          }
        },
        mounted () {},
        methods: {
          ...mapMutations({
            setNewsCenterSearch: 'setNewsCenterSearch',
            setNewsCenterPageNum: 'setNewsCenterPageNum',
            setNewsCenterNewsItemsData: 'setNewsCenterNewsItemsData',
            setLoadingShow: 'setLoadingShow',
            setLoadingText: 'setLoadingText'
          }),
          goToNewsItemsDetail (e) {
            console.log('to消息详情');
            this.$router.push({
              path: '/newsItemsList',
              query: {id: e}
            });
          },
          // loadTop () {  // 组件提供的下拉触发方法
          //   // 下拉加载
          //   this.loadPageList();
          //   this.$refs.loadmore.onTopLoaded(); // 固定方法，查询完要调用一次，用于重新定位
          // },
          loadBottom () { // 上拉加载
            this.more(); // 上拉触发的分页查询
            this.$refs.loadmore.onBottomLoaded(); // 固定方法，查询完要调用一次，用于重新定位
          },
          loadPageList () {  // 查询数据
            this.$store.commit('setLoadingShow', true); // 更新vuex loading
            axios.post(this.api2 + '/rest-rp/notice', this.searchCondition).then((response) => { // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
              if (response.data.ret === '200') {
                console.log(response.data);
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
                this.pageList = response.data.content.list;
                this.$store.commit('setNewsCenterNewsItemsData', this.pageList);
                this.pageNums(response.data.content.count);
                this.$nextTick(function () {
                  // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，
                  // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，
                  // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好
                  this.scrollMode = 'touch';
                });
              } else {
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
                Toast(response.data.msg);
              }
            });
          },
          pageNums (cont) {
            this.pageNum = Math.ceil(cont / 10);
            this.$store.commit('setNewsCenterPageNum', this.pageNum);
          },
          more () {
            // 分页查询
            this.searchCondition.page = String(parseInt(this.searchCondition.page) + 1);
            console.log(this.pageNum, '总页数');
            if (Number(this.searchCondition.page) > this.pageNum) {
              Toast('已经没有数据了');
              return;
            };
            this.$store.commit('setLoadingShow', true); // 更新vuex loading
            axios.post(this.api2 + '/rest-rp/notice', this.searchCondition).then(data => {
              this.pageList = this.pageList.concat(data.data.content.list);
              this.$store.commit('setNewsCenterNewsItemsData', this.pageList);
              this.$store.commit('setLoadingShow', false); // 更新vuex loading
              console.log(this.businessData, 'vuex-----FINDBUSINESS数据2');
            });
          }
        }
      };
</script>

<style scoped>
  .newSitemsList{
    position: fixed;
    padding-bottom: 10vh;
    height: 91vh;
    overflow: scroll;
    width: 100%;
    -webkit-overflow-scrolling:touch;
  }
.newsItems-box{
  position: relative;
  width: 100%;
}
  .time-NT{
    position: relative;
    width: 100%;
    height: 12.8vw;
  }
  .time-NT>p{
    position: relative;
    width: 100%;
    font-family: PingFangSC-Regular;
    font-size: 3.2vw;
    color: #9B9B9B;
    text-align: center;
    line-height: 12.8vw;
  }
  .isReadNews{
    float: left;
    position: relative;
    display: block;
    width: 2.7vw;
    height: 2.7vw;
    margin-top: 3.5vw;
    border-radius: 50%;
    background: #FFFFFF;
    border: 2px solid #FF4D6A;
    -webkit-box-shadow: 0 1px 3px 0 rgba(255,77,106,0.30);
    box-shadow: 0 1px 3px 0 rgba(255,77,106,0.30);
  }
  .noReadNews{
    float: left;
    position: relative;
    display: block;
    width: 2.7vw;
    height: 2.7vw;
    margin-top: 3.5vw;
    border-radius: 50%;
    background: #FFFFFF;
    border: 2px solid #02C2A2;
    box-shadow: 0 1px 3px 0 rgba(2,194,162,0.30);
  }
  .NT-content{
    position: relative;
    width: 100%;
    padding: 0 4vw 0 4vw;
    background: #fff;
  }
  .title-NT{
    position: relative;
    width: 100%;
  }
  .title-NT>p{
    font-family: PingFang-SC-Bold;
    font-size: 4vw;
    color: #2E2E30;
    letter-spacing: 0;
    line-height: 10vw;
    width: 94%;
    margin-left: 1%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .img-NT{
    position: relative;
    width: 100%;
  }
  .img-NT>img{
    position: relative;
    width: 100%;
  }
  .introduce-NT{
    position: relative;
    width: 100%;
    padding: 2vw 0 2vw 0;
  }
 .introduce-NT>p{
  font-family: PingFangSC-Regular;
  font-size: 3.5vw;
  color: #9B9B9B;
  letter-spacing: 0;
  line-height: 5vw;
}
  .lock-introduce{
    position: relative;
    width: 100%;
  }
  .lock-box{
    position: relative;
    width: 100%;
  }
  .lock-box>p{
    position: relative;
    width: 100%;
    font-family: PingFangSC-Regular;
    font-size: 3.5vw;
    color: #9B9B9B;
    letter-spacing: 0;
    line-height: 10vw;
  }
  .lock-box>img{
    position: absolute;
    right: 0;
    top: 3.5vw;
    width: 3vw;
    height: 3vw;
  }
</style>
