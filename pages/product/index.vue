<script lang="ts" setup>
import ProductView from "@/assets/components/product/ProductView.vue";
const route = useRoute();
const products = ref();
const sectionName = ref();
const sectionProducts: any = await $useMyFetch(
  `/section/${route.query.section}`
);
products.value = sectionProducts.data.value.data.data;
sectionName.value = sectionProducts.data.value.data.name;
useHead({ title: "المنتجات" });
</script>
<template>
  <div
    class="flex flex-column justify-content-start align-items-start gap-5 md:mt-8 mt-5"
  >
    <h3>{{ sectionName }}</h3>
    <div class="grid">
      <div class="md:col-3 sm:col-4 col-6" v-for="product in products" :key="product.id">
        <ProductView :product="product" />
      </div>
    </div>
  </div>
</template>
