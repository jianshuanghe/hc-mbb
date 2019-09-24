<template>
    <div class="companyInfor-content">
      <!--预览状态-->
      <preview></preview>
    </div>
</template>

<script>
    import preview from './companyInforItems/previewAndEditor/preview';
    import editor from './companyInforItems/previewAndEditor/editor';
    export default {
        name: 'companyInfor',
        components: {
          preview,
          editor
        }
    };
</script>

<style scoped>
.companyInfor-content{
  position: relative;
  width: 100%;
}
</style>
