<template>
  <div>
    <q-select
      v-model="lang"
      :options="langOptions"
      :label="$t('settingsPage.language')">

    </q-select>

    <div v-if="loginForm">
      <LoginForm/>
      <br/>
      <p>{{$t('loginPage.noAccount')}}</p>
      <span @click="loginForm = !loginForm"><b>{{$t('loginPage.createAccount')}}</b></span>
    </div>

    <div v-else>
      <RegisterForm/>
      <!-- <q-btn push color="primary" style="width: 100%" @click="loginForm = !loginForm">
        {{ $t('commonButtons.cancel')}}
      </q-btn> -->
      <p class="text-center" style="margin-top:15px">{{$t('registerPage.alreadyHasAccount')}}</p>
      <span class="center" @click="loginForm = !loginForm"> <b>{{$t('registerPage.login')}}</b></span>
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

</style>
