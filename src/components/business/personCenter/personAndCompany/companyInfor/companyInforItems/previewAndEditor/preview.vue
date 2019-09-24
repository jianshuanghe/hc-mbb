<template>
  <div class="preview-content">
    <topBox>
      <companyInforTitle></companyInforTitle>
    </topBox>
    <!--基本信息-->
    <basicInfor v-if="clickItemsIndex === 1"></basicInfor>
    <!--资质认证-->
    <qualificatCert v-if="clickItemsIndex === 2"></qualificatCert>
  </div>
</template>

<script>
    import topBox from './../../../../../../common/topBox';
    import companyInforTitle from './preview/companyInforTitle';
    import basicInfor from './preview/previewItems/basicInfor';
    import qualificatCert from './preview/previewItems/qualificatCert';
    import { mapGetters } from 'vuex';
    export default {
        name: 'preview',
        components: {
          topBox,
          companyInforTitle,
          basicInfor,
          qualificatCert
        },
        data () {
          return {
            clickItemsIndex: 1 // 用户切换类型
          };
        },
        computed: {
          ...mapGetters(['PERSONCENTER'])
        },
        watch: {
          PERSONCENTER: {
            handler (a, b) {
              this.clickItemsIndex = a.personTitle; // 侦听切换类型消息
            },
            deep: true
          }
        }
      };
</script>

<style scoped>
  .preview-content{
    position: relative;
    min-height: 100vh;
    background: #F9F9F9;
  }
</style>
