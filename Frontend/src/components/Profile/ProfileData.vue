<template>
  <!-- Div Principal -->
  <div class="text-center" style="color: #434343">
    <!-- Div Cima -->
    <div class="divTop">
      <div class="q-pa-md q-gutter-sm" align="center">
          <q-avatar size="150px" font-size="52px" color="teal" text-color="white" >
            <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>
          
      </div> 
      <div>
      <h7 style="font-weight: 600; font-size: 30px;">
                  {{ this.name }}
      </h7>
      <br/>
      <h7 style="font-weight: 300; font-size: 20px;">
                  {{ this.username }}
      </h7>
      </div>
    </div>
    <!-- Div Baixo -->
    <div style="padding-top: 100px;">
            <div style="margin: 10px;">
               <!-- Primeira box - dados pessoais -->
              <div class="roundedDivRed shadow" style="display: flex; align-items: center; width: 173px; height: 37px">
                 <p style="font-weight: 500; font-size:130%; align-items: center; " class="font-weight-bold button">
                    {{ $t('profilePage.personalDetails') }}
                 </p> 
              </div>
              <div class="roundedDiv shadow" style="display: flex; align-items: center;">
                 
                <h7 style="font-weight: 280; font-size: 13px; text-align: left;">
                 
                  <q-icon name="fas fa-user" color="grey-5" style="font-size: 20px"/>
                  <span style="display:inline;  width: 100px; height: 10px; padding: 3px; " />
                  {{ this.name }}
                  <br/>

                  <span style="display:block;  width: 100px; height: 10px; padding: 5px; " />
                  <q-icon name="fas fa-hashtag" color="grey-5" style="font-size: 20px"/>
                  <span style="display:inline;  width: 100px; height: 10px; padding: 3px; " />
                  {{ this.username }} 
                  <br/>

                  <span style="display:block;  width: 100px; height: 10px; padding: 5px; " />
                  <q-icon name="fas fa-at" color="grey-5" style="font-size: 20px"/>
                  <span style="display:inline;  width: 100px; height: 10px; padding: 3px; " />
                  {{ this.email }} 
                  <br/>

                  <span style="display:block;  width: 100px; height: 10px; padding: 5px; " />
                  <q-icon name="fas fa-home" color="grey-5" style="font-size: 20px"/>
                  <span style="display:inline;  width: 100px; height: 10px; padding: 3px; " />
                  {{ this.address }} 
                  <br/>

                  <span style="display:inline;  width: 100px; height: 150px; padding: 14px; " />
                  {{ this.zipCode }} {{ this.city }} 
                </h7>
                <span style="display:block;  width: 100px; height: 170px; padding: 5px; " />
              </div>
              
              <span style="display:block;  width: 100px; height: 20px; padding: 5px;"/>
              

              
              <!-- Segunda box - password -->
              <div class="col-10 roundedDivRed shadow " style="display: flex; align-items: center; width:40%; height: 37px">
                 <p style="font-weight: 500; font-size:130%; text-align: center; align-items: justify; " class="font-weight-bold button ">
                    {{ $t('profilePage.security') }}
                </p>
              </div>
              <!-- Segunda box - password -->
              <div class="col-10 roundedDiv shadow" style="display: flex; align-items: center;">
               
                <q-icon name="fas fa-lock" color="grey-5" style="font-size: 20px"/>
                <span style="display:inline;  width: 10px; height: 10px; padding: 3px; " />
                <h7 style="font-weight: 600; font-size: 15px;">
                   *************
                </h7>
                
                <span style="display:block;  width: 100px; height: 70px; padding: 5px;"/>
                
              </div>


              <!-- Botão logout -->
              <span style="display:block;  width: 100px; height: 30px; padding: 5px;"/>
              <q-btn class="gradientBlue" rounded @click="handleLogout" style="width: 200px; height: 35px ">
                <p style="font-size:120%;" class="font-weight-bold button">
                    {{ $t('profilePage.signout') }}
                    
                </p>
              </q-btn>      
      </div>
    </div>
  </div>
</template>

<script>

import Service from '../../services/user.service'
import User from '../../models/User';

export default {

  name: "ProfileData",
  props: {
    _id: String,
    name: String,
    username: String,
    email: String,
    address: String,
    zipCode: String,
    city: String
  },

  mounted() {
    console.log("LoginForm Mounted");
  },

  methods: {
    //TODO: método que edita a info e a pass e handleLogout
    handleLogout(e) {
      e.preventDefault();
      console.group("Login Operation");
      Service.logout(this.user)
        .then(() => {
          console.log("Logged Out");
          this.$q.notify({
            type: 'positive',
            message: 'Logout Successful'
          });

          this.$router.push({ name: 'Home' })

        }).catch();
      console.groupEnd();

    }
  }
}
</script>

<style scoped>

  

  .divMajor {
    position: fixed;
    left: 0px;
    width: 100%;
    padding-bottom: 800px;
    background-image: linear-gradient(#13c1e0, #2897e3);
  }

  .divTop{
    top: 25px;
    position: relative;
  }

  .divBottom1{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 100px;
    height: 505px;
    background-size: cover;
    background-position: center top;
  }

  .divBottom2{
    position: fixed;
    bottom: 60px;
    left: 0;
    width: 100%;
    padding: 20px;
  }

  .button {
    font: bold 12px;
    margin: 0px;
    align-items: center;
    color: #fff;
  }

  .inputWhite {
      background: white;
  }

  .gradientRed {
      background-image: linear-gradient(#e9695c, #e03459);
  }

  .gradientBlue {
     background-image: linear-gradient(#13c1e0, #2897e3);
  }


  .roundedDiv {
    border-radius: 200px;
    background: white;
    display: flex;
    align-items: center;
    padding-left: 30px;
  }

  .roundedDivRed {
    border-radius: 200px;
    background: linear-gradient(#e9695c, #e03459);
    display: flex;
    width: 173px;
    height: 37px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 85px;
    margin-top: -5px;
    -webkit-transform: translate(-50%, -50%);
  }

  .shadow {
    box-shadow: 0 0px 15px rgba(0, 0, 0, 0.1);
    border-radius: 28px;
    border-radius: 28px;
  }

</style>
