<template>
  <div>
    <v-row no-gutters>
      <v-col cols="2">
        <Navbar/>
      </v-col>
      <v-col cols="10">
        <router-view/>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import Navbar from "@/components/common/Navbar";
export default {
  name: "EmptyRouter",
  components: { Navbar },

}
</script>

<style scoped>

</style>