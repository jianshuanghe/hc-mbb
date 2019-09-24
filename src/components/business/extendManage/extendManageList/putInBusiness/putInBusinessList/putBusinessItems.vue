<template>
    <div class="content-putIn" @click="goToPutInDetails(msgData.instId, msgData.instName)">
      <div class="putIn-box">
        <div class="putIn-top">
          <div class="title-putIn">
            <p class="">{{msgData.instName}}</p>
          </div>
          <div class="xiaohao-putIn">
            <p class="left">昨日消耗 (元)<span class="num-putIn">{{msgData.yesterdayConsMoney}}</span></p>
            <p class="left">总消耗 (元)<span class="num-putIn">{{msgData.consMoney}}</span></p>
            <div class="clear"></div>
          </div>
          <div class="status-putIn">
            <span :class="'status' + color">{{msgData.authState}}</span>
          </div>
        </div>
        <div class="line"></div>
        <div class="dataNum-putIn">
          <div class="numBox-putIn">
            <div class="numBox-putIn-Box">
              <div class="numPutIn-items left">
                <p class="items1-putIn">{{msgData.infoCount}}</p>
                <p class="items2-putIn">展示数 (次)</p>
              </div>
              <div class="numPutIn-items left">
                <p class="items1-putIn">{{msgData.clikeCount}}</p>
                <p class="items2-putIn">点击数 (次)</p>
              </div>
              <div class="numPutIn-items left">
                <p class="items1-putIn">{{msgData.clikeCountRate}}</p>
                <p class="items2-putIn">点击率 (%)</p>
              </div>
              <div class="numPutIn-items left">
                <p class="items1-putIn">{{msgData.converCountRate}}</p>
                <p class="items2-putIn">转化率 (%)</p>
              </div>
              <div class="clear"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex';
    export default {
        name: 'putBusinessItems',
        data () {
          return {
            color: '1', // 颜色显示
            authStates: '待审核' // 渲染数据
          };
        },
        props: ['msgData'],
        created () {
          this.authState(this.msgData.authState);
        },
        watch: {
          msgData: {
            handler (a, b) {
              this.authState(this.msgData.authState);
            },
            deep: true
          }
        },
        mounted () {},
        methods: {
          ...mapMutations({
            setInstName: 'setInstName'
          }),
          authState (e) { // 获取详情页状态
            if (e === '0') {
              this.msgData.authState = '待审核';
              this.color = 1;
            } else if (e === '1') {
              this.msgData.authState = '投放中';
              this.color = 2;
            } else if (e === '2') {
              this.msgData.authState = '未通过';
              this.color = 3;
            } else if (e === '3') {
              this.msgData.authState = '已暂停';
              this.color = 4;
            };
          },
          goToPutInDetails (e, evn) {
            console.log(e, evn, '1');
            this.$store.commit('setInstName', evn);
            this.$router.push({
              path: '/bunesinessDetails',
              query: {instId: e}
            });
          }
        }
      };
</script>

<style scoped>
  .content-putIn{
    position: relative;
    width: 100%;
    margin-bottom: 1.5vw;
  }
  .putIn-box{
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  .putIn-top{
    position: relative;
    width: 100vw;
    padding: 2vw 4vw;
    background: #fff;
  }
  .title-putIn{
    position: relative;
    width: 100%;
  }
  .title-putIn>p{
    position: relative;
    width: 100%;
    font-family: PingFang-SC-Bold;
    font-size: 4.266vw;
    color: #2E2E30;
    line-height: 8vw;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .status-putIn>span{
    position: absolute;
    top: -3vw;
    right: -16vw;
    width: 37.8vw;
    height: 13vw;
    color: #fff;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    font-family: PingFangSC-Medium;
    font-size: 3.5vw;
    line-height: 18vw;
    text-align: center
  }
  .status1{
    background-image: linear-gradient(-139deg, #FFD137 0%, #FAB100 100%);
  }
  .status2{
    background-image: linear-gradient(44deg, #15D49F 0%, #57D6CF 100%);
  }
  .status3{
    background-image: linear-gradient(-138deg, #FF4D4D 0%, #FF824D 100%);
  }
  .status4{
    background: #9B9B9B;
  }
  .xiaohao-putIn{
    position: relative;
    width: 100%;
  }
  .xiaohao-putIn>p{
    position: relative;
    width: 40%;
    font-family: PingFangSC-Regular;
    font-size: 3.2vw;
    color: #9B9B9B;
    line-height: 7vw;
  }
  .num-putIn{
    color: #00C6A1;
    margin-left: 1.5vw;
  }
  .dataNum-putIn{
    position: relative;
    width: 100vw;
    padding: 2vw 4vw;
    background: #fff;
  }
  .numBox-putIn{
    position: relative;
    width: 100%;
  }
  .numBox-putIn-Box{
    position: relative;
    width: 100%;
    padding: 2vw 0 2vw 0;
  }
  .numPutIn-items{
    position: relative;
    width: 25%;
  }
  .items1-putIn{
    font-family: PingFang-SC-Medium;
    font-size: 3.73vw;
    color: #2E2E30;
    letter-spacing: 0;
    line-height: 5vw;
  }
  .items2-putIn{
    font-family: PingFangSC-Light;
    font-size: 3.2vw;
    color: #9B9B9B;
    letter-spacing: 0;
    line-height: 4vw;
  }
</style>
