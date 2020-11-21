
const routes = [
  {
    path: '/',
    component: () => import('../views/Login.vue'),
    /*children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]*/
  },

  // Always leave this as last one,
  // but you can also remove it
  //{
    //path: '*',
    //component: () => import('pages/Error404.vue')
  //}
];

export default routes;
