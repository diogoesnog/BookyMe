<template>
  <div>
    <!-- Form Login -->
    <div v-if="loginForm" style="padding-left:30px; padding-right:30px">
      <LoginForm/>
      <p>
        {{$t('loginPage.noAccount')}}
        <span @click="loginForm = !loginForm">
          <b>{{$t('loginPage.createAccount')}}</b>
        </span>
      </p>
    </div>

    <!-- Form Register -->
    <div class="centerDiv" v-else>
      <div class="row">
        <div class="col-6">
          <q-btn padding="6px 6px" class="gradientOne" round icon="fas fa-angle-left" @click="loginForm = !loginForm"/>
        </div>
        <div class="col-6">
          <q-select
            class="selectLanguage"
            rounded
            outlined
            v-model="lang"
            :options="langOptions"
            :label="$t('settingsPage.language')">
          </q-select>
        </div>
      </div>
      <RegisterForm/>
      <p class="bottomInfo">
        {{$t('registerPage.alreadyHasAccount')}}
          <span @click="loginForm = !loginForm"> 
           <b>{{$t('registerPage.login')}}</b>
          </span>
      </p>
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
          { value: 'English', label: this.$t('languages.english')},
          { value: 'Português', label: this.$t('languages.portuguese')},
          { value: 'French', label: this.$t('languages.french')}
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

  .centerDiv {
    padding: 15px;
    margin-top: 10px;
  }

  .gradientOne {
    margin-left: 10px;
    margin-top: 0px; 
    position: absolute; 
    background: linear-gradient(#e9695c, #e03459);
    color: white;
  }

  .bottomInfo {
    margin-top: -75px;
    position: relative;
    text-align: center; 
  }

  .selectLanguage {
    width: 90%;
    position: relative;
  }

</style>
