<script lang="ts">
// import ProductView from "../product/ProductView.vue";
import {
  Navigation,
  Autoplay,
  Thumbs,
  Mousewheel,
  EffectCoverflow,
  FreeMode,
  
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
export default defineComponent({
  name: "SwiperView",
  //  👉 Props
  props: {
    swiperType: {
      type: (String as any) || null,
      required: true,
    },
    items: {
      type: Array as any,
      required: true,
    },
    sectionId: {
      type: [Number, String],
    },
  },

  setup(props, { emit }) {
    //  👉 Data
    const activeIndex = ref(0);
    //  👉 computed
    const navigateionButtons = computed(() => {
      if (props.swiperType == "horizontal")
        return {
          prevEl: ".custom-horizontal-prev",
          nextEl: ".custom-horizontal-next",
        };
      else if (props.swiperType == "vertical") {
        return {
          prevEl: ".custom-vertical-prev",
          nextEl: ".custom-vertical-next",
        };
      } else
        return {
          prevEl: ".custom-" + props.sectionId + "-prev",
          nextEl: ".custom-" + props.sectionId + "-next",
        };
    });
    //  👉 Methods
    return {
      activeIndex,
      modules: [
        Navigation,
        Autoplay,
        Thumbs,
        Mousewheel,
        EffectCoverflow,
        FreeMode,
      ],
      navigateionButtons,
    };
  },
});
</script>
<template>
  <div :class="['swiper-container', 'swiper-section-' + sectionId]">
    <Button class="custom-horizontal-prev" v-if="swiperType === 'horizontal'">
      <i class="pi pi-angle-right"></i>
    </Button>
    <Button class="custom-vertical-prev" v-if="swiperType === 'vertical'">
      <i class="pi pi-angle-up"></i>
    </Button>
    <swiper :modules="modules" :navigation="navigateionButtons" v-bind="$attrs">
      <swiper-slide v-for="(item, index) in items" :key="index">
        <slot :item="item" :index="index"></slot>
      </swiper-slide>
    </swiper>
    <Button class="custom-horizontal-next" v-if="swiperType === 'horizontal'">
      <i class="pi pi-angle-left"></i>
    </Button>
    <Button class="custom-vertical-next" v-if="swiperType === 'vertical'">
      <i class="pi pi-angle-down"></i>
    </Button>
    <div
      v-if="swiperType === 'product'"
      class="custom-navigation flex justify-content-center mt-3"
    >
      <div class="navigation-container">
        <Button :class="'custom-' + sectionId + '-prev'">
          <i class="pi pi-arrow-right"></i>
        </Button>
        <Button :class="'custom-' + sectionId + '-next'">
          <i class="pi pi-arrow-left"></i>
        </Button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="@/assets/scss/components/custom-swiper.scss" scoped />
