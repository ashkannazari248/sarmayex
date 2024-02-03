<template>
  <div ref="element" class="lazy-element">
    <slot v-if="isVisible"/>
  </div>
</template>

<script setup lang="ts">
const isVisible = ref<boolean>(false)
const element = ref<HTMLElement | null>()
onMounted(() => {
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      isVisible.value = true;
      observer.unobserve(element.value);
    }
  });

  observer.observe(element.value);
})
</script>
