<script lang="ts">
import GalleriaView from "@/assets/components/UI/GalleriaView.vue";
import CategoryView from "@/assets/components/category/CategoryView.vue";
export default defineComponent({
  name: "CategoryList",
  //  👉 Props
  props: {
    subCategories: {
      type: Array as any,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  components: {
    GalleriaView,
    CategoryView,
  },
  setup(props) {
    //  👉Data
    const globalStore = useGlobalStore();
    const sliders = globalStore.sliders;
    return {
      sliders,
    };
  },
});
</script>
<template>
  <div class="categories-container">
    <GalleriaView
      :banners="sliders"
      type="slider"
      id="category-slider"
      place="category"
    />
    <div class="flex flex-column justify-content-start gap-5 md:mt-8 mt-5">
      <h3>{{ title }}</h3>
      <div class="grid">
        <div class="md:col-3 sm:col-4 col-6" v-for="category in subCategories" :key="category.id">
          <CategoryView :category="category" />
        </div>
      </div>
    </div>
  </div>
</template>
