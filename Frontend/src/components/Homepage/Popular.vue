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
          <div class="row">
            <div class="col-12 divPhoto" v-bind:style='{ backgroundImage: `url("${getImageWidget(store.photos[0].url)}")` }'>
            </div>
          <div class="row" style="padding: 15px">
            <div class="col-7" style="text-align: left; margin-top: -5px; display: inline-grid;">
              <span style="font-weight: 670; display: inline-block; width: 125px; white-space: nowrap; overflow: hidden !important; text-overflow: ellipsis; font-size: 16px;">
                {{ store.name }}
              </span>
              <span style="font-weight: 350; display: inline-block; width: 130px; white-space: nowrap; overflow: hidden !important; text-overflow: ellipsis; font-size: 14px;">
                {{ store.address.city }}
              </span>
            </div>
            <div class="col-5" style="padding-left: 10px; width: 80px;">
              <div class="divRating shadow">
                <p style="position: relative; top: 51%; left: 47%; transform: translate(-50%, -50%); text-indent: 3px;">
                  <span style="font-weight: 670; font-size: 16px; display: inline-block; vertical-align: middle;">
                    {{roundRating(store.rating)}}<span style="font-weight: 200; font-size: 16px;">/5</span>
                  </span>
                  <i class="fa fa-star" style="font-size:15px; padding-top: 5px;"></i>
                </p>
              </div>
            </div>
          </div>
          </div>
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
      return "http://localhost:5100" + url;
    },

    roundRating: function(rating) {
      return Math.round(rating*10)/10;
    },
  }
}


</script>

<style scoped>

  .divRating {
    text-align: center;
    height: 30px;
    border-radius: 20px;
    background: linear-gradient(#e9695c, #e03459);
    color: white;
  }

  .shadow {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    border-radius: 28px;
  }

  .divPhoto {
    width: 100%;
    height: 130px;
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    background-size: cover;
    background-position: center top;
  }

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
    margin-left: 20px;
    position: absolute;
    overflow-x: scroll;
    overflow-y: hidden;
    top: 190px;
    display: grid;
    grid-template-columns: repeat(600, auto);
    grid-gap: 0 30px;
  }

  .item {
    margin: 5px;
    background-size: cover;
    height: 200px;
    width: 230px;
    border-radius: 30px;
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
