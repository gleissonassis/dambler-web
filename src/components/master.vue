<template>
  <div>
    <navbar />
    <main role="main" class="container">
      <router-view />
    </main>
  </div>
</template>

<script>
import navbar from './navbar'
export default {
  components: {
    navbar
  }
}
</script>

<style>
body {
  padding-top: 5rem;
}
</style>
