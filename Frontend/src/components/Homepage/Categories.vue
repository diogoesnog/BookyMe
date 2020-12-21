<template>
  <div>
    <p>Nome: {{this.title}}</p>
    <p>Counter: {{this.count}}</p>
  </div>
</template>

<script>
export default {
  name: "Categories",

  props: {
    title: String,
    count: Number
  }
}
</script>

<style scoped>

</style>
