
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
    name: "Profile",
    path: '/users/login',
    component: () => import('../views/Profile.vue'),
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
    name: "Reservations",
    path: '/reservations',
    component: () => import('../views/Reservations'),
    meta: {
      requiresAuth: true
    }
  },
  {
    name: "Reservation",
    path: '/reservations/:id',
    component: () => import('../views/Reservation'),
    meta: {
      requiresAuth: true
    }
  },
  {
    name: "Stores",
    path: '/stores/:category',
    component: () => import('../views/Stores'),
    meta: {
      requiresAuth: true
    }
  },
  {
    name: "Store",
    path: '/store/:id',
    component: () => import('../views/Store'),
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
  },
  {
    name: "Notifications",
    path: '/notifications',
    component: () => import('../views/Notifications'),
    meta: {
      requiresAuth: true
    }
  }
];

export default routes;
