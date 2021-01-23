<template>
  <div>
    <v-data-table :headers="headers" :items="notifications" :items-per-page="10">
      <template v-slot:item.read="{ item }">
        {{ item.read ? "Lida" : "Não Lida" }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "Notifications",
  props: {
    notifications: Array
  },
  data() {
    return {
      headers: [],
    }
  },

  methods: {
  }
}
</script>

<style scoped>
.margin {
  padding: 15px;
}
</style>