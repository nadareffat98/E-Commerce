<script lang="ts" setup>
import FeaturesView from "@/assets/components/FeaturesView.vue";
import SectionView from "@/assets/components/UI/SectionView.vue";
import ProductView from "@/assets/components/product/ProductView.vue";
import GalleriaView from "@/assets/components/UI/GalleriaView.vue";
// Data
const globalStore = await useGlobalStore();
const sliders = globalStore.sliders;
const categories = ref<any>([]);
const sections = ref<any>([]);
const responsiveCategoryOptions = ref({
  425: { slidesPerView: 5 },
  500: { slidesPerView: 6 },
  768: { slidesPerView: 7, spaceBetween: 20 },
  1200: { slidesPerView: 9, spaceBetween: 20 },
});
const responsiveProductOptions = ref({
  375: { slidesPerView: 2, spaceBetween: 10 },
  768: { slidesPerView: 3, spaceBetween: 20 },
  1200: { slidesPerView: 4, spaceBetween: 40 },
});
// Methods
const getData = async () => {
  const categoriesData: any = await $useMyFetch("/category");
  categories.value = categoriesData?.data.value.data;
  const sectionsData: any = await $useMyFetch("/section");
  sections.value = sectionsData?.data.value.data;
};
const updateProduct = (event: any, sectionId: number) => {
  const section = sections.value.find((s: any) => s.id === sectionId);
  if (section) {
    const productIndex = section.data.findIndex(
      (p: any) => p.id === event.productId
    );
    if (productIndex !== -1) {
      section.data[productIndex] = event.updatedProduct;
    }
  }
};
onMounted(() => {
  getData();
});
// Meta Data
useHead({
  title: "الصفحة الرئيسية",
  meta: [
    { name: "title", content: globalStore.store.store_title },
    { name: "url", content: "https://new.cardnet.sa/" },
    { name: "email", content: globalStore.store.email },
    { name: "description", content: globalStore.store.description },
    { name: "type", content: "website" },
    { property: "og:type", content: "website" },
    { property: "og:title", content: globalStore.store.store_title },
    { property: "og:description", content: globalStore.store.description },
    { property: "og:email", content: globalStore.store.email },
    { property: "og:image", content: globalStore.store.store_logo },
    { property: "og:site_name", content: globalStore.store.store_title },
    { property: "og:image:alt", content: globalStore.store.store_title },
    { property: "og:url", content: "https://new.cardnet.sa/" },
  ],
  link: [{ rel: "canonical", href: "https://new.cardnet.sa/" }],
});
</script>

<template>
  <div class="home-container">
    <div style="margin-bottom: 5.5rem">
      <GalleriaView
        :banners="sliders"
        type="slider"
        id="home-slider"
        place="home"
      />
    </div>
    <ClientOnly>
      <SectionView
        title="الأقسام"
        :route="{ path: '/category' }"
        sectionId="categories"
        class="category-swiper"
        typeSwiper="horizontal"
        :items="categories"
        :slides-per-view="4.5"
        :space-between="10"
        :breakpoints="responsiveCategoryOptions"
        :autoplay="{ delay: 3000 }"
      >
        <template #default="{ item }">
          <NuxtLink
            class="flex flex-column justify-content-start align-items-center gap-2 no-underline category-container"
            v-if="item"
            :to="'/category/' + item.slug"
          >
            <img
              :src="item.icon"
              :alt="item.name"
              width="55px"
              height="55px"
              style="border-radius: 6px"
            />
            <span>{{ item.name }}</span>
          </NuxtLink>
        </template>
      </SectionView>
    </ClientOnly>
    <div v-for="section in sections" :key="section.id" class="md:pt-8 pt-5">
      <GalleriaView
        v-if="section.section_type_code == 'banner'"
        :banners="section.data"
        type="banner"
        id="banner-slider"
        place="center-home"
      />
      <SectionView
        v-else
        :title="section.name"
        :sectionId="`${section.id}`"
        typeSwiper="product"
        class="product-swiper"
        :route="{ path: '/product', query: { section: section.id } }"
        :items="section.data"
        :slides-per-view="1.8"
        :space-between="16"
        :breakpoints="responsiveProductOptions"
        :watchOverflow="false"
      >
        <template #default="{ item }">
          <ProductView
            :product="item"
            @update="
              updateProduct(
                {
                  updatedProduct: $event,
                  productId: item.id,
                },
                section.id
              )
            "
          />
        </template>
      </SectionView>
    </div>
    <FeaturesView />
  </div>
</template>
