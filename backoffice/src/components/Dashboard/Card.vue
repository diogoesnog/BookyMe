<template>
  <v-card
          class="rounded-card"
          color="#2897e3"
  >
    <v-card-title
    >
      <span class="title">{{title}}</span>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "Card",
  props: {
    title: String
  }
}
</script>

<style scoped>
  .title{
    color: ghostwhite;
  }
  .rounded-card{
    border-radius:50px;
  }
</style>
