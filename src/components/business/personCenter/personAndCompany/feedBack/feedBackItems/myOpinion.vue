<template>
  <div class="">
    <myOpinionList  v-if="!isFindAll"></myOpinionList>
    <findAll v-if="isFindAll"></findAll>
  </div>
</template>

<script>
  import { Rater } from 'vux';
  import myOpinionList from './myOpinionList';
  import findAll from './findAll';
  import downArrow from '@/assets/images/business/home/personCenter/downArrow.png';
  import { mapGetters } from 'vuex';
  export default {
    name: 'myOpinion',
    components: {
      Rater,
      myOpinionList,
      findAll
    },
    data () {
      return {
        downArrow: downArrow,
        isFindAll: false // 查看全部，默认false
      };
    },
    computed: {
      ...mapGetters(['FEEDBACK'])
    },
    watch: {
      FEEDBACK: {
        handler (a, b) {
          this.isFindAll = a.isFindAll; // 查看全部
        },
        deep: true
      }
    },
    mounted () {},
    methods: {
    }
  };
</script>

<style scoped>
  .opinion-content{
    position: fixed;
    width: 100%;
    padding: 4vw 4vw 5vh 4vw;
    height: 91vh;
    overflow: scroll;
    background: #fff;
    -webkit-overflow-scrolling:touch;
  }
  .opinion-cont{
    position: relative;
    width: 100%;
    padding-bottom: 12vw;
  }
  .myOp-box{
    position: relative;
    width: 100%;
  }
  .my-op-items{
    position: relative;
    width: 100%;
    margin-top: 6vw;
  }
  .pingJia{
    position: relative;
    width: 100%;
    height: 8vw;
  }
  .PJ-left{
    position: relative;
    width: 50%;
  }
  .PJ-right{
    position: relative;
    width: 50%;
  }
  .PJ-right>p{
    font-family: PingFangSC-Regular;
    font-size: 3.2vw;
    color: #9B9B9B;
    line-height: 8vw;
    text-align: right;
  }
  .YDWT{
    position: relative;
    width: 100%;
  }
  .YDWT>p{
    font-family: PingFangSC-Regular;
    font-size: 3.2vw;
    color: #9B9B9B;
    line-height: 10vw;
  }
  .textArea{
    position: relative;
    width: 100%;
    margin-bottom: 4vw;
    height: 13vw;
    overflow: hidden;
  }
  .textArea>p{
    position: relative;
    width: 100%;
    font-family: PingFangSC-Regular;
    font-size: 3.5vw;
    color: #2E2E30;
    text-align: justify;
    line-height: 7vw;
  }
  .findAll{
    position: absolute;
    right: 0;
    top: 8.5vw;
  }
  .findAll>p{
    font-family: PingFangSC-Regular;
    font-size: 3.5vw;
    color: #02C2A2;
  }
  .findAll>img{
    position: relative;
    width: 3.5vw;
    margin-left: 1vw;
    margin-top: 0.5vw;
  }



  .LJ-buy-btn1{
    position: fixed;
    /* width: 100%; */
    width: 92vw;
    padding: 0vw;
    height: 12vw;
    bottom: 0;
    margin-bottom: 1vw;
    z-index: 109;
  }
  .LJ-cont{
    position: relative;
    width: 100%;
  }
  .LJ-cont>p{
    font-family: PingFangSC-Regular;
    font-size: 3.5vw;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 12vw;
    background: #02C2A2;
    border-radius: 2px;
    text-align: center;
  }
</style>
