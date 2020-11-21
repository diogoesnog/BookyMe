<template>
  <div>
    <h1>Register</h1>
  </div>
</template>

<script>
import User from '../../models/User';

export default {
  name: "Register",
  data() {
    return {
      user: new User()
    }
  }
}
</script>

<style scoped>

</style>
