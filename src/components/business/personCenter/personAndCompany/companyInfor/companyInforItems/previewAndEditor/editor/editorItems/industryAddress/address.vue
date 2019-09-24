<template>
  <div class="editBasicInfor-content">
    <div class="editBasicInfor">
      <div class="editBasicInfor-box">
        <!--行业 地址 二维码-->
        <div class="MI-box">
          <div class="MI-items">
            <div class="MI-left-EBI left">
              <img :src="xing" alt="" class="img">
              <p class="">选择地区</p>
            </div>
            <div class="MI-right right">
              <div class="right-Box-MI" @click="">
                <div class="img-MI left">
                  <div class="content-block">
                    <input id="demo1" type="text"  ref='menuItem1'readonly="" placeholder="城市选择特效" :class="1 ? 'intro-MI2' : 'intro-MI'"  v-model="info.idString"/>
                    <input id="value1" type="hidden" ref='menuItem2' value="20,234,504"/>
                  </div>
                  <!--<p :class="1 ? 'intro-MI2' : 'intro-MI'">点击选择</p>-->
                </div>
                <div class="arrow-img-MI left">
                  <img :src="lineRightArrow" alt="" class="right">
                </div>
              </div>
            </div>
            <div class="clear"></div>
            <div class="line"></div>

          </div>
          <div class="MI-items">
            <div class="MI-left-EBI left">
              <img :src="xing" alt="" class="img">
              <p class="">详细地址</p>
            </div>
            <div class="MI-right right">
              <div class="right-Box-MI">
                <div class="img-MI EBI-img-MI left">
                  <input type="text" v-model="info.idaddress" name="lname" class="perInfoItemR" placeholder="点击填写"/>
                </div>
                <div class="arrow-img-MI left">
                </div>
              </div>
            </div>
            <div class="clear"></div>
          </div>
        </div>
      </div>

    </div>
    <div class="BIF-bottom">
      <div class="reset-bsp-I left">
        <div class="reset-box" @click="clickReset">
          <p class="">取消</p>
        </div>
      </div>
      <div class="confirm-bsp-I right">
        <div class="confirm-box" @click="clickSaveAddress">
          <p class="">保存</p>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
  import lineRightArrow from '@/assets/images/common/line-right-arrow.png';
  import xing from '@/assets/images/common/xing.png';
  import { mapMutations, mapGetters } from 'vuex';
  import { LAreaData } from './../../../../../../../../../../utils/LAreaData.js';
  import LArea from './../../../../../../../../../../../static/js/LArea.min.js';
  import { Toast } from 'mint-ui';
  export default {
    name: 'addressBs',
    components: {
    },
    data () {
      return {
        text: '',
        lineRightArrow: lineRightArrow,
        xing: xing,
        addressDetail: '',
        info: {
          idStringAddress: '', // 用户地址省市区和详细地址拼接
          idString: '', // 地址显示省市区
          addrPcode: '', // 省
          addrCcode: '', // 市
          addrAcode: '', // 区
          idaddress: '' // 详细地址
        },
        UserData: {},
        imgData: {}
      };
    },
    created () {
      this.info.idString = this.PERSONCENTER.info.idString;
      this.info.idaddress = this.PERSONCENTER.info.idaddress;
      this.$nextTick(() => {
        this.addressChoose();
      });
    },
    computed: {
      ...mapGetters(['PERSONCENTER'])
    },
    watch: {
      PERSONCENTER: {
        handler (a, b) {
          this.info.idStringAddress = a.info.idStringAddress;
          console.log(a, b);
        },
        deep: true
      }
    },
    methods: {
      ...mapMutations({
        setAddShow: 'setAddShow',
        setIdStringAddress: 'setIdStringAddress',
        setIdString: 'setIdString',
        setAddrPcode: 'setAddrPcode',
        setAddrCcode: 'setAddrCcode',
        setAddrAcode: 'setAddrAcode',
        setIdAddress: 'setIdAddress',
        setLoadingShow: 'setLoadingShow',
        setLoadingText: 'setLoadingText'
      }),
      addressChoose () {
        var area1 = new LArea();
        area1.init({
          'trigger': '#demo1', // 触发选择控件的文本框，同时选择完毕后name属性输出到该位置
          'valueTo': '#value1', // 选择完毕后id属性输出到该位置
          'keys': {
            id: 'id',
            name: 'name'
          }, // 绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
          'type': 1, // 数据源类型
          'data': LAreaData // 数据源
        });
        area1.value = [1, 13, 3]; // 控制初始位置，注意：该方法并不会影响到input的value
        // success 回调是自己在lare.js中添加得
        area1.success = () => {
          this.info.idString = this.$refs.menuItem1.value;
          let idString = this.$refs.menuItem2.value;
          let idArr = idString.split(',');
          console.log(idArr, 'idArr获取的值');
          this.info.addrPcode = idArr[0];
          this.info.addrCcode = idArr[1];
          this.info.addrAcode = idArr[2];
          console.log(idArr);
        };
      },
      clickReset () {
        console.log('取消');
        this.$store.commit('setAddShow', false); // 更新vuex setAddShow
      },
      clickSaveAddress () {
        console.log('触发保存地址按钮');
        if (this.info.idString === '') {
          Toast('请选择地区！');
          return;
        };
        if (this.info.idaddress === '') {
          Toast('请填写详细地址！');
          return;
        };
        this.$store.commit('setIdString', this.info.idString); // 更新vuex setIdString
        this.$store.commit('setIdAddress', this.info.idaddress); // 更新vuex setIdAddress
        let StringAddress = this.info.idString + ',' + this.info.idaddress;
        this.$store.commit('setIdStringAddress', StringAddress); // 更新vuex setIdStringAddress
        this.$store.commit('setAddrPcode', this.info.addrPcode); // 更新vuex setAddrPcode
        this.$store.commit('setAddrCcode', this.info.addrCcode); // 更新vuex setAddrCcode
        this.$store.commit('setAddrAcode', this.info.addrAcode); // 更新vuex setAddrAcode
        this.$store.commit('setAddShow', false); // 更新vuex setAddShow
      }
    }
  };
</script>

<style scoped>
  .editBasicInfor-content{
    position: relative;
    width: 100%;
    background: #F9F9F9;
  }
  .editBasicInfor{
    position: relative;
    width: 100%;
    background: #F9F9F9;
    padding-bottom: 5vh;
  }
  .editBasicInfor-box{
    position: relative;
    width: 100%;
    margin-bottom: 20vh;
  }
  .topTips{
    position: relative;
    width: 100%;
    background: #F9F9F9;
    padding: 0 4vw 0 4vw;
  }
  .topTips>p{
    position: relative;
    width: 100%;
    font-family: PingFangSC-Light;
    font-size: 3.2vw;
    color: #9B9B9B;
    line-height: 8vw;
    text-align: center;
  }
  .EBI-textArea{
    position: relative;
    width: 100%;
    background: #fff;
    padding: 0 4vw 0 4vw;
  }
  .textAarea-box{
    position: relative;
    width: 100%;
  }
  .introduce2{
    position: relative;
    width: 96%;
    margin-left: 4%;
  }
  .MI-box{
    position: relative;
    width: 100%;
    padding: 0vw 4vw 0 4vw;
    background: #fff;
  }
  .MI-items{
    position: relative;
    width: 100%;
  }
  .MI-left-EBI{
    position: relative;
    width: 50%;
    height: 15vw;
  }
  .MI-left-EBI>img{
    position: relative;
    width: 2vw;
    float: left;
    top: 5.5vw;
    margin-right: 1vw;
    left: 0;
    display: inline-block;
  }
  .MI-left-EBI>p{
    position: absolute;
    font-family: PingFangSC-Light;
    font-size: 3.733vw;
    color: #2E2E30;
    line-height: 15vw;
    margin-left: 4vw;
  }
  .MI-right{
    position: relative;
    width: 50%;
  }
  .right-Box-MI{
    position: relative;
    width: 100%;
  }
  .img-MI{
    position: relative;
    width: 90%;
  }
  .EBI-img-MI{
    width: 100% !important;
  }
  .arrow-img-MI{
    position: relative;
    width: 10%;
  }
  .arrow-img-MI>img{
    position: relative;
    width: 2vw;
    height: 2vw;
    margin-top: 6.5vw;
    float: right;
  }
  .perInfoItemR {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-family: PingFangSC-Regular;
    font-size: 3.733vw;
    color: #3C3C3F;
    letter-spacing: 0;
    /* height: 15vw; */
    padding: 5vw 0;
    /* margin: 5vw 0; */
    line-height: 5vw;
    text-align: right;
    margin-right: 1vw;
    float: left;
  }
  .intro-MI{
    font-family: PingFangSC-Regular;
    font-size: 3.733vw;
    color: #D2D2D2;
    letter-spacing: 0;
    text-align: right;
    line-height: 15vw;
  }
  .intro-MI2{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-family: PingFangSC-Regular;
    font-size: 3.733vw;
    color: #3C3C3F;
    letter-spacing: 0;
    text-align: right;
    line-height: 15vw;
  }
  .BIF-bottom{
    position: fixed;
    width: 100%;
    /* padding: 0vw 4vw 0vw 4vw; */
    bottom: 0;
    z-index: 105;
    background: rgba(255,255,255,0.90);
    box-shadow: 0 -1px 0 0 #F5F5F5;
    background: #fff;
  }
  .BIF-btn{
    position: relative;
    width: 100%;
    background: #02C2A2;
    border-radius: 2px;
    font-family: PingFangSC-Regular;
    font-size: 3.733vw;
    color: #FFFFFF;
    text-align: center;
    letter-spacing: 0;
    line-height: 12vw;
  }
  .reset-bsp-I{
    position: relative;
    width: 50%;
  }
  .reset-box{
    position: relative;
    width: 100%;
  }
  .reset-box>p{
    position: relative;
    font-family: PingFangSC-Regular;
    font-size: 3.733vw;
    color: #2E2E30;
    letter-spacing: 0;
    line-height: 12vw;
    text-align: center;
  }
  .confirm-bsp-I{
    position: relative;
    width: 50%;
  }
  .confirm-box{
    position: relative;
    width: 100%;
    background: #02C2A2;
  }
  .confirm-box>p{
    position: relative;
    font-family: PingFangSC-Regular;
    font-size: 3.733vw;
    color: #fff;
    letter-spacing: 0;
    line-height: 12vw;
    text-align: center;
  }


</style>
