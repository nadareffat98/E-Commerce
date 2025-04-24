<script setup lang="ts">
import LoadingBlock from "@/assets/components/UI/LoadingBlock.vue";
const store = useGlobalStore();
const isLoading = useLoadingState();
//// 👉 meta data
useHeadSafe({
  titleTemplate: (pageTitle) => {
    return pageTitle
      ? ` ${store.store.store_title} | ${pageTitle} `
      : `${store.store.store_title}`;
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: store.store.favicon,
    },
  ],
});
</script>
<template>
  <div>
    <ConfirmDialog />
    <LoadingBlock :blocked="isLoading" />
    <NuxtLoadingIndicator
      :height="5"
      color="var(--main-color)"
      errorColor="red"
    />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<style scoped src="@/assets/scss/app.scss"></style>
