<template>
  <div>
    <q-form>

      <q-input label="E-mail Address" v-model="user.email" type="text"></q-input>
      <q-input label="Password" v-model="user.password" type="password"></q-input>

      <q-btn push color="primary" @click="handleLogin">Login</q-btn>
    </q-form>
  </div>
</template>

<script>
import User from '../../models/User';
import Service from '../../services/auth.service';

export default {
  name: "Login",
  data() {
    return {
      user: new User()
    }
  },
  mounted() {
    console.log("LoginForm Mounted");
  },
  methods: {
    handleLogin(e) {
      e.preventDefault();

      Service.login(this.user)
        .then(response => {
          // TODO: Emit Alert to maximum root
          console.group("Login successful");
          console.log(response);
          console.groupEnd();

        }).catch(err => {
          // TODO: Emit Alert to maximum root
          console.groupEnd("Login Error");
          console.log(err);
          console.groupEnd();
      });
    }
  }
}
</script>

<style scoped>

</style>
