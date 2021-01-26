<template>
  <div class="text-center" style="color: #434343">
    <div class="divTop1">
    </div>
    <div class="divTop2">
      <!-- Barra Pesquisa -->
      <div class="row" style="margin: 25px">
        <div class="col-9">
          <q-input class="searchBar" v-model="userInputSearch" rounded dense outlined label='Search'>
          </q-input>
        </div>
        <div class="col-1"/>
        <div class="col-2" style="display: flex; justify-content: flex-end;">
          <q-btn  class="iconSearch" :to="'../results/' + this.userInputSearch" size="xl" text-color="white" > 
              <q-icon name="search" size="30px"/>
          </q-btn>
        </div>
      </div>
      <!-- Info User -->
      <div class="row divInfoUser">
        <div class="col-10" style="text-align: left">
          <span style="font-weight: 600; font-size: 33px; line-height: 40px;">
            {{ $t('homePage.greeting') }}, {{ getFirstName(profile.name) }}
          </span>
        </div>
        <div class="col-2 avatarCol">
          <q-avatar class="avatar">
            <img style="object-fit: cover;" :src="getImage()">
          </q-avatar>
        </div>
      </div>
    </div>
    <!-- More Popular Slider -->
    <div style="color: white; position: absolute; top: 190px; font-size: 18px; font-weight: 300; text-align: left; padding-left: 25px"> 
      {{ $t('homePage.morePopular') }} 
    </div>
    <div class="wrapper">
        <div @click="redirect(store._id)" v-for="(store, index) in stores" :key="index" v-bind="store" class="item">
          <div class="row">
            <div class="col-12 divPhoto" v-bind:style='{ backgroundImage: `url("${getImageWidget(store.photos[0].url)}")` }'>
            </div>
          <div class="row" style="padding: 15px">
            <div class="col-7" style="text-align: left; margin-top: -5px; display: inline-grid;">
              <span style="font-weight: 670; display: inline-block; width: 120px; white-space: nowrap; overflow: hidden !important; text-overflow: ellipsis; font-size: 17px;">
                {{ store.name }}
              </span>
              <span style="font-weight: 350; display: inline-block; width: 130px; white-space: nowrap; overflow: hidden !important; text-overflow: ellipsis; font-size: 16px;">
                {{ store.address.city }}
              </span>
            </div>
            <div class="col-5" style="padding-left: 10px; width: 80px;">
              <div class="divRating shadow">
                <p style="position: relative; top: 51%; left: 47%; transform: translate(-50%, -50%); text-indent: 3px;">
                  <span style="font-weight: 670; font-size: 16px; display: inline-block;">
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

import Service from '../../services/user.service';
import User from '../../models/User';

export default {
  
  name: "Popular",

  props: {
    profile: Object,
    stores: Object,
    basePopular: String,
    baseProfile: String
  }, 

  data() {
    return {
       userInputSearch: ""
    }
  },

  components: {
  },

  methods: {
    getImage() {
      return this.baseProfile + this.profile.avatar;
    },
    getImageWidget(url) {
      return this.basePopular + url;
    },
    roundRating: function(rating) {
      return Math.round(rating*10)/10;
    },
    getFirstName: function(name) {
      return name.split(" ")[0];
    },
    redirect: function(id) {
      this.$router.push({name: 'Store', params:{id:id}})
    },
  }
}

</script>

<style scoped>
  
  .iconSearch {
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(#e9695c, #e03459);
    border-radius: 100px;
    height: 45px;
    width: 45px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .searchBar {
    color: white;
    background-color: white;
    border-radius: 53px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  
  .divInfoUser {
    padding-left: 25px;
    padding-right: 25px;
    padding-top: 10px;
    color: white;
    color: white;
  }

  .divRating {
    text-align: center;
    height: 30px;
    border-radius: 20px;
    background: linear-gradient(#e9695c, #e03459);
    color: white;
  }

  .avatar {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    border-radius: 100px;
    font-size: 60px;
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
    position: absolute;
    left: 0;
    width: 100%;
    height: 50%;
    background-size: cover;
    background-position: center top;
    background-image: url('../../assets/Other/ProfileFrame.svg');
  }

  .divTop2{
    padding-top: 25px;
    height: 250px;
    position: relative;
  }

  .avatarCol {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .wrapper {
    margin-left: 20px;
    margin-top: -25px;
    position: sticky;
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
