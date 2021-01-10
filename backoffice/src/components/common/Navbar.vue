<template>
  <v-app>
  <v-card
      tile
      width="256px"
      height="100%"
  >
    <v-navigation-drawer dark permanent>
      <v-list>
        <!-- Home Link -->
        <v-list-item link>
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <router-link :to="{name: 'StoreDash', params: {id: this.$route.params.id}}">Home</router-link>
          </v-list-item-content>
        </v-list-item>

        <!-- Bookings Link -->
        <v-list-item link>
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Bookings
          </v-list-item-content>
        </v-list-item>

        <!-- Catalog Link -->
        <v-list-item link>
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Catalog
          </v-list-item-content>
        </v-list-item>

        <!-- Store Settings Link -->
        <v-list-item link>
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <router-link :to="{name: 'EditStore', params: {id: this.$route.params.id}}">Store Settings</router-link>
          </v-list-item-content>
        </v-list-item>

        <!-- Account Settings Link -->
        <v-list-item link>
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Account Settings
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div class="split"></div>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn @click="logout" block>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-card>
  </v-app>
</template>

<script>
import AuthService from '../../service/auth.service';
export default {
  name: "Navbar",
  data() {
    return {
      id: this.$route.params.id,
    }
  },
  methods: {
    logout() {
      AuthService.logout();
    }
  }
}
</script>

<style scoped>
.split {
  margin-top: 100%;
}
</style>