<template>
  <div>
    {{this.name}}
    {{this._id}}
    {{this.phone}}
    {{this.description}}
  </div>
</template>

<script>
export default {
  name: "StoreData",

  props: {
    _id: String,
    name: String,
    category: String,
    description: String,
    address: Object,
    phone: Number,
    rating: Number,
    photos: Array,
    schedule: Array

  },
}
</script>

<style scoped>

</style>
