<template>
  <form-group>
    <label for="name"><span v-html="label"></span></label>
    <input
      v-if="!this.mask"
      :type="type"
      :class="[{'is-invalid': !isValid}, 'form-control']"
      v-model="internalValue"
      :placeholder="placeholder"
      >
    <input
      v-if="this.mask"
      :type="type"
      :class="[{'is-invalid': !isValid}, 'form-control']"
      v-model="internalValue"
      :placeholder="placeholder"
      v-mask="this.mask"
      >
    <slot>
        <small class="form-text text-muted">{{ help }}</small>
    </slot>
  </form-group>
</template>

<script>
import FormGroup from '@/components/common/form/FormGroup'
import { mask } from 'vue-the-mask'

export default {
  directives: {mask},

  components: {
    FormGroup
  },

  props: ['label', 'isRequired', 'placeholder', 'help', 'type', 'value', 'isValid', 'mask'],

  data () {
    return {
      internalValue: this.value
    }
  },

  watch: {
    internalValue (value) {
      this.$emit('input', value)
    },

    value (newValue) {
      this.internalValue = newValue
    }
  }
}
</script>
