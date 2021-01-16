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
    component: () => import('../views/private/Home'),
    meta: {
      requiresAuth: true,
      requiresStores: true
    }
  },
  {
    path: '/store/:id',
    name: "Store",
    component: () => import('../views/private/subpages/Store'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/store/:id/edit',
    name: "EditStore",
    component: () => import('../views/private/EditStore'),
    meta: {
      requiresAuth: true
    }
  },
  {
    name: "PhotoStore",
    path: '/store/:id/photos',
    component: () => import('../views/private/Photos'),
    meta: {
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
  },
  {
    path: '/store/catalog/:id',
    name: "CatalogList",
    component: () => import('../views/private/CatalogList'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/catalog/register/:id',
    name: "AddCatalogItem",
    component: () => import('../views/private/AddItemCatalog'),
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
  console.log("Going to ", to);
  let cookie = getCookie();
  console.log("Cookie", cookie);
  // Route Requires Auth
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(cookie != null) {
      if(to.matched.some(record => record.meta.requiresStores)) {
        let hasStores = getStores() > 0;
        console.log("Has Stores: ", hasStores);
        if(hasStores) {
          next();
        } else {
          next('/register/store');
        }
      } else {
        next();
      }
    } else {
      next('/');
    }
  } else {
    if(cookie !== null) {
      next('/home')
    } else {
      next();
    }
  }

});


function getStores() {
  return JSON.parse(localStorage.getItem("stores"));
}

function getCookie() {
  return window.$cookies.get('Authorization');
}

export default router
