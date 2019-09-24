<template>
    <div class="reportFrom-content">
      <div class="reportFrom-box">
        <div class="RF-title">
          <p class="">充值记录</p>
        </div>
        <div class="reportFrom">
          <div class="RF-top">
            <div class="RF-item RF-bg left">
              <p class="borderRight">充值时间</p>
            </div>
            <div class="RF-item RF-bg left">
              <p class="borderRight">充值金额</p>
            </div>
            <div class="RF-item RF-bg left">
              <p class="borderRight">充值方式</p>
            </div>
            <div class="RF-item RF-bg left">
              <p class="">操作说明</p>
            </div>
            <div class="clear"></div>
          </div>
          <div class="RF-cont">
            <div class="RF-lists">
              <div class="RF-item left">
                <p class="borderRight">总计</p>
              </div>
              <div class="RF-item left">
                <p class="borderRight">{{totalData || 0}}</p>
              </div>
              <div class="RF-item left">
                <p class="borderRight">-</p>
              </div>
              <div class="RF-item left">
                <p class="">-</p>
              </div>
              <div class="clear"></div>
            </div>
          </div>
          <div class="RF-cont"  v-for="(items, index) in UserData">
            <div class="RF-lists">
              <div class="RF-item left">
                <p class="borderRight">{{items.rechTime | time}}</p>
              </div>
              <div class="RF-item left">
                <p class="borderRight">{{items.rechMoney || 0}}</p>
              </div>
              <div class="RF-item left">
                <p class="borderRight">{{items.rechType || '-'}}</p>
              </div>
              <div class="RF-item left">
                <p class="">{{items.userName || '-'}}</p>
              </div>
              <div class="clear"></div>
            </div>
          </div>
        </div>
        <div class="lineBoxTop"></div>
        <div class="findMore-RF" v-if="UserData && pageNum !== num" @click="clickFindMore()">
          <p class="">查看更多</p>
        </div>
      </div>
    </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  import { Toast } from 'mint-ui';
  import axios from 'axios';
    export default {
        name: 'reportFrom',
        data () {
          return {
            pageNum: 1, // 数据总页数
            num: 1, // 当前页数
            totalData: {}, // 总计数据
            UserData: {} // 接口返回的会员数据
          };
        },
        created () {
          if (this.EVN === 'production') {
            axios.defaults.baseURL = this.apiProd2;
          }
          this.getTotalData();
        },
        filters: {
          time: function (value) {
            return value.split(' ')[0];
          }
        },
        mounted () {
          console.log(this.pageNum, '-------------', this.num);
        },
        methods: {
          ...mapMutations({
            setLoadingShow: 'setLoadingShow',
            setLoadingText: 'setLoadingText'
          }),
          getTotalData () {
            console.log('获取总计数据');
            this.$store.commit('setLoadingShow', true); // 更新vuex loading
            let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
            console.log(landRegistLG.user.id);
            axios.get(this.api2 + '/rest-rp/compAccount/selectRechListCount?userId=' + landRegistLG.user.id).then((response) => {
              console.log(response);
              if (response.data.ret === '200') {
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
                this.totalData = response.data.content; // 总计数据
                this.getSurveyData();
              } else {
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
                Toast(response.data.msg);
              }
            }).catch((error) => {
              this.$store.commit('setLoadingShow', false); // 更新vuex loading
              Toast('网络繁忙，请稍后');
              console.log(error, '网络繁忙，请稍后');
            });
          },
          getSurveyData () {
            console.log('获取充值记录数据');
            this.$store.commit('setLoadingShow', true); // 更新vuex loading
            let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
            console.log(landRegistLG.user.id);

            axios.get(this.api2 + '/rest-rp/compAccount/selectRechList?userId=' + landRegistLG.user.id + '&page=' + this.num).then((response) => {
              console.log(response);
              if (response.data.ret === '200') {
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
                console.log('数据流水报表');
                let RunWaterData = response.data.content;
                this.UserData = RunWaterData.list;
                this.pageNums(response.data.content.count);
              } else {
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
                Toast(response.data.msg);
              }
            }).catch((error) => {
              this.$store.commit('setLoadingShow', false); // 更新vuex loading
              Toast('网络繁忙，请稍后');
              console.log(error, '网络繁忙，请稍后');
            });
          },
          pageNums (cont) {
            this.pageNum = Math.ceil(cont / 8);
            console.log(this.pageNum, '分页数');
          },
          clickFindMore () {
            console.log('触发加载更多');
            this.num = String(parseInt(this.num) + 1);
            this.$store.commit('setLoadingShow', true); // 更新vuex loading
            let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
            console.log(landRegistLG.user.id);
            axios.get(this.api2 + '/rest-rp/compAccount/selectRechList?userId=' + landRegistLG.user.id + '&page=' + this.num).then((response) => { // 获取数据
              if (response.data.ret === '200') {
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
                console.log('数据流水报表');
                if (response.data.content.list.length === 0) {
                  this.$store.commit('setLoadingShow', false); // 更新vuex loading
                  Toast('已经没有数据了');
                  return;
                };
                let RunWaterData = response.data.content;
                this.UserData = this.UserData.concat(RunWaterData.list);
              } else {
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
                Toast('网络错误');
              }
            }).catch((error) => {
              this.$store.commit('setLoadingShow', false); // 更新vuex loading
              Toast('网络繁忙，请稍后');
              console.log(error, '网络繁忙，请稍后');
            });
          },
          screenDataPopup () { // 切换数据日期
            this.dataPopup = true;
          },
          confirmScreen () { // 数据看板确定
            console.log('1');
          },
          onValuesChange (picker, values) {
            console.log(values);
          }
        }
      };
</script>

<style scoped>
  .reportFrom-content{
    position: relative;
    width: 100%;
  }
  .reportFrom-box{
    position: relative;
    width: 100%;
    background: #fff;
  }
  .RF-title{
    position: relative;
    width: 100%;
    padding: 1vw 4vw 1vw 4vw;
    margin-bottom: 2vw;
  }
  .RF-title>p{
    font-family: PingFang-SC-Bold;
    font-size: 4.266vw;
    color: #2E2E30;
    line-height: 5vw;
  }
  .reportFrom{
    position: relative;
    width: 100%;
  }
  .RF-top{
    position: relative;
    width: 100%;
  }
  .RF-bg{
    position: relative;
    background: #FAFAFA;
  }
  .RF-item{
    position: relative;
    width: 25%;
    border-top: 1px solid #D2D2D2;
  }
  .RF-item>P{
    position: relative;
    width: 99%;
    font-family: PingFang-SC-Regular;
    font-size: 3.5vw;
    color: #2E2E30;
    line-height: 10.4vw;
    padding: 0 1vw 0 3vw;
  }
  .borderRight{
    border-right: 1px solid #D2D2D2;
  }
  .findMore-RF{
    position: relative;
    width: 100%;
  }
  .findMore-RF>p{
    position: relative;
    width: 100%;
    text-align: center;
    font-family: PingFang-SC-Medium;
    font-size: 3.5vw;
    color: #9B9B9B;
    line-height: 10.4vw;
  }
  .lineBoxTop{
    border-top: 1px solid #D2D2D2;
  }

</style>
