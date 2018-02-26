<template>
  <box :hasFooter="true" :isLoading="this.view.isLogging">
    <slot slot="body">
      <simplert :useRadius="true" :useIcon="true" ref="simplert" />
      <form>
        <form-element
          type="email"
          v-model="user.email"
          label="E-mail *"
          placeholder="email@dominio.com"
          help="Seu e-mail será utilizado para acessar a plataforma."
          :isValid="this.isEmailValid" />
        <form-element
          type="password"
          v-model="user.password"
          label="Senha *"
          placeholder="Sua senha secreta"
          :isValid="this.isPasswordValid" />

      </form>
    </slot>
    <slot slot="footer">
      <form-group>
        <button class="btn btn-primary btn-block" v-on:click="login">Entrar</button>
      </form-group>
      <form-group>
        <router-link class="text-light-blue" to="/register">Ainda não tem uma conta? Cadastre-se agora!</router-link><br />
        <router-link class="text-red" to="/password-reset">Esqueceu a senha? Clique aqui.</router-link>
      </form-group>
    </slot>
  </box>
</template>

<script>
import UserController from '@/lib/controllers/UserController'
import MessageBox from '@/lib/ui/MessageBox'
import Box from '@/components/common/ui/Box'
import FormElement from '@/components/common/form/Element'
import FormGroup from '@/components/common/form/FormGroup'

export default {
  props: ['email'],

  components: {
    Box,
    FormElement,
    FormGroup
  },
  data: function () {
    return {
      validateFields: false,
      user: {
        email: this.email
      },
      view: {
        isLogging: false
      }
    }
  },
  computed: {
    isFormValid () {
      return this.user.email &&
        this.user.password
    },
    isEmailValid () {
      return !(this.validateFields && !this.user.email)
    },
    isPasswordValid () {
      return !(this.validateFields && !this.user.password)
    }
  },

  methods: {

    login () {
      this.validateFields = true
      const self = this
      const messageBox = new MessageBox(this)
      const controller = new UserController(this)

      if (!this.isFormValid) {
        messageBox.showRequiredFieldsMessage()
      } else {
        self.view.isLogging = true
        controller.login(this.user.email, this.user.password)
          .then(() => {
            self.view.isLogging = false
            self.$router.push('/')
          })
          .catch(error => {
            self.view.isLogging = false
            console.log(error)
            switch (error.status) {
              case 404:
                messageBox.showError('Login inválido!', 'Não foi possível acessar a plataforma com as credenciais informadas.')
                break
              default:
                messageBox.showCriticalError()
            }
          })
      }
    }
  }
}
</script>
