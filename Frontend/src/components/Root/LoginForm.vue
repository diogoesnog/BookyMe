<template>
  <!-- Div Principal -->
  <div class="text-center" style="color: #434343">
    <!-- Div Cima -->
    <div class="divTop">
      <img src="../../assets/Other/Layers.png" style="width: 50%; height: auto;"/>
      <div style="position: relative; bottom: 50px;">
        <h4 style="font-weight: 950; font-size: 40px;">{{$t('loginPage.title')}}</h4>
        <div style="position: relative; bottom: 50px; width: 80%; margin: auto;">
          <p v-html="$t('loginPage.description')"></p>
        </div>    
      </div>
    </div>
    <br/>
    <!-- Div Baixo -->
    <div class="divBottom1">
      <div class="divBottom2">
        <q-form>
          <q-input class="shadow inputWhite" rounded outlined :label="$t('loginPage.username')" v-model="user.email" type="text" color="#2897e3">
            <template v-slot:prepend>
              <q-icon name="fas fa-hashtag" color="grey-5" />
            </template>
          </q-input>
          <br/>
          <q-input class="shadow inputWhite" rounded outlined :label="$t('loginPage.password')" v-model="user.password" type="password" color="#2897e3">
            <template v-slot:prepend>
              <q-icon name="fas fa-lock" color="grey-5"/>
            </template>
          </q-input>
          <br/>
          <q-btn class="gradientRed" rounded @click="handleLogin" style="width: 100%">
            <p style="font-size:120%;" class="font-weight-bold button">
              {{ $t('loginPage.login') }}
            </p>
          </q-btn>
        </q-form>
      </div>
    </div>
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

          this.$router.push({ name: 'Homepage' })

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

  .shadow {
    box-shadow: 0 0px 15px rgba(0, 0, 0, 0.1);
    border-radius: 28px;
    border-radius: 28px;
  }

  .divMajor {
    position: fixed;
    left: 0px;
    width: 100%;
    padding-bottom: 800px;
    background-image: linear-gradient(#13c1e0, #2897e3);
  }

  .divTop{
    top: 90px;
    position: relative;
  }

  .divBottom1{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 100px;
    height: 500px;
    background-size: cover;
    background-position: center top;
    background-image: url('../../assets/Other/LoginFrame.svg');
  }

  .divBottom2{
    position: fixed;
    bottom: 40px;
    left: 0;
    width: 100%;
    padding: 60px;
  }

  .button {
    font: bold 12px;
    margin: 0px;
    padding: 10px;
    color: #fff;
  }

  .inputWhite {
      background: white;
  }

  .gradientRed {
      background-image: linear-gradient(#e9695c, #e03459);
  }

</style>
