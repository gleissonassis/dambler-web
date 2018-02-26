<template>
  <div :class="['tab-pane', {'active': this.$parent.activeTab === this.id}]" :id="this.id" role="tabpanel">
    <div class="pad">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id', 'icon', 'text']
}
</script>
