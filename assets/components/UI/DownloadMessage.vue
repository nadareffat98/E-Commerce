<script lang="ts" setup>
const goToApp = () => {
  window.open("https://onelink.to/cardnetapp", "_blank");
};
</script>
<template>
  <Message class="download-message">
    <template #messageicon>
      <Avatar image="/imgs/logo-down.png" />
    </template>
    <div class="flex justify-content-between align-items-center">
      <div
        class="flex flex-column justify-content-start align-items-start gap-1 mr-2"
      >
        <p class="m-0 text-sm font-bold">تسوق عبر التطبيق</p>
        <p class="text-xs">حمل التطبيق لتجربة شراء افضل</p>
      </div>
      <Button label="تحميل" class="download-btn" @click="goToApp" />
    </div>
  </Message>
</template>
<style lang="scss">
.download-message {
    display: none;
  background: #ffde2e;
  border-color: #ffde2e;
  margin: 0;
  border-radius: 0;
  .p-message-wrapper {
    gap: 5px;
    .p-message-close {
      order: 1;
      color: $title-color;
    }
    .p-avatar-image {
      order: 2;
    }
    .p-message-text {
      order: 3;
      flex-grow: 1;
      color: $title-color;
      .download-btn {
        background: $global-color;
        border-color: $global-color;
      }
    }
  }
}
@media (max-width: 768px) {
  .download-message {
    display: block;
  }
}
</style>
