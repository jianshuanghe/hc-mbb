<template>
  <div class="empty-content">
    <div class="empty">
      <img src="./../../assets/images/common/empty.png" alt="" class="img">
    </div>
    <div class="emptyBlankText">
      <p class=""><slot></slot></p>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'empty'
    };
</script>

<style scoped>
  .empty-content{
    position: relative;
    width: 100%;
    padding-top: 24vw;
  }
  .empty{
    position: relative;
    width: 37.86vw;
    height: 32.26vw;
    margin: auto;
  }
  .empty>img{
    position: relative;
    width: 100%;
  }
  .emptyBlankText{
    position: relative;
    width: 100%;
    margin-top: 5vw;
  }
  .emptyBlankText>p{
    position: relative;
    width: 100%;
    font-size: 4vw;
    line-height: 10vw;
    text-align: center;
    color: #4a4c5b;
  }
</style>
