<template>
  <div class="margin">
    <v-data-table>

    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "Services",

  data() {
    return {
      headers: [{
        text: 'User',
        align: 'start',
        sortable: false,
        value: 'userId',
      }]
    }
  }
}
</script>

<style scoped>
.margin {
  padding: 15px;
}
</style>