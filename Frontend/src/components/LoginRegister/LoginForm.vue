<template>
  <!-- Div Principal -->
  <div class="text-center" style="color: #434343">
    <!-- Div Cima -->
    <div class="row">
      <div class="divTop col-12">
        <img src="../../assets/Logo/Logo (Only Icon).png" style="width: 70%; height: auto;"/>
        <div style="position: relative; bottom: 70px;">
          <h4 style="font-weight: 950; font-size: 40px;">{{$t('loginPage.title')}}</h4>
          <div style="position: relative; bottom: 50px; width: 80%; margin: auto;">
            <p v-html="$t('loginPage.description')"></p>
          </div>
        </div>
      </div>
      <!-- Div Baixo -->
      <div class="divBottom1 col-12">
        <div class="divBottom2">
          <q-form>
            <q-input class="shadow inputWhite" rounded outlined clearable :label="$t('loginPage.username')" v-model="user.email" type="text" color="#2897e3">
              <template v-slot:prepend>
                <q-icon name="fas fa-hashtag" color="grey-5" />
              </template>
            </q-input>
            <br/>
            <q-input class="shadow inputWhite" rounded outlined clearable :label="$t('loginPage.password')" v-model="user.password" :type="isPwd ? 'password' : 'text'" color="#2897e3">
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
  </div>
</template>

<script>
import User from '../../models/User';
import Service from '../../services/auth.service';
export default {
  name: "Login",
  data() {
    return {
      user: new User(),
      password: '',
      isPwd: true
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
            message: 'Failed to Login. Try Again.'
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

  .divTop{
    top: 40px;
    position: relative;
  }

  .divBottom1{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 100px;
    height: 490px;
    background-size: cover;
    background-position: center top;
    background-image: url('../../assets/Other/LoginFrame.svg');
  }

  .divBottom2{
    position: absolute;
    bottom: 25px;
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
