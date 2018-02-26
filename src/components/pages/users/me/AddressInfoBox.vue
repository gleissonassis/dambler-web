<template>
  <div>
    <row>
      <column cols="3">
        <form-element
          type="text"
          v-model="user.address.zipCode"
          :label="this.isLoading ? 'CEP *  <i class=\'fa fa-spinner\' />' : 'CEP *'"
          placeholder="00.000-000"
          mask="##.###-###"
          :isValid="validations.fields.isZipCodeValid"
          />
      </column>
    </row>
    <row>
      <column cols="6">
        <form-element
          type="text"
          v-model="user.address.street"
          label="Rua *"
          :isValid="validations.fields.isStreetValid"
           />
      </column>
      <column cols="3">
        <form-element
          type="text"
          v-model="user.address.number"
          label="Número *"
          :isValid="validations.fields.isNumberValid" />
      </column>
    </row>
    <row>
      <column cols="6">
        <form-element
          type="text"
          v-model="user.address.informations"
          label="Complemento"
          :isValid="validations.fields.isInformationsValid"  />
      </column>
      <column cols="6">
        <form-element
          type="text"
          v-model="user.address.neighborhood"
          label="Bairro *"
          :isValid="validations.fields.isNeighborhoodValid"  />
      </column>
    </row>
    <row>
      <column cols="6">
        <form-element
          type="text"
          v-model="user.address.city"
          label="Cidade *"
          :isValid="validations.fields.isCityValid"  />
      </column>
      <column cols="3">
        <form-element
          type="text"
          v-model="user.address.state"
          label="Estado *"
          :isValid="validations.fields.isStateValid"  />
      </column>
    </row>
  </div>
</template>

<script>
import Box from '@/components/common/ui/Box'
import Row from '@/components/common/ui/Row'
import Column from '@/components/common/ui/Column'
import FormElement from '@/components/common/form/Element'

export default {
  props: ['user', 'validations', 'isLoading'],

  components: {
    Box,
    Row,
    Column,
    FormElement
  }
}
</script>
