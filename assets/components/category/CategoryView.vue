<script setup lang="ts">
const props = defineProps({
  category: {
    type: Object as any,
  },
});
</script>
<template>
  <NuxtLink
    class="category-container no-underline h-full flex flex-column"
    :to="'/category/' + category.slug"
  >
    <img
      :src="category.image"
      :alt="category.name"
      height="180px"
      style="border-radius: 15px 15px 0 0;"
    />
    <div
      class="p-2 sm:p-4 h-full bg-white flex justify-content-center align-items-center"
      style="border-radius: 0 0 15px 15px"
    >
      <p class="text-center font-semibold" style="color: #333f51">
        {{ category.name }}
      </p>
    </div>
  </NuxtLink>
</template>
<style scoped>
.category-container {
  border: 1px solid #eef0f3;
  border-radius: 15px;
  box-shadow: 0px 1px 3px 0px #2a33420f;
}
@media (min-width: 1200px) {
  .category-container {
    width: 250px;
  }
}
</style>
