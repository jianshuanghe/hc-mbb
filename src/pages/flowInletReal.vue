<template>
  <div class="content-find">
    <div class="quickBtn-search">
      <div class="quickBtn-Fd left">
        <quickBtn></quickBtn>
      </div>
      <div class="search-Fd left">
        <search></search>
      </div>
      <div class="clear"></div>
    </div>
    <div class="line"></div>
    <div class="findBusiness-box"  v-if="pageList.length > 0">
      <!--动态渲染随机-->
      <div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
        <v-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
          <ul class="list" v-for="(items, index) in pageList" :key="index" >
            <li>
              <div class="findBusiness-random" >
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
    <empty v-if="pageList.length === 0">当前没有数据！</empty>
  </div>
</template>

<script>
  import empty from './../components/common/empty';
  import quickBtn from './../components/common/quickBtn';
  import search from './../components/flowInlet/search';
  import banner from './../components/flowInlet/banner';
  import goodsOne from './../components/flowInlet/goodsOne';
  import goodsTwo from './../components/flowInlet/goodsTwo';
  import goodsThree from './../components/flowInlet/goodsThree';
  import contactBusiness from './../components/flowInlet/contactBusiness';
  import goodsFour from './../components/flowInlet/goodsFour';
  import { Loading } from 'vux';
  import { Toast, Loadmore } from 'mint-ui';
  import axios from 'axios';
  import { mapMutations } from 'vuex';
  export default {
    name: 'flowInletReal',
    components: {
      'v-loadmore': Loadmore, // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
      Loading,
      quickBtn,
      search,
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
        businessData: [], // vuex中后台返回的数据
        searchCondition: {  // 分页属性
          adveId: 76,
          advertPlatform: '0'
        },
        pageNum: 0, // 数据总页数
        pageList: [], // 后台返回数据
        allLoaded: false,  // 是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
        scrollMode: 'auto',  // 移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        items: { // 用户缓存用户行为的子项
          instId: 0, // id
          find: false, // 查看
          tel: false, // 电话
          doc: false, // 留言
          like: false, // 点赞
          share: false // 分享
        },
        clickRecordsArr: [] // 用户点击行为数组记录
      };
    },
    created () {
      if (this.EVN === 'production') {
        axios.defaults.baseURL = this.apiProd2;
      }
      // http://127.0.0.1:8081/#/flowInlet?adveId=78&advertPlatform=0
      if (localStorage.getItem('queryFI')) {
        let queryFI = JSON.parse(localStorage.getItem('queryFI')); // 读取缓存的queryFI
        this.searchCondition.adveId = Number(queryFI.adveId);
        this.searchCondition.advertPlatform = queryFI.advertPlatform;
      } else {
        this.$router.push({ // 不存在queryFI时默认用户进入平台首页
          path: '/',
          query: { }
        });
      }
      if (localStorage.getItem('shareQuery')) { // 分享
        let shareQuery = JSON.parse(localStorage.getItem('shareQuery')); // 读取缓存的shareQuery
        if (localStorage.getItem('clickRecordsArr')) {
          this.clickRecordsArr = JSON.parse(localStorage.getItem('clickRecordsArr')); // 获取缓存中的用户点击行为数组记录
          this.clickRecordsArr.map((item, index) => {
            if (Number(item.instId) === Number(shareQuery.instrucIdShare)) { // 取出缓存中存在的状态
              console.log(item.instId, '取出缓存中存在的状态');
              this.clickRecordsArr[index].share = true;
              localStorage.setItem('clickRecordsArr', JSON.stringify(this.clickRecordsArr)); // 缓存用户点击行为数组记录
            }
          });
        }
      };
      if (localStorage.getItem('likeQuery')) { // 点赞
        let shareQuery = JSON.parse(localStorage.getItem('likeQuery')); // 读取缓存的likeQuery
        if (localStorage.getItem('clickRecordsArr')) {
          this.clickRecordsArr = JSON.parse(localStorage.getItem('clickRecordsArr')); // 获取缓存中的用户点击行为数组记录
          this.clickRecordsArr.map((item, index) => {
            if (Number(item.instId) === Number(shareQuery.instrucIdLike)) { // 取出缓存中存在的状态
              console.log(item.instId, '取出缓存中存在的状态');
              if (shareQuery.like === 'true') {
                this.clickRecordsArr[index].like = true;
              } else {
                this.clickRecordsArr[index].like = false;
              }
              localStorage.setItem('clickRecordsArr', JSON.stringify(this.clickRecordsArr)); // 缓存用户点击行为数组记录
            }
          });
        }
      };
      if (this.$route.query.sessionId) {
        this.searchCondition.sessionId = this.$route.query.sessionId;
        this.searchCondition.isHist = '1';
      }
      this.loadPageList(); // 初次访问查询列表
    },
    mounted () {
    },
    methods: {
      ...mapMutations({
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
      loadPageList () {  // 查询数据
        this.$store.commit('setLoadingShow', true); // 更新vuex loading
        axios.post(this.api2 + '/rest-rp/adve/adveList', this.searchCondition).then((response) => { // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
          if (response.data.ret === '200') {
            console.log(response.data);
            this.$store.commit('setLoadingShow', false); // 更新vuex loading
            this.searchCondition.sessionId = response.data.content.sessionId;
            if (this.$route.query.sessionId) {
              this.searchCondition.sessionId = this.$route.query.sessionId;
            }
            delete this.searchCondition.isHist; // 清掉isHist
            localStorage.setItem('sessionId', this.searchCondition.sessionId); // 缓存用户sessionId
            this.pageList = response.data.content.list;
            let pageList = [...response.data.content.list];
            if (this.clickRecordsArr.length < this.pageList.length) { // 缓存中的数据小于缓存的
              console.log('缓存中的数据小于缓存的');
              for (let i = 0; i < this.pageList.length; i++) { // 用户行为数据
                console.log(this.pageList[i]);
                let items = { // 用户缓存用户行为的子项
                  instId: '', // id
                  find: false, // 查看
                  tel: false, // 电话
                  doc: false, // 留言
                  like: false, // 点赞
                  share: false // 分享
                };
                items.instId = this.pageList[i].instId; // 赋值id
                this.clickRecordsArr.push(items);
                console.log(this.clickRecordsArr, '用户行为数据');
              }
              localStorage.setItem('clickRecordsArr', JSON.stringify(this.clickRecordsArr)); // 缓存用户点击行为数组记录
            } else if (this.clickRecordsArr.length >= this.pageList.length) { // 缓存中的数据大于等于接口每次返回的数据
              console.log('缓存中的数据大于等于接口每次返回的数据');
              this.clickRecordsArr.map((item, index) => {
                console.log(item.instId, '打印缓存中的id');
                pageList.map((item1, index) => {
                  if (item1) {
                    console.log(item1.instId, '打印接口中的id');
                    if (item1.instId === item.instId) { // 二次校验，如果缓存中的存在该id，则不需要再次缓存，之缓存不存在的
                      pageList.splice(index, 1); // 将接口返回的数据去重
                    }
                  };
                });
                console.log(pageList, '去重后的数据');
              });
              if (pageList.length > 0) {
                console.log('去重后剩余数据');
                pageList.map((item, index) => {
                  let items = { // 用户缓存用户行为的子项
                    instId: '', // id
                    find: false, // 查看
                    tel: false, // 电话
                    doc: false, // 留言
                    like: false, // 点赞
                    share: false // 分享
                  };
                  items.instId = item.instId; // 赋值id
                  this.clickRecordsArr.push(items);
                  localStorage.setItem('clickRecordsArr', JSON.stringify(this.clickRecordsArr)); // 缓存用户点击行为数组记录
                });
              }
            }
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
      more () {
        // 分页查询
        this.$store.commit('setLoadingShow', true); // 更新vuex loading
        axios.post(this.api2 + '/rest-rp/adve/adveList', this.searchCondition).then(data => {
          console.log(data.data.content.list, '流量承载页数据');
          if (data.data.content.list.length === 0) {
            this.$store.commit('setLoadingShow', false); // 更新vuex loading
            Toast('已经没有数据了');
            return;
          };
          this.pageList = this.pageList.concat(data.data.content.list);
          let pageList = [...data.data.content.list];
          console.log('缓存中的数据大于等于接口每次返回的数据');
          this.clickRecordsArr.map((item, index) => {
            console.log(item.instId, '打印缓存中的id');
            pageList.map((item1, index) => {
              if (item1) {
                console.log(item1.instId, '打印接口中的id');
                if (item1.instId === item.instId) { // 二次校验，如果缓存中的存在该id，则不需要再次缓存，之缓存不存在的
                  pageList.splice(index, 1); // 将接口返回的数据去重
                }
              };
            });
            console.log(pageList, '去重后的数据');
          });
          if (pageList.length > 0) {
            console.log(pageList, '去重后剩余数据');
            pageList.map((item, index) => {
              let items = { // 用户缓存用户行为的子项
                instId: '', // id
                find: false, // 查看
                tel: false, // 电话
                doc: false, // 留言
                like: false, // 点赞
                share: false // 分享
              };
              items.instId = item.instId; // 赋值id
              this.clickRecordsArr.push(items);
              localStorage.setItem('clickRecordsArr', JSON.stringify(this.clickRecordsArr)); // 缓存用户点击行为数组记录
            });
          }
          this.$store.commit('setLoadingShow', false); // 更新vuex loading
        });
      }
    },
    destroyed () {
      localStorage.removeItem('sessionIdRhx'); // 移除sessionIdRhx
    }
  };
</script>

<style scoped>
  .content-find{
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: #F6F6F6;
  }
  .quickBtn-search{
    position: relative;
    width: 100vw;
    padding: 2vw 4vw;
    background: #fff;
    z-index: 9999;
    height: 12vw;
    background: #FFFFFF;
    -webkit-box-shadow: 0 1px 0 0 #F5F5F5;
    box-shadow: 0 1px 0 0 #F5F5F5;
  }
  .quickBtn-Fd{
    position: relative;
    width: 6%;
  }
  .search-Fd{
    position: relative;
    width: 94%;
  }
  .findBusiness-box{
    padding-top: 0vw;
    position: fixed;
    height: 100vh;
    overflow: scroll;
    padding-bottom: 0vw;
    -webkit-overflow-scrolling:touch;
  }
</style>
