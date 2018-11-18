import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Create from '@/pages/Create'
import Detail from '@/pages/Detail'
import Edit from '@/pages/Edit'
import Login from '@/pages/Login'
import My from '@/pages/My'
import Register from '@/pages/Register'
import User from '@/pages/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Create',
      name: 'Create',
      component: Create
    },
    {
      path: '/Detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/Edit',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/My',
      name: 'My',
      component: My
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/User',
      name: 'User',
      component: User
    }
  ]
})
