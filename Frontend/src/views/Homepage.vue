<template>
  <div>
    <p>User logged on</p>

    <Categories v-for="(category, index) in categories" :key="index" v-bind="category"/>
  </div>
</template>

<script>
import Service from '../services/user.service';
import Categories from '../components/Homepage/Categories';
export default {
  name: "Homepage",

  // Os Dados Utilizados pelo componente ou view
  data() {
    return {
      categories: Array
    }
  },

  components: {
    Categories
  },

  // Lifecycle
  // https://v3.vuejs.org/images/lifecycle.png
  /**
   * A Instancia do Componente/View foi incializada
   * Setup dos dados ainda não ocorreram
   */
  beforeCreate() {
    console.log("Component has been initialized");
  },

  /**
   *  Chamada Síncrona assim que a instancia do componente/view seja criada
   *  - Todas as opções foram inicializadas: observers, propriedades computed, métodos, watch e callbacks
   */
  created() {
    console.log("Component has been Created");
  },

  /**
   * Chamado antes da função mounted
   * A função de Render da DOM está prestes a ser chamada
   */
  beforeMount() {
    console.log("Before Mount");
  },

  /**
   * A View já foi renderizada
   * Podemos usar este método para chamadas à API
   */
  mounted() {
    console.log("Mounted: View has been rendered");
    this.fetchCategories();
  },

  /**
   * Chamada antes das alterações da DOM (reactividade)
   */
  beforeUpdate() {
    console.log("Before Updating DOM");
  },

  /**
   * Os dados da DOM foram atualizados com sucesso
   */
  update() {
    console.log("Data in DOM Updated");
  },

  /**
   * Antes de uma View/Component sair da memória/DOM
   */
  beforeDestroy() {
    console.log("Before destroying the component");
  },

  /**
   * O Component/View foi destruido
   */
  destroyed() {
    console.log("Component has been destroyed");
  },


  // Métodos do Componente
  methods: {

    fetchCategories() {
      this.$q.loading.show({ delay: 400});

      Service.getCategories()
        .then(response => {
          let data = response.data["data"];

          this.categories = data;

          console.log(this.categories);
        }).catch(err => {

        }).finally(() => {
          this.$q.loading.hide();
        })
    }
  }
}
</script>

<style scoped>

</style>
