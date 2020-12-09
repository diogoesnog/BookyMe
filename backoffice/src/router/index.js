import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: false
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  console.log("Going to ", to);
  this.$cookies.set('test', 'value');
  if(to.matched.some(record => record.meta.requiresAuth) &&
      this.$cookies.get('Authorization') == null) {

    if(this.$cookies.get('Authorization') === null) {
      console.log("Unauthorized");
      next('/');
    }
  } else {
    next();
  }
});

export default router
