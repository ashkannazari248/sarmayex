<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>
<script setup>
useHead({
  htmlAttrs: {
    lang: 'fa',
    dir: 'rtl'
  }
})
</script>
<style lang="sass">
@use "@/assets/sass/main"
</style>
