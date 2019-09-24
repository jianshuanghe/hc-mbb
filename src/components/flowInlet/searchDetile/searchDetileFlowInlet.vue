<template>
  <div class="content">
    <!--搜索头部-->
    <searchBox></searchBox>
    <div class="line"></div>
    <!--搜索历史-->
    <searchHistory v-if="!isSearch"></searchHistory>
    <!--搜索结果-->
    <searchResult  v-if="isSearch"></searchResult>
  </div>
</template>

<script>
    import searchBox from './searchBox';
    import searchHistory from './searchHistory';
    import searchResult from './searchResult';
    import { mapGetters } from 'vuex';
    export default {
        name: 'searchDetileFlowInlet',
        data () {
          return {
            value: '商机名称',
            isSearch: false // 默认没有搜索
          };
        },
      components: {
        searchBox,
        searchHistory,
        searchResult
      },
      computed: {
      ...mapGetters(['FLOWINLET'])
      },
      watch: {
        FLOWINLET: {
          handler (a, b) {
            this.isSearch = a.search.isSearch; // 侦听时候处于搜索状态
          },
          deep: true
        }
      },
      methods: {}
      };
</script>

<style scoped>
  .content{
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: #F6F6F6;
  }
</style>
