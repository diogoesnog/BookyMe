<template>
  <div class="col-12" style="padding-top: 45px; padding-left: 30px">
    <p class="titles">{{$t('storePage.description')}}</p>
    <div @click="showMoreText" v-show="!moreText" class="text">
      {{ getReduceDescription() }}
    </div>
    <div @click="showLessText" v-show="moreText" class="text">
      {{ this.description }}
    </div> 
  </div>
</template>

<script>
export default {
  name: "StoreDescription",

  data() {
    return {
      moreText: false
    }
  },

  props: {
    description: String,
  },

  methods: {
    getReduceDescription() {
      let descriptionLess = this.description.substring(0, 150);
      if(this.description.length <= 150) return descriptionLess;
      else return descriptionLess + "...";
    },
    showMoreText() {
      this.moreText = true;
    },
    showLessText() {
      this.moreText = false;
    },
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
