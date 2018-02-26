<template>
  <page title="Nova Senha">
    <simplert :useRadius="true" :useIcon="true" ref="simplert" />
    <row>
      <column cols="6" :center="true">
        <box :hasFooter="true" :isLoading="this.view.isSending">
          <slot slot="body">
            <form>
              <form-element
                type="email"
                v-model="user.email"
                label="E-mail *"
                placeholder="email@dominio.com"
                help="Informe o e-mail que você cadastrou na plataforma"
                :isValid="this.isEmailValid" />
            </form>
          </slot>
          <slot slot="footer">
            <button class="btn btn-primary btn-block" v-on:click="login">Recuperar meu acesso</button>
          </slot>
        </box>
      </column>
    </row>
  </page>
</template>

<script>
import Page from '@/components/common/page/Page'
import Row from '@/components/common/ui/Row'
import Column from '@/components/common/ui/Column'
import NotificationController from '@/lib/controllers/NotificationController'
import MessageBox from '@/lib/ui/MessageBox'
import Box from '@/components/common/ui/Box'
import FormElement from '@/components/common/form/Element'

export default {
  components: {
    Page,
    Row,
    Column,
    Box,
    FormElement
  },
  data: function () {
    return {
      validateFields: false,
      user: {
        email: this.$route.params.email
      },
      view: {
        isSending: false
      }
    }
  },
  computed: {
    isFormValid () {
      return this.user.email
    },
    isEmailValid () {
      return !(this.validateFields && !this.user.email)
    }
  },

  methods: {
    login () {
      this.validateFields = true
      const self = this
      const messageBox = new MessageBox(this)
      const controller = new NotificationController(this)

      if (!this.isFormValid) {
        messageBox.showRequiredFieldsMessage()
      } else {
        self.view.isSending = true
        controller.sendPasswordResetNotification(this.user.email)
          .then(() => {
            self.view.isSending = false
            messageBox.showSuccess('Um e-mail foi enviado para você com um link para definição de uma nova senha!')
          })
          .catch(error => {
            self.view.isSending = false
            console.log(error)
            switch (error.status) {
              case 404:
                messageBox.showError('E-mail inválido!', 'Não foi possível localizar nenhum usuário com o e-mail informado.')
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
