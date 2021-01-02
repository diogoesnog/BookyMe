import vue from 'vue';
import VueCookies from 'vue-cookies';

vue.use(VueCookies);

vue.$cookies.config('1h');