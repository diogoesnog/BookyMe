<template>
  <v-app>
  <v-card tile height="100%" class="overflow-hidden"
          style="position: relative;">
    <v-navigation-drawer dark permanent expand-on-hover absolute>
      <v-list>
        <!-- Home Link -->
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <router-link :to="{name: 'StoreDash', params: {id: this.$route.params.id}}">Home</router-link>
          </v-list-item-content>
        </v-list-item>

        <!-- Bookings Link -->
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-calendar-clock</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <router-link :to="{name: 'Booking', params: {id: this.$route.params.id}}">Bookings</router-link>
          </v-list-item-content>
        </v-list-item>

        <!-- Catalog Link -->
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-ufo</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Catalog
          </v-list-item-content>
        </v-list-item>

        <!-- Store Settings Link -->
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-book-information-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <router-link :to="{name: 'EditStore', params: {id: this.$route.params.id}}">General Info</router-link>
          </v-list-item-content>
        </v-list-item>

        <!-- Store Photos -->
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-camera</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <router-link :to="{name: 'PhotoStore', params: {id: this.$route.params.id}}">Photos Info</router-link>
          </v-list-item-content>
        </v-list-item>

        <!-- Account Settings Link -->
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Account Settings
          </v-list-item-content>
        </v-list-item>
      </v-list>


      <div class="split"></div>


      <v-list>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-keyboard-return</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <router-link :to="{name: 'PhotoStore', params: {id: this.$route.params.id}}">Seletor de Loja</router-link>
            </v-list-item-content>
          </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content @click="logout">
              Logout
          </v-list-item-content>
        </v-list-item>
        </v-list>
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
a {
  text-decoration: none;
}
</style>