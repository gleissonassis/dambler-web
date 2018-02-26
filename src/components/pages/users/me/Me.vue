<template>
  <page title="Minha conta" v-if="this.user">
    <simplert :useRadius="true" :useIcon="true" ref="simplert" />
    <box :isLoading="this.view.isLoading">
      <slot slot="body">
        <row>
          <column cols="12">
              <button class="btn btn-primary pull-right" @click="save">Salvar Alterações</button>
          </column>
        </row>
        <row>
          <column cols="12">
            <tab activeTab="home">
              <slot slot="header">
                <tab-header id="home" title="Básico" icon="fa fa-user" :isValid="this.validations.tabs.isHomeValid" />
                <tab-header id="address" title="Endereço" icon="fa fa-home" :isValid="this.validations.tabs.isAddressValid"  />
              </slot>
              <slot slot="content">
                <tab-content id="home">
                  <home-box :user="user" :validations="validations" />
                </tab-content>
                <tab-content id="address">
                  <address-info-box :user="user" :isLoading="this.view.isLoading" :validations="validations" />
                </tab-content>
              </slot>
            </tab>
          </column>
        </row>
        <row>
          <column cols="12">
              <button class="btn btn-primary pull-right" @click="save">Salvar Alterações</button>
          </column>
        </row>
      </slot>
    </box>
  </page>
</template>

<script>
import Page from '@/components/common/page/Page'
import Box from '@/components/common/ui/Box'
import Tab from '@/components/common/ui/Tab'
import TabContent from '@/components/common/ui/TabContent'
import TabHeader from '@/components/common/ui/TabHeader'
import Row from '@/components/common/ui/Row'
import Column from '@/components/common/ui/Column'
import FormElement from '@/components/common/form/Element'
import CEPHelper from '@/lib/helpers/CEPHelper'
import UserController from '@/lib/controllers/UserController'
import AddressInfoBox from '@/components/pages/users/me/AddressInfoBox'
import HomeBox from '@/components/pages/users/me/HomeBox'
import MessageBox from '@/lib/ui/MessageBox'

export default {
  components: {
    Page,
    Box,
    Tab,
    TabHeader,
    TabContent,
    Row,
    Column,
    FormElement,
    AddressInfoBox,
    HomeBox
  },

  data () {
    var userController = new UserController(this)
    var currentUser = userController.getCurrentUser()

    return {
      user: currentUser,
      view: {
        validateFields: false,
        isLoading: false
      }
    }
  },

  watch: {
    zipCode: function (val) {
      this.getCEPInformations()
    }
  },

  computed: {
    zipCode () {
      return this.user.address.zipCode
    },

    validations: function () {
      var fields = {

        isNameValid: !(this.view.validateFields && !this.user.name),
        isEmailValid: !(this.view.validateFields && !this.user.email),
        isPasswordConfirmValid: this.user.password === this.user.passwordConfirm,
        isZipCodeValid: !(this.view.validateFields && !this.user.address.zipCode),
        isStreetValid: !(this.view.validateFields && !this.user.address.street),
        isNumberValid: !(this.view.validateFields && !this.user.address.number),
        isInformationsValid: !(this.view.validateFields && !this.user.address.informations),
        isCityValid: !(this.view.validateFields && !this.user.address.city),
        isStateValid: !(this.view.validateFields && !this.user.address.state),
        isNeighborhoodValid: !(this.view.validateFields && !this.user.address.neighborhood)
      }

      var tabs = {
        isHomeValid: fields.isNameValid &&
                     fields.isEmailValid &&
                     fields.isPasswordConfirmValid,
        isAddressValid: fields.isZipCodeValid &&
                        fields.isStreetValid &&
                        fields.isNumberValid &&
                        fields.isInformationsValid &&
                        fields.isCityValid &&
                        fields.isStateValid &&
                        fields.isNeighborhoodValid
      }

      return {fields, tabs, isFormValid: tabs.isHomeValid && tabs.isAddressValid}
    }
  },

  mounted () {
    this.loadCurrentUser()
  },

  methods: {
    loadCurrentUser () {
      const self = this
      const controller = new UserController(this)
      const messageBox = new MessageBox(this)
      this.view.isLoading = true

      controller.getCurrentUserFromServer()
        .then(user => {
          self.view.isLoading = false
          self.user = user
        })
        .catch(e => {
          this.view.isLoading = false
          switch (e.status) {
            case 403:
            case 404:
              self.$router.push('/login')
              break
            default:
              messageBox.showCriticalError(e)
          }
        })
    },

    save () {
      const self = this
      const messageBox = new MessageBox(this)
      const controller = new UserController(this)

      this.view.validateFields = true

      if (!self.user.password) {
        self.user.password = undefined
      }

      if (!this.validations.isFormValid) {
        messageBox.showRequiredFieldsMessage()
      } else {
        self.view.isLoading = true
        controller.updateCurrentUser(this.user)
          .then(() => {
            self.view.isLoading = false
            messageBox.showSuccess('Dados atualizados com sucesso!')
          })
          .catch(error => {
            self.view.isLoading = false
            switch (error.status) {
              case 409:
                messageBox.showWarning('E-mail já utilizado!', 'Um outro usuário já cadastrou esse e-mail! Tente outro, por favor.')
                break
              default:
                messageBox.showCriticalError(error)
            }
          })
      }
    },

    getCEPInformations () {
      var self = this

      if (this.user.address.zipCode.length === 10) {
        self.view.isLoading = true

        var cepHelper = new CEPHelper(this)
        cepHelper.getInfo(this.user.address.zipCode)
          .then(info => {
            self.view.isLoading = false
            self.user.address.street = info.logradouro
            self.user.address.neighborhood = info.bairro
            self.user.address.city = info.localidade
            self.user.address.state = info.uf
          })
      }
    }
  }
}
</script>
