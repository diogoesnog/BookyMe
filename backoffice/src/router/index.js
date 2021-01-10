import Vue from 'vue'
import VueRouter from 'vue-router'
import user from '../store/user';

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
    component: () => import('../views/private/Home'),
    meta: {
      requiresAuth: true,
      requiresStores: true
    }
  },
  {
    path: '/store/:id',
    name: "Store",
    component: () => import('../views/private/EmptyRouter'),
    children: [
      {
        name: "HomeStore",
        path: "",
        component: () => import('../views/private/subpages/Store'),
      },
      {
        name: "EditStore",
        path: "/edit",
        component: () => import('../views/private/subpages/EditStore')
      }
    ],
    meta: {
      requiresStores: true,
      requiresAuth: true
    }
  },
  {
    path: '/register/store',
    name: "RegisterStore",
    component: () => import('../views/private/RegisterStore'),
    meta: {
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

  /*console.log("Going To", to);
  let hasFavorites = user.getters.hasFavorites,
      hasStores = user.getters.hasStores;

  let cookie = getCookie();

  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(cookie == null) {
      next('/');
    } else {
      if( hasStores ) {
        next();
      } else {
        next('/register/store');
      }
    }
  } else {
    next();
  }*/
  console.log("Going to ", to);
  let user = getUser(),
      cookie = getCookie();
  console.log("user", user);
  console.log("Cookie", cookie);
  // Route Requires Auth
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(user != null && cookie != null) {
      if(to.matched.some(record => record.meta.requiresStores)) {
        if(user.stores.length > 0) {
          // window.alert("User Stores > 0");
          next();
        } else {
          // If user is not owner of stores, create one...
          next('/register/store');
        }
      } else {
        next();
      }
    } else {
      next('/');
    }
  } else {
    next();
  }

});


function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

function getCookie() {
  return window.$cookies.get('Authorization');
}

export default router
