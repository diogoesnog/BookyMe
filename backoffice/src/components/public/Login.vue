<template>
  <div>
    <h1>Autenticação</h1>
    <div>
      <v-form>
        <v-text-field label="Username" type="text" v-model="user.email">
        </v-text-field>

        <v-text-field label="Password" type="password" v-model="user.password">
        </v-text-field>

        <v-btn block color="primary" @click="handleSubmit">Login</v-btn>
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
        .then((data) => {
          console.log("Logged On", data);
          this.$store.dispatch("setCurrentUser", data);
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