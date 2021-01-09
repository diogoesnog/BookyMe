<template>
    <div>
      <q-layout>
        <q-footer reveal>
          <q-tabs style="padding: 5px;" align="justify" class="bg-white shadow-2 qTab" indicator-color="transparent" active-color="blue">
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
                <q-avatar class="shadow" size="md">
                  <img :src="getImage()">
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
      return `${this.base}${this.avatar}`
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
    color: #e03459 !important;
  }

</style>
