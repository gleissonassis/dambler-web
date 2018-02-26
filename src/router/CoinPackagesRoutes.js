import Home from '@/components/pages/coin-packages/Home'

const routes = [
  {
    path: '/coin-packages',
    component: Home
  },
  {
    path: '/coin-packages/:id',
    component: Home
  },
  {
    path: '/buy',
    component: Home
  }
]

export default { routes }
