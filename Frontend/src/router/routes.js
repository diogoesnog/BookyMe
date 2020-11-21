
const routes = [
  {
    path: '/',
    component: () => import('../views/Login.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/home',
    component: () => import('../views/Home'),
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
