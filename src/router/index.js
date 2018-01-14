import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import LoginBox from '@/components/common/loginBox'
import RegisterBox from '@/components/common/registerBox'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginBox
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterBox
    }
  ]
})
