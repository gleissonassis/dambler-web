<template>
  <page title="Confirmação de Cadastro">
    <row v-if="this.view.isValidated">
      <column cols="6">
        <callout v-if="!this.view.isError" type="success" title="Confirmação realizada com sucesso!">
          Seu cadastro foi confirmado com sucesso! Faça agora o mesmo o login e comece
          dar lances ninjas!
        </callout>
        <callout v-if="this.view.isError" type="warning" title="Falha na confirmação!">
          <p>Não foi possível validar uma conta utilizando esse link. Verifique se o link está
          correto e ainda não foi utilizado para validar a conta!</p>
          <p>Caso esteja com problemas para validar a conta, faça o login e solicite novamente o
          envio do e-mail de confirmação!</p>
        </callout>
      </column>
      <column cols="6">
        <login-box :email="this.view.email" />
      </column>
    </row>
  </page>
</template>

<script>
import UserController from '@/lib/controllers/UserController'
import Page from '@/components/common/page/Page'
import FormElement from '@/components/common/form/Element'
import Row from '@/components/common/ui/Row'
import Column from '@/components/common/ui/Column'
import Callout from '@/components/common/ui/Callout'
import LoginBox from '@/components/pages/users/login/LoginBox'

export default {
  components: {
    Page,
    FormElement,
    Column,
    Row,
    LoginBox,
    Callout
  },

  data: function () {
    return {
      userId: this.$route.params.id,
      confirmationKey: this.$route.params.key,
      view: {
        email: '',
        isValidated: false,
        isError: false
      }
    }
  },

  mounted () {
    this.confirmUser()
  },

  methods: {
    confirmUser () {
      const self = this
      const controller = new UserController(this)

      controller.confirmUser(this.userId, this.confirmationKey)
        .then(user => {
          self.view.isValidated = true
          self.view.email = user.email
        })
        .catch(() => {
          self.view.isValidated = true
          self.view.isError = true
        })
    }
  }
}
</script>
