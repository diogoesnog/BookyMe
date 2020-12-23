<template>
  <div>
    <h1>Login</h1>
    <v-form>
      <v-text-field label="Username" type="text" v-model="user.username">
      </v-text-field>

      <v-text-field label="Password" type="password" v-model="user.password">
      </v-text-field>

      <v-btn color="success">Login</v-btn>
    </v-form>
  </div>
</template>

<script>
import User from '../../models/user'
import Services from '../../service/user.service'
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

      Services.login(this.user)
        .then(response => console.log(response))
        .catch(err => console.error(err))
        .finally( () => console.log("Finished"));
    }
  }
}
</script>

<style scoped>

</style>