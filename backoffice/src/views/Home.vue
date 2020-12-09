<template>
  <div class="home">
    <div v-if="loginForm">
      <Login/>
      <v-btn color="primary" @click="loginForm=!loginForm">
        Register
      </v-btn>
    </div>

    <div v-else>
      <Register/>
      <v-btn color="primary" @click="loginForm=!loginForm">
        Login
      </v-btn>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';

export default {
  name: 'Home',
  components: {
    Login, Register
  },
  data() {
    return {
      loginForm: true
    }
  }
}
</script>
