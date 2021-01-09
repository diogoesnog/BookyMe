<template>
    <div>
      <q-layout>
        <q-footer reveal>
          <q-tabs style="padding: 5px;" align="justify" class="bg-white shadow-2 qTab" indicator-color="transparent" active-color="blue">
              <q-route-tab to="/home" exact>
                <q-icon name="fas fa-home" style="font-size: 23px"/>
                <span style="font-size:16px; font-weight: 420; text-transform: capitalize;">Home</span>
              </q-route-tab>
              <q-route-tab to="/reservations" exact>
                <q-icon name="fas fa-bookmark" style="font-size: 23px"/>
                <span style="font-size:16px; font-weight: 420; text-transform: capitalize;">Booking</span>
              </q-route-tab>
              <q-route-tab to="/favorites" exact>
                <q-icon name="fas fa-heart" style="font-size: 23px"/>
                <span style="font-size:16px; font-weight: 420; text-transform: capitalize;">Favorites</span>
              </q-route-tab>
              <q-route-tab to="/users/login" exact>
                <q-icon name="fas fa-user" style="font-size: 23px"/>
                <img :src="getImage()">
                <span style="font-size:16px; font-weight: 420; text-transform: capitalize;">Profile</span>
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

  },

  methods: {

    fetchProfileData() {
      //this.$q.loading.show({ delay: 400});
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
      return `http://localhost:5200${this.avatar}`
    }

  }
}

</script>

<style scoped>

  .qTab {
    color: #434343;
  }

  .text-blue {
    color: #e03459 !important;
  }

</style>
