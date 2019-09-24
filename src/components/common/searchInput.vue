<template>
  <div class="searchNoInput">
    <div class="search-NI">
      <div class="search-NI-img left">
        <img src="./../../assets/images/common/search.png" alt="" class="img">
      </div>
      <div class="search-NI-text left">
        <p class="">商机名称</p>
      </div>
      <div class="search-NI-text left">
        <p class="">商机名称</p>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'searchInput'
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
    margin-top: 1vw;
    margin-left: 1vw;
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
</style>
