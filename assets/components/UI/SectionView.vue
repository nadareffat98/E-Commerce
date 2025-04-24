<script lang="ts">
import SwiperView from "./SwiperView.vue";
export default defineComponent({
  name: "SectionView",
  components: { SwiperView },
  //  👉 Props
  props: {
    title: {
      type: String,
      required: true,
    },
    route: {
      type: Object as any | null,
      required: true,
    },
    items: {
      type: Array as any,
      required: true,
    },
    typeSwiper: {
      type: String,
      required: true,
    },
    sectionId: {
      type: String,
      required: true,
    },
  },
});
</script>
<template>
  <div class="section-container">
    <div
      class="title-container flex justify-content-between align-items-center mb-4 md:mb-5"
    >
      <h3>{{ title }}</h3>
      <NuxtLink :to="route" v-if="route">
        <Button label="عرض الكل" text class="normal-font-14" />
      </NuxtLink>
    </div>
    <SwiperView
      :items="items"
      :section-id="sectionId"
      :swiperType="typeSwiper"
      v-bind="$attrs"
    >
      <template #default="{ item }">
        <slot :item="item"></slot>
      </template>
    </SwiperView>
  </div>
</template>
<style scoped lang="scss">
.title-container {
  a .p-button {
    color: $second-color;
  }
  a .p-button {
    font-size: 1.125rem;
  }
}
@media (max-width: 768px) {
  .title-container {
    h3 {
      font-size: 18px;
    }
    a .p-button {
      font-size: 0.875rem;
    }
  }
}
</style>
