<template>
  <!-- Div Principal -->
  <div class="text-center" style="color: #434343">
    <!-- Div Cima -->
    <div class="divTop1">
      <div class="divTop2">
        <div>
          <q-avatar class="shadow" style="margin-bottom: 10px;" size="150px" font-size="52px" color="teal" text-color="white" >
            <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>
        </div> 
        <div>
          <p>
            <span style="font-weight: 600; font-size: 30px;">
              {{ this.name }}
            </span>
            <br/>
            <span style="font-weight: 300; font-size: 20px; line-height: 10px;">
              {{ this.username }}
            </span>
          </p>
        </div>
      </div>
    </div>
    <!-- Div Baixo -->
    <div class="divBottom">
      <!-- Box vermelha - Detalhes Pessoais -->
      <div class="roundedDivRedTop shadow">
        <p style="font-weight: 500; font-size: 130%; align-items: center; text-align: left; margin: 20px;" class="font-weight-bold button">
          {{ $t('profilePage.personalDetails') }}
        </p> 
      </div>
      <!-- Primeira Box - Dados Pessoais -->
      <div class="roundedDiv shadow" style="display: grid; border-radius: 30px; font-weight: 280; font-size: 13px; text-align: left;"> 
        <div style="margin-left: 10px; margin-top: 25px;">
          <q-icon name="fas fa-user" color="grey-5" style="font-size: 20px; margin-right: 5px;"/>
          {{ this.name }}
        </div>
        <div style="margin-left: 10px; margin-top: 10px;">
          <q-icon name="fas fa-hashtag" color="grey-5" style="font-size: 20px; margin-right: 5px;"/>
          {{ this.username }} 
        </div>
        <div style="margin-left: 10px; margin-top: 10px;">
          <q-icon name="fas fa-at" color="grey-5" style="font-size: 20px; margin-right: 5px;"/>
          {{ this.email }} 
        </div>
        <div style="margin-left: 10px; margin-top: 10px;">
          <q-icon name="fas fa-home" color="grey-5" style="font-size: 20px; margin-right: 5px;"/>
          {{ this.address }} 
        </div>
        <div style="margin-left: 10px; margin-top: 10px;">
          {{ this.zipCode }} {{ this.city }} 
        </div>
      </div>
      <!-- Box Vermelha - Segurança -->
      <div class="col-10 roundedDivRedBottom shadow">
          <p style="font-weight: 500; font-size:130%;  margin: 20px;" class="font-weight-bold button ">
            {{ $t('profilePage.security') }}
        </p>
      </div>
      <!-- Segunda Box - password -->
      <div class="roundedDiv shadow" style="display: flex; align-items: center; border-radius: 20px; margin-top: 40px;">
        <p style="font-weight: 600; font-size: 15px; text-align: left; margin: 20px;">
          <q-icon name="fas fa-lock" color="grey-5" style="font-size: 20px; margin-right: 5px;"/>
            *************
        </p>
      </div>
      <!-- Botão Logout -->
      <q-btn class="gradientBlue" rounded @click="handleLogout" style="width: 200px; height: 35px; margin: 40px; bottom:10px;">
        <p style="font-size:130%; text-transform: capitalize;" class="font-weight-bold button">
            {{ $t('profilePage.signout') }}  
        </p>
        <q-icon name="fas fa-sign-out-alt" color="white" style="font-size: 20px; margin-left: 10px;"/>
      </q-btn>      
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

  .divTop1{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70%;
    background-size: cover;
    background-position: center top;
    background-image: url('../../assets/Other/ProfileFrame.svg');
  }

  .divTop2{
    position: fixed;
    left: 0;
    top: 35px;
    width: 100%;
    color: white;
  }

  .divBottom {
    position: fixed; 
    bottom: 35px; 
    width: 100%; 
    padding: 30px;
  }

  .button {
    font: bold 12px;
    margin: 0px;
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
    background: white;
    display: flex;
    align-items: center;
    padding-left: 10px;
  }

  .roundedDivRedTop {
    background: linear-gradient(#e9695c, #e03459);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 100px;
    margin-top: -5px;
    -webkit-transform: translate(-50%, -50%);
    width: 200px; 
    height: 35px; 
    border-radius: 30px; 
  }

  .roundedDivRedBottom {
    background: linear-gradient(#e9695c, #e03459);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 60px;
    margin-top: 40px;
    -webkit-transform: translate(-50%, -50%);
    width:120px;
    height: 35px; 
    border-radius: 30px;
  }

  .shadow {
    box-shadow: 0 0px 15px rgba(0, 0, 0, 0.116);
  }

</style>
