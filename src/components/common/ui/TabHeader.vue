<template>
  <li class="nav-item">
    <a :class="['nav-link', {'active': this.$parent.activeTab === this.id}]" data-toggle="tab" :href="'#' + this.id" role="tab" aria-expanded="true">
      <span :class="[{'text-red': this.isValid === false}]">
        <i :class="this.icon"></i> {{ this.title}}
      </span>
    </a>
  </li>
</template>

<script>
export default {
  props: ['id', 'icon', 'title', 'isValid']
}
</script>
