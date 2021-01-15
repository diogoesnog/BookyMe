<template>
    <div>
      <q-layout>
        <q-footer reveal>
          <q-tabs style="padding: 5px;" align="justify" class="bg-white shadow-2 qTab" indicator-color="transparent" active-color="blue">
              <q-route-tab to="/home" exact>
                <img v-if="checkPage('/home') == 1" style="height: 25px;" src="../../assets/Icons/Toolbar/HomeHover.svg">
                <img v-else style="height: 25px;" src="../../assets/Icons/Toolbar/Home.svg">
              </q-route-tab>
              <q-route-tab to="/reservations" exact>
                <img v-if="checkPage('/reservations') == 1" style="height: 25px;" src="../../assets/Icons/Toolbar/BookHover.svg">
                <img v-else style="height: 25px;" src="../../assets/Icons/Toolbar/Book.svg">
              </q-route-tab>
              <q-route-tab to="/favorites" exact>
                <img v-if="checkPage('/favorites') == 1" style="height: 27px;" src="../../assets/Icons/Toolbar/FavoritesHover.svg">
                <img v-else style="height: 27px;" src="../../assets/Icons/Toolbar/Favorites.svg">
              </q-route-tab>
              <q-route-tab to="/favorites" exact>
                <img v-if="checkPage('/notifications') == 1" style="height: 27px;" src="../../assets/Icons/Toolbar/NotificationsHover.svg">
                <img v-else style="height: 27px;" src="../../assets/Icons/Toolbar/Notifications.svg">
              </q-route-tab>
              <q-route-tab to="/users/login" exact>
                <q-avatar class="shadow" size="lg">
                  <img v-if="checkPage('/users/login') == 1" style="border: 3px solid #2897e3; object-fit: cover;" :src="getImage()">
                  <img v-else style="border: 3px solid #434343; object-fit: cover;" :src="getImage()">
                </q-avatar>
              </q-route-tab>
          </q-tabs>
        </q-footer>
      </q-layout>
   </div>
</template>

<script>

import UserService from '../../services/user.service.js';

export default {

  name: "Toolbar",

  data() {

    return {
      profileData: Object,
      base: String,
      avatar: String
    }
  },

  mounted() {
    this.fetchProfileData();
    this.checkPageProfile();
    this.checkPage();
  },

  methods: {
    fetchProfileData() {
      UserService.getProfileData()
        .then(response => {
          let data = response.data["data"];
          this.base = response.data["base"];
          this.profileData = data;
          this.avatar = this.profileData["avatar"];
        }).catch(err => {
        }).finally(() => {
          this.$q.loading.hide();
        })
    },
    getImage() {
      return `${this.base}${this.avatar}`
    },
    checkPage: function(string) {
      let currentLocation = window.location.pathname;
      return currentLocation === string ? 1 : 0;

    },
    checkPageProfile() {
      let currentLocation = window.location.pathname;

      return currentLocation === '/users/login' ? 1 : 0;
    }
  }
}

</script>

<style scoped>

  .shadow {
    box-shadow: 0 0px 15px rgba(0, 0, 0, 0.1);
  }

  .qTab {
    color: #434343;
  }

  .text-blue {
    color: #2897e3 !important;
  }

</style>
