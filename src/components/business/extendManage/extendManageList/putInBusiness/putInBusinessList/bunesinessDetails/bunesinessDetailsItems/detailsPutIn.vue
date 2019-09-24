<template>
  <div class="detailsPutIn-box">
    <div class="detailsPutIn">
      <div class="topDetail-Putin">
        <div class="top-details-item">
          <div class="item-detail-pi left">
            <div class="pi-text">
              <p class="">{{getDetailsPutInTop.instName}}</p>
            </div>
          </div>
          <div class="item-detail-ut left">
            <div class="ut-text"  v-if="putInShow">
              {{isPutIn ? '投放中': '暂停'}}
              <mt-switch v-model="isPutIn" @change="changPutIn(isPutIn)"></mt-switch>
            </div>
            <div class="ut-text"  v-else>
              <p class="">{{stateDp}}</p>
            </div>
          </div>
          <div class="clear"></div>
          <div class="line"></div>
        </div>
        <div class="top-details-item">
          <div class="item-detail-pi left">
            <div class="pi-text">
              <p class="">投放商机ID</p>
            </div>
          </div>
          <div class="item-detail-ut left">
            <div class="ut-text">
              <p class="">{{getDetailsPutInTop.instId}}</p>
            </div>
          </div>
          <div class="clear"></div>
          <div class="line"></div>
        </div>
        <div class="top-details-item">
          <div class="item-detail-pi left">
            <div class="pi-text">
              <p class="">关联投放链接</p>
            </div>
          </div>
          <div class="item-detail-ut left">
            <div class="ut-text">
              <p class="">{{getDetailsPutInTop.linkName}}</p>
            </div>
          </div>
          <div class="clear"></div>
          <div class="line"></div>
        </div>
        <div class="top-details-item">
          <div class="item-detail-pi left">
            <div class="pi-text">
              <p class="">投放位置</p>
            </div>
          </div>
          <div class="item-detail-ut left">
            <div class="ut-text">
              <p class="">{{getDetailsPutInTop.isBanner === '0' ?  '其他位置' : 'banner、其他位置'}}</p>
            </div>
          </div>
          <div class="clear"></div>
        </div>
      </div>
      <div class="bottomDetail-Putin">
        <div class="putin-data-de">
          <div class="data-pi-text">
            <p class="">申请时间 <span class="data-ut right">{{getDetailsPutInTop.createTime || '/'}}</span></p>
            <p class="" v-show="getDetailsPutInTop.authTime &&  getDetailsPutInTop.authState !== '0'">审核时间 <span class="data-ut right">{{getDetailsPutInTop.authTime || '/'}}</span></p>
            <p class="" v-show="more && getDetailsPutInTop.putInTime">投放时间 <span class="data-ut right">{{getDetailsPutInTop.putInTime || '/'}}</span></p>
            <p class="" v-show="more && getDetailsPutInTop.suspTime && getDetailsPutInTop.authState === '3'">暂停时间 <span class="data-ut right">{{getDetailsPutInTop.suspTime || '/'}}</span></p>
          </div>
          <div class="isMoreShow" v-if="isMoreShow">
            <div class="line"></div>
            <div class="isMore-box" @click="isShowMoreClick">
              <p class="">{{more ? '收起' : '查看更多'}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div >
      <loading :show="loadingShow" text="请稍等..."></loading>
    </div>
  </div>
</template>

<script>
  import { Loading } from 'vux';
  import axios from 'axios';
  import { Toast } from 'mint-ui';
  import { mapMutations } from 'vuex';
    export default {
        name: 'detailsPutIn',
        data () {
          return {
            loadingShow: false, // loading
            isPutIn: false, // 是否投放中
            putInShow: false, // true投放状态,false审核状态
            stateDp: '审核中',
            isMoreShow: false, // 是否显示加载更多组件
            more: false, // 显示更多
            getDetailsPutInTop: {} // 顶部信息
          };
        },
        components: {
          Loading
        },
        created () {
          this.getDetailsPutIn();
        },
        mounted () {},
        methods: {
          ...mapMutations({
            setLoadingShow: 'setLoadingShow',
            setLoadingText: 'setLoadingText'
          }),
          isShowMoreClick () {
            this.more = !this.more; // 是否显示更多
          },
          changPutIn (e) {  // 关闭投放 e=3代表关闭，0代表投放
            console.log(e, '触发关闭投放');
            this.$store.commit('setLoadingShow', true); // 更新vuex loading
            let params = {
              id: this.getDetailsPutInTop.id,
              authState: '3'
            };
            if (e === true) {
              params.authState = '0';
            };
            if (this.EVN === 'production') {
              axios.defaults.baseURL = this.apiProd2;
            }
            axios.post(this.api2 + '/rest-rp/putIn/putInUpdateStopDO', params).then((response) => {
              console.log(response);
              if (response.data.ret === '200') {
                this.getDetailsPutIn(); // 重新加载数据
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
          getDetailsPutIn () { // 获取详情页头部数据
            this.$store.commit('setLoadingShow', true); // 更新vuex loading
            let instId = this.$route.query.instId;
            if (this.EVN === 'production') {
              axios.defaults.baseURL = this.apiProd2;
            }
            axios.get(this.api2 + '/rest-rp/putIn/selectInstInfo/?instId=' + instId).then((response) => {
              console.log(response);
              if (response.data.ret === '200') {
                this.getDetailsPutInTop = response.data.content;
                this.dataEmpty(this.getDetailsPutInTop);
                if (this.getDetailsPutInTop.authState === '1' || this.getDetailsPutInTop.authState === '3') { // 投放中状态
                  this.putInShow = true;
                  this.isPutIn = true;
                  if (this.getDetailsPutInTop.authState === '3') { // 暂停状态
                    this.isPutIn = false;
                  };
                } else {
                  this.putInShow = false;
                  this.isPutIn = false;
                  if (this.getDetailsPutInTop.authState === '0') {
                    this.stateDp = '待审核';
                  };
                  if (this.getDetailsPutInTop.authState === '2') {
                    this.stateDp = '未通过';
                  };
                };
                this.$store.commit('setLoadingShow', false); // 更新vuex loading
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
          dataEmpty (evn) {
            console.log(evn, '判断数据中空数据的个数');
            let dataE = [];
            dataE.push(evn.authTime);
            dataE.push(evn.createTime);
            dataE.push(evn.putInTime);
            dataE.push(evn.suspTime);
            console.log(dataE);
            let num = 0;
            dataE.map((items, index) => {
              if (items) {
                num++;
              };
            });
            console.log(num, '非空数据个数');
            if (num > 2) {
              this.isMoreShow = true; // 如果非空数据大于2，则小时加载更多
              if (this.getDetailsPutInTop.authState === '0') { // 待审核状态，不展示更多
                this.isMoreShow = false; // 如果非空数据大于2，则小时加载更多
              }
            } else {
              this.isMoreShow = false; // 如果非空数据大于2，则小时加载更多
            }
          }
        }
    };
</script>

<style scoped>
 .detailsPutIn-box{
   position: relative;
   width: 100%;
 }
  .detailsPutIn{
    position: relative;
    width: 100%;
  }
  .topDetail-Putin {
    position: relative;
    width: 100vw;
    padding: 2vw 4vw;
    background: #fff;
    margin-bottom: 1.5vw;
  }
  .top-details-item{
    position: relative;
    width: 100%;
  }
  .item-detail-pi{
    position: relative;
    width: 50%;
  }
  .pi-text{
    position: relative;
    width: 100%;
  }
  .pi-text>p{
    font-family: PingFangSC-Regular;
    font-size: 3.733vw;
    color: #2E2E30;
    line-height: 11vw;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .item-detail-ut{
    position: relative;
    width: 50%;
  }
  .ut-text{
    position: relative;
    width: 100%;
    font-family: PingFangSC-Regular;
    font-size: 3.733vw;
    color: #5D5D5D;
    text-align: right;
    line-height: 9vw;
  }
  .ut-text>p{
    font-family: PingFangSC-Regular;
    font-size: 3.733vw;
    color: #5D5D5D;
    text-align: right;
    line-height: 11vw;
  }
 .ut-text>span{
   font-family: PingFangSC-Regular;
   font-size: 3.733vw;
   color: #5D5D5D;
   text-align: right;
   line-height: 11vw;
 }
  .bottomDetail-Putin{
    position: relative;
    width: 100vw;
    padding: 2vw 4vw 0 4vw;
    background: #fff;
    margin-bottom: 1.5vw;
  }
  .putin-data-de{
    position: relative;
    width: 100%;
  }
  .data-pi-text{
    position: relative;
    width: 100%;
  }
 .data-pi-text>p{
   font-family: PingFangSC-Regular;
   font-size: 3.733vw;
   color: #2E2E30;
   line-height: 8vw;
 }
  .isMore-box{
    position: relative;
    width: 100%;
  }
  .isMore-box>p{
    font-family: PingFang-SC-Medium;
    font-size: 3.5vw;
    color: #9B9B9B;
    line-height: 9vw;
    text-align: center;
  }
</style>
