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
              <form-element
                type="password"
                v-model="user.password"
                label="Nova senha *"
                placeholder="Sua nova senha secreta"
                :isValid="this.isPasswordValid" />
                <form-element
                  type="password"
                  v-model="user.passwordConfirm"
                  label="Confirmação de senha *"
                  placeholder="Confirmação da sua nova senha secreta"
                  :isValid="this.isPasswordConfirmValid">
                    <small v-show="this.isPasswordConfirmValid" class="form-text text-muted">Informe a mesma senha do campo anterior.</small>
                    <small v-show="!this.isPasswordConfirmValid" class="form-text text-muted">As senhas informadas <span class="badge badge-danger">não</span> são as mesmas.</small>
                </form-element>
            </form>
          </slot>
          <slot slot="footer">
            <button class="btn btn-primary btn-block" v-on:click="resetPassword">Recuperar meu acesso</button>
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
import UserController from '@/lib/controllers/UserController'
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
        email: this.$route.params.email,
        id: this.$route.params.id,
        key: this.$route.params.key
      },
      view: {
        isSending: false
      }
    }
  },
  computed: {
    isFormValid () {
      return this.user.email &&
        this.user.password &&
        this.user.passwordConfirm &&
        this.user.password === this.user.passwordConfirm
    },
    isEmailValid () {
      return !(this.validateFields && !this.user.email)
    },
    isPasswordValid () {
      return !(this.validateFields && !this.user.password)
    },
    isPasswordConfirmValid () {
      return !this.user.password ||
             !this.user.passwordConfirm ||
             this.user.password === this.user.passwordConfirm
    }
  },

  methods: {
    resetPassword () {
      this.validateFields = true
      const self = this
      const messageBox = new MessageBox(this)
      const controller = new UserController(this)

      if (!this.isFormValid) {
        messageBox.showRequiredFieldsMessage()
      } else {
        self.view.isSending = true
        controller.resetPassword(this.user.id, this.user.key, this.user.password)
          .then(() => {
            self.view.isSending = false
            messageBox.showSuccess('Sua senha foi alterada com sucesso!', () => {
              self.$router.push('/login/' + self.user.email)
            })
          })
          .catch(error => {
            self.view.isSending = false
            console.log(error)
            switch (error.status) {
              case 404:
                messageBox.showError('Algo está errado!', 'Não foi possível alterar sua senha por esse link. Provavelmente ele já foi utilizado para definir uma senha! Solicite uma nova recuperação de senha!', () => {
                  self.$router.push('/password-reset/' + self.user.email)
                })
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
