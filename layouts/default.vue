<script lang="ts" setup>
import AppHeader from "./components/header/AppHeader.vue";
import AppFooter from "./components/footer/AppFooter.vue";
import DownloadMessage from "@/assets/components/UI/DownloadMessage.vue";
const route = useRoute();
const bodyClass = ref();
const { progress, isLoading, start, finish, clear } = useLoadingIndicator({
  duration: 2000,
  throttle: 200,
});
isLoading.value = true;
start();
watch(
  () => route.path,
  (newPath) => {
    if (newPath == "/login" || newPath == "/account")
      bodyClass.value = "pb-0 pl-0";
    else bodyClass.value = "md:pb-8 pb-5";
  },
  { immediate: true } // Applies the style when the component is first mounted
);
</script>
<template>
  <div class="flex flex-column min-h-screen">
    <DownloadMessage />
    <AppHeader />
    <div class="body-content flex-grow-1" :class="bodyClass">
      <slot></slot>
    </div>
    <AppFooter />
  </div>
</template>
