<template>
    <div>
      <q-layout>
        <q-footer reveal>
          <q-tabs style="padding: 5px;" align="justify" class="bg-white qTab" indicator-color="transparent" active-color="blue">
              <q-route-tab to="/home" exact>
                <q-icon name="fas fa-home" style="font-size: 25px"/>
              </q-route-tab>
              <q-route-tab to="/reservations" exact>
                <q-icon name="fas fa-bookmark" style="font-size: 23px"/>
              </q-route-tab>
              <q-route-tab to="/favorites" exact>
                <q-icon name="fas fa-heart" style="font-size: 23px"/>
              </q-route-tab>
              <q-route-tab to="/users/login" exact>
                <div >
                  <q-avatar class="shadow" size="md">
                    <img v-if="checkPage() == 0" style="border: 3px solid #434343;" :src="getImage()">
                    <img v-else style="border: 3px solid #2897e3;" :src="getImage()">
                  </q-avatar>
                </div>
              </q-route-tab>
          </q-tabs>
        </q-footer>
      </q-layout>
   </div>
</template>

<script>

import UserService from '../../services/user.service.js';

export default {

  name: "Profile",

  data() {

    return {
      profileData: Object,
      base: String,
      avatar: String
    }
  },

  mounted() {
    this.fetchProfileData();
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
    checkPage() {
      var currentLocation = window.location.pathname;
      console.log(currentLocation);
      if(currentLocation == '/users/login') return 1;
      else return 0;
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
