<template>
    <div class="previewImg-content">
      <div class="previewImg-box">
        <div class="mask-previewImg">
          <div class="previewImg" @click="clickEvent">
            <img :src="previewImgSrc" alt="" class="">
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'previewImg',
        components: {
        },
        props: ['previewImgSrc'],
        data () {
          return {
          };
        },
        methods: {
          clickEvent () {
            this.$emit('sendValueToParent', false);
          }
        }
      };
</script>

<style scoped>
  .previewImg-content{
    position: fixed;
    width: 100%;
    top: 0vw;
    height: 100vh;
    z-index: 108;
  }
  .previewImg-box{
    position: relative;
    width: 100%;
    background-color: #000;
    height: 100%;
  }
  .mask-previewImg{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .previewImg{
    position: relative;
    width: 98vw;
    margin-left: 1vw;
    height: 100vh;
    z-index: 109;
  }
  .previewImg>img{
    max-width: 100%;
    max-height: 100%;
    display: table-cell;
    vertical-align: middle;
    position: relative;
    margin: 0;
    position: absolute;
    top:50%;
    left:50%;
    width:100%;
    transform:translate(-50%,-50%);
  }
</style>
