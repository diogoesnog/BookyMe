<template>
  <div>
    <h1>
      {{ $t('authPage.login') }}
    </h1>
    <q-form>
      <q-input :label="$t('authPage.username')" v-model="user.email" type="text"></q-input>
      <q-input :label="$t('authPage.password')" v-model="user.password" type="password"></q-input>
      <br/>
      <q-btn push color="primary" @click="handleLogin" style="width: 100%">
        {{ $t('authPage.login') }}
      </q-btn>
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
      console.group("Login Operation");
      Service.login(this.user)
        .then(() => {
          console.log("Logged On");
          this.$q.notify({
            type: 'positive',
            message: 'Login Successful'
          });

          this.$router.push({ name: 'Home' })

        }).catch(err => {
          console.log("Login Error");

          this.$q.notify({
            type: 'negative',
            message: 'Failed to Login'
          });
      });
      console.groupEnd();

    }
  }
}
</script>

<style scoped>

</style>
