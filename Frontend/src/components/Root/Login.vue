<template>
  <div>
    <h1>Login</h1>
    <q-form>
      <q-input label="E-mail Address" v-model="user.email" type="text"></q-input>
      <q-input label="Password" v-model="user.password" type="password"></q-input>
      <br/>
      <q-btn push color="primary" @click="handleLogin" style="width: 100%">Login</q-btn>

    </q-form>
  </div>
</template>

<script>
import User from '../../models/User';
import Service from '../../services/auth.service';
import { Notify } from 'quasar';
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
        .then(() => {
          // TODO: Emit Alert to maximum root
          console.group("Login successful");

          this.$q.notify('Message');

          console.groupEnd();

        }).catch(err => {
          // TODO: Emit Alert to maximum root
          console.group("Login Error");
          // let data = err.response.data;

          this.$q.notify({
            type: 'negative',
            message: 'Failed to Login'
          });
          console.groupEnd();
      });
    }
  }
}
</script>

<style scoped>

</style>
