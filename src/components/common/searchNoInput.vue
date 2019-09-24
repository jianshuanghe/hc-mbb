<template>
    <div class="searchNoInput">
      <div :class='isSearchNi ? "search-NI" : "search-N2" '>
        <div class="search-NI-img left">
          <img src="./../../assets/images/common/search.png" alt="" class="img">
        </div>
        <div class="search-NI-text left"@click="clickSearchStart">
          <input type="text" class="left inputSearch" placeholder="商机名称" />
        </div>
        <div class="clear"></div>
      </div>
      <div class="rightBox" v-if="isSearchNi">
        <img src="./../../assets/images/common/close.png" alt="" class="closeImg left" @click="clickClearInput">
        <p class="closeP left" @click="clickCancelSearch">取消</p>
        <div class="clear"></div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'searchNoInput',
        components: {
        },
        data () {
          return {
            isSearchNi: false // 搜索样式
          };
        },
        methods: {
          clickSearchStart () {
            console.log('开始搜索');
            this.isSearchNi = true;
          },
          clickCancelSearch () {
            console.log('取消搜索');
            this.isSearchNi = false;
          },
          clickClearInput () {
            console.log('清除');
          }
        }
      };
</script>

<style scoped>
  .searchNoInput{
    position: relative;
    width: 96%;
    margin-left: 4%;
  }
  .search-NI{
    position: relative;
    width: 88%;
    padding: 0.5vw;
    background: #F6F6F6;
    border-radius: 15px;
  }
  .search-N2{
    position: relative;
    width: 100%;
    padding: 0.5vw;
    background: #F6F6F6;
    border-radius: 15px;
  }
  .search-NI-img{
    position: relative;
    width: 4%;
  }
  .search-NI-img>img{
    width: 5vw;
    height: 5vw;
    margin-top: 1.8vw;
    margin-left: 2vw;
  }
  .search-NI-text{
    position: relative;
    width: 90%;
    margin-left: 5%;
  }
  .search-NI-text>p{
    position: relative;
    width: 100%;
    ont-family: PingFangSC-Regular;
    font-size: 3.466vw;
    color: #BDBDBD;
    line-height: 7vw;
  }
  .inputSearch{
    line-height: 8vw;
    /* margin-top: 0.8vw; */
    width: 90%;
    border: none;
    outline: none;
  }
  .rightBox{
    position: absolute;
    right: 0;
    top: 0;
  }
  .closeImg{
    position: relative;
    width: 5vw;
    padding: 0 2vw 0 2vw;
    margin-top: 1.5vw;
  }
  .closeP{
    position: relative;
    width: 10vw;
    text-align: right;
    font-family: PingFang-SC-Medium;
    font-size: 4.266vw;
    color: #02C2A2;
    letter-spacing: 0;
    line-height: 8vw;
  }
</style>
