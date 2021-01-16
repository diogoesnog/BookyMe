

<template>
  <div >
    
    <div>
      <ProfileData :base="base" :profile="profileData" @changeUserProfile="changeUserProfile"  @changeUserPassword="changeUserPassword" />
    </div>  
    <div>
      <Toolbar/>
    </div>
  </div>

</template>

<script>

import Service from '../services/user.service';
import Toolbar from '../components/Root/Toolbar';
import ProfileData from '../components/Profile/ProfileData';

export default {

  name: "Profile",
  components: {
    ProfileData,
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

  .centerDiv {
    padding: 5px;
    margin-top: 5px;
  }

  .gradientOne {
    margin-left: 10px;
    margin-top: 0px;
    position: absolute;
    background: linear-gradient(#e9695c, #e03459);
    color: white;
  }

  .bottomInfoRegister {
    margin-top: -75px;
    position: relative;
    text-align: center;
  }

  .bottomInfoLogin {
    color: white;
    position: fixed;
    bottom: 0;
    left: 0;
    text-align: center;
    width: 100%;
    padding: 35px;
  }

  .selectLanguage {
    width: 90%;
    position: relative;
  }

  .roundedDiv {
    border-radius: 200px;
    background: white;
    display: flex;
    align-items: center;
    padding-left: 20px;
  }

  .shadow {
    box-shadow: 0 0px 15px rgba(0, 0, 0, 0.1);
    border-radius: 28px;
    border-radius: 28px;
  }

</style>
