<template>
  <div class="col-12" style="padding-top: 45px; padding-left: 30px">
    <p class="titles">{{$t('storePage.description')}}</p>
    <p class="text"> {{ this.description }} </p>
  </div>
</template>

<script>
export default {
  name: "StoreDescription",

  props: {
    description: String
  }
}
</script>

<style scoped>

  .titles {
    color: #434343;
    font-weight: 700;
    font-size: 30px;
  }

  .text {
    color: #434343;
    font-weight: 300;
    font-size: 18px;
    text-align: justify;
    width: 93%;
  }
</style>
