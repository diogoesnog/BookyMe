<template>
  <div>


    <!--<v-card tile height="100%" class="overflow-hidden"
          style="position: relative;">-->
    <v-navigation-drawer app floating dark permanent expand-on-hover>
      <v-list>
        <!-- Home Link -->
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <router-link :to="{name: 'Store', params: {id: this.$route.params.id}}">Dashboard</router-link>
          </v-list-item-content>
        </v-list-item>

        <!-- Bookings Link -->
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-calendar-clock</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <router-link :to="{name: 'Booking', params: {id: this.$route.params.id}}">Reservas</router-link>
          </v-list-item-content>
        </v-list-item>

        <!-- Catalog Link -->
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-ufo</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
              <router-link :to="{name: 'CatalogList', params: {id: this.$route.params.id}}">Catálogo</router-link>
          </v-list-item-content>
        </v-list-item>

        <!-- Store Settings Link -->
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-book-information-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <router-link :to="{name: 'EditStore', params: {id: this.$route.params.id}}">Informações Gerais</router-link>
          </v-list-item-content>
        </v-list-item>

        <!-- Store Photos -->
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-camera</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <router-link :to="{name: 'PhotoStore', params: {id: this.$route.params.id}}">Fotografias</router-link>
          </v-list-item-content>
        </v-list-item>

        <!-- Account Settings Link -->
        <!--<v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Definições de Conta
          </v-list-item-content>
        </v-list-item>-->
      </v-list>


      <div class="split"></div>


      <v-list>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-keyboard-return</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <router-link :to="{name: 'Home', params: {id: this.$route.params.id}}">Selector de Loja</router-link>
            </v-list-item-content>
          </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content @click="logout">
            <a href="#" @click="logout">Logout</a>
          </v-list-item-content>
        </v-list-item>
        </v-list>
    </v-navigation-drawer>
  <!--</v-card>-->
  </div>
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
      this.$router.push('/');
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