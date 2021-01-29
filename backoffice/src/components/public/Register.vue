<template>
  <div>
    <h1>Register</h1>

    <v-form>
      <v-text-field label="Nome" type="text" v-model="user.name"></v-text-field>
      <v-text-field label="Username" type="text" v-model="user.username"></v-text-field>
      <v-text-field label="E-mail" type="email" v-model="user.email"></v-text-field>
      <v-text-field label="Password" type="password" v-model="user.password"></v-text-field>
      <v-text-field label="Endereço" type="text" v-model="user.address"></v-text-field>
      <v-text-field label="Cidade" type="text" v-model="user.city"></v-text-field>
      <v-text-field label="Código Postal" type="text" v-model="user.zipCode"></v-text-field>

      <v-btn block color="primary" @click="handleSubmit">Register</v-btn>
    </v-form>
  </div>
</template>

<script>
import User from '../../models/user';
import Services from "../../service/user.service";
export default {
  name: "Register",
  data() {
    return {
      user: new User()
    }
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();
      Services.register(this.user)
        .then(response => {
          let data = response.data[ "data" ];

          console.log(data);

          this.$router.push({name: "Login"});

        }).catch(err => {
          console.error(err);
          alert("Error");
        })
        .finally( () => {
        });
    }
  }
}
</script>

<style scoped>

</style>