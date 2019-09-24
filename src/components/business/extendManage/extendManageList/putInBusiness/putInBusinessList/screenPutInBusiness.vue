<template>
  <div class="screenPutIn-box">
    <div class="screenPutIn">
      <div class="sc-PutIn-top">
        <div class="sc-putIn-top-box">
          <div class="sc-top-item left">
            <div class="ietms-sc" @click="screenClick(1)">
              <p :class="clickItems === 1 ? 'class-a' : ''">{{filterTitle1}} <span class="sc-top-Icon"><img :src="arrow1" alt="" class="img"></span></p>
            </div>
          </div>
          <div class="sc-top-item left">
            <div class="ietms-sc" @click="screenClick(2)">
              <p :class="clickItems === 2 ? 'class-a' : ''">{{filterTitle2}} <span class="sc-top-Icon"><img :src="arrow2" alt="" class="img"></span></p>
            </div>
          </div>
          <div class="sc-top-item left">
            <div class="ietms-sc" @click="screenClick(3)">
              <p :class="clickItems === 3 ? 'class-a' : ''">{{filterTitle3}} <span class="sc-top-Icon"><img :src="arrow3" alt="" class="img"></span></p>
            </div>
          </div>
          <div class="clear"></div>
        </div>
      </div>
      <div class="sc-PutIn-bottom" v-if="screenTerm">
        <div class="sc-putIn-bottom-box">
          <div class="sc-bottom-item"  v-for="(items,index) in screenTermData" :key="index" @click="termDataCheck(index, items.vulue)">
            <div class="sc-bottom-item-text left">
              <p class="">{{items.vulue}}</p>
            </div>
            <div class="check-bottom left" v-if="checkImg === index">
              <img :src="check" alt="" class="">
            </div>
            <div class="clear"></div>
            <div class="line"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import upArrow from '@/assets/images/business/home/extendManageList/putInBusiness/up-arrow.png';
    import downArrow from '@/assets/images/business/home/extendManageList/putInBusiness/down-arrow.png';
    import check from '@/assets/images/business/home/extendManageList/putInBusiness/check.png';
    import { screenTermData1, screenTermData2, screenTermData3 } from '@/utils/code.js';
    import { mapMutations, mapGetters } from 'vuex';
    import { Loading } from 'vux';
    import { Toast } from 'mint-ui';
    import axios from 'axios';
    export default {
        name: 'screenPutInBusiness',
        data () {
          return {
            loadingShow: false, // loading
            arrow1: downArrow,
            arrow2: downArrow,
            arrow3: downArrow,
            check: check,
            filterTitle1: '排序',
            filterTitle2: '投放位置',
            filterTitle3: '状态',
            checkImg: 80, // 选中的勾选标记
            recordClick: 4, // 记录用户点击的那个
            clickItems: '', // 点击的条件类型
            screenTerm: false, // 筛选条件模块默认不显示
            filterData: { // 过滤条件
            },
            screenTermData: [] // 筛选条件
          };
        },
        components: {
           Loading
        },
        computed: {
          ...mapGetters(['PUTINBUSINESS'])
        },
        watch: {
          PUTINBUSINESS: {
            handler (a, b) {
              this.filterData = a.searchCondition; // 获取列表的参数
            },
            deep: true
          }
        },
        created () {
          if (this.EVN === 'production') {
            axios.defaults.baseURL = this.apiProd2;
          }
          console.log(upArrow);
          if (this.$route.query.index) { // 连接上的参数代表从推广管理过来
            this.displayFilterTitle(Number(this.$route.query.index), this.$route.query.value);
            this.termDataCheck2(String(this.$route.query.status), Number(this.$route.query.index));
          }
          this.filterData = this.PUTINBUSINESS.searchCondition; // 获取列表的参数
        },
        mounted () {},
        methods: {
          ...mapMutations({
            setPutBusinessPageNum: 'setPutBusinessPageNum',
            setPutInBusinesSsearch: 'setPutInBusinesSsearch',
            setPutInBusiness: 'setPutInBusiness',
            setLoadingShow: 'setLoadingShow',
            setLoadingText: 'setLoadingText'
          }),
          screenClick (e) { // 选择条件类型
            console.log(e, '触发了筛选条件');
            this.checkImg = 80; // 初始化标记
            this.clickItems = e; // 改变对应的字体颜色
            if (this.clickItems === this.recordClick) { // 点击相同隐藏筛选条件
              this.screenTerm = false;
              this.recordClick = 4; // 初始化
              if (this.$route.query.index) { // 连接上的参数代表从推广管理过来
                this.recordClick = 3; // 初始化
              };
              this.clickItems = ''; // 初始化
              this.arrow1 = this.arrow2 = this.arrow3 = downArrow;
            } else {
              this.screenTerm = true; // 显示筛选条件
              if (e === 1) {
                this.arrow1 = upArrow;
                this.arrow2 = downArrow;
                this.arrow3 = downArrow;
                this.screenTermData = screenTermData1;
              } else if (e === 2) {
                this.arrow2 = upArrow;
                this.arrow1 = downArrow;
                this.arrow3 = downArrow;
                this.screenTermData = screenTermData2;
              } else if (e === 3) {
                this.arrow3 = upArrow;
                this.arrow2 = downArrow;
                this.arrow1 = downArrow;
                this.screenTermData = screenTermData3;
              };
              this.recordClick = e;
            }
          },
          resetCss () { // 初始化css
            this.arrow3 = downArrow;
            this.arrow2 = downArrow;
            this.arrow1 = downArrow;
            this.clickItems = 4;
            this.recordClick = 4; // 记录用户点击的那个
          },
          termDataCheck2 (e, index) { // 筛选条件的具体内容
            console.log(e, index, '筛选的index query');
            this.checkImg = index;
            this.filterData.authState = e;
            this.filterData.page = '1'; // 筛选时页数都是1
            let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
            console.log(landRegistLG.user.id);
            this.filterData.userId = landRegistLG.user.id;
            this.$store.commit('setPutInBusinesSsearch', this.filterData);
            this.loadPageList(); // 获取过滤后的数据
            console.log(this.filterData, '用户过滤的条件 query');
            console.log(this.screenTermData[e], '筛选的具体内容 query');
            this.screenTerm = false; // 显示筛选条件
            this.resetCss();
          },
          termDataCheck (e, vulue) { // 筛选条件的具体内容
            console.log(e, '筛选的index');
            this.displayFilterTitle(this.recordClick, vulue); // 触发显示筛选title
            this.checkImg = e;
            for (let i in this.screenTermData) {
              if (Number(i) === e) {
                if (this.clickItems === 1) {
                  this.filterData.order = this.screenTermData[i].code;
                } else if (this.clickItems === 2) {
                  this.filterData.isBanner = this.screenTermData[i].code;
                } else if (this.clickItems === 3) {
                  this.filterData.authState = this.screenTermData[i].code;
                }
                this.filterData.page = '1'; // 筛选时页数都是1
                this.$store.commit('setPutInBusinesSsearch', this.filterData);
                this.loadPageList(); // 获取过滤后的数据
                console.log(this.filterData, '用户过滤的条件');
                console.log(this.screenTermData[i], '筛选的具体内容');
                this.screenTerm = false; // 显示筛选条件
                this.resetCss();
              }
            };
          },
          displayFilterTitle (e, vulue) {
            console.log(e, vulue, '触发显示筛选title');
            if (e === 1) {
              if (vulue === '按照已消耗排序') {
                this.filterTitle1 = '已消耗';
              };
              if (vulue === '按照转化数排序') {
                this.filterTitle1 = '转化数';
              };
              if (vulue === '按照点击数排序') {
                this.filterTitle1 = '点击数';
              };
              if (vulue === '按照展示数排序') {
                this.filterTitle1 = '展示数';
              };
              if (vulue === '按照申请时间排序') {
                this.filterTitle1 = '申请时间';
              };
            };
            if (e === 2) {
              this.filterTitle2 = vulue;
            };
            if (e === 3) {
              this.filterTitle3 = vulue;
            };
          },
          loadPageList () {  // 查询数据
            this.filterData.page = '1'; // 筛选时页数都是1
            this.$store.commit('setLoadingShow', true); // 更新vuex loading
            axios.post(this.api2 + '/rest-rp/putIn/selectInstList', this.filterData).then((response) => { // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
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
          }
        }
      };
</script>

<style scoped>
 .screenPutIn-box{
   position: relative;
   width: 100%;
 }
  .screenPutIn{
    position: relative;
    width: 100%;
  }
  .sc-PutIn-top{
    position: relative;
    width: 100%;
  }
  .sc-putIn-top-box{
    position: relative;
    width: 100vw;
    padding: 2vw 4vw;
    background: #fff;
  }
  .sc-top-item{
    position: relative;
    width: 33.3333%;
  }
  .ietms-sc{
    position: relative;
    width: 100%;
  }
  .ietms-sc>p{
    font-family: PingFangSC-Regular;
    font-size: 3.5vw;
    color: #2E2E30;
    line-height: 5vw;
    text-align: center;
  }
  .class-a{
    color: #15D49F !important;
  }
  .sc-top-Icon{
    position: relative;
    width: 3vw;
  }
 .sc-top-Icon>img{
   position: relative;
   width: 3vw;
 }
  .sc-PutIn-bottom{
    position: fixed;
    width: 100%;
    background: rgba(0, 0, 0, 0.65);
    z-index: 105;
    height: 100vh;
  }
  .sc-putIn-bottom-box{
    position: relative;
    width: 100vw;
    padding: 2vw 4vw;
    background: #fff;
  }
  .sc-bottom-item{
    position: relative;
    width: 100%;
  }
  .sc-bottom-item-text{
    position: relative;
    width: 90%;
  }
 .sc-bottom-item-text>p{
   font-family: PingFangSC-Regular;
   font-size: 3.733vw;
   color: #2E2E30;
   line-height: 11vw;
 }
  .check-bottom{
    position: relative;
    width: 10%;
  }
 .check-bottom>img{
   position: relative;
   width: 4vw;
   margin-top: 3.5vw;
   float: right;
 }
</style>
