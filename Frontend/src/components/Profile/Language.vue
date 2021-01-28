<template>
  <div class="language">
    <div class="roundedDivTitle shadow">
      <p style="font-weight: 500; font-size: 130%; align-items: center; text-align: left; margin: 20px;" class="font-weight-bold button">
        {{ $t('profilePage.language') }}
      </p>
    </div>
    <div class="roundedDivContent shadow" style="display: grid; border-radius: 30px; font-weight: 200; text-align: left;">
      <div class="row" style="margin: 15px; padding-right: 10px;">
        <q-select style="width: 100%" rounded behavior="menu" v-model="lang"
          :options="langOptions"
          :label="$t('settingsPage.language')" >
        </q-select>
      </div>
    </div>
  </div>
</template>

<script>

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
  
</style>