import Home from '@/components/Home'
import FAQPage from '@/components/pages/FAQ'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/faq',
    name: 'Como funciona',
    component: FAQPage
  }
]

export default { routes }
