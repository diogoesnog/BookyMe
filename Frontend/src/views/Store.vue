<template>
  <div >
    <div class="centerDiv" >
      <!-- <div class="row">
        <div class="col-4">
          <q-select
            class="selectLanguage"
            rounded
            outlined
            v-model="lang"
            :options="langOptions"
            :label="$t('settingsPage.language')">
          </q-select>
        </div>
      </div>-->

    </div>
    <div>
      <StoreData v-bind="storeData"/>
    </div>
    <div>
      <Toolbar/>
    </div>
  </div>

</template>

<script>

import Toolbar from '../components/Root/Toolbar';
import StoreData from '../components/Store/StoreData';



export default {

  name: "Store",
  components: {
    StoreData,
    Toolbar
  },

  data() {
    return {
      profileData: {},
      base: '',
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

  mounted() {
    console.log("Mounted: View has been rendered");
    this.fetchStoreData();
  },

  methods: {

    fetchStoreData() {
      this.$q.loading.show({ delay: 400});

      // TODO: Fazer para o estabelecimento a ligação
      /*Service.getProfileData()
        .then(response => {
          let data = response.data["data"];
          this.base=response.data["base"];
          this.profileData=data;

          console.log(this.profileData);
        }).catch(err => {

      }).finally(() => {
        this.$q.loading.hide();
      })*/
    }
  }

}


</script>

<style scoped>

.centerDiv {
  padding: 5px;
  margin-top: 5px;
}

.gradientOne {
  margin-left: 10px;
  margin-top: 0;
  position: absolute;
  background: linear-gradient(#e9695c, #e03459);
  color: white;
}

.bottomInfoRegister {
  margin-top: -75px;
  position: relative;
  text-align: center;
}

.bottomInfoLogin {
  color: white;
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
  width: 100%;
  padding: 35px;
}

.selectLanguage {
  width: 90%;
  position: relative;
}

.roundedDiv {
  border-radius: 200px;
  background: white;
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.shadow {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border-radius: 28px;
}

</style>
