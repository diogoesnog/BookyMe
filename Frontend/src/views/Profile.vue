<template>
  <div>
    <InfoUser :base="base" v-bind:profile="profileData"/>
    <PersonalDetails v-bind:profile="profileData" @changeUserProfile="changeUserProfile"/> 
    <Security v-bind:profile="profileData" @changeUserPassword="changeUserPassword"/>
    <Language/>
    <Toolbar/>
  </div>
</template>

<script>

import Service from '../services/user.service';

import InfoUser from '../components/Profile/InfoUser';
import PersonalDetails from '../components/Profile/PersonalDetails';
import Security from '../components/Profile/Security';
import Language from '../components/Profile/Language';

import Toolbar from '../components/Root/Toolbar';

export default {

  name: "Profile",
  components: {
    InfoUser,
    PersonalDetails,
    Security,
    Language,
    Toolbar
  },

  data() {
    return {
      profileData: {}, 
      base: '',
    }
  },

  mounted() {
    console.log("Mounted: View has been rendered");
    this.fetchProfileData();
  },

  methods: {
    fetchProfileData() {
      this.$q.loading.show({ delay: 400});
      Service.getProfileData()
        .then(response => {
          let data = response.data["data"];
          this.base=response.data["base"];
          this.profileData=data;

          console.log(this.profileData);
        }).catch(err => {

        }).finally(() => {
          this.$q.loading.hide();
        })   
    },
    changeUserProfile(data) {
      Service.updateAccount(data)
        .then(response => {
            console.log(response);
            this.profileData = response.data[ "data" ];
        }).catch(err => {
            console.error("Error!");
        });
    },
    changeUserPassword(data) {
      Service.updatePassword(data)
        .then(response => {
            console.log(response);
            this.password = response.data[ "data" ];
        }).catch(err => {
            console.error("Error!");
        });
    }
  }

}

</script>

<style scoped>

</style>
