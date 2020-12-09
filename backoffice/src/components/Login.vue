<template>
  <div>
    <h1>Login</h1>
    <v-form>
      <v-text-field label="Username" type="text">
      </v-text-field>

      <v-text-field label="Password" type="password">
      </v-text-field>

      <v-btn color="success">Login</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "Login"
}
</script>

<style scoped>

</style>