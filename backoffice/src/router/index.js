import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Home'),
    meta: {
      requiresAuth: false
    },

  },
  {
    path: '/home',
    name: "Home",
    meta: {
      requiresAuth: true,
      requiresStores: true
    }
  },
  /*{
    path: '/home',
    name: "Dashboard",
    meta: {
      requiresAuth: true
    },
    get component() {
      let user = getUser();
      if( user ) {
        // console.log("User Stores = ", user.stores.length);
        if(user.stores.length > 0) {
          return import('../views/private/Home');
        } else {
          return import ('../views/private/RegisterStore');
        }
      }
      this.$router.push("Login");
      return false;
    }
  },*/
  {
    path: '/register/store',
    name: "RegisterStore",
    component: () => import('../views/private/RegisterStore'),
    meta: {
      // TODO: Change to true
      requiresAuth: true
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
  // window.$cookies.set('test', 'value');
  let user = getUser(),
      cookie = getCookie();
  if(to.matched.some(record => record.meta.requiresAuth) &&
      cookie == null && user == null) {

    if(getCookie()) {
      console.log("Unauthorized");
      next('/');
    }
  } else {

    if( to.name === "Home" ) {
        let stores = user.stores;

        if( stores.length === 0 ) {
          console.log("No Stores");
          next('/register/store');
        } else {
          next();
        }
    } else {
      next();
    }
  }
});


function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

function getCookie() {
  return window.$cookies.get('Authorization');
}

export default router
