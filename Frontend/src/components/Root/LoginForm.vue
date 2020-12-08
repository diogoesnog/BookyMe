<template>
<<<<<<< Updated upstream:Frontend/src/components/Root/LoginForm.vue
  <div>
    <h3>
      {{$t('loginPage.title')}}
    </h3>

    <h4>{{$t('loginPage.description')}}</h4>

    <q-form>
      <q-input :label="$t('loginPage.username')" v-model="user.email" type="text"></q-input>
      <q-input :label="$t('loginPage.password')" v-model="user.password" type="password"></q-input>
      <br/>
      <q-btn push color="primary" @click="handleLogin" style="width: 100%">
        {{ $t('loginPage.login') }}
      </q-btn>
    </q-form>
=======
  <div> 
    <div>
      <h3 align-center>
        {{$t('loginPage.title')}}
      </h3>
      <p>{{$t('loginPage.description')}}</p>
    </div>
    <div>
      <q-form>
        <q-input class="shadow" rounded outlined :label="$t('loginPage.username')" v-model="user.email" type="text">
          <template v-slot:prepend>
            <q-icon name="fas fa-hashtag" color="grey-5" />
          </template>
        </q-input>
        <br/>
        <q-input class="shadow" rounded outlined :label="$t('loginPage.password')" v-model="user.password" type="password">
          <template v-slot:prepend>
            <q-icon name="fas fa-lock"  color="grey-5"/>
          </template>
        </q-input>
        <br/>
        <q-btn class="gradient" rounded push @click="handleLogin" style="width: 100%">
          <p style="font-size:120%;" class="font-weight-bold button">
            {{ $t('loginPage.login') }}
          </p>
        </q-btn>
      </q-form>
    </div>
>>>>>>> Stashed changes:Frontend/src/components/Root/Login.vue
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

<<<<<<< Updated upstream:Frontend/src/components/Root/LoginForm.vue
/*  .circle{
=======
  .shadow {
    box-shadow: 0 0px 15px rgba(0, 0, 0, 0.1);
    border-radius: 28px;
    border-radius: 28px;
  }

  .circle{
>>>>>>> Stashed changes:Frontend/src/components/Root/Login.vue
    width:100%;
    height: 200px;
    border-radius: 0 0 100% 100%;
    background-color: yellow;
    margin-top:-130px;
  }*/

  .button {
    font: bold 12px;
    margin: 0px;
    padding: 10px;
    color: #fff;
  }

  .gradient {
      background-image: linear-gradient(#e9685b, #e03459);
  }

</style>
