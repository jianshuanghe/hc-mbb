<template>
  <div class="editor-content">
    <div class="" v-show="PERSONCENTER.info.addShow">
      <!--地址组件-->
      <addressBs></addressBs>
    </div>
    <div class=""  v-show="!PERSONCENTER.info.addShow">
      <!--基本信息编辑-->
      <div class="editor-basic" v-if="PERSONCENTER.personTitle === 1">
        <topBox>
          <p class="title-putIn">编辑基本信息</p>
        </topBox>
        <editBasicInfor></editBasicInfor>
      </div>
      <!--资质认证编辑-->
      <div class="editor-qualificatCert" v-if="PERSONCENTER.personTitle === 2" >
        <topBox>
          <p class="title-putIn">编辑认证信息</p>
        </topBox>
        <editQualificatCert></editQualificatCert>
      </div>
    </div>

  </div>
</template>

<script>
    import topBox from './../../../../../../common/topBox';
    import editBasicInfor from './editor/editorItems/editBasicInfor';
    import editQualificatCert from './editor/editorItems/editQualificatCert';
    import addressBs from './editor/editorItems/industryAddress/address';
    import { mapMutations, mapGetters } from 'vuex';
    export default {
        name: 'editor',
        components: {
          addressBs,
          topBox,
          editBasicInfor,
          editQualificatCert
        },
        data () {
          return {
          };
        },
        created () {
          if (this.$route.query.personTitle) { // 定位当前处于状态
            let personTitle = Number(this.$route.query.personTitle);
            this.clickNewsType(personTitle);
          };
        },
        computed: {
          ...mapGetters(['PERSONCENTER'])
        },
        methods: {
          ...mapMutations({
            setPersonTitle: 'setPersonTitle'
          }),
          clickAllRead () {
            this.confirmShow = true;
          },
          clickNewsType (e) {
            console.log(e, '切换基本信息和资质认证类型');
            this.$store.commit('setPersonTitle', e);
          }
        }
      };
</script>

<style scoped>
.editor-qualificatCert{
  /*position: relative;*/
  /*height: 12vw;*/
}
</style>
