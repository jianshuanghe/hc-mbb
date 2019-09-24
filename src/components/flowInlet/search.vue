<template>
  <div class="content">
    <div class="search_box-No">
      <div class="search-NI-img left">
        <img :src="search" alt="" class="img">
      </div>
      <div class="search-NI-text left"@click="clickSearch">
        <input type="text" class="left inputSearch" placeholder="商机名称" />
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
  import search from '@/assets/images/common/search.png';
  export default {
    name: 'search',
    data () {
      return {
        value: '商机名称',
        search: search
      };
    },
    methods: {
      clickSearch () {
        console.log('点击触发搜索组件');
        this.$router.push({
          path: '/searchDetileFlowInlet',
          query: {}
        });
      }
    }
  };
</script>

<style scoped>
  .content{
    position: relative;
    width: 100%;
    background: #fff;
  }
  .search_box-No{
    position: relative;
    width: 100%;
    background: #F6F6F6;
    border-radius: 15px;
    height: 8vw;
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

</style>
