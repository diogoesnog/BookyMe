<template>
  <!-- Div Principal -->
  <div class="text-center" style="color: #434343">
    <!-- Div Cima -->
     <!-- TO DO: BOTAO DE EDITAR FOTOGRAFIA A FUNCIONAR -->
    <div class="divTop1">
      <div class="divTop2">
        <div style="position: relative; display: flex; justify-content: center">
          <div style="position: absolute">
            <q-avatar class="shadow" style="margin-bottom: 10px;" size="150px" font-size="52px" color="teal" text-color="white" >
              <img :src="`${base}${avatar}`">
            </q-avatar>
          </div>
          <div style="position: absolute; top: 125px">
            <q-btn style=";" size="md" class="gradientRed" round >
              <q-icon name="fas fa-camera" color="white"/>
            </q-btn>
          </div>
          <div style="position: absolute; top: 175px">
            <p>
              <span style="font-weight: 600; font-size: 30px;">
                {{ profile.name }}
              </span>
              <br/>
              <span style="font-weight: 300; font-size: 20px; line-height: 10px;">
                {{ profile.username }}
              </span>
            </p>
          </div>
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
      <div class="roundedDiv shadow" style="padding:12px; display: grid; border-radius: 30px; font-weight: 280; font-size: 13px; text-align: left; ">
         <!-- Botões -->
        <div style="text-align: right; padding-left: 245px; position: absolute;">
          <q-btn flat size="md" class="" @click="bottomEdit" style="text-transform: capitalize; font-size: 15px; font-weight: 350;" :hidden= "!esconde"  >
            {{ $t('profilePage.editData') }}
          </q-btn>
        </div>
        <div>
           <q-btn @click="bottomSave" label="Save" color="primary" :invisible= "!esconde"/>
        </div>
        <div >
          <q-btn @click="bottomCancel" label="Cancel" color="primary" />
        </div>
      
        <!-- Nome -->
        <div style="margin-left: 10px; margin-top: 15px;" >
          <q-form  class="q-gutter-md">
              <q-input borderless v-model="profile.name" style="height: 30px;" type="text" :disable ="!editavel">
                <template v-slot:prepend>
                    <q-icon name="fas fa-user" color="grey-5" style="font-size: 20px; font-weight:350"/>
                </template>
              </q-input>
            </q-form>
        </div>
        <!-- Nome de Utilizador -->
        <div style="margin-left: 10px;">
          <q-form  class="q-gutter-md">
          <q-input borderless v-model="profile.username" style="height: 30px;" :disable ="!editavel">
            <template v-slot:prepend>
              <span style="font-size: 28px; font-weight:350">#</span>
            </template>
          </q-input>
          </q-form>
        </div>
        <!-- Email -->
        <div style="margin-left: 10px;">
          <q-input borderless v-model="profile.email" style="height: 30px;" :disable ="!editavel" >
            <template v-slot:prepend>
              <span style="font-size: 20px; font-weight:350">@</span>
            </template>
          </q-input>
        </div>
        <!-- Morada -->
        <div class="row">
          <div class="col-1" style="display: flex; justify-content: left; align-items: center; padding: 10px;">
            <q-icon name="fas fa-home" color="grey-5" style="font-size: 20px; "/>
          </div>
          <div class="col-11" style="padding-left: 15px">
            <q-input borderless v-model="profile.address" style="height: 30px;" :disable ="!editavel"/>
            <div class = "row" style="margin-top: -10px;">
              <div class= "col-3">
                <q-input borderless v-model="profile.zipCode" style="height: 30px;" :disable ="!editavel"/> 
              </div>
              <div class= "col-9">
                <q-input borderless v-model="profile.city" style="height: 30px;" :disable ="!editavel"/>
              </div>  
            </div>
          </div>
        </div>
      </div>




      <!-- PARTE DA SEGURANÇA -->
      
      <!-- Box Vermelha - Segurança -->
      <div class="col-10 roundedDivRedBottom shadow">
          <p style="font-weight: 500; font-size:130%;  margin: 20px;" class="font-weight-bold button">
            {{ $t('profilePage.security') }}
          </p>
      </div>
      <!-- Segunda Box - password -->
      <div class="roundedDiv shadow" style="padding:20px; display: grid; border-radius: 30px; font-weight: 280; font-size: 13px; text-align: left; margin-top:50px;">
        
        <!-- BOTÃO CHANGE PASSWORD -->
        <div style="text-align: right; padding-left: 175px; position: absolute;">
          <q-btn flat size="md" class="" @click="bottomEdit2" style="text-transform: capitalize; font-size: 15px; font-weight: 350;" :hidden= "!esconde"  >
            {{ $t('profilePage.changePassword') }}
          </q-btn>
        </div>
        <div>
           <q-btn @click="bottomSavePassword" label="Save" color="primary" :invisible= "!esconde"/>
        </div>
        <div >
          <q-btn @click="bottomCancel2" label="Cancel" color="primary" />
        </div>
        
        
        <div style="margin-left: 10px; margin-top:7px">
         <q-form  class="q-gutter-md">
              <q-input borderless v-model="password" style="height: 30px;" :type="isPwd ? 'password' : 'text'" :disable ="!editavel2">
                
                <template v-slot:prepend>
                    <q-icon name="fas fa-lock" color="grey-5" />
                </template>


              <template v-slot:append>
                    <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd"/>
              </template>
              </q-input>
              <q-input borderless v-model="oldPassword" style="height: 30px;" :type="isPwd ? 'password' : 'text'" :disable ="!editavel2">
                
                <template v-slot:prepend>
                    <q-icon name="fas fa-lock" color="grey-5" />
                </template>


              <template v-slot:append>
                    <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd"/>
              </template>
              </q-input>
          </q-form>
        </div>
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

import Service from '../../services/auth.service'
import User from '../../models/User';

export default {
  name: "ProfileData",
  props: {
    profile: Object,
    _id: String,
    name: String,
    username: String,
    email: String,
    address: String,
    zipCode: String,
    city: String,
    avatar: String,
    base: String
  },

  data () {
    return {
      texto: '',
      isPwd: true,
      editavel: false,
      editavel2: false,
      esconde:false,
      atualizados: [],
      editUser: new User(),
      password: '***************',
      oldPassword:'***************'
    }
  },

  methods: {
    //TODO: método que edita a info e a pass 
    handleSubmit(e) {
        e.preventDefault();

    },

    handleLogout() {
      console.log("hello")
      Service.logout(this.user)
      this.$router.push({ name: 'Home' })
    },

    bottomEdit(){
      this.editavel = true;
      this.esconde = true;
      
    },

     bottomEdit2(){
      this.editavel2 = true;
      this.esconde2 = true;
      
    },
    
    bottomSave(e){
      e.preventDefault();
      console.group("UserUpdateInformation");

      this.$emit('changeUserProfile', this.profile);
      this.editavel = false;
      this.esconde = false;
      
    },

    bottomSavePassword(e){
      e.preventDefault();
      console.group("UserUpdatePassword");
      let data ={
        oldPassword: this.oldPassword,
        newPassword:this.password
        }
      this.$emit('changeUserPassword', data);
      this.editavel2 = false;
      this.esconde2 = false;
      
    },

    bottomCancel(){
      this.editavel = false;
      this.esconde = false;
    },    


    bottomCancel2(){
      this.editavel2 = false;
      this.esconde2 = false;
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
