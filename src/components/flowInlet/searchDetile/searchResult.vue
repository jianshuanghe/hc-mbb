<template>
  <div class="searchResult-content">
    <div class="findBusiness-box"  v-if="FLOWINLET.search.searchData.length > 0">
      <!--总条数-->
      <div class="searchItemsNum">
        <p class="">已为您搜索到{{FLOWINLET.search.searchItemsNum}}条商机</p>
      </div>
      <!--动态渲染随机-->
      <div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
        <v-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
          <ul class="list" v-for="(items, index) in FLOWINLET.search.searchData" :key="index">
            <li>
              <div class="findBusiness-random">
                <banner v-if="items.type === '1' && items.num === '1'" :msgData="items"></banner>
                <goodsOne v-if="items.type === '1' && items.num === '2'" :msgData="items"></goodsOne>
                <goodsTwo v-if="items.type === '1' && items.num === '3'" :msgData="items"></goodsTwo>
                <goodsThree v-if="items.type === '1' && items.num === '4'" :msgData="items"></goodsThree>
                <contactBusiness v-if="items.type === '1' && items.num === '5'" :msgData="items"></contactBusiness>
                <goodsFour v-if="items.type === '2' && items.num === '6'" :msgData="items"></goodsFour>
              </div>
            </li>
          </ul>
        </v-loadmore>
      </div>
    </div>
    <empty v-if="FLOWINLET.search.searchData.length === 0">没有找到您想要的数据！</empty>
  </div>
</template>

<script>
    import empty from './../../common/empty';
    import banner from './../banner';
    import goodsOne from './../goodsOne';
    import goodsTwo from './../goodsTwo';
    import goodsThree from './../goodsThree';
    import contactBusiness from './../contactBusiness';
    import goodsFour from './../goodsFour';
    import { Toast, Loadmore } from 'mint-ui';
    import axios from 'axios';
    import { mapMutations, mapGetters } from 'vuex';
    export default {
        name: 'searchResult',
        components: {
          'v-loadmore': Loadmore, // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
          empty,
          banner,
          goodsOne,
          goodsTwo,
          goodsThree,
          contactBusiness,
          goodsFour
        },
        data () {
          return {
            loadingShow: false, // loading
            searchHistoryData: [], // 搜索历史数据
            businessData: [], // vuex中后台返回的数据
            searchCondition: {  // 分页属性
              sessionId: '',
              page: '1',
              name: ''
            },
            searchItemsNum: 0, // 搜索到数据的条数
            pageNum: 0, // 数据总页数
            pageList: [], // 后台返回数据
            allLoaded: false,  // 是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
            scrollMode: 'auto'  // 移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
          };
        },
        computed: {
        ...mapGetters(['FLOWINLET'])
        },
        watch: {
          FLOWINLET: {
            handler (a, b) {
              this.searchCondition = a.search.searchCondition; // 侦听searchCondition
              this.pageNum = a.search.pageNum; // pageNum
              this.pageList = a.search.searchData; // 侦听searchData
              this.searchItemsNum = a.search.searchItemsNum; // 搜索到的总条数
            },
            deep: true
          }
        },
        created () {
          if (this.EVN === 'production') {
            axios.defaults.baseURL = this.apiProd2;
          }
          this.searchCondition.sessionId = localStorage.getItem('sessionId');
        },
        mounted () {
        },
        methods: {
          ...mapMutations({
            setFlowInletSearchCondition: 'setFlowInletSearchCondition',
            setFlowInletSearchData: 'setFlowInletSearchData',
            setFlowInletSearchHistoryData: 'setFlowInletSearchHistoryData',
            setLoadingShow: 'setLoadingShow',
            setLoadingText: 'setLoadingText'
          }),
          // loadTop () {  // 组件提供的下拉触发方法
          //   // 下拉加载
          //   this.loadPageList();
          //   this.$refs.loadmore.onTopLoaded(); // 固定方法，查询完要调用一次，用于重新定位
          // },
          loadBottom () { // 上拉加载
            this.more(); // 上拉触发的分页查询
            this.$refs.loadmore.onBottomLoaded(); // 固定方法，查询完要调用一次，用于重新定位
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
            axios.post(this.api2 + '/rest-rp/adve/adveListByName', this.searchCondition).then(data => {
              this.pageList = this.pageList.concat(data.data.content.list);
              this.$store.commit('setFlowInletSearchCondition', this.searchCondition); // 更新vuex 参数
              this.$store.commit('setFlowInletSearchData', this.pageList);
              this.$store.commit('setLoadingShow', false); // 更新vuex loading
              console.log(this.businessData, 'vuex-----FlowInlet数据2');
            });
          }
        }
      };
</script>

<style scoped>
  .findBusiness-box{
    padding-top: 0vw;
    position: fixed;
    height: 91vh;
    overflow: scroll;
    padding-bottom: 15vw;
    touch-action: default;
  }
  .searchItemsNum{
    position: relative;
    width: 100%;
  }
  .searchItemsNum>p{
    font-family: PingFang-SC-Medium;
    font-size: 3.5vw;
    color: #02C2A2;
    line-height: 8.5vw;
    text-align: center;
    background: #CBF3EC;
  }
</style>
