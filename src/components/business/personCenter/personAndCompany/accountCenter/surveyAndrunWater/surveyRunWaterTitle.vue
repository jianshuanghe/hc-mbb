<template>
  <div class="newsTitle-box">
    <div class="newsTitle">
      <div class="center-news">
        <div class="news-TBox left" @click="clickNewsType(1)">
          <div :class="clickItemsIndex === 1 ? 'Tbox-items Tb-checked' : 'Tbox-items'">
            <p class="">账户概况</p>
            <div class="hengLine" v-if="clickItemsIndex === 1"></div>
          </div>
        </div>
        <div class="news-TBox left" @click="clickNewsType(2)">
          <div  :class="clickItemsIndex === 2 ? 'Tbox-items Tb-checked' : 'Tbox-items'">
            <p class="">账户流水</p>
            <div class="hengLine"  v-if="clickItemsIndex === 2"></div>
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex';
  export default {
      name: 'surveyRunWaterTitle',
      components: {
      },
      data () {
        return {
          confirmShow: false,
          clickItemsIndex: 1 // 用户切换类型
        };
      },
      computed: {
        ...mapGetters(['ACCOUNTCENTER'])
      },
      watch: {
        ACCOUNTCENTER: {
          handler (a, b) {
            this.clickItemsIndex = a.accountCenterTitle; // 侦听切换账户概况和账户流水
          },
          deep: true
        }
      },
      methods: {
        ...mapMutations({
          setAccountCenterTitle: 'setAccountCenterTitle'
        }),
        clickNewsType (e) {
          console.log(e, '切换账户概况和账户流水');
          this.$store.commit('setAccountCenterTitle', e);
        }
      }
    };
</script>

<style scoped>
  .newsTitle-box{
    position: relative;
    width: 100%;
  }
  .newsTitle{
    position: relative;
    width: 100%;
  }
  .center-news{
    position: relative;
    width: 55%;
    margin-left: 20%;

  }
  .news-TBox{
    position: relative;
    width: 50%;
  }
  .Tbox-items{
    position: relative;
    width: 100%;
  }
  .Tbox-items>p{
    font-family: PingFangSC-Regular;
    font-size: 3.733vw;
    color: #2E2E30;
    letter-spacing: 0;
    text-align: center;
    line-height: 7vw;
  }
  .hengLine{
    position: relative;
    width: 5vw;
    height: 1px;
    background: #15D49F;
    margin: 0 auto;
  }
  .Tb-checked>p{
    color: #02C2A2 !important;
  }
  .allRead-box{
    position: absolute;
    top: 0;
    right: 0;
  }
  .allRead-box>p{
    position: relative;
    font-family: PingFangSC-Regular;
    font-size: 3.5vw;
    color: #5D5D5D;
    text-align: right;
    line-height: 7vw;
  }
</style>
