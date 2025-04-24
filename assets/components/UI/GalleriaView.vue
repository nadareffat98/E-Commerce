<script lang="ts">
export default defineComponent({
  name: "GalleriaView",
  //  👉 Props
  props: {
    banners: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
  },
});
</script>
<template>
  <Galleria
    :value="banners"
    :circular="true"
    :autoPlay="true"
    :transitionInterval="4000"
    :showItemNavigators="type == 'slider'"
    :showThumbnails="false"
    :showIndicators="type == 'slider' ? true : false"
    :id="id"
  >
    <template #item="slotProps">
      <img
        :src="slotProps.item.image"
        :alt="slotProps.item.alt"
        :style="{
          'aspect-ratio': place === 'home' ? '27/9' : '27/9',
          'object-fit': type == 'banner' ? 'cover' : 'contain',
        }"
      />
    </template>
  </Galleria>
</template>
<style lang="scss" src="@/assets/scss/components/galleria.scss" scoped />
