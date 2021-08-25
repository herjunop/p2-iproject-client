import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import BookPage from '../views/BookPage.vue'
import Booking from '../views/Booking.vue'
import addSportCentre from '../views/addSportCentre.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/booking',
    name: 'Booking',
    component: Booking
  },
  {
    path: '/addSportCentre',
    name: 'addSportCentre',
    component: addSportCentre
  },
  {
    path: '/:id',
    name: 'BookPage',
    component: BookPage
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let toLogin = to.name === 'Login' || to.name === 'Register'
  let access_token = localStorage.getItem('access_token')

  if (!access_token && !toLogin) {
    next('/login')
  }else if (access_token && toLogin) {
    next('/')
  }else{
    next()
  }

})

export default router
