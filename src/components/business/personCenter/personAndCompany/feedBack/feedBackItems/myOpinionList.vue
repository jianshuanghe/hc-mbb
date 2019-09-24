<template>
  <div class="">
    <div class="opinion-content"  v-if="!isFindAll">
      <div class="opinion-cont">
        <div class="myOp-box">
          <div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
            <v-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
              <ul class="list" v-for="(items, index) in pageList" :key="index">
                <li>
                  <div class="my-op-items">
                    <div class="pingJia">
                      <div class="PJ-left left">
                        <rater class="pingfen" v-model="items.feedbackNum" :min="1" :max="5" :disabled="true" active-color="#02C2A2"></rater>
                      </div>
                      <div class="PJ-right left">
                        <p class="">{{items.createTime}}</p>
                      </div>
                    </div>
                    <div class="YDWT">
                      <p class="">{{items.backTypes}}</p>
                    </div>
                    <div class="textArea">
                      <p class="">{{items.context | substrText}}</p>
                      <div class="findAll" @click="clickFindAll(index)">
                        <p class="left">查看全文</p>
                        <img :src="downArrow" alt="" class="left">
                        <div class="clear"></div>
                      </div>
                    </div>
                    <div class="line"></div>
                  </div>
                </li>
              </ul>
            </v-loadmore>
          </div>
          <empty v-if="pageList.length === 0">当前没有数据！</empty>
        </div>
        <div class="LJ-buy-btn1">
          <div class="LJ-cont" @click="clickContinueTuCao">
            <p class="">继续去吐槽</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import empty from './../../../../../common/empty';
  import { Rater } from 'vux';
  import downArrow from '@/assets/images/business/home/personCenter/downArrow.png';
  import { Toast, Loadmore } from 'mint-ui';
  import axios from 'axios';
  import { mapMutations, mapGetters } from 'vuex';
  export default {
    name: 'myOpinionList',
    components: {
      'v-loadmore': Loadmore, // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
      Rater,
      empty
    },
    data () {
      return {
        downArrow: downArrow,
        isFindAll: false, // 查看全部，默认false
        params: {
          feedbackNum: 4
        },
        loadingShow: false, // loading
        businessData: [], // vuex中后台返回的数据
        searchCondition: {  // 分页属性
          page: '1',
          userId: ''
        },
        pageNum: 0, // 数据总页数
        pageList: [], // 后台返回数据
        allLoaded: false,  // 是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
        scrollMode: 'auto'  // 移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
      };
    },
    computed: {
      ...mapGetters(['FEEDBACK'])
    },
    filters: {
      /* 格式化时间戳 */
      formatDate (val) {
        const date = new Date(val);
        const year = date.getFullYear();
        const month = date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
        const day = date.getDate() > 9 ? date.getDate() + 1 : `0${date.getDate() + 1}`;
        return `${year}-${month}-${day}`;
      },
      substrText (val) {
        if (val === '') {
          return '没有填写';
        };
        if (val.length > 46) {
          return val.substring(0, 46) + '...';
        } else {
          return val;
        }
      }
    },
    created () {
      if (this.EVN === 'production') {
        axios.defaults.baseURL = this.apiProd2;
      }
      let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
      console.log(landRegistLG.user.id);
      this.searchCondition.userId = landRegistLG.user.id; // 用户id
      this.businessData = this.FEEDBACK;
      this.loadPageList(); // 初次访问查询列表
    },
    watch: {
      FEEDBACK: {
        handler (a, b) {
          this.businessData = a.myOpinion.myOpinionData; // 更新的数据
          this.pageNum = a.myOpinion.pageNum; // 总页数
          this.isFindAll = a.isFindAll; // 查看全部
          if (b.setIsDelete === true) {
            this.loadPageList();
          };
        },
        deep: true
      }
    },
    mounted () {},
    methods: {
    ...mapMutations({
        setFeedBackSearch: 'setFeedBackSearch',
        setFeedBackPageNum: 'setFeedBackPageNum',
        setFeedBackItemsData: 'setFeedBackItemsData',
        setFeedBackTitle: 'setFeedBackTitle',
        setFindIndex: 'setFindIndex',
        setIsFindAll: 'setIsFindAll',
        setLoadingShow: 'setLoadingShow',
        setLoadingText: 'setLoadingText'
      }),
      clickFindAll (e) {
        console.log('触发查看全部');
        this.isFindAll = !this.isFindAll;
        this.$store.commit('setFindIndex', e); // 更新vuex setFindId
        this.$store.commit('setIsFindAll', this.isFindAll); // 更新vuex setIsFindAll
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
        axios.get(this.api2 + '/rest-rp/userFeedBack?page=' + this.searchCondition.page + '&&userId=' + this.searchCondition.userId).then((response) => { // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
          if (response.data.ret === '200') {
            console.log(response.data);
            this.$store.commit('setLoadingShow', false); // 更新vuex loading
            this.pageList = response.data.content.list;
            this.$store.commit('setFeedBackItemsData', this.pageList);
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
        this.$store.commit('setFeedBackPageNum', this.pageNum);
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
        axios.get(this.api2 + '/rest-rp/userFeedBack?page=' + this.searchCondition.page + '&&userId=' + this.searchCondition.userId).then(data => {
          this.pageList = this.pageList.concat(data.data.content.list);
          this.$store.commit('setFeedBackItemsData', this.pageList);
          this.$store.commit('setLoadingShow', false); // 更新vuex loading
          console.log(this.businessData, 'vuex-----FINDBUSINESS数据2');
        });
      },
      clickContinueTuCao () {
        console.log('触发继续吐槽');
        this.$store.commit('setFeedBackTitle', 1);
      }
    }
  };
</script>

<style scoped>
  .opinion-content{
    position: fixed;
    width: 100%;
    padding: 4vw 4vw 5vh 4vw;
    height: 91vh;
    overflow: scroll;
    -webkit-overflow-scrolling:touch;
    background: #fff;
  }
  .opinion-cont{
    position: relative;
    width: 100%;
    padding-bottom: 12vw;
  }
  .myOp-box{
    position: relative;
    width: 100%;
  }
  .my-op-items{
    position: relative;
    width: 100%;
    margin-top: 6vw;
  }
  .pingJia{
    position: relative;
    width: 100%;
    height: 8vw;
  }
  .PJ-left{
    position: relative;
    width: 50%;
  }
  .PJ-right{
    position: relative;
    width: 50%;
  }
  .PJ-right>p{
    font-family: PingFangSC-Regular;
    font-size: 3.2vw;
    color: #9B9B9B;
    line-height: 8vw;
    text-align: right;
  }
  .YDWT{
    position: relative;
    width: 100%;
  }
  .YDWT>p{
    font-family: PingFangSC-Regular;
    font-size: 3.2vw;
    color: #9B9B9B;
    line-height: 10vw;
  }
  .textArea{
    position: relative;
    width: 100%;
    margin-bottom: 4vw;
    height: 13vw;
    overflow: hidden;
  }
  .textArea>p{
    position: relative;
    width: 100%;
    font-family: PingFangSC-Regular;
    font-size: 3.5vw;
    color: #2E2E30;
    text-align: justify;
    line-height: 7vw;
  }
  .findAll{
    position: absolute;
    right: 0;
    top: 8.5vw;
  }
  .findAll>p{
    font-family: PingFangSC-Regular;
    font-size: 3.5vw;
    color: #02C2A2;
  }
  .findAll>img{
    position: relative;
    width: 3.5vw;
    margin-left: 1vw;
    margin-top: 0.5vw;
  }



  .LJ-buy-btn1{
    position: fixed;
    /* width: 100%; */
    width: 92vw;
    padding: 0vw;
    height: 12vw;
    bottom: 0;
    margin-bottom: 1vw;
    z-index: 109;
  }
  .LJ-cont{
    position: relative;
    width: 100%;
  }
  .LJ-cont>p{
    font-family: PingFangSC-Regular;
    font-size: 3.5vw;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 12vw;
    background: #02C2A2;
    border-radius: 2px;
    text-align: center;
  }
</style>
