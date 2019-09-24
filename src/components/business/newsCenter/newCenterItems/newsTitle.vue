<template>
    <div class="newsTitle-box">
      <div class="newsTitle">
        <div class="center-news">
          <!--<div class="news-TBox left" @click="clickNewsType(1)">-->
            <!--<div :class="clickItemsIndex === 1 ? 'Tbox-items Tb-checked' : 'Tbox-items'">-->
              <!--<p class="">系统通知</p>-->
              <!--<div class="hengLine" v-if="clickItemsIndex === 1"></div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="news-TBox left" @click="clickNewsType(2)">-->
            <!--<div  :class="clickItemsIndex === 2 ? 'Tbox-items Tb-checked' : 'Tbox-items'">-->
              <!--<p class="">业务消息</p>-->
              <!--<div class="hengLine"  v-if="clickItemsIndex === 2"></div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="clear"></div>-->
        </div>
        <div class="allRead-box" @click="clickAllRead">
          <p class="">全部已读</p>
        </div>
      </div>
      <div>
        <confirm
          v-model="confirmShow"
          :show-cancel-button="true"
          :title=confirmTitle
          :confirm-text=confirmBtn
          @on-cancel="onCancel"
          @on-confirm="onConfirm">
          <p style="text-align:center;">{{confirmText}}</p>
        </confirm>
      </div>
    </div>
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex';
    import { Confirm, Loading } from 'vux';
    import { Toast } from 'mint-ui';
    import axios from 'axios';
    export default {
        name: 'newsTitle',
        components: {
          Confirm,
          Loading
        },
        data () {
          return {
            searchCondition: {  // 分页属性
              page: '1',
              userId: 56
            },
            pageNum: 0, // 数据总页数
            pageList: [], // 后台返回数据
            confirmShow: false,
            confirmBtn: '确认',
            confirmTitle: '全部已读',
            confirmText: '您确认要把所有未读的消息都标记为已读吗',
            clickItemsIndex: 1 // 用户切换类型
          };
        },
        created () {
          if (this.EVN === 'production') {
            axios.defaults.baseURL = this.apiProd2;
          }
          let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
          console.log(landRegistLG.user.id);
          this.searchCondition.userId = landRegistLG.user.id; // 用户id
        },
        computed: {
          ...mapGetters(['NEWSCEBNTER'])
        },
        watch: {
          NEWSCEBNTER: {
            handler (a, b) {
              this.clickItemsIndex = a.newsTitle; // 侦听切换类型消息
            },
            deep: true
          }
        },
        methods: {
          ...mapMutations({
            setNewsCenterPageNum: 'setNewsCenterPageNum',
            setNewsCenterNewsItemsData: 'setNewsCenterNewsItemsData',
            setNewsTitle: 'setNewsTitle',
            setLoadingShow: 'setLoadingShow',
            setLoadingText: 'setLoadingText'
          }),
          clickAllRead () {
            this.confirmShow = true;
          },
          onCancel () {
            console.log('触发取消按钮');
          },
          onConfirm (msg) {
            console.log('on confirm');
            console.log('设置全部已读');
            this.$store.commit('setLoadingShow', true); // 更新vuex loading
            let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
            console.log(landRegistLG.user.id);
            axios.get(this.api2 + '/rest-rp/notice/setIsReadAll?userId=' + String(landRegistLG.user.id)).then((response) => {
              console.log(response);
              if (response.data.ret === '200') {
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
                this.loadPageList(); // 從新記載數據
              }
            }).catch((error) => {
              this.$store.commit('setLoadingShow', false); // 更新vuex loading
              Toast('网络繁忙，请稍后');
              console.log(error, '网络繁忙，请稍后');
            });
          },
          clickNewsType (e) {
            console.log(e, '切换消息类型');
            this.$store.commit('setNewsTitle', e);
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
                Toast('设置成功！');
              } else {
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
                Toast(response.data.msg);
              }
            });
          },
          pageNums (cont) {
            this.pageNum = Math.ceil(cont / 10);
            this.$store.commit('setNewsCenterPageNum', this.pageNum);
          }
      }
    };
</script>

<style scoped>
  .newsTitle-box{
    position: relative;
    width: 100%;
  }
  .newsTitle{
    position: relative;
    width: 100%;
  }
  .center-news{
    position: relative;
    width: 55%;
    margin-left: 20%;

  }
  .news-TBox{
    position: relative;
    width: 50%;
  }
  .Tbox-items{
    position: relative;
    width: 100%;
  }
  .Tbox-items>p{
    font-family: PingFangSC-Regular;
    font-size: 3.733vw;
    color: #2E2E30;
    letter-spacing: 0;
    text-align: center;
    line-height: 7vw;
  }
  .hengLine{
    position: relative;
    width: 5vw;
    height: 1px;
    background: #15D49F;
    margin: 0 auto;
  }
  .Tb-checked>p{
    color: #02C2A2 !important;
  }
  .allRead-box{
    position: absolute;
    top: 0;
    right: 0;
  }
  .allRead-box>p{
    position: relative;
    font-family: PingFangSC-Regular;
    font-size: 3.5vw;
    color: #5D5D5D;
    text-align: right;
    line-height: 7vw;
  }
</style>
