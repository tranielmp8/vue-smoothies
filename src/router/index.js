import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateSmoothie from '../views/CreateSmoothie.vue'
import EditSmoothie from '../views/EditSmoothie.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/create-smoothie',
      name: 'createSmoothie',
      component: CreateSmoothie
    },
    {
      path: '/edit-smoothie/:smoothie_slug',
      name: 'editSmoothie',
      component: EditSmoothie
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'signup',
      component: Signup
    },
    
  ]
})

export default router
