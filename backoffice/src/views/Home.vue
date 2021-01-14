<template>
  <v-container fluid style="height: 100vh;" class="home">
      <div class="center-content text-center">
        <img src="../assets/Logo.png" class="logo-header"/>
        <div v-if="loginForm" class="content-margins">
          <Login/>
          <v-btn block outlined color="secondary" @click="loginForm=!loginForm">
            Register
          </v-btn>
        </div>

        <div v-else class="content-margins">
          <Register/>
          <v-btn block outlined color="error" @click="loginForm=!loginForm">
            Cancel
          </v-btn>
        </div>
      </div>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Login from '../components/public/Login';
import Register from '../components/public/Register';

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

<style scoped>
.logo-header {
  width: 250px
}

.home {
  background-color: #434343;
}

.content-margins {
  padding: 50px;
}
.center-content {
  border-radius: 25px;
  background-color: #fff;
  position: absolute;
  height: 80%;
  width: 80%;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  overflow: auto;
}

</style>
