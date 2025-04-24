<script lang="ts">
export default defineComponent({
  name: "LoadingBlock",
  props: {
    blocked: {
      type: Boolean,
    },
  },
});
</script>
<template>
  <BlockUI :blocked="blocked" :fullScreen="true"></BlockUI>
  <ProgressSpinner v-show="blocked" class="overlay" />
</template>
<style scoped lang="scss">
.overlay {
  position: fixed !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25% !important;
  height: 25% !important;
  z-index: 100;
  :deep(.p-progress-spinner-circle) {
    stroke: var(--main-color) !important;
  }
}
</style>
