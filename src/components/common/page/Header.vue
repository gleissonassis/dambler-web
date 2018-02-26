<template>
  <section class="content-header">
    <h1>
      {{ title }}
    </h1>
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="#/"><i class="fa fa-dashboard"></i> Home</a></li>
      <li class="breadcrumb-item active">{{ title }}</li>
    </ol>
  </section>
</template>

<script>
export default {
  props: ['title']
}
</script>
