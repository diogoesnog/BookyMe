<template>
  <v-card
      class="mx-auto"
      width="256"
      height="100%"
  >
    <v-navigation-drawer
        class="deep-purple accent-4"
        dark
        permanent
    >
      <v-list>
        <!-- Home Link -->
        <v-list-item>
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Home
          </v-list-item-content>
        </v-list-item>

        <!-- Bookings Link -->
        <v-list-item>
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Bookings
          </v-list-item-content>
        </v-list-item>

        <!-- Store Settings Link -->
        <v-list-item>
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Store Settings
          </v-list-item-content>
        </v-list-item>

        <!-- Account Settings Link -->
        <v-list-item>
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Account Settings
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
name: "Navbar"
}
</script>

<style scoped>

</style>