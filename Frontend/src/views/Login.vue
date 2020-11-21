<template>
  <div>
    <h1>Login</h1>
    <LoginForm/>
    <br/>
    <q-btn push color="primary" style="width: 100%">Register</q-btn>
  </div>
</template>

<script>
import LoginForm from '../components/Root/Login'
  export default {
    name: "Login",
    components: { LoginForm }
  }
</script>

<style scoped>

</style>
