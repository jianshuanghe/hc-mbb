<template>
    <div class="itemsList-NI">
      <topBox>
        <p class="title-putIn">消息详情</p>
      </topBox>
      <div class="NI-List">
        <div class="cont-NI">
          <div class="title-NList">
            <p class="">{{NewsItemsListData.title}}</p>
          </div>
          <div class="time-NList">
            <p class="">{{NewsItemsListData.createTimeStr}}</p>
          </div>
          <div class="line"></div>
          <!--<div class="img-NList">-->
            <!--<img :src="newsImg" alt="" class="">-->
          <!--</div>-->
          <div class="introduce-NList">
            <p class="">{{NewsItemsListData.content}}</p>
          </div>
          <div class="deleteBox-news" @click="clickDeleteNewsItems">
            <p class="">删除</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import topBox from './../../../../common/topBox';
    import newsImg from '@/assets/images/business/home/newsCenter/newsImg.jpg';
    import { Toast } from 'mint-ui';
    import axios from 'axios';
    export default {
        name: 'newsItemsList',
        components: {
          topBox
        },
        data () {
          return {
            loadingShow: false, // loading
            newsImg: newsImg,
            NewsItemsListData: {} // 后台返回详情数据
          };
        },
        created () {
          if (this.EVN === 'production') {
            axios.defaults.baseURL = this.apiProd2;
          }
          this.getNewsItemsListData();
        },
        mounted () {},
        methods: {
          clickDeleteNewsItems () {
            console.log('删除消息详情');
            axios.get(this.api2 + '/rest-rp/notice/del?ids=' + String(this.$route.query.id)).then((response) => {
              console.log(response);
              if (response.data.ret === '200') {
                Toast('删除成功！');
                setTimeout(() => {
                  this.$router.back(-1);
                }, 1000);
              }
            }).catch((error) => {
              this.loadingShow = false; // 隐藏loading
              Toast('网络繁忙，请稍后');
              console.log(error, '网络繁忙，请稍后');
            });
          },
          getNewsItemsListData () { // 获取消息详情
            console.log('获取消息详情');
            axios.get(this.api2 + '/rest-rp/notice/' + String(this.$route.query.id)).then((response) => {
              console.log(response);
              if (response.data.ret === '200') {
                this.NewsItemsListData = response.data.content;
              } else {
                this.loadingShow = false; // 隐藏loading
                Toast(response.data.msg);
              }
            }).catch((error) => {
              this.loadingShow = false; // 隐藏loading
              Toast('网络繁忙，请稍后');
              console.log(error, '网络繁忙，请稍后');
            });
          }
        }
      };
</script>

<style scoped>
  .itemsList-NI{
    position: relative;
    width: 100%;
  }
  .NI-List{
    position: relative;
    width: 100%;
    padding: 0 4vw 0 4vw;
    min-height: 100vh;
    background: #fff;
  }
  .cont-NI{
    position: relative;
  }
  .title-NList{
    position: relative;
  }
  .title-NList>p{
    font-family: PingFang-SC-Bold;
    font-size: 5.33vw;
    color: #2E2E30;
    line-height: 11vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 2vw 0 0 0;
  }
  .time-NList{
    position: relative;
    width: 100%;
  }
  .time-NList>p{
    position: relative;
    font-family: PingFangSC-Regular;
    font-size: 3.2vw;
    color: #9B9B9B;
    line-height: 11vw;
    margin-bottom: 1vw;
  }
  .img-NList{
    position: relative;
    width: 100%;
    padding: 3vw 0 3vw 0;
  }
  .img-NList>img{
    position: relative;
    width: 100%;
  }
  .introduce-NList{
    position: relative;
    width: 100%;
  }
  .introduce-NList>p{
    position: relative;
    width: 100%;
    text-align: justify;
    font-family: PingFangSC-Regular;
    font-size: 4vw;
    color: #5D5D5D;
    line-height: 9vw;
  }
  .deleteBox-news{
    position: relative;
    width: 100%;
    margin-top: 10vw;
  }
  .deleteBox-news>p{
    position: relative;
    width: 100%;
    background: #02C2A2;
    font-family: PingFangSC-Regular;
    font-size: 4.266vw;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 11vw;
    text-align: center;
  }
</style>
