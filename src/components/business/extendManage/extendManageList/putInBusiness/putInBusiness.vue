<template>
  <div class="putInBus-content">
    <topBox>
      <p class="title-putIn">投放商机</p>
    </topBox>
    <!--帅选模块-->
    <screenPutInBusiness></screenPutInBusiness>
    <!--说明书列表子项-->
    <div class="putBusinessItems-Box-cont">
      <div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
        <v-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
          <ul class="list" v-for="(items, index) in putInBusinessData" :key="index">
            <li>
              <div class="findBusiness-random" >
                <putBusinessItems :msgData="items"></putBusinessItems>
              </div>
            </li>
          </ul>
        </v-loadmore>
      </div>
    </div>
    <empty v-if="putInBusinessData.length === 0">当前没有数据！</empty>
  </div>
</template>

<script>
    import empty from './../../../../common/empty';
    import topBox from './../../../../common/topBox';
    import putBusinessItems from './putInBusinessList/putBusinessItems';
    import screenPutInBusiness from './putInBusinessList/screenPutInBusiness';
    import { mapMutations, mapGetters } from 'vuex';
    import { Loading } from 'vux';
    import { Toast, Loadmore } from 'mint-ui';
    import axios from 'axios';
    export default {
        name: 'putInBusiness',
        components: {
          'v-loadmore': Loadmore, // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
          Loading,
          empty,
          topBox,
          putBusinessItems,
          screenPutInBusiness
        },
        data () {
          return {
            loadingShow: false, // loading
            putInBusinessData: [], // vuex中后台返回的数据
            pageList: [], // 后台返回数据
            searchCondition: {  // 分页属性
              page: '1',
              userId: '',
              authState: '',
              isBanner: '',
              order: ''
            },
            pageNum: 0, // 数据总页数
            allLoaded: false,  // 是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
            scrollMode: 'auto'  // 移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
          };
        },
        computed: {
          ...mapGetters(['PUTINBUSINESS'])
        },
        created () {
          if (this.EVN === 'production') {
            axios.defaults.baseURL = this.apiProd2;
          }
          if (!this.$route.query.index) { // 连接上的参数代表从推广管理过来
            this.loadPageList(); // 初次访问查询列表
          }
          this.putInBusinessData = this.PUTINBUSINESS;
          this.pageNum = this.PUTINBUSINESS.pageNum; // 总页数
          console.log(this.putInBusinessData, 'vuex-----FINDBUSINESS数据');
          this.getUserId();
          let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
          console.log(landRegistLG.user.id);
          this.searchCondition.userId = landRegistLG.user.id;
        },
        watch: {
          PUTINBUSINESS: {
            handler (a, b) {
              this.putInBusinessData = a.putInBusinessData; // 接口返回数据
              this.searchCondition = a.searchCondition; // 获取列表的参数
              this.pageNum = a.pageNum; // 总页数
              console.log(this.putInBusinessData, '返回数据');
            },
            deep: true
          }
        },
        mounted () {
        },
        methods: {
          ...mapMutations({
            setPutBusinessPageNum: 'setPutBusinessPageNum',
            setPutInBusinesSsearch: 'setPutInBusinesSsearch',
            setPutInBusiness: 'setPutInBusiness',
            setLoadingShow: 'setLoadingShow',
            setLoadingText: 'setLoadingText'
          }),
          termDataCheck2 (e) { // 筛选条件的具体内容
            console.log(e, '筛选的index query');
            this.searchCondition.authState = e;
            this.searchCondition.page = '1'; // 筛选时页数都是1
            this.$store.commit('setPutInBusinesSsearch', this.searchCondition);
            console.log(this.searchCondition, '用户过滤的条件query');
          },
          getUserId () { // 修改vuex userId
            let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
            console.log(landRegistLG.user.id);
            this.searchCondition.userId = landRegistLG.user.id;
            this.$store.commit('setPutInBusinesSsearch', this.searchCondition);
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
            axios.post(this.api2 + '/rest-rp/putIn/selectInstList', this.searchCondition).then((response) => { // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
              if (response.data.ret === '200') {
                console.log(response.data);
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
                this.pageList = response.data.content.list;
                this.$store.commit('setPutInBusiness', this.pageList);
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
            let pageNum = Math.ceil(cont / 8);
            this.$store.commit('setPutBusinessPageNum', pageNum);
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
            axios.post(this.api2 + '/rest-rp/putIn/selectInstList', this.searchCondition).then(data => {
              this.pageList = this.pageList.concat(data.data.content.list);
              this.$store.commit('setPutInBusiness', this.pageList);
              this.$store.commit('setLoadingShow', false); // 更新vuex loading
              console.log(this.businessData, 'vuex-----FINDBUSINESS数据2');
            });
          }
        }
      };
</script>

<style scoped>
.putInBus-content{
  position: fixed;
  width: 100%;
  height: 100vh;
  background: #F6F6F6;
  overflow: scroll;
  -webkit-overflow-scrolling:touch;
}
  .putBusinessItems-Box-cont{
    padding-top: 1.5vw;
    position: fixed;
    height: 95vh;
    overflow: scroll;
    padding-bottom: 15vw;
    -webkit-overflow-scrolling:touch;
  }
</style>
