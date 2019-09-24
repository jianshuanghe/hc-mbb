<template>
  <div class="content">
    <div class="data-box">
      <div class="kanban-box">
        <div class="title-box">
          <div class="title left">
            <p class="">数据看板</p>
          </div>
          <div class="screen-date left">
            <p class="" @click="screenData" v-if="isCustomTime">起:{{dataTrendKanban.starTime}}止:{{dataTrendKanban.endTime}} <span class="right-arrow"><img :src="rightArrow" alt="" class="rightArrow"></span></p>
            <p class="" @click="screenData" v-else>{{trendKanBanText.kanBanText}} <span class="right-arrow"><img :src="rightArrow" alt="" class="rightArrow"></span></p>
            <button @click="screenDataPopup(0)" class="screenBtn"></button>
            <mt-popup
              v-model="dataPopup"
              popup-transition="popup-fade"
              position="bottom" class="mint-datetime">
              <mt-picker
                :slots="screenData"
                @change="onValuesChangeKanBan"
                valueKey='text'show-toolbar>
                <span class="mint-datetime-action mint-datetime-cancel" @click="dataPopup = false">取消</span>
                <span class="mint-datetime-action mint-datetime-confirm" @click="confirmScreen">确定</span>
              </mt-picker>
            </mt-popup>
            <mt-datetime-picker
              ref="birthPicker"
              type="date"
              :start-date="startDate"
              :end-date="endDate"
              year-format="{value} 年"
              month-format="{value} 月"
              date-format="{value} 日"
              v-model="dataTime.starTime"
              @confirm="confirmBth()">
            </mt-datetime-picker>
            <mt-datetime-picker
              ref="birthPicker2"
              type="date"
              :start-date="startDate"
              :end-date="endDate"
              year-format="{value} 年"
              month-format="{value} 月"
              date-format="{value} 日"
              v-model="dataTime.endTime"
              @confirm="confirmBth2()">
            </mt-datetime-picker>
          </div>
          <div class="clear"></div>
        </div>
        <div class="tongji-box"  ref="tab">
          <div class="item-tj"  ref="tabWrapper">
            <div class="tongji-item left" v-for="(item, index ) in itemList" ref="tabitem">
              <div class="items-YY">
                <p class="tj-num">{{item.num}}</p>
                <p class="tj-text">{{item.title}}</p>
              </div>
              <div class="line-YY" v-if="index !== itemList.length - 1"></div>
            </div>
            <div class="clear"></div>
          </div>
        </div>
      </div>
      <div class="trend">
        <div class="title-box">
          <div class="title left">
            <p class="">数据趋势</p>
          </div>
          <div class="screen-date left">
            <p class="vs">
              <span class="screen-item1"@click="screenDataPopup(1)">{{trendKanBanText.trendLeftText}}</span>
              <mt-popup
                v-model="leftScreenPopup"
                popup-transition="popup-fade"
                position="bottom" class="mint-datetime">
                <mt-picker
                  :slots="leftScreenData"
                  @change="onValuesChangeTrendLeft"
                  valueKey='text'show-toolbar>
                  <span class="mint-datetime-action mint-datetime-cancel" @click="leftScreenPopup = false">取消</span>
                  <span class="mint-datetime-action mint-datetime-confirm" @click="confirmLeftScreen">确定</span>
                </mt-picker>
              </mt-popup>
              VS
              <span class="screen-item2"@click="screenDataPopup(2)" >{{trendKanBanText.trendRightText}}</span>
              <mt-popup
                v-model="rightScreenPopup"
                popup-transition="popup-fade"
                position="bottom" class="mint-datetime">
                <mt-picker
                  :slots="rightScreenData"
                  @change="onValuesChangeTrendRight"
                  valueKey='text'show-toolbar>
                  <span class="mint-datetime-action mint-datetime-cancel" @click="rightScreenPopup = false">取消</span>
                  <span class="mint-datetime-action mint-datetime-confirm" @click="confirmRightScreen">确定</span>
                </mt-picker>
              </mt-popup>
            </p>
          </div>
          <div class="clear"></div>
        </div>
        <div class="echartLine">
          <IEcharts :option="line"></IEcharts>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import IEcharts from 'vue-echarts-v3';
  import rightArrow from '@/assets/images/business/home/extendManageList/rightArrow.png';
  import { screenData, leftScreenData, rightScreenData } from '@/utils/code.js';
  import { mapMutations, mapGetters } from 'vuex';
  import { Loading } from 'vux';
  import axios from 'axios';
  import { Toast, Popup } from 'mint-ui';
  export default {
    name: 'dataTrendKanban',
    components: {
      IEcharts,
      Loading,
      Popup
    },
    data () {
      return {
        loadingShow: false, // loading
        rightArrow: rightArrow, // 右侧箭头
        dataPopup: false, // 数据日期弹层
        leftScreenPopup: false, // left弹层
        rightScreenPopup: false, // right弹层,
        trendKanBanText: { // 数据看板数据展示text
          kanBanText: '近七日',
          trendLeftText: '点击数',
          trendRightText: '总消耗',
          kanBanTime: 7, // 数据看板code
          trendLeft: '1', // 数据趋势left
          trendRight: '3' // 数据趋势right
        },
        trendKanban: { // 数据看板和趋势切换获取的code And text
          kanBanText: '近七日',
          trendLeftText: '点击数',
          trendRightText: '总消耗',
          kanBanTime: 7, // 数据看板code
          trendLeft: '1', // 数据趋势left
          trendRight: '3' // 数据趋势right
        },
        dataTrendKanban: { // 获取数据参数
          userId: '',
          starTime: '',
          endTime: '',
          instIds: ''
        },
        dataTime: {
          starTime: '',
          endTime: ''
        },
        isCustomTime: false, // 判断是否为自定义时间，默认为false
        startDate: new Date('2018-01-01'),
        endDate: new Date(),
        dataTrend: { // 数据趋势参数
          lineType0: '2',
          lineType1: '0'
        },
        screenData: [ // 日期
          {
            flex: 1,
            values: screenData,
            textAlign: 'center'
          }
        ],
        leftScreenData: [ // left
          {
            flex: 1,
            values: leftScreenData,
            textAlign: 'center'
          }
        ],
        rightScreenData: [ // right
          {
            flex: 1,
            values: rightScreenData,
            textAlign: 'center'
          }
        ],
        state: 0, // 0代表日 1代表周 2代表月
        content: {},
        line: {
          color: ['#FF4D6A', '#02C2A2'],
          tooltip: {
            trigger: 'axis',
            textStyle: {
              // fontSize: this.getDpr(),
            },
            axisPointer: {
              type: 'line',
              lineStyle: {
                // 使用深浅的间隔色
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#fff' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#02C2A2' // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                }
              }
            }
          },
          legend: {
            data: ['点击数', '总消耗'],
            textStyle: {
              color: '#2E2E30',
              fontFamily: 'PingFangSC-Regular'
              // fontSize: this.getDpr()
            }
          },
          dataZoom: [
            {
              show: false,
              realtime: true,
              start: 60,
              end: 100
            },
            {
              type: 'inside',
              realtime: true,
              start: 60,
              end: 100
            }
          ],
          grid: {
            left: '0',
            top: '14%',
            right: '0',
            bottom: '15%'
          },
          xAxis: {
            type: 'category',
            boundaryGap: ['10', '10'],
            splitLine: {
              show: true,
              lineStyle: {
                // 使用深浅的间隔色
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#fff' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#E2E2E2' // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: '#9B9B9B'
              }
            },
            axisLabel: {
              margin: 20, // 刻度标签与轴线之间的距离
              color: '#9B9B9B',
              // fontSize: this.getDpr(),
              fontFamily: 'PingFangSC-Light'
              // rotate:-40
            },
            axisTick: {
              show: false
            },
            data: []
          },
          yAxis: {
            show: false,
            type: 'value',
            axisLine: {
              show: false
            }
          },
          series: [
            {
              name: '总消耗',
              type: 'line',
              smooth: true,
              data: []
            },
            {
              name: '点击数',
              type: 'line',
              smooth: true,
              data: []
            }
          ]
        },
        itemList: [
          {
            'num': '0',
            'title': '总消耗(元)'
          },
          {
            'num': '0',
            'title': '点击数(次)'
          },
          {
            'num': '0',
            'title': '点击率(%)'
          },
          {
            'num': '0',
            'title': '展示数'
          },
          {
            'num': '0',
            'title': '转化数(次)'
          },
          {
            'num': '0',
            'title': '转化率(%)'
          },
          {
            'num': '0',
            'title': '提交表单数(次)'
          },
          {
            'num': '0',
            'title': '拨打电话数(次)'
          },
          {
            'num': '0',
            'title': '关注我们数(次)'
          },
          {
            'num': '0',
            'title': '点击自定义按钮数(次)'
          },
          {
            'num': '0',
            'title': '日均消耗数(次)'
          }
        ],
        msgDataIsNew: []
      };
    },
    computed: {
      ...mapGetters(['TRENDKANBAN'])
    },
    created () {
      if (this.EVN === 'production') {
        axios.defaults.baseURL = this.apiProd2;
      }
      let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
      console.log(landRegistLG.user.id);
      this.dataTrendKanban.userId = landRegistLG.user.id;
      console.log(rightScreenData);
      this.$nextTick(() => {
        this.InitTabScroll();
      });
      this.trendKanban = this.TRENDKANBAN; // 获取默认切换数据code'
      this.dataTrendKanban.starTime = this.getDate(7); // 默认开始时间时近七日
      this.dataTrendKanban.endTime = this.getDate(0); // 默认结束时间时今天
      console.log(this.line.legend.data, this.line.series, '展示数据横线text');
      this.getDataTrendKanBan();
    },
    mounted () {
    },
    methods: {
      ...mapMutations({
        setTrendKan: 'setTrendKan',
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
      resetKanBanData (e) {
        console.log('重置看板数据');
        this.itemList[0].num = e.sumMoney;
        this.itemList[1].num = e.clikeCount;
        this.itemList[2].num = e.clikeCountRate;
        this.itemList[3].num = e.countInfo;
        this.itemList[4].num = e.converCount;
        this.itemList[5].num = e.converCountRate;
        this.itemList[6].num = e.submitCount;
        this.itemList[7].num = e.telCount;
        this.itemList[8].num = e.followCount;
        this.itemList[9].num = e.clikeCustCount;
        this.itemList[10].num = e.scaleMoney;
      },
      // 折线图
      getLine (e) {
        console.log(e, '折线数据');
        this.line.series[0].data = {};
        this.line.series[1].data = {};
        this.line.xAxis.data = e.dates;
        // console.log(content, '--------------------折线图----------------')
        this.line.series[0].data = e.values1;
        this.line.series[1].data = e.values0;
      },
      screenDataPopup (e) { // 切换数据日期
        if (e === 0) {
          this.dataPopup = true;
        } else if (e === 1) {
          this.leftScreenPopup = true;
        } else if (e === 2) {
          this.rightScreenPopup = true;
        };
      },
      confirmScreen () { // 数据看板确定
        console.log('1');
        if (this.trendKanban.kanBanTime !== '001') { // 非自定义时间
          this.isCustomTime = false;
          this.dataPopup = false;
          this.trendKanBanText = this.trendKanban; // 页面跟新，选项
          this.$store.commit('setTrendKan', this.trendKanban); // 更新vuex
          this.dataTrendKanban.starTime = this.getDate(this.trendKanban.kanBanTime); // 重置参数中的开始时间
          this.dataTrendKanban.endTime = this.getDate(0); // 默认结束时间时今天
          this.getDataTrendKanBan();
        } else {
          console.log('触发自定义时间');
          this.isCustomTime = true;
          this.dataPopup = false;
          Toast({
            message: '请输入起始时间',
            duration: 2000
          });
          this.$refs.birthPicker.open();
        }
      },
      // 起始时间
      confirmBth () {
        if (!this.dataTime.starTime) {
          this.dataTime.starTime = '2018-01-01';
        };
        let qiTime = new Date(this.GMTToStr(this.dataTime.starTime).replace(/-/g, '/'));
        let jeTime = new Date(this.getDate(0).replace(/-/g, '/'));
        if (qiTime >= jeTime) {
          Toast('起始时间应小于今天');
          this.$refs.birthPicker.open();
          return;
        };
        this.dataTrendKanban.starTime = this.GMTToStr(this.dataTime.starTime);
        Toast({
          message: '请输入结束时间',
          duration: 2000
        });
        this.$refs.birthPicker2.open();
      },
      // 结束时间
      confirmBth2 () {
        if (!this.dataTime.endTime) {
          this.dataTime.endTime = '2018-01-01';
        };
        let qiTime = new Date(this.dataTrendKanban.starTime.replace(/-/g, '/'));
        let jeTime = new Date(this.GMTToStr(this.dataTime.endTime).replace(/-/g, '/'));
        if (jeTime <= qiTime) {
          Toast('结束时间应大于起始时间');
          this.$refs.birthPicker2.open();
          return;
        };
        this.dataTrendKanban.endTime = this.GMTToStr(this.dataTime.endTime);
        this.getDataTrendKanBan();
      },
      GMTToStr (time) {
        var date = new Date(time);
        var monthNum = date.getMonth() + 1;
        // this.toast(monthNum.toString().length);
        if (monthNum.toString().length === 1) {
          monthNum = '0' + monthNum;
        }
        var dateNum = date.getDate();
        if (dateNum.toString().length === 1) {
          dateNum = '0' + dateNum;
        }
        var Str = date.getFullYear() + '-' + monthNum + '-' + dateNum;
        return Str;
      },
      confirmLeftScreen () { // left数据趋势确定
        console.log('2');
        this.leftScreenPopup = false;
        this.trendKanBanText = this.trendKanban; // 页面跟新，选项
        this.$store.commit('setTrendKan', this.trendKanban); // 更新vuex
        this.dataTrend.lineType0 = this.trendKanban.trendLeft; // 重置参数中的左侧按钮
        this.line.legend.data[0] = this.trendKanban.trendLeftText; // 趋势图展示标注文字
        this.line.series[1].name = this.trendKanban.trendLeftText; // 趋势图展示标注文字
        this.getDataTrendKanBan();
      },
      confirmRightScreen () { // right数据趋势确定
        console.log('3');
        this.rightScreenPopup = false;
        this.trendKanBanText = this.trendKanban; // 页面跟新，选项
        this.$store.commit('setTrendKan', this.trendKanban); // 更新vuex
        this.dataTrend.lineType1 = this.trendKanban.trendRight; // 重置参数中的右侧按钮
        console.log(this.line.legend.data, this.line.series, '展示数据横线text');
        this.line.legend.data[1] = this.trendKanban.trendRightText; // 趋势图展示标注文字
        this.line.series[0].name = this.trendKanban.trendRightText; // 趋势图展示标注文字
        this.getDataTrendKanBan();
      },
      getDataTrendKanBan () {
        console.log('获取推广项目看板数据');
        this.$store.commit('setLoadingShow', true); // 更新vuex loading
        let params = this.dataTrendKanban;
        axios.post(this.api2 + '/rest-rp/putIn/dataInfo', params).then((response) => { // 获取数据
          console.log(response.data, '看板数据');
          let kanBanData = response.data;
          this.resetKanBanData(kanBanData); // 重置看板数据
          console.log('数据看板数据');
          this.getTrendData(); // 获取数据趋势数据
        }).catch((error) => {
          this.$store.commit('setLoadingShow', false); // 更新vuex loading
          Toast('网络繁忙，请稍后');
          console.log(error, '网络繁忙，请稍后');
        });
      },
      getTrendData () {
        console.log('获取数据趋势数据');
        let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
        console.log(landRegistLG.user.id);
        let params = this.dataTrendKanban;
        params.lineType0 = this.dataTrend.lineType0; // 左侧按钮参数
        params.lineType1 = this.dataTrend.lineType1; //
        axios.post(this.api2 + '/rest-rp/putIn/dataInfoLineList', params).then((response) => { // 获取数据
          this.$store.commit('setLoadingShow', false); // 更新vuex loading
          console.log('数据趋势数据');
          let trendData = response.data.content;
          this.getLine(trendData); // 重置趋势数据
        }).catch((error) => {
          this.$store.commit('setLoadingShow', false); // 更新vuex loading
          Toast('网络繁忙，请稍后');
          console.log(error, '网络繁忙，请稍后');
        });
      },
      onNationChange (picker, values) {
        console.log(values);
      },
      onValuesChangeKanBan (picker, values) { // 数据看板
        console.log(values);
        this.trendKanban.kanBanTime = values[0].code;
        this.trendKanban.kanBanText = values[0].text;
        console.log(this.trendKanban, '看板');
      },
      onValuesChangeTrendLeft (picker, values) {
        console.log(values);
        this.trendKanban.trendLeft = values[0].code;
        this.trendKanban.trendLeftText = values[0].text;
        console.log(this.trendKanban, '趋势left');
      },
      onValuesChangeTrendRight (picker, values) {
        console.log(values);
        this.trendKanban.trendRight = values[0].code;
        this.trendKanban.trendRightText = values[0].text;
        console.log(this.trendKanban, '趋势right');
      },
      InitTabScroll () {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.tab, {
              startX: 0,
              click: true,
              scrollX: true,
              scrollY: false,
              eventPassthrough: 'vertical'
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
    }
  };
</script>

<style scoped>
  .content{
    position: relative;
    width: 100vw;
  }
  .data-box{
    position: relative;
  }
  .kanban-box{
    position: relative;
    width: 100%;
    padding: 2vw 4vw;
    background: #fff;
    margin-bottom: 1.5vw;
  }
  .title-box{
    position: relative;
    width: 100%;
  }
  .title{
    position: relative;
  }
  .title>p{
    position: relative;
    width: 100%;
    font-family: PingFang-SC-Bold;
    font-size: 4.26vw;
    color: #2E2E30;
    line-height: 6vw;
  }
  .screen-date{
    position: relative;
    width: 70%;
    float: right;
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
  .screen-item2{
    color: #FF4D6A;
    text-decoration:underline;
  }
  .screen-item1{
    color: #02C2A2;
    text-decoration:underline;
  }
  .vs{
    color: #000 !important;
  }
  .right-arrow{
    position: relative;
    width: 2vw;
  }
  .tongji-box{
    position: relative;
    width: 100%;
    overflow: hidden;
    padding:3vw 5px;
  }
  .item-tj{
    width: 300vw;
    line-height: 2rem;
    display: flex;
  }
  .tongji-item{
    position: relative;
    width:25vw;
  }
  .tongji-item{
    min-width: 25vw !important;
  }
  .items-YY{
    position: relative;
    width: 80%;
  }
  .tj-num{
    font-family: PingFangSC-Medium;
    font-size: 4.26vw;
    color: #2E2E30;
    letter-spacing: 0;
    line-height: 5vw;
  }
  .tj-text{
    position: relative;
    width: 100%;
    ont-family: PingFangSC-Regular;
    font-size: 3.2vw;
    color: #9B9B9B;
    line-height: 6vw;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .trend{
    position: relative;
    width: 100%;
    padding: 2vw 4vw;
    background: #fff;
    margin-bottom: 1.5vw;
  }
  .trend>div{
    position: relative;
    width: 100%;
    margin-top: 2vw;
  }
  .echartLine {
    height: 300px;
  }
  .echartTab span.on {
    background: #02C2A2;
    color: #fff;
  }

  .echartTab span {
    height: 24px;
    line-height: 24px;
    width: 33.33333333%;
    border-radius: 34px;
  }
  .echartTab {
    height: 24px;
    background: #D4FDF7;
    border-radius: 34px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    text-align: center;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    color: #2E2E30;
    justify-content: space-around;
    margin: 15px;
  }
  .rightArrow{
    position: relative;
    width: 2.5vw;
  }
  .screenBtn{
    position: absolute;
    right: 0;
    width: 11vw;
    height: 5vw;
    margin-top: -5vw;
    opacity: 0;
  }
  .leftBTN{
    left: 1.5vw;
  }
  .rightBTN{
    right: -1.5vw;
  }
  .screenBtn1{
    position: absolute;
    width: 12vw;
    height: 6vw;
    /* margin-top: -5vw; */
    opacity: 0;
  }
</style>
