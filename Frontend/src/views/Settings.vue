<template>
    <div>
        <q-select v-model="language" :options="languageOptions" label="idioma" @change="changeLanguage"/>
    </div>
</template>

<script>
export default {

  name: "Settings",
  components: { },

  data() {
    return {
        language: String,
        languageOptions: ["pt", "fr", "en-US"]
    }
  },

  mounted() {
    console.log("Mounted: View has been rendered");
  },
  methods: {
      changeLanguage () {
          localStorage.setItem(language, this.language);
      }
  }
}

</script>

<style scoped>
</style>
