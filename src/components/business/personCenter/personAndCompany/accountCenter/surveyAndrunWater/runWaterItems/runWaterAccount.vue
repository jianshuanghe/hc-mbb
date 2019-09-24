<template>
  <div class="content-SU">
    <div class="account-box">
      <div class="account-SU2">
        <div class="screen-date-SU left">
          <div class="SU-time">
            <div class="time-left left">
              <p class="">时间：</p>
            </div>
            <div class="time-screen left">
              <p class="" @click="screenData">{{runWaterTextShow}}<span class="right-arrow"><img :src="rightArrow" alt="" class="rightArrow"></span></p>
              <button @click="screenDataPopup" class="srcBtn-SU"></button>
            </div>
            <div class="clear"></div>
          </div>
          <mt-popup
            v-model="dataPopup"
            popup-transition="popup-fade"
            position="bottom" class="mint-datetime">
            <mt-picker
              :slots="screenData"
              @change="onValuesChange"
              valueKey='text'show-toolbar>
              <span class="mint-datetime-action mint-datetime-cancel" @click="dataPopup = false">取消</span>
              <span class="mint-datetime-action mint-datetime-confirm" @click="confirmScreen">确定</span>
            </mt-picker>
          </mt-popup>
        </div>
      </div>
      <div class="amountMoney">
        <div class="amountMoney-box">
          <div class="amountMoney-cont">
            <div class="AM-box left">
              <p class="AM-title">累计充值 </p>
              <p class="AM-text-left">+{{UserData.rechMoney}}</p>
            </div>
            <div class="AM-box left">
              <p class="AM-title MG-left">累计花费 </p>
              <p class="AM-text-right MG-left">-{{UserData.consMoney}}</p>
            </div>
            <div class="clear"></div>
            <div class="Y-line-box">
              <div class="Y-line"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import rightArrow2 from '@/assets/images/business/home/extendManageList/rightArrow2.png';
  import { runWaterData } from '@/utils/code.js';
  import { mapMutations, mapGetters } from 'vuex';
  import { Toast, Popup } from 'mint-ui';
  import axios from 'axios';
  export default {
    name: 'runWaterAccount',
    components: {
      Popup
    },
    data () {
      return {
        rightArrow: rightArrow2, // 右侧箭头
        dataPopup: false, // 数据日期弹层
        screenData: [ // 日期
          {
            flex: 1,
            values: runWaterData,
            textAlign: 'center'
          }
        ],
        changeRunWaterTime: { // 切换存储
          code: 1,
          text: '昨天'
        },
        runWaterTextShow: '昨天', // 页面显示
        pageNum: 0, // 数据总页数
        num: 1, // 当前页数
        dataRunWater: { // 获取数据参数
          userId: '',
          starTime: '',
          endTime: ''
        },
        UserData: {} // 接口返回的会员数据
      };
    },
    computed: {
      ...mapGetters(['ACCOUNTCENTER'])
    },
    created () {
      if (this.EVN === 'production') {
        axios.defaults.baseURL = this.apiProd2;
      }
      let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
      console.log(landRegistLG.user.id);
      this.dataRunWater.userId = landRegistLG.user.id; // id
      this.dataRunWater.starTime = this.getDate(1); // 默认开始时间时昨天
      this.dataRunWater.endTime = this.getDate(0); // 默认结束时间时今天
      this.getRunWaterData();
    },
    watch: {
      ACCOUNTCENTER: {
        handler (a, b) {
          this.dataRunWater = a.dataRunWaterParams; // 更新的数据
          this.UserData = a.runWaterTopData; // 顶部数据
          console.log(this.UserData, '顶部数据');
        },
        deep: true
      }
    },
    methods: {
      ...mapMutations({
        setRunWaterPageNum: 'setRunWaterPageNum', // 总页数
        setRunWaterNum: 'setRunWaterNum', // 当前页数
        setDataRunWaterParams: 'setDataRunWaterParams', // 参数
        setRunWaterTopData: 'setRunWaterTopData', // 账户流水顶部数据
        setReportRunWaterData: 'setReportRunWaterData', // 报表数据
        setLoadingShow: 'setLoadingShow',
        setLoadingText: 'setLoadingText'
      }),
      getDate (e) {
        let day = new Date();
        day.setTime(day.getTime() - e * 24 * 60 * 60 * 1000);
        let getMonth = '';
        if (Number(day.getMonth() + 1) < 10) {
          getMonth = '0' + String(day.getMonth() + 1);
        } else {
          getMonth = String(day.getMonth() + 1);
        }
        let getDate = '';
        if (Number(day.getDate()) < 10) {
          getDate = '0' + String(day.getDate());
        } else {
          getDate = String(day.getDate());
        };
        return day.getFullYear() + '-' + getMonth + '-' + getDate;
      },
      getRunWaterData () {
        console.log('获取数据账户流水');
        let params = this.dataRunWater;
        this.$store.commit('setLoadingShow', true); // 更新vuex loading
        axios.post(this.api2 + '/rest-rp/compAccount/selectListCount', params).then((response) => { // 获取数据
          if (response.data.ret === '200') {
            this.$store.commit('setLoadingShow', false); // 更新vuex loading
            console.log('数据账户流水');
            let RunWaterTopData = response.data.content;
            if (!RunWaterTopData) {
              RunWaterTopData = {
                // 总转入
                rechMoney: 0,
                // 总支出
                consMoney: 0
              };
            };
            this.$store.commit('setRunWaterTopData', RunWaterTopData); // 更新vuex setDataRunWater
            this.getReportRunWaterData();
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
      getReportRunWaterData () {
        console.log('获取流水报表数据');
        let params = this.dataRunWater;
        this.$store.commit('setLoadingShow', true); // 更新vuex loading
        axios.post(this.api2 + '/rest-rp/compAccount/selectList?page=' + this.num, params).then((response) => { // 获取数据
          if (response.data.ret === '200') {
            this.$store.commit('setLoadingShow', false); // 更新vuex loading
            console.log('数据流水报表');
            let RunWaterData = response.data.content;
            this.pageNums(RunWaterData.count);
            console.log(params, '跟新参数');
            this.$store.commit('setDataRunWaterParams', params); // 更新vuex setDataRunWaterParams
            this.$store.commit('setReportRunWaterData', RunWaterData.list); // 更新vuex setReportRunWaterData
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
      pageNums (cont) {
        this.pageNum = Math.ceil(cont / 10);
        this.$store.commit('setRunWaterPageNum', this.pageNum); // 更新vuex setDataRunWaterParams
      },
      screenDataPopup () { // 切换数据日期
        this.dataPopup = true;
      },
      confirmScreen () { // 数据看板确定
        console.log('1');
        this.runWaterTextShow = this.changeRunWaterTime.text;
        let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
        console.log(landRegistLG.user.id);
        this.dataRunWater.userId = landRegistLG.user.id; // id
        this.dataRunWater.starTime = this.getDate(this.changeRunWaterTime.code); // 默认开始时间时
        if (this.changeRunWaterTime.code === '001') {
          this.dataRunWater.starTime = '2019-01-01'; // 全部时间
        };
        this.dataRunWater.endTime = this.getDate(0); // 默认结束时间时今天
        console.log(this.dataRunWater);
        this.$store.commit('setRunWaterNum', 1); // 更新vuex setDataRunWaterParams
        this.getRunWaterData();
        this.dataPopup = false;
      },
      onValuesChange (picker, values) {
        console.log(values);
        this.changeRunWaterTime = values[0];
      }
    }
  };
</script>

<style scoped>
  .content-SU{
    position: relative;
    width: 100vw;
    background: #fff;
  }
  .account-box{
    position: relative;
    width: 100%;
  }
  .account-SU2{
    position: relative;
    width: 100%;
    height: 28.2vw;
    background-image: linear-gradient(-134deg,#57D6CF 0%,#15D49F 100%);
    box-shadow: 0 2px 10px 0 rgba(2,194,162,0.30);
  }

  .screen-date-SU{
    position: relative;
    width: 100%;
    padding: 1vw 6vw 0 6vw;
  }
  .SU-time{
    position: relative;
    width: 100%;
  }
  .time-left{
    position: relative;
    width: 13%;
  }
  .time-left>p{
    font-family: PingFang-SC-Medium;
    font-size: 3.733vw;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 12vw;
  }
  .time-screen{
    position: relative;
    width: 70%;
  }
  .time-screen>p{
    font-family: PingFang-SC-Medium;
    font-size: 3.733vw;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 12vw;
  }
  .screen-date>p{
    position: relative;
    width: 100%;
    text-align: right;
    ont-family: PingFangSC-Regular;
    font-size: 3.2vw;
    color: #9B9B9B;
    text-align: right;
    line-height: 6vw;
  }
  .srcBtn-SU{
    position: absolute;
    top: 4vw;
    width: 23vw;
    height: 5vw;
    opacity: 0;
  }
  .right-arrow{
    position: relative;
    width: 4vw;
    margin-left: 1vw;
    top: 0.8vw;
  }
  .rightArrow{
    position: relative;
    width: 4vw;
  }
  .account-num>span{
    position: relative;
    font-size: 3.5vw;
    line-height: 9vw;
    color: #fff;
  }
  .account-can{
    position: relative;
    width: 100%;
    font-size: 3.5vw;
    line-height: 5vw;
    color: #fff;
    text-align: center;
  }
  .account-can>span{
    position: relative;
    font-size: 3.5vw;
    line-height: 9vw;
    color: #fff;
  }
  .questionImg{
    position: relative;
    width: 3.5vw;
    top: 0.5vw;
  }
  .amountMoney{
    position: relative;
    width: 100%;
  }
  .amountMoney-box{
    position: relative;
    width: 100%;
    height: 20vw;
  }
  .amountMoney-cont{
    position: relative;
    width: 89.33vw;
    margin: 0 auto;
    top: -11vw;
    background: #FFFFFF;
    -webkit-box-shadow: 0 4px 12px 0 rgba(226,226,226,0.50);
    box-shadow: 0 4px 12px 0 rgba(226,226,226,0.50);
    border-radius: 3px;
    padding: 4vw 8vw;

  }
  .AM-box{
    position: relative;
    width: 50%;
  }
  .AM-title{
    font-family: PingFang-SC-Medium;
    font-size: 3.5vw;
    color: #000000;
    letter-spacing: 0;
    line-height: 7vw;
  }
  .AM-text-left{
    font-family: PingFangSC-Medium;
    font-size: 4.8vw;
    color: #02C2A2;
    letter-spacing: 0;
    line-height: 7vw;
  }
  .AM-text-right{
    font-family: PingFangSC-Medium;
    font-size: 4.8vw;
    color: #FF4D6A;
    letter-spacing: 0;
    line-height: 7vw;
  }
  .Y-line-box{
    position: absolute;
    right: 50%;
    height: 10vw;
    width: 2px;
    top: 28%;
    z-index: 109;
  }
  .MG-left{
    margin-left: 10vw;
  }
</style>
