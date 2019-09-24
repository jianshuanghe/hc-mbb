<template>
    <div class="content-find">
      <!--<topBox>-->
        <!--<searchNoInput></searchNoInput>-->
      <!--</topBox>-->
      <div class="quickBtn-search">
        <div class="quickBtn-Fd left">
          <quickBtn></quickBtn>
        </div>
        <div class="search-Fd left">
          <search></search>
        </div>
        <div class="clear"></div>
      </div>
      <div class="findBusiness-box"  v-if="pageList.length > 0">
        <!--动态渲染随机-->
        <div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
          <v-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
            <ul class="list" v-for="(items, index) in pageList" :key="index">
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
    import empty from './../../common/empty';
    import quickBtn from './../../common/quickBtn';
    import searchNoInput from './../../common/searchNoInput';
    import search from './findBusinessList/search';
    import banner from './findBusinessList/banner';
    import goodsOne from './findBusinessList/goodsOne';
    import goodsTwo from './findBusinessList/goodsTwo';
    import goodsThree from './findBusinessList/goodsThree';
    import contactBusiness from './findBusinessList/contactBusiness';
    import goodsFour from './findBusinessList/goodsFour';
    import { Loading } from 'vux';
    import { Toast, Loadmore } from 'mint-ui';
    import axios from 'axios';
    import { mapMutations, mapGetters } from 'vuex';
    export default {
        name: 'findBusiness',
        components: {
          'v-loadmore': Loadmore, // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
          Loading,
          quickBtn,
          search,
          searchNoInput,
          empty,
          banner,
          goodsOne,
          goodsTwo,
          goodsThree,
          contactBusiness,
          goodsFour
        },
        computed: {
          ...mapGetters(['FINDBUSINESS'])
        },
        data () {
          return {
            loadingShow: false, // loading
            businessData: [], // vuex中后台返回的数据
            searchCondition: {  // 分页属性
              page: '1',
              name: ''
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
          this.loadPageList(); // 初次访问查询列表
          this.businessData = this.FINDBUSINESS;
          console.log(this.businessData, 'vuex-----FINDBUSINESS数据');
          if (localStorage.getItem('clickRecordsArr')) {
            this.clickRecordsArr = JSON.parse(localStorage.getItem('clickRecordsArr')); // 获取缓存中的用户点击行为数组记录
            if (this.$route.query.instrucIdShare && this.$route.query.share) { // 链接上有分享参数
              this.clickRecordsArr.map((item, index) => {
                if (item.instId === Number(this.$route.query.instrucIdShare)) { // 取出缓存中存在的状态
                  console.log(item.instId, '取出缓存中share存在的状态');
                  this.clickRecordsArr[index].share = true;
                  console.log(this.clickRecordsArr[index], '分享后获取的数据展示');
                  localStorage.setItem('clickRecordsArr', JSON.stringify(this.clickRecordsArr)); // 缓存用户点击行为数组记录
                }
              });
            }
            if (this.$route.query.instrucIdLike && this.$route.query.like) { // 链接上有点赞参数
              this.clickRecordsArr.map((item, index) => {
                if (item.instId === Number(this.$route.query.instrucIdLike)) { // 取出缓存中存在的状态
                  console.log(item.instId, '取出缓存中like存在的状态');
                  if (this.$route.query.like === 'true') {
                    this.clickRecordsArr[index].like = true;
                  } else {
                    this.clickRecordsArr[index].like = false;
                  }
                  localStorage.setItem('clickRecordsArr', JSON.stringify(this.clickRecordsArr)); // 缓存用户点击行为数组记录
                }
              });
            }
          }
        },
        mounted () {
        },
        methods: {
          ...mapMutations({
            setFindBusiness: 'setFindBusiness',
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
            axios.post(this.api2 + '/rest-rp/adve', this.searchCondition).then((response) => { // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
              if (response.data.ret === '200') {
                console.log(response.data);
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
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
                this.$store.commit('setFindBusiness', this.pageList);
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
            this.pageNum = Math.ceil(cont / 8);
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
            axios.post(this.api2 + '/rest-rp/adve', this.searchCondition).then(data => {
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
              this.$store.commit('setFindBusiness', this.pageList);
              this.$store.commit('setLoadingShow', false); // 更新vuex loading
              console.log(this.businessData, 'vuex-----FINDBUSINESS数据2');
            });
          }
        }
      };
</script>

<style scoped>
  .content-find{
    position: fixed;
    margin-bottom: 4vw;
  }
  .quickBtn-search{
    position: relative;
    width: 100vw;
    padding: 2vw 4vw;
    background: #fff;
    z-index: 9999;
    height: 12vw;
    background: #FFFFFF;
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
    height: 91vh;
    overflow: scroll;
    padding-bottom: 15vw;
    touch-action: default;
    -webkit-overflow-scrolling:touch;
  }
</style>
