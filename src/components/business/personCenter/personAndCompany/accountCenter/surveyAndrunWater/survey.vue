<template>
  <div class="survey-content">
    <!--账户-->
    <surveyAccount></surveyAccount>
    <!--报表-->
    <reportFrom></reportFrom>
  </div>
</template>

<script>
    import surveyAccount from './surveyItems/surveyAccount';
    import reportFrom from './surveyItems/reportFrom';
    export default {
        name: 'survey',
        components: {
          surveyAccount,
          reportFrom
        }
      };
</script>

<style scoped>
.survey-content{
  position: fixed;
  height: 96vh;
  overflow: scroll;
  padding-bottom: 5vh;
  -webkit-overflow-scrolling:touch;
}
</style>
