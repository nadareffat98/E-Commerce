<script lang="ts" setup>
import CategoryList from "@/assets/components/category/CategoryList.vue";
import CategoryProducts from "@/assets/components/category/CategoryProducts.vue";

//👉Data
const route = useRoute();
const subCategory = ref<any>();
const hasChildren = ref<boolean>();
const subCategories = ref();
const products = ref();

////  👉 methods
const categoryRes: any = await $useMyFetch(
  `category-slug/${route.params.slug}`
);
subCategory.value = categoryRes.data.value.data;
const subCategoriesRes: any = await $useMyFetch(
  `category/${subCategory.value.id}/subcategories`
);
subCategories.value = subCategoriesRes.data.value.data;
const productsRes: any = await $useMyFetch(
  `category/${subCategory.value.id}/all_products`
);
products.value = productsRes.data.value.data;
hasChildren.value = subCategories.value?.length > 0;

////  👉 computed
const breadcrumbItems = ref([
  { label: "الرئيسية", route: "/" },
  { label: "الأقسام", route: "/category" },
  { label: subCategory.value.name, route: route.path },
]);
useHead({
  title: subCategory.value.name || "",
});
</script>

<template>
  <div v-if="hasChildren">
    <CategoryList :subCategories="subCategories" :title="subCategory.name" />
  </div>
  <div v-else>
    <Breadcrumb :model="breadcrumbItems" class="mt-6">
      <template #item="{ item }">
        <NuxtLink :to="item.route" class="no-underline">{{
          item.label
        }}</NuxtLink>
      </template>
      <template #separator>
        <i class="pi pi-angle-left"></i>
      </template>
    </Breadcrumb>
    <CategoryProducts :subCategory="subCategory" :products="products" />
  </div>
</template>
