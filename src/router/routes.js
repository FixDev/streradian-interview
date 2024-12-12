const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/cars',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/cars/IndexCars.vue') }],
  },
  {
    path: '/car/add',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/cars/add/AddCar.vue') }],
  },
  {
    path: '/car/view/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/cars/view/ViewCar.vue') }],
  },
  {
    path: '/car/edit/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/cars/edit/EditCar.vue') }],
  },
  {
    path: '/orders',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/orders/IndexOrders.vue') }],
  },
  {
    path: '/order/add',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/orders/add/AddOrder.vue') }],
  },
  {
    path: '/order/view/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/orders/view/ViewOrder.vue') }],
  },
  {
    path: '/order/edit/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/orders/edit/EditOrder.vue') }],
  },
  {
    path: '/cart',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/cart/IndexCart.vue') }],
  },
  {
    path: '/cart/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/cart/ViewCart.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
