import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import './plugins/Cookies';
import vuex from './plugins/vuex';
import router from './router'
import i18n from './plugins/i18n';
import store from './store/user';

Vue.config.productionTip = false

export default new Vue({
  vuetify,
  store,
  vuex,
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')