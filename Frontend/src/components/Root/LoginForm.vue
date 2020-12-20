<template class="divMajor">
  <!-- Div Principal -->
  <div>
    <!-- Div Cima -->
    <div class="">
      <h3 align-center>
        {{$t('loginPage.title')}}
      </h3>
      <p>{{$t('loginPage.description')}}</p>
    </div>
    <br/>
    <!-- Div Baixo -->
    <div class="divBottom">
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
        <q-btn class="gradientRed" rounded push @click="handleLogin" style="width: 100%">
          <p style="font-size:120%;" class="font-weight-bold button">
            {{ $t('loginPage.login') }}
          </p>
        </q-btn>
      </q-form>
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

  .shadow {
    box-shadow: 0 0px 15px rgba(0, 0, 0, 0.1);
    border-radius: 28px;
    border-radius: 28px;
  }

  .divMajor {
    background-image: linear-gradient(#13c1e0, #2897e3);
  }

  .divTop{
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    padding: 80px;
    border-radius: 20% 20% 0 0;
    background-image: linear-gradient(#03181b, #0d0f11);
  }

  .divBottom{
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    padding: 80px;
    border-radius: 20% 20% 0 0;
    background-image: linear-gradient(#13c1e0, #2897e3);
  }

  .button {
    font: bold 12px;
    margin: 0px;
    padding: 10px;
    color: #fff;
  }

  .gradientRed {
      background-image: linear-gradient(#e9685b, #e03459);
  }

</style>
