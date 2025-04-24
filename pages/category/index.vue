<script setup lang="ts">
import CategoryList from "@/assets/components/category/CategoryList.vue";
// Data
const globalStore = useGlobalStore();
const categories = globalStore.categories;
useHead({
  title: " التصنيفات ",
});
</script>
<template>
  <CategoryList :subCategories="categories" title="الأقسام" />
</template>
