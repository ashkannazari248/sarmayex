<template>
  <div class="container">
    <main class="w-screen md:w-2/3 lg:w-1/2 rounded-lg bg-blue-100">
      <NuxtPage name="default"/>
    </main>
  </div>
</template>

<script setup lang="ts">


</script>

<style lang="sass" scoped>
.container
  @apply min-w-full min-h-screen bg-gray-200 flex flex-col items-center justify-center

</style>
