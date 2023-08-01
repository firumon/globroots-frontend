
const routes = [
  {
    path: '/',
    component: () => import('layouts/LuckyDrawLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/LuckyDraw/Index.vue') },
      { path: '/student/:code', component: () => import('pages/LuckyDraw/Student.vue'), props:true },
      { path: '/iamadmin', component: () => import('pages/LuckyDraw/Admin.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
