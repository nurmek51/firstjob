import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/categories',
    name: 'categories',
    component: () => import('@/pages/categories/index.vue'),
  },
  {
    path: '/',
    name: 'sales',
    component: () => import('@/pages/sales/index.vue'),
  },
  {
    path: '/sales',
    redirect: '/',
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('@/pages/products/index.vue'),
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('@/pages/checkout/index.vue'),
  },
  {
    path: '/receipt',
    name: 'receipt',
    component: () => import('@/pages/receipt/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router 