<script lang="ts" setup>
import AppHeader from "./components/header/AppHeader.vue";
import AppFooter from "./components/footer/AppFooter.vue";
import DownloadMessage from "@/assets/components/UI/DownloadMessage.vue";
const route = useRoute();
</script>
<template>
  <div class="flex flex-column min-h-screen">
    <DownloadMessage />
    <AppHeader />
    <div class="body-content-internal flex-grow-1 md:pb-8 pb-5">
      <slot></slot>
    </div>
    <AppFooter />
  </div>
</template>