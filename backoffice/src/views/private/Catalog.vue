<template>
    <v-card>
         
        <v-card-title>
            
            <v-text-field
                v-model="search"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
            <v-btn depressed @click="registerCatalog">
                New item
            </v-btn>
        </v-card-title>
        <v-data-table
        :headers="headers"
        :items="catalogs"
        class="elevation-1"
        :search="search"
        :key="refresh"
        >
        <template v-slot:item.action="{ item }" >
            <v-btn
              @click="deleteCatalog(item)"
            >
            Edit
            </v-btn>
             <v-btn
              @click="deleteCatalog(item)"
            >
            Delete
            </v-btn>
        </template>

        </v-data-table>

       
    </v-card>
</template>

<script>
import Services from '../../service/user.service';

export default {
  name: "Catalog",
   data() {
    return {
      id: this.$route.params.id,
      catalogs: [],
      search: '',
      refresh: 0,
      props: {
        _id: String,
        product: String,
        price: String,
        abstract: String
      },
      headers:[
          {text: 'Product', align: 'left', value: 'product'},
          {text: 'Price (€)', align: 'left',  value: 'price'},
          {text: 'Abstract', align: 'left',  value: 'abstract'},
          {text: 'Action', align: 'center',  value: 'action'},

        ],
    }
  },
  mounted(){
      console.log('Loading store catalog...')
      this.fetchCatalogs()
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
    registerCatalog(){
        this.$router.push('/store/catalog/register')
    }
    ,
    deleteCatalog(item){
        Services.deleteCatalogItem(item._id)
        .then(response => {
          console.log('Successfully deleted catalog ' + response.status);
          const index = this.catalogs.indexOf(item)
          if (index > -1) {
            this.catalogs.splice(index, 1);
          }
        }).catch(err => {
          console.log(err.data);
        });
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