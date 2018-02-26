<template>
  <div :class="'callout callout-' + this.type">
    <h4>{{ this.title }}</h4>
    <p>
      <slot>
      </slot>
    </p>
  </div>
</template>

<script>
export default {
  props: ['title', 'type']
}
</script>
