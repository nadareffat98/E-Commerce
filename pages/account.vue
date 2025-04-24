<script setup>
import AccountMenu from "~/assets/components/account/AccountMenu.vue";

definePageMeta({
  // middleware: "auth",
  layout: "internal-layout",
});
</script>

<template>
  <div class="grid mt-6">
    <div class="lg:col-3 col-12 lg:pl-8">
      <AccountMenu />
    </div>
    <div class="lg:col-9 col-12">
      <NuxtPage />
    </div>
  </div>
</template>
<style lang="scss" scoped>
:deep(.green-btn) {
  width: 180px;
}
@media (max-width: 768px) {
  :deep(.card-row) {
    flex-direction: column;
  }
  :deep(.btn-link) {
    width: 100%;
    .green-btn {
      width: 100%;
    }
  }
  :deep(.edit-btn) {
    flex: 1;
  }
}
</style>
