<template>
<div>
  <v-row no-gutters>
      <v-col cols="2">
        <Navbar/>
      </v-col>
      <v-col cols="10">
        <!--<h1 class="text-center">Catalog</h1>-->
        <h1>Catálogo</h1>
        <br>
        <v-card>
          <v-btn block outlined color="primary" @click="dialog = !dialog">
          Adicionar ao Catálogo
        </v-btn>
          <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Adicionar ao Catálogo</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <NewCatalog v-bind:catalog="catalog" :submitButton="false"/>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
              <v-btn color="blue darken-1" text @click="cancel">Fechar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

          <Items v-bind:catalogs="catalogs" @deleteCatalog="deleteCatalog"/>

        </v-card>
    </v-col>
  </v-row>
</div>
</template>

<script>
import Services from '../../service/user.service';
import Catalog from '../../models/Store/catalog';

export default {
  name: "CatalogList",
  components: {
    Navbar: () => import('../../components/common/Navbar'),
    Items: () => import('../../components/Catalog/Items'),
    NewCatalog: () => import('../../components/RegisterStore/Catalog')
  },
   data() {
    return {
      id: this.$route.params.id,
      catalogs: Array,
      catalog: new Catalog(),
      dialog: false
    }
  },
  mounted(){
      console.log('Loading store catalog...');
      this.fetchCatalogs();
  },
  methods: {

    fetchCatalogs()  {
      console.log('Store: ' + this.id)
      Services.getStoreCatalog(this.id)
        .then(response => {
          this.catalogs = response.data["data"];
          this.base = response.data.base;
          console.log('Successfully loaded store catalogs');
        }).catch(err => {
          console.log(err.data);
        });
    },

    save() {
      Services.addCatalogItem(this.id, this.catalog)
          .then(response => this.catalogs.push(response.data[ "data" ]))
          .catch(err => console.error(err));

      this.cancel();
    },
    cancel() {
      this.dialog = false;
      this.catalog = new Catalog();
    },

    deleteCatalog(item){
      console.log("Deleting", item._id);
        Services.deleteCatalogItem(item._id)
          .then(response => {
            let data = response.data[ "data" ]
            console.log(data);
            if(data.deletedCount === 1) {
              this.fetchCatalogs();
            }
          }).catch(err => console.log(err.data));
    }
  }
}
</script>

<style scoped>
.break-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>