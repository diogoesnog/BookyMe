
const routes = [
  {
    name: "Login",
    path: '/',
    component: () => import('../views/LoginAndRegister.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    name: "Home",
    path: '/home',
    component: () => import('../views/Homepage'),
    meta: {
      requiresAuth: true
    }
  },
  {
    name: "Categories",
    path: '/categories',
    component: () => import('../views/Categories'),
    meta: {
      requiresAuth: true
    }
  },
  {
    name: "Favorites",
    path: '/favorites',
    component: () => import('../views/Favorites'),
    meta: {
      requiresAuth: true
    }
  },
  {
    name: "Settings",
    path: '/settings',
    component: () => import('../views/Settings'),
    meta: {
      requiresAuth: true
    },

  } 
  // Always leave this as last one,
  // but you can also remove it
  //{
    //path: '*',
    //component: () => import('pages/Error404.vue')
  //}
];

export default routes;
