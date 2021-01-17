<template>
  <v-alert dense :type="alert.type">
    <div class="title">
      {{ alert.title }}
    </div>
    <div>
      {{ alert.message }}
    </div>
  </v-alert>
</template>

<script>
export default {
  name: "Alert",
  props: {
    alert: Object
  }
}
</script>

<style scoped>

</style>