<template>
  <div class="content-BunessDetails">
    <topBox>
      <p class="title-putIn">
        <!--{{PUTINBUSINESS.instName}}-->
        商机详情
      </p>
    </topBox>
    <div class="detailsPutIn-Box-Cont">
      <detailsPutIn></detailsPutIn>
      <dataTrendKanban></dataTrendKanban>
    </div>
  </div>
</template>

<script>
    import topBox from './../../../../../../common/topBox';
    import detailsPutIn from './bunesinessDetailsItems/detailsPutIn';
    import dataTrendKanban from './bunesinessDetailsItems/dataTrendKanban';
    import { mapGetters } from 'vuex';
    export default {
        name: 'bunesinessDetails',
        components: {
          topBox,
          detailsPutIn,
          dataTrendKanban
        },
        data () {
          return {
          };
        },
        computed: {
          ...mapGetters(['PUTINBUSINESS'])
        },
        watch: {
          PUTINBUSINESS: {
            handler (a, b) {
              console.log(a, b);
            },
            deep: true
          }
        }
    };
</script>

<style scoped>
  .content-BunessDetails{
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: #F6F6F6;
  }
  .detailsPutIn-Box-Cont{
    position: relative;
    width: 100%;
    min-height: 97vh;
  }
</style>
