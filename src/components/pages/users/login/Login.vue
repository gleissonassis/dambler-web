<template>
  <page title="Acessar">
    <row>
      <column cols="6" :center="true">
        <row v-if="this.view.isLogOut">
          <callout type="success" title="OK!">
            Você saiu da plataforma. Para continuar dando lances basta fazer seu
            login novamente!
          </callout>
        </row>
        <row>
        <login-box :email="this.$route.params.email" />
        </row>
      </column>
    </row>
  </page>
</template>

<script>
import Page from '@/components/common/page/Page'
import LoginBox from '@/components/pages/users/login/LoginBox'
import Row from '@/components/common/ui/Row'
import Column from '@/components/common/ui/Column'
import Callout from '@/components/common/ui/Callout'
import UserController from '@/lib/controllers/UserController'

export default {
  components: {
    Page,
    LoginBox,
    Row,
    Column,
    Callout
  },
  data () {
    return {
      view: {
        isLogOut: this.$route.path === '/logout'
      }
    }
  },

  mounted () {
    if (this.view.isLogOut) {
      const controller = new UserController(this)
      controller.logout()
    }
  }
}
</script>
