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
          name:'leads',
          component:() => import('../views/antar_/leads/leads.vue'),
        },
        {
          path:'/antar_/deals',
          name:'deals',
          component:() => import('../views/antar_/deals/deals.vue'),
        }, {
          path:'/antar_/contacts',
          name:'contacts',
          component:() => import('../views/antar_/contacts/contacts.vue'),
        }, {
          path:'/antar_/organizations',
          name:'organizations',
          component:() => import('../views/antar_/organizations/organizations.vue'),
        }, {
          path:'/antar_/notes',
          name:'notes',
          component:() => import('../views/antar_/notes/notes.vue'),
        }, {
          path:'/antar_/task',
          name:'task',
          component:() => import('../views/antar_/task/task.vue'),
        }, {
          path:'/antar_/call-logs',
          name:'call-logs',
          component:() => import('../views/antar_/call-logs/callLogs.vue'),
        }, {
          path:'/antar_/email-template',
          name:'email-template',
          component:() => import('../views/antar_/email-template/emailTemplate.vue'),
        }
      ]
    },
  ],
})

export default router
