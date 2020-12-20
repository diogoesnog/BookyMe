
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
    component: () => import('../views/Homepage.vue'),
    meta: {
      requiresAuth: true
    }
  }
  // Always leave this as last one,
  // but you can also remove it
  //{
    //path: '*',
    //component: () => import('pages/Error404.vue')
  //}
];

export default routes;
