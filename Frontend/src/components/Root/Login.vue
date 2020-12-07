<template>
  <div> 
    <h3>
      {{$t('loginPage.title')}}
    </h3>
    <p>{{$t('loginPage.description')}}</p>
    <q-form>
      <q-input :label="$t('loginPage.username')" v-model="user.email" type="text"></q-input>
      <q-input :label="$t('loginPage.password')" v-model="user.password" type="password"></q-input>
      <br/>
      <q-btn push color="primary" @click="handleLogin" style="width: 100%">
        {{ $t('loginPage.login') }}
      </q-btn>
    </q-form>
    <p>{{$t('loginPage.noAccount')}}</p>
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

  .circle{
    width:100%;
    height: 200px;
    border-radius: 0 0 100% 100%;
    background-color: yellow;
    margin-top:-130px;
  }

</style>
