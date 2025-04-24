<script lang="ts">
import FilterProductsView from "../product/FilterProductsView.vue";
import ProductView from "../product/ProductView.vue";
export default defineComponent({
  //  👉 name
  name: "CategoryProducts",
  //  👉 components
  components: { FilterProductsView, ProductView },
  //  👉 props
  props: {
    subCategory: {
      type: Object as any,
      required: true,
    },
    products: {
      type: Array as any,
      required: true,
    },
  },

  async setup(props) {
    const mainCategory = ref();
    const allProducts = ref(props.products);
    const isLoading = useLoadingState();
    const getMainCategory = async () => {
      if (props.subCategory.meta.parent_id == 0) {
        mainCategory.value = props.subCategory;
      } else {
        const res: any = await $useMyFetch(
          `/category/${props.subCategory.meta.parent_id}`
        );
        mainCategory.value = res.data.value.data;
      }
    };

    const getProducts = async (event: any) => {
      const products: any = await $useMyFetch("/product", {
        params: event,
      });
      allProducts.value = await products.data.value.data;
      isLoading.value = false;
    };
    await getMainCategory();
    return {
      allProducts,
      mainCategory,
      getProducts,
    };
  },
});
</script>
<template>
  <div
    class="category-products-container flex md:flex-row flex-column justify-content-start align-items-start gap-4 mt-5"
  >
    <FilterProductsView
      :mainCategory="mainCategory"
      :subCategory="subCategory"
      @getProduct="getProducts"
    />
    <div class="product-category-list flex flex-wrap mt-5">
      <div
        v-for="product in allProducts"
        :key="product.id"
        class="individual-product"
      >
        <ProductView :product="product" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.product-category-list {
  gap: 24px;
  .individual-product {
    width: 30%;
  }
}
@media (max-width: 1200px) {
  .product-category-list {
    gap: 16px;
    .individual-product {
      width: 48%;
    }
  }
}
</style>
