import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/register/store',
    name: "RegisterStore",
    component: () => import('../views/RegisterStore'),
    meta: {
      // TODO: Change to true
      requiresAuth: false
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  console.log("Going to ", to);
  window.$cookies.set('test', 'value');
  if(to.matched.some(record => record.meta.requiresAuth) &&
      window.$cookies.get('Authorization') == null) {

    if(window.$cookies.get('Authorization') === null) {
      console.log("Unauthorized");
      next('/');
    }
  } else {
    next();
  }
});

export default router
