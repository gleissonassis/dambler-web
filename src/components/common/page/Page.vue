<template>
  <div>
    <simplert :useRadius="true" :useIcon="true" ref="simplert" />
    <page-header :title="title" />
    <page-content>
      <slot></slot>
    </page-content>
  </div>
</template>

<script>
import PageHeader from './Header'
import PageContent from './Content'

export default {
  props: ['title'],
  components: {
    PageHeader,
    PageContent
  }
}
</script>
