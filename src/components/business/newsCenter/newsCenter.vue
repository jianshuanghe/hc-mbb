<template>
  <div class="news-content">
    <topBox>
      <newsTitle></newsTitle>
    </topBox>
    <!--系统通知-->
    <newsItems v-if="clickItemsIndex === 1"></newsItems>
    <!--业务消息-->
    <newsItems2 v-if="clickItemsIndex === 2"></newsItems2>
  </div>
</template>

<script>
  import topBox from './../../common/topBox';
  import newsTitle from './newCenterItems/newsTitle';
  import newsItems from './newCenterItems/newsItems';
  import newsItems2 from './newCenterItems/newsItems2';
  import { mapGetters } from 'vuex';
    export default {
        name: 'newsCenter',
        components: {
          topBox,
          newsTitle,
          newsItems,
          newsItems2
        },
        data () {
          return {
            clickItemsIndex: 1 // 用户切换类型
          };
        },
        computed: {
          ...mapGetters(['NEWSCEBNTER'])
        },
        watch: {
          NEWSCEBNTER: {
            handler (a, b) {
              this.clickItemsIndex = a.newsTitle; // 侦听切换类型消息
            },
            deep: true
          }
        }
      };
</script>

<style scoped>
  .news-content{
    position: relative;
    margin-bottom: 4vh;
    -webkit-overflow-scrolling:touch;
  }
</style>
