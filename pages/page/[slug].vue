<script lang="ts" setup>
import GalleriaView from "@/assets/components/UI/GalleriaView.vue";
import ContactUsModal from "@/assets/components/ContactUsModal.vue";
definePageMeta({
  layout: "internal-layout",
});
defineOptions({
  name: `page`,
});
//  👉 Data
const store = useGlobalStore();
const sliders = store.sliders;
const route = useRoute();
const page = ref<any>();
const fetchPageData = async () => {
  page.value = await store.pages.find(
    (page) => page.slug === route.params.slug
  );
};
await fetchPageData();
watch(route, () => {
  fetchPageData();
});
useHead({
  title: page.value?.title,
});
</script>
<template>
  <div class="md:mt-6 mt-0">
    <ContactUsModal v-if="page.slug == 'contact_us'" />
    <template v-else>
      <GalleriaView :banners="sliders" type="slider" id="return-slider" place="page"/>
      <div
        class="flex flex-column justify-content-start align-items-start gap-4 md:mt-6 mt-4"
        v-if="page"
      >
        <h3>{{ page.title }}</h3>
        <div
          class="flex justify-content-center align-items-center w-full"
          v-if="page.slug == 'ضريبة-القيمة-المضافة'"
        >
          <img :src="page.avatar" width="750px" />
        </div>
        <div v-html="page.content_html" v-else></div>
      </div>
    </template>
  </div>
</template>
<style lang="scss" src="@/assets/scss/components/pages.scss" scoped />
<style scoped lang="scss">
img {
  border: 1px solid $global-color;
  border-radius: 24px
}
@media (max-width: 1024px) {
  img {
    width: 500px;
  }
}
@media (max-width: 575px) {
  img {
    width: 300px;
  }
}
</style>
