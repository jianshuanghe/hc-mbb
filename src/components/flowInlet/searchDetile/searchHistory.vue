<template>
    <div class="searchHistory-content">
      <div class="searchHistory">
        <div class="SH-cont">
          <div class="top-SH">
            <p class="">搜索历史</p>
          </div>
          <div class="cont-SH">
            <div class="search-Box-Sh">
              <div class="search-Items left"  v-for="(items, index) in FLOWINLET.search.searchHistoryData" :key="index">
                <p class="" @click="clickHistoryList(items)">{{items}}</p>
              </div>
              <div class="clear"></div>
            </div>
          </div>
        </div>
        <div class="SH-clear" @click="clickRemoveHistory">
          <p class="">清除历史记录 </p>
        </div>
      </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { Toast } from 'mint-ui';
    import { mapMutations, mapGetters } from 'vuex';
    export default {
        name: 'searchHistory',
        data () {
          return {
            businessData: [], // vuex中后台返回的数据
            searchCondition: {  // 分页属性
              sessionId: '',
              page: '1',
              name: ''
            },
            pageNum: 0, // 数据总页数
            pageList: [], // 后台返回数据
            historyList: [] // 历史数据
          };
        },
        created () {
          if (this.EVN === 'production') {
            axios.defaults.baseURL = this.apiProd2;
          }
          this.searchCondition.sessionId = localStorage.getItem('sessionId');
        },
        computed: {
          ...mapGetters(['FLOWINLET'])
        },
        watch: {
          FLOWINLET: {
            handler (a, b) {
              this.historyList = a.search.searchHistoryData; // 侦听searchHistoryData
            },
            deep: true
          }
        },
        methods: {
          ...mapMutations({
            setFlowInletSearchText: 'setFlowInletSearchText',
            setFlowInletIsSearch: 'setFlowInletIsSearch',
            setFlowInletSearchItemsNum: 'setFlowInletSearchItemsNum',
            setFlowInletPageNum: 'setFlowInletPageNum',
            setFlowInletSearchCondition: 'setFlowInletSearchCondition',
            setFlowInletSearchData: 'setFlowInletSearchData',
            setFlowInletSearchHistoryData: 'setFlowInletSearchHistoryData',
            setLoadingShow: 'setLoadingShow',
            setLoadingText: 'setLoadingText'
          }),
          clickRemoveHistory () {
            console.log('触发清除搜索历史');
            localStorage.removeItem('searchHistoryData');
            let searchHistoryData = []; // 设置搜索历史
            localStorage.setItem('searchHistoryData', JSON.stringify(searchHistoryData)); // 搜索历史数据
            this.$store.commit('setFlowInletSearchHistoryData', searchHistoryData); // 更新vuex setFlowInletSearchHistoryData
          },
          clickHistoryList (evn) {
            console.log(evn, '从历史记录点击');
            this.$store.commit('setFlowInletSearchText', evn); // 更新vuex setFlowInletSearchText
            this.searchCondition.name = evn;
            console.log(this.searchCondition, '参数');
            this.loadPageList(this.searchCondition);
          },
          loadPageList (params) {  // 查询数据
            this.$store.commit('setLoadingShow', true); // 更新vuex loading
            axios.post(this.api2 + '/rest-rp/adve/adveListByName', params).then((response) => { // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
              if (response.data.ret === '200') {
                console.log(response.data);
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
                this.$store.commit('setFlowInletSearchCondition', params); // 更新vuex 参数
                this.pageList = response.data.content.list;
                this.$store.commit('setFlowInletSearchData', this.pageList); // 更新vuex search 数据
                this.$store.commit('setFlowInletIsSearch', true); // 判断用户时候处于搜索状态
                this.pageNums(response.data.content.count);
              } else {
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
                Toast(response.data.msg);
              }
            });
          },
          pageNums (cont) {
            this.pageNum = Math.ceil(cont / 8);
            this.$store.commit('setFlowInletSearchItemsNum', cont); // gengxin vuex 总条数
            this.$store.commit('setFlowInletPageNum', this.pageNum); // gengxin vuex 总页数
          }
        }
      };
</script>

<style scoped>
.searchHistory-content{
  position: fixed;
  width: 100%;
  height: 94vh;
  padding-bottom: 5vh;
  overflow: scroll;
  -webkit-overflow-scrolling:touch;
  background: #fff;
}
  .searchHistory{
    position: relative;
    width: 100%;
  }
  .SH-cont{
    position: relative;
    width: 100%;
  }
  .top-SH{
    position: relative;
    width: 100%;
    padding: 4vw;
  }
  .top-SH>p{
    font-family: PingFang-SC-Medium;
    font-size: 4vw;
    color: #2E2E30;
    letter-spacing: 0;
    line-height: 4.5vw;
  }
  .cont-SH{
    position: relative;
    width: 100%;
    padding: 0vw 0 4vw 4vw;
  }
  .search-Box-Sh{
    position: relative;
    width: 100%;
  }
  .search-Items{
    position: relative;
    max-width: 96%;
    min-width: 15.8%;
    margin-right: 4vw;
    margin-bottom: 2vw;
    padding: 0 2vw;
    background: #F5F5F5;
  }
  .search-Items>p{
    background: #F5F5F5;
    font-family: PingFangSC-Regular;
    font-size: 3.2vw;
    color: #5D5D5D;
    letter-spacing: 0;
    text-align: center;
    line-height: 9vw;
    width: 100%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .SH-clear{
    position: relative;
    width: 100%;
  }
  .SH-clear>p{
    font-family: PingFangSC-Regular;
    font-size: 3vw;
    color: #5D5D5D;
    letter-spacing: 0;
    text-align: center;
    line-height: 5vw;
  }
</style>
