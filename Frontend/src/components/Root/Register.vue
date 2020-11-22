<template>
  <div>
    <h1>Register</h1>
    <q-form>
      <q-input label="Nome" v-model="user.name" type="text"></q-input>
      <q-input label="Username" v-model="user.username" type="text"></q-input>
      <q-input label="Email" v-model="user.email" type="text"></q-input>
      <q-input label="Address" v-model="user.address" type="text"></q-input>
      <q-input label="Password" v-model="user.password" type="password"></q-input>
      <!-- <q-input label="Type" v-model="user.type" type="text"></q-input> -->
      <br/>
      <q-btn push color="primary" @click="handleRegister" style="width: 100%">Sign up</q-btn>
    </q-form>
  </div>
</template>

<script>
import User from '../../models/User';
import Service from '../../services/user.service';

export default {
  name: "Register",
  data() {
    return {
      user: new User()
    }
  },
  methods: {
    handleRegister (e) {
      e.preventDefault();
      console.group("UserRegistration");
      Service.registerUser(this.user)
        .then(response => {
          let data = response.data;
          console.log("Sucess");
          console.table(data);
        })
        .catch(err => console.log(`Error ${err}`))
      console.groupEnd();
    }
  }
}
</script>

<style scoped>

</style>
