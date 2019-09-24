<template>
  <div class="content-find">
  </div>
</template>

<script>
  export default {
    name: 'flowInlet',
    components: {},
    data () {
      return {
        loadingShow: false // loading
      };
    },
    created () {
      let queryFI = { // 此参数作为入口数据参数
        adveId: this.$route.query.adveId,
        advertPlatform: this.$route.query.advertPlatform
      };
      localStorage.setItem('queryFI', JSON.stringify(queryFI));
      let shareQuery = {}; // 定义转发分享之后的数据参数
      if (this.$route.query.instrucIdShare) {
        shareQuery.instrucIdShare = this.$route.query.instrucIdShare;
      }
      if (this.$route.query.share) {
        shareQuery.share = this.$route.query.share;
      }
      localStorage.setItem('shareQuery', JSON.stringify(shareQuery));
      let likeQuery = {}; // 定义点赞参数
      if (this.$route.query.instrucIdLike) {
        likeQuery.instrucIdLike = this.$route.query.instrucIdLike;
      }
      if (this.$route.query.like) {
        likeQuery.like = this.$route.query.like;
      }
      localStorage.setItem('likeQuery', JSON.stringify(likeQuery));
      let queryParams = {};
      if (this.$route.query.sessionId) { // 缓存链接上从如何秀返回来带的sessionId
        queryParams.sessionId = this.$route.query.sessionId;
      }
      this.$router.push({ // 跳转到真是的流量承载页
        path: '/flowInletReal',
        query: queryParams
      });
    },
    mounted () {
    },
    methods: {
    }
  };
</script>

<style scoped>
  .content-find{
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: #F6F6F6;
  }
</style>
