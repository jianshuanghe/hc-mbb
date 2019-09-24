<template>
  <div class="content">
    <div class="Statistics-box">
      <div class="Statistics-item left"  @click="goToPutInBusiness(1)">
        <p class="num">{{msgData.authStateCount}}</p>
        <p class="text">累计投放商机</p>
      </div>
      <div class="Statistics-item left"  @click="goToPutInBusiness(2)">
        <p class="num">{{msgData.authState0}}</p>
        <p class="text">待审核商机</p>
      </div>
      <div class="Statistics-item left"  @click="goToPutInBusiness(3)">
        <p class="num">{{msgData.authState1}}</p>
        <p class="text">投放中商机</p>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'Statistics',
        props: ['msgData'],
        data () {
          return {
            searchCondition: {  // 分页属性
              page: '1',
              userId: '',
              authState: '',
              isBanner: '',
              order: ''
            }
          };
        },
        methods: {
          goToPutInBusiness (e) {
            console.log(e, 'to投放商机');
            let query = {}; // 链接参数
            if (e === 2) { // 待审核
              this.searchCondition.authState = '0';
              this.$store.commit('setPutInBusinesSsearch', this.searchCondition);
              query = {
                index: 3, // 显示
                status: 0, // 状态
                value: '待审核'
              };
            }
            if (e === 3) { // 投放中状态
              this.searchCondition.authState = '1';
              this.$store.commit('setPutInBusinesSsearch', this.searchCondition);
              query = {
                index: 3, // 显示
                status: 1, // 状态
                value: '投放中'
              };
            }
            this.$router.push({
              path: '/putInBusiness',
              query: query
            });
          }
        }
    };
</script>

<style scoped>
  .content{
    position: relative;
    width: 100vw;
    padding: 2vw 4vw;
    background: #fff;
    margin-bottom: 1.5vw;
  }
  .Statistics-box{
    position: relative;
    width: 100%;
  }
  .Statistics-item{
    position: relative;
    width: 33.33333%;
  }
  .num{
    position: relative;
    width: 100%;
    text-align: center;
    ont-family: PingFang-SC-Bold;
    font-size: 4.8vw;
    color: #02C2A2;
    line-height: 6vw;
  }
  .text{
    position: relative;
    width: 100%;
    text-align: center;
    font-family: PingFang-SC-Medium;
    font-size: 3.2vw;
    color: #9B9B9B;
    line-height: 6vw;
  }
</style>
