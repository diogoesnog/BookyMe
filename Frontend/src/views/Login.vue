<template>
  <div> 
    <q-select
      v-model="lang"
      :options="langOptions"
      :label="$t('settingsPage.language')">

    </q-select>

    <div v-if="loginForm" style="padding-left:30px; padding-right:30px">
      <LoginForm/>
      <br/>
<<<<<<< Updated upstream
      <span @click="loginForm = !loginForm"><q-btn color="secondary" icon="how_to_reg" :label="$t('loginPage.noAccount')"></q-btn></span>
=======
      <p>
        {{$t('loginPage.noAccount')}}
        <span @click="loginForm = !loginForm">
          <b>{{$t('loginPage.createAccount')}}</b>
        </span>
      </p>
>>>>>>> Stashed changes
    </div>

    <div v-else>
      <q-btn class="glossy" round color="red-6" icon="fas fa-angle-left" style="margin-left:20px;margin-top:10px; position: absolute; z-index:999" @click="loginForm = !loginForm" />
      <RegisterForm/>
      <!-- <q-btn push color="primary" style="width: 100%" @click="loginForm = !loginForm">
        {{ $t('commonButtons.cancel')}}
      </q-btn> -->
<<<<<<< Updated upstream
        <div class="row" style="margin-top:10px">
          <div class="col-6">
            <p class="text-right">{{$t('registerPage.alreadyHasAccount')}}</p>
          </div>
          <div class="col-6">
            <span style="margin-left:10px"  @click="loginForm = !loginForm"> <b>{{$t('registerPage.login')}}</b></span>
          </div>
        </div>
=======
      <p class="text-center" style="margin-top:35px">{{$t('registerPage.alreadyHasAccount')}}</p>
      <span class="absolute-center" style="margin-top:95%" @click="loginForm = !loginForm"> <b>{{$t('registerPage.login')}}</b></span>
>>>>>>> Stashed changes
    </div>
  </div>
</template>

<script>
  import LoginForm from 'components/Root/LoginForm'
  import RegisterForm from 'components/Root/RegisterForm';
  export default {
    name: "Login",
    components: { LoginForm, RegisterForm },
    data() {
      return {
        loginForm: true,
        lang: this.$i18n.locale,
        langOptions: [
          { value: 'en-us', label: this.$t('languages.english')},
          { value: 'pt', label: this.$t('languages.portuguese')},
          { value: 'fr', label: this.$t('languages.french')}
        ]
      }
    },
    watch: {
      lang(lang) {
        console.log("Language Change", lang);
        this.$i18n.locale = lang.value;
      }
    }
  }
</script>

<style scoped>

<<<<<<< Updated upstream

=======
  .centerDiv {
    width: 75%;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
  }
>>>>>>> Stashed changes

</style>
