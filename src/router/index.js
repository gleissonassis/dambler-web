import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import LoginBox from '@/components/common/LoginBox'
import RegisterBox from '@/components/common/RegisterBox'

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
