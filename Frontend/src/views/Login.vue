<template>
  <div>
    <div v-if="loginForm">
      <LoginForm/>
      <br/>
      <q-btn push color="primary" style="width: 100%" @click="loginForm = !loginForm">Register</q-btn>
    </div>

    <div v-else>
      <RegisterForm/>
      <q-btn push color="primary" style="width: 100%" @click="loginForm = !loginForm">Cancel</q-btn>
    </div>

  </div>
</template>

<script>
  import LoginForm from '../components/Root/Login'
  import RegisterForm from '../components/Root/Register';
  export default {
    name: "Login",
    components: { LoginForm, RegisterForm },
    data() {
      return {
        loginForm: true
      }
    }
  }
</script>

<style scoped>

</style>
