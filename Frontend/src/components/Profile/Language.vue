<template>
  <div class="language">
    <div class="roundedDivTitle shadow">
      <p style="font-weight: 500; font-size: 130%; align-items: center; text-align: left; margin: 20px;" class="font-weight-bold button">
        {{ $t('profilePage.language') }}
      </p>
    </div>
    <div class="roundedDivContent shadow" style="display: grid; border-radius: 30px; font-weight: 300; font-size: 20px; text-align: left;">
      <div class="row" style="margin: 20px; padding-right: 10px;">
        <q-select style="width: 100%; font-size: 18px;" rounded behavior="menu" v-model="lang"
          :options="langOptions"
          :label="$t('settingsPage.language')" >
        </q-select>
      </div>
    </div>
    <div class="buttonLogOut">
      <q-btn class="gradientBlue" rounded @click="handleLogout" style="width: 240px; height: 40px;">
        <span style="font-size:22px; text-transform: capitalize;" class="font-weight-bold button">
            {{ $t('profilePage.signout') }}
        </span>
        <q-icon name="fas fa-sign-out-alt" color="white" style="margin-left: 10px;"/>
      </q-btn>
    </div>
  </div>
</template>

<script>

import Service from '../../services/auth.service';

export default {
  
  name: "Language",

  data() {
    return {
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
  },

  methods: {
    handleLogout() {
      Service.logout(this.user)
      this.$router.push({ name: 'Home' })
    },
  }
}

</script>

<style scoped>

  .language {
    position: relative;
    margin: 25px;
  }

  .roundedDivTitle {
    background: linear-gradient(#e9695c, #e03459);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 100px;
    -webkit-transform: translate(-65%, 50%);
    width: 150px;
    height: 35px;
    border-radius: 30px;
    color: white;
  }

  .roundedDivContent {
    display: flex;
    align-items: center;
    padding-left: 10px;
  }

  .shadow {
    box-shadow: 0 0px 15px rgba(0, 0, 0, 0.116);
  }
  
  .gradientBlue {
    color: white;
    background-image: linear-gradient(#13c1e0, #2897e3);
  }

  .buttonLogOut {
    display: flex;
    justify-content: center;
    margin: 40px;
  }

</style>