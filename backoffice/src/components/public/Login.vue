<template>
  <div>
    <h1>Bem vindo ao BookyMe</h1>
    <div class="">
      <v-form>
        <v-text-field label="Username" type="text" v-model="user.email">
        </v-text-field>

        <v-text-field label="Password" type="password" v-model="user.password">
        </v-text-field>

        <v-btn @click="handleSubmit">Login</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import User from '../../models/user'
import AuthService from '../../service/auth.service';
export default {
  name: "Login",
  data() {
    return {
      user: new User()
    }
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();

      AuthService.login(this.user)
        .then(response => {
          console.log("Logged On", response);
          this.$router.push('/home');
        })
        .catch(err => console.error(err))
        .finally( () => console.log("Finished"));
    }
  }
}
</script>

<style scoped>

</style>