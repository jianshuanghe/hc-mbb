<template>
    <div class="companyInfor-content">
      <!--编辑状态-->
      <editor></editor>
    </div>
</template>

<script>
    import preview from './companyInforItems/previewAndEditor/preview';
    import editor from './companyInforItems/previewAndEditor/editor';
    export default {
        name: 'companyInforEdit',
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
