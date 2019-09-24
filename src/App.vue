<template>
<div id="app" class="Home-box-content">
    <router-view v-show="!LEAVEMESSAGE.show"></router-view>
    <!--快捷导航-->
    <quickNavigation v-if="QUICKNAV.quickNavShow"></quickNavigation>
    <div >
      <loading :show="loadingShow" text="请稍等..."></loading>
    </div>
    <!--留言模块-->
    <leaveMessage v-if="LEAVEMESSAGE.show"></leaveMessage>
  </div>
</template>

<script>
import { Loading } from 'vux';
import { mapMutations, mapGetters } from 'vuex';
import quickNavigation from './components/common/quickNavigation';
import leaveMessage from './components/common/leaveMessage';
import { isWeiXin } from './utils/browserType.js';
export default {
  name: 'app',
  components: {
    Loading,
    quickNavigation,
    leaveMessage
  },
  data () {
    return {
      loadingShow: false
    };
  },
  created () {
    // localStorage.clear(); // 清除缓存
    if (!localStorage.getItem('searchHistoryData')) {
      let searchHistoryData = []; // 设置搜索历史
      localStorage.setItem('searchHistoryData', JSON.stringify(searchHistoryData)); // 搜索历史数据
      this.$store.commit('setFindBusinessSearchHistoryData', searchHistoryData); // 更新vuex setFindBusinessSearchHistoryData
      this.$store.commit('setFlowInletSearchHistoryData', searchHistoryData); // 更新vuex setFlowInletSearchHistoryData
    } else {
      let historyList = JSON.parse(localStorage.getItem('searchHistoryData'));
      this.$store.commit('setFindBusinessSearchHistoryData', historyList); // 更新vuex setFindBusinessSearchHistoryData
      this.$store.commit('setFlowInletSearchHistoryData', historyList); // 更新vuex setFlowInletSearchHistoryData
    }
    isWeiXin();
  },
  computed: {
    ...mapGetters(['QUICKNAV', 'LOADING', 'LEAVEMESSAGE'])
  },
  watch: {
    LOADING: {
      handler (a, b) {
        this.loadingShow = a.loadingShow; // 侦听loading
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations({
      setFindBusinessSearchHistoryData: 'setFindBusinessSearchHistoryData',
      setFlowInletSearchHistoryData: 'setFlowInletSearchHistoryData'
    })
  }
};
</script>

<style>
  .Home-box-content{
    background: #fff;
    min-height: 100vh;
  }
</style>
