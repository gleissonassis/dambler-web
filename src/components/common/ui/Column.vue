<template>
  <div :class="this.classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['cols', 'center'],

  data () {
    let classes = ''

    switch (this.cols) {
      case '9':
        classes = 'col-lg-9 col-md-9 col-sm-6'
        break
      case '6':
        classes = 'col-lg-6 col-md-6 col-sm-12'
        break
      case '3':
        classes = 'col-lg-3 col-md-3 col-sm-6'
        break
      default:
        classes = 'col-lg-12'
        break
    }

    if (this.center) {
      classes += ' mx-auto'
    }

    return {
      classes
    }
  }
}
</script>
