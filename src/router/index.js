import { createRouter, createWebHistory } from 'vue-router'
import defaultLayout from '@/layout/defaultLayout.vue'
import customLayout from '@/layout/customLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Public',
      component:customLayout,
      redirect:'/',
      children:[
        {
          path:'/',
          name:'home',
          component:() => import('../views/website/HomeView.vue'),
        },
        {
          path:'/about',
          name:'about',
          component:() => import('../views/website/HomeView.vue'),
        },
        {
          path:'/list',
          name:'list',
          component:() => import('../views/website/HomeView.vue'),
        },
        {
          path:'/login',
          name:'login',
          component:() => import('../views/Login.vue'),
        },
      ]
    },
    {
      path: '/antar_',
      name: 'antar_',
      component:defaultLayout,
      redirect:'/antar_',
      children:[
        {
          path:'/antar_/',
          name:'dashboard',
          component:() => import('../views/antar_/dashboard/dashboard.vue'),
        },
        {
          path:'/antar_/analytics',
          name:'analytics',
          component:() => import('../views/antar_/analytics/analytics.vue'),
        }, {
          path:'/antar_/audience-management',
          name:'audience-management',
          component:() => import('../views/antar_/audiencemanagement/audiance.vue'),
        }, {
          path:'/antar_/campaigns',
          name:'campaigns',
          component:() => import('../views/antar_/campaigns/campains.vue'),
        }, {
          path:'/antar_/content-library',
          name:'content-library',
          component:() => import('../views/antar_/contentlibrary/library.vue'),
        }, {
          path:'/antar_/customer-journey',
          name:'customer-journey',
          component:() => import('../views/antar_/customerjourneys/consumer.vue'),
        }, {
          path:'/antar_/settings',
          name:'settings',
          component:() => import('../views/antar_/settings/settings.vue'),
        }, {
          path:'/antar_/workflow',
          name:'workflow',
          component:() => import('../views/antar_/workflows/workflow.vue'),
        }, {
          path:'/antar_/create-post',
          name:'create-post',
          component:() => import('../views/antar_/createpost/CreatePost.vue'),
        }
      ]
    },
  ],
})

export default router
