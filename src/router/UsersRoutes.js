import LoginPage from '@/components/pages/users/login/Login'
import RegisterPage from '@/components/pages/users/register/Register'
import ConfirmationPage from '@/components/pages/users/Confirmation'
import PasswordResetRequestPage from '@/components/pages/users/login/PasswordResetRequest'
import PasswordResetPage from '@/components/pages/users/login/PasswordReset'
import MePage from '@/components/pages/users/me/Me'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/logout',
    name: 'Logout',
    component: LoginPage
  },
  {
    path: '/login/:email',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/users/:id/confirmation/:key',
    name: 'Confirmação de Conta',
    component: ConfirmationPage
  },
  {
    path: '/password-reset',
    name: 'Solicitação de alteração de senha',
    component: PasswordResetRequestPage
  },
  {
    path: '/password-reset/:email',
    component: PasswordResetRequestPage
  },
  {
    path: '/users/:id/password-reset/:email/:key',
    name: 'Alteração de senha',
    component: PasswordResetPage
  },
  {
    path: '/users/me',
    name: 'Minha Página',
    component: MePage
  }
]

export default { routes }
