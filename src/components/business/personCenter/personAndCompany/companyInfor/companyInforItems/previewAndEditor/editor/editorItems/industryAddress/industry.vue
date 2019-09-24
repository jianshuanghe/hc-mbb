<template>
    <div class="industry-content">
      <div class="mask-popup"  @click="clickCloseMask">
      </div>
      <div class="insBSP-box">
        <div class="industry-box">
          <div class="content-I">
            <div class="items-I">
              <div class="cont-I">
                <div class="cont-items-I left"  @click="clickCheckitems(items.typeName, items.id)" v-for="(items, index) in industryData" :key="index">
                  <div class="cont-box-I">
                    <p :class="(clickItemsIndex === items.id || industryDataCkeck.compTypePcode === items.id) ? 'checkedItems' : ''">{{items.typeName}}</p>
                  </div>
                </div>
                <div class="clear"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="BSP-button">
          <div class="btn-I">
            <div class="line"></div>
            <div class="btn-bsp">
              <div class="reset-bsp-I left">
                <div class="reset-box" @click="clickReset">
                  <p class="">取消</p>
                </div>
              </div>
              <div class="confirm-bsp-I right">
                <div class="confirm-box" @click="clickConfirm">
                  <p class="">保存</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex';
  import axios from 'axios';
  import { Toast } from 'mint-ui';
    export default {
        name: 'industry',
        data () {
          return {
            industryData: {}, // 接口返回所属行业数据
            industryDataCkeck: {}, // 用户勾选的
            clisckItems: '', // 记录点击的行业
            clickItemsIndex: '' // 记录子项点击的index
          };
        },
        computed: {
          ...mapGetters(['PERSONCENTER'])
        },
        watch: {
          PERSONCENTER: {
            handler (a, b) {
              this.industryData = a.industry.industryData; // 所属行业数据
              this.industryDataCkeck = a.industry.industryCheck; // 所属会员
            },
            deep: true
          }
        },
        created () {
          if (this.EVN === 'production') {
            axios.defaults.baseURL = this.apiProd2;
          }
          this.$store.commit('setLoadingShow', false); // 更新vuex loading 重置
          this.getIndustry();
        },
        methods: {
          ...mapMutations({
            setIndustryShow: 'setIndustryShow',
            setIndustryData: 'setIndustryData',
            setIndustryCheck: 'setIndustryCheck',
            setLoadingShow: 'setLoadingShow',
            setLoadingText: 'setLoadingText'
          }),
          clickCloseMask () {
            this.$store.commit('setIndustryShow', false);
            console.log('触发关闭所属行业');
          },
          getIndustry () { // 获取所属行业
            this.$store.commit('setLoadingShow', true); // 更新vuex loading
            let landRegistLG = JSON.parse(localStorage.getItem('landRegist')); // 读取缓存的用户信息
            console.log(landRegistLG.user.id);
            axios.get(this.api2 + '/rest-rp/compIndustry/selectList?userId=' + landRegistLG.user.id).then((response) => {
              console.log(response);
              if (response.data.ret === '200') {
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
                this.$store.commit('setIndustryData', response.data.content); // 更新vuex setIndustryData
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
          clickCheckitems (evn, e) {
            console.log(evn, e, '点击的子项的');
            this.industryDataCkeck = {
              compTypePcodeStr: evn,
              compTypePcode: e
            };
            this.clickItemsIndex === e ? this.clickItemsIndex = '' : this.clickItemsIndex = e;
          },
          clickReset () {
            console.log('出发取消按钮');
            this.$store.commit('setIndustryCheck', {}); // 更新vuex setIndustryCheck
            this.clickCloseMask();
          },
          clickConfirm () {
            console.log('触发了保存按钮');
            this.$store.commit('setIndustryCheck', this.industryDataCkeck); // 更新vuex setIndustryCheck
            this.clickCloseMask();
          }
        }
      };
</script>

<style scoped>
  .industry-content{
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 108;
    top: 0;
  }
  .mask-popup{
    position: relative;
    height: 100vh;
    width: 100%;
    background: rgba(19, 9, 9, 0.59);
  }
  .insBSP-box{
    position: absolute;
    top: 0;
    right: 0;
    z-index: 104;
  }
  .industry-box{
    position: relative;
    width: 86.933vw;
    float: right;
    background: #fff;
    height: 100vh;
    overflow: scroll;
    padding-bottom: 15vw;
    -webkit-overflow-scrolling:touch;
  }
  .content-I{
    position: relative;
    width: 100%;
    padding: 5vw 1vw 5vw 4vw;
  }
  .items-I{
    position: relative;
    width: 100%;
    margin-bottom: 5vw;
  }
  .title-I{
    position: relative;
    width: 100%;
    margin-bottom: 2vw;
  }
  .title-I>p{
    font-family: PingFang-SC-Medium;
    font-size: 3.733vw;
    color: #2E2E30;
    letter-spacing: 0;
    line-height: 9vw;
  }
  .cont-I{
    position: relative;
    width: 100%;
  }
  .cont-items-I{
    position: relative;
    width: 33.3333%;
  }
  .cont-box-I{
    position: relative;
    width: 90%;
    margin-bottom: 2vw;
  }
  .cont-box-I>p{
    position: relative;
    width: 100%;
    font-family: PingFang-SC-Medium;
    font-size: 3.5vw;
    color: #2E2E30;
    letter-spacing: 0;
    line-height: 7vw;
    background: #FFFFFF;
    border: 1px solid #E2E2E2;
    border-radius: 2px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .checkedItems{
    background: #12f3cd40 !important;
    color: #02C2A2 !important;
    border: 1px solid #02C2A2 !important;
  }



  .BSP-button{
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  .btn-I{
    position: relative;
    bottom: 0;
    width: 86.933vw;
    background: #fff;
  }
  .btn-bsp{
    position: relative;
    width: 100%;
    padding: 0 0vw 0 5vw;
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
    line-height: 10vw;
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
    line-height: 10vw;
    text-align: center;
  }
</style>
