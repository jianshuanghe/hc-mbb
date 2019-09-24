<template>
    <div class="searchBox-Sh">
      <div class="quickBtn-search">
        <div class="quickBtn-Fd left">
          <quickBtn></quickBtn>
        </div>
        <div class="search-Fd left">
          <search
            @result-click="resultClick"
            @on-change="getResult"
            @on-clear="clickClear"
            v-model="value"
            position="absolute"
            auto-scroll-to-top
            top="0"
            @on-focus="onFocus"
            @on-cancel="onCancel"
            @on-submit="onSubmit"
            ref="search"
            v-focus></search>
        </div>
        <div class="clear"></div>
      </div>
    </div>
</template>

<script>
  import quickBtn from './../../../../common/quickBtn';
  import { Search } from 'vux';
  import axios from 'axios';
  import { Toast } from 'mint-ui';
  import { mapMutations, mapGetters } from 'vuex';
    export default {
        name: 'searchBox',
        components: {
          Search,
          quickBtn
        },
        data () {
          return {
            results: '',
            value: '',
            searchText: '',
            loadingShow: false, // loading
            businessData: [], // vuex中后台返回的数据
            searchCondition: {  // 分页属性
              page: '1',
              name: ''
            },
            pageNum: 0, // 数据总页数
            pageList: [], // 后台返回数据
            allLoaded: false,  // 是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
            scrollMode: 'auto'  // 移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
          };
        },
        directives: {
          focus (el) {
            console.log(el, '获取input焦点');
          }
        },
        created () {
          if (this.EVN === 'production') {
            axios.defaults.baseURL = this.apiProd2;
          }
        },
        mounted () {
          this.setFocus();
        },
        computed: {
          ...mapGetters(['FINDBUSINESS'])
        },
        watch: {
          FINDBUSINESS: {
            handler (a, b) {
              this.value = a.search.searchText;
              this.searchText = this.value;
            },
            deep: true
          }
        },
        methods: {
          ...mapMutations({
            setFindBusinessSearchText: 'setFindBusinessSearchText',
            setFindBusinessIsSearch: 'setFindBusinessIsSearch',
            setFindBusinessSearchItemsNum: 'setFindBusinessSearchItemsNum',
            setFindBusinessPageNum: 'setFindBusinessPageNum',
            setFindBusinessSearchCondition: 'setFindBusinessSearchCondition',
            setFindBusinessSearchHistoryData: 'setFindBusinessSearchHistoryData',
            setFindBusinessSearchData: 'setFindBusinessSearchData',
            setLoadingShow: 'setLoadingShow',
            setLoadingText: 'setLoadingText'
          }),
          loadPageList (params) {  // 查询数据
            this.$store.commit('setLoadingShow', true); // 更新vuex loading
            axios.post(this.api2 + '/rest-rp/adve', params).then((response) => { // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
              if (response.data.ret === '200') {
                console.log(response.data);
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
                this.$store.commit('setFindBusinessSearchCondition', params); // 更新vuex 参数
                this.pageList = response.data.content.list;
                this.$store.commit('setFindBusinessSearchData', this.pageList); // 更新vuex search 数据
                this.pageNums(response.data.content.count);
              } else {
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
                Toast(response.data.msg);
              }
            });
          },
          pageNums (cont) {
            this.pageNum = Math.ceil(cont / 8);
            this.$store.commit('setFindBusinessSearchItemsNum', cont); // gengxin vuex 总条数
            this.$store.commit('setFindBusinessPageNum', this.pageNum); // gengxin vuex 总页数
          },
          resultClick (item) {
            window.alert('you click the result item: ');
          },
          getResult (val) {
            console.log('on-change', val);
            this.searchText = val;
          },
          setFocus () {
            this.$refs.search.setFocus();
          },
          onSubmit () {
            console.log('1');
            if (this.searchText === '') {
              Toast('搜索条件不能为空！');
              this.$store.commit('setFindBusinessIsSearch', false); // 判断用户时候处于搜索状态
            } else {
              this.$store.commit('setFindBusinessSearchText', this.searchText); // 更新vuex setFindBusinessSearchText
              if (localStorage.getItem('searchHistoryData')) {
                this.searchHistoryData = JSON.parse(localStorage.getItem('searchHistoryData'));
                this.searchHistoryData.push(this.searchText);
                this.$store.commit('setFindBusinessSearchHistoryData', Array.from(new Set(this.searchHistoryData)));
                localStorage.setItem('searchHistoryData', JSON.stringify(Array.from(new Set(this.searchHistoryData)))); // 搜索历史数据
              };
              this.$store.commit('setFindBusinessIsSearch', true); // 判断用户时候处于搜索状态
              this.searchCondition.name = this.searchText;
              console.log(this.searchCondition, '参数');
              this.loadPageList(this.searchCondition);
            };
          },
          onFocus () {
            console.log('on focus');
          },
          clickClear () {
            console.log('清空');
            this.searchCondition = {  // 分页属性
              page: '1',
              name: ''
            };
            this.$store.commit('setFindBusinessSearchCondition', this.searchCondition); // 更新vuex 参数
            this.$store.commit('setFindBusinessSearchText', ''); // 更新vuex setFindBusinessSearchText
            this.$store.commit('setFindBusinessIsSearch', false); // 判断用户时候处于搜索状态
          },
          onCancel () {
            console.log('on cancel');
            this.searchText = '';
            this.searchCondition = {  // 分页属性
              page: '1',
              name: ''
            };
            this.$store.commit('setFindBusinessSearchCondition', this.searchCondition); // 更新vuex 参数
            this.$store.commit('setFindBusinessSearchText', ''); // 更新vuex setFindBusinessSearchText
            this.$router.back(-1);
          }
        }
    };
</script>

<style scoped>

.searchBox-Sh{
  position: relative;
  width: 100vw;
  padding: 2vw 4vw;
  background: #fff;
  z-index: 9999;
  height: 12vw;
}
.quickBtn-Fd{
  position: relative;
  width: 6%;
}
.search-Fd{
  position: relative;
  width: 94%;
}
</style>
