<template>
  <page title="Novo Usuário">
    <simplert :useRadius="true" :useIcon="true" ref="simplert" />
    <div class="row">
      <div class="col-md-8 col-lg-8">
        <box :hasFooter="true" :isLoading="this.view.isRegistering">
          <slot slot="body">
            <form>
              <form-element
                type="text"
                v-model="user.name"
                label="Nome *"
                placeholder="Seu nome ou como gostaria de ser chamado :)"
                :isValid="this.isNameValid" />
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
              <form-element
                type="password"
                v-model="user.passwordConfirm"
                label="Confirmação de senha *"
                placeholder="Confirmação da sua senha secreta"
                :isValid="this.isPasswordConfirmValid">
                  <small v-show="this.isPasswordConfirmValid" class="form-text text-muted">Informe a mesma senha do campo anterior.</small>
                  <small v-show="!this.isPasswordConfirmValid" class="form-text text-muted">As senhas informadas <span class="badge badge-danger">não</span> são as mesmas.</small>
              </form-element>
              <form-group>
                <accordion id="documents">
                  <accordion-item id="privacy" title="Política de Privacidade">
                    <privacy-policies-box />
                  </accordion-item>
                  <accordion-item id="terms" title="Termos e Condições">
                    <terms-and-conditions-box />
                  </accordion-item>
                </accordion>
              </form-group>
              <form-group>
                <callout type="success" title="Aceito a Política de Privacidade e os Termos e Condições!">
                  Ao se cadastrar você está automaticamente concordando com a nossa Política de Privacidade e os nossos Termos e Condições.
                </callout>
              </form-group>
            </form>
          </slot>
          <slot slot="footer">
            <button class="btn btn-primary" v-on:click="newUserClick">Cadastrar</button>
          </slot>
        </box>
      </div>
      <div class="col-md-4 col-lg-4">
        <box title="Perguntas frequentes">
          <slot slot="body">
            <accordion id="faq-register">
              <accordion-item id="q1" title="Como funciona o leilão?" :show="true">
                <p>O nosso sistema de leilão é super simples! Você se cadastra e dá
                lances nos leilões abertos. Se enquanto o leilão permanecer aberto não
                houver outro lance o produto é seu! Para que você consiga dar um lance
                você precisa de moedas e o valor do pacote de moedas pode variar de
                acordo com a quantidade de moedas que você deseja comprar!</p>

                <p>Cadastre-se gratuitamente e receba <span class="badge badge-info">10 moedas</span> para você avaliar e se divertir
                sem gastar nada!</p>
              </accordion-item>
              <accordion-item id="q2" title="Como eu posso adquirir moedas?">
                <p>Clique <router-link to="/buy">aqui</router-link> para visualizar os pacotes de moedas disponíveis!</p>

                <p>Cadastre-se gratuitamente e receba <span class="badge badge-info">10 moedas</span> para você avaliar e se divertir
                sem gastar nada!</p>
              </accordion-item>
              <accordion-item id="q3" title="O que acontece se eu ganhar o leilão?">
                <p>Se você for o vencedor do leilão, além de visualizar na tela o seu nome, você receberá
                um e-mail informando os dados do produto e a forma de efetivação da compra do produto.</p>
                <p>Cadastre-se gratuitamente e receba <span class="badge badge-info">10 moedas</span> para você avaliar e se divertir
                sem gastar nada!</p>
              </accordion-item>
            </accordion>
          </slot>
        </box>
      </div>
    </div>
  </page>
</template>

<script>
import UserController from '@/lib/controllers/UserController'
import MessageBox from '@/lib/ui/MessageBox'
import Page from '@/components/common/page/Page'
import FormElement from '@/components/common/form/Element'
import FormGroup from '@/components/common/form/FormGroup'
import Accordion from '@/components/common/ui/Accordion'
import AccordionItem from '@/components/common/ui/AccordionItem'
import Callout from '@/components/common/ui/Callout'
import Box from '@/components/common/ui/Box'
import PrivacyPoliciesBox from '@/components/pages/users/register/PrivacyPoliciesBox'
import TermsAndConditionsBox from '@/components/pages/users/register/TermsAndConditionsBox'

export default {
  components: {
    Page,
    FormElement,
    Box,
    PrivacyPoliciesBox,
    TermsAndConditionsBox,
    Accordion,
    AccordionItem,
    FormGroup,
    Callout
  },
  data () {
    return {
      validateFields: false,
      user: {},
      view: {
        isRegistering: false
      }
    }
  },
  computed: {
    isFormValid () {
      return this.user.email &&
        this.user.name &&
        this.user.password &&
        this.user.passwordConfirm &&
        this.user.password === this.user.passwordConfirm
    },
    isNameValid () {
      return !(this.validateFields && !this.user.name)
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
    newUserClick () {
      const self = this
      const messageBox = new MessageBox(this)
      const controller = new UserController(this)

      this.validateFields = true

      if (!this.isFormValid) {
        messageBox.showRequiredFieldsMessage()
      } else {
        self.view.isRegistering = true
        controller.createUser(this.user)
          .then(() => {
            self.view.isRegistering = false
            messageBox.showSuccess('Um e-mail foi enviado para que você confirme seu cadastro!', () => {
              self.$router.push('/')
            })
          })
          .catch(error => {
            self.view.isRegistering = false
            switch (error.status) {
              case 409:
                messageBox.showWarning('E-mail já utilizado!', 'Um outro usuário já cadastrou esse e-mail! Tente outro, por favor.')
                break
              default:
                messageBox.showCriticalError(error)
            }
          })
      }
    }
  }
}
</script>
