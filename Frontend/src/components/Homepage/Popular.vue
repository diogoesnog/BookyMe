<template>
  <div class="text-center" style="color: #434343">
    <div class="divTop1">
        <div class="divTop2">
          <div class="row" style="padding: 30px">
            <div class="col-9" style="text-align: left">
              <span style="font-weight: 600; font-size: 35px;">
                {{ $t('homePage.greeting') }}, {{profile.name}}
              </span>
            </div>
            <div class="col-3" style="text-align: right">
              <q-avatar class="shadow gradientOne">
                <img style="object-fit: cover;" :src="getImage()">
              </q-avatar>
            </div>
          </div>
        </div>
      </div> 
      <div style="color: white; position: fixed; top: 140px; font-size: 18px; font-weight: 300; text-align: left; padding-left: 30px"> 
        {{ $t('homePage.morePopular') }} 
      </div>
      <div class="wrapper">
        <div v-for="(store, index) in stores" :key="index" v-bind="store" class="item">
          <div>
            <img :src="store.avatar"/>
          </div>
          {{ store.name }}
        </div>
      <div class="empty"></div>
    </div>
</div> 

</template>

<script>

import Service from '../../services/auth.service'
import User from '../../models/User';

export default {
  name: "Popular",

  props: {
    profile: Object,
    stores: Object,
    base: String
  }, 

  data() {
    return {
    }
  },

  components: {
  },

  methods: {
    getImage() {
      return this.base + this.profile.avatar;
    },
    getImageWidget(url) {
      console.log(url);
      return this.base + url;
    },
  }
}


</script>

<style scoped>

  .divTop1{
    position: fixed;
    top: -25px;
    left: 0;
    width: 100%;
    height: 50%;
    background-size: cover;
    background-position: center top;
    background-image: url('../../assets/Other/ProfileFrame.svg');
  }

  .divTop2{
    position: fixed;
    left: 0;
    top: 30px;
    width: 100%;
    color: white;
  }

  .divBottom {
    z-index: 1000;
    position: fixed;
    bottom: 35px;
    width: 100%;
    padding: 30px;
  }

  .wrapper {
    margin-left: 30px;
    position: absolute;
    overflow-x: scroll;
    overflow-y: hidden;
    top: 190px;
    display: grid;
    grid-template-columns: repeat(600, auto);
    grid-gap: 0 30px;
  }

  .item {
    background-size: cover;
    height: 200px;
    width: 230px;
    border-radius: 40px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }

  .empty {
    width: 10px;
  }

  .wrapper::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }

  .wrapper {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

</style>
