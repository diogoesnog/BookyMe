<template>
  <div class="col-12" style="padding-left: 30px; padding-top: 18px;">
    <p class="titles">{{$t('storePage.servicesCatalog')}}</p>
    <div v-if="this.catalog.length !=0" class="wrapper">
      <div v-for="(service, index) in catalog" :key="index" v-bind="service" class="item">
        <div class="row" style="width: 75%;">
          <div class="col-7 service">
            {{ service.product }}
          </div>
          <div class="col-5 price">
            {{ service.price }}€
          </div>
        </div>
      </div>
      <div class="empty"></div>
    </div>
    <div class="subTitle" v-else>
      {{$t('storePage.noCatalog')}}
    </div>
  </div>
</template>

<script>

import Service from '../../services/user.service'

export default {
  name: "StoreCatalog",

  data() {
    return {
      storeID: this.$route.params.id,
      catalog: Array
    }
  },

  mounted() {
    this.getCatalog();
  },

  methods: {
    getCatalog() {
      Service.getCatalog(this.storeID)
        .then(response => {
          this.catalog = response.data["data"];
        }).catch(err => console.log(err)
      ).finally(() => {
        this.$q.loading.hide();
      })
    }
  }

}
</script>

<style scoped>

  .titles {
    color: #434343;
    font-weight: 700;
    font-size: 30px;
  }

  .subTitle {
    color: #434343;
    font-weight: 300;
    font-size: 18px;
    text-align: justify;
    width: 93%;
  }

  .service {
    font-size: 18px;
    text-align: left;
    font-weight: 300;
    float: left;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
  }

  .price {
    font-size: 32px;
    text-align: right;
    font-weight: 700;
    float: right;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
  }

  .wrapper {
    overflow-x: scroll;
    overflow-y: hidden;
    display: grid;
    grid-template-columns: repeat(200, auto);
    grid-gap: 0 30px;
  }

  .item {
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    height: 110px;
    width: 201px;
    border-radius: 40px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.10);
    margin-left: 5px;
    margin-bottom: 5px;
    margin-top: 5px;
  }

  .empty {
    width: 10px;
  }

  .wrapper::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }

  .wrapper {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

</style>
