import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import './plugins/Cookies';
import vuex from './plugins/vuex';
import vueApexCharts from '@/plugins/apexcharts'
import router from './router';
import moment from './plugins/Moment';
import i18n from './plugins/i18n';
import store from './store/user';

Vue.config.productionTip = false

export default new Vue({
  vuetify,
  store,
  vuex,
  moment,
  i18n,
  vueApexCharts,
  router,
  render: h => h(App)
}).$mount('#app')