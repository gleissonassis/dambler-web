<template>
  <div class="vtabs" style="width: 100%">
    <ul class="nav nav-tabs tabs-vertical" role="tablist">
      <ul class="nav nav-tabs tabs-vertical" role="tablist">
        <slot name="header">
        </slot>
      </ul>
    </ul>
    <div class="tab-content">
      <slot name="content">
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['activeTab']
}
</script>
