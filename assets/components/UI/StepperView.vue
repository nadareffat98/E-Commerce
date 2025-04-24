<script lang="ts">
export default defineComponent({
  name: "stepper",
  props: {
    steps: {
      type: Array as any,
      required: true,
    },
  },
  setup(props) {
    // 👉 Data
    const route = useRoute();
    const router = useRouter();
    const activeIndex = ref(
      props.steps.findIndex((item: any) => item.name === route.name)
    );
     // 👉 Methods
    const onStepChange = (step: number) => {
      activeIndex.value = step;
      router.push({ name: props.steps[step].name });
    };
    return {
      activeIndex,
      onStepChange,
    };
  },
});
</script>
<template>
  <Stepper @update:active-step="onStepChange" :active-step="activeIndex">
    <StepperPanel v-for="(step, index) in steps" :key="index">
      <template #header="{ highlighted, clickCallback }">
        <div>
          <i class="pi pi-check border-circle ml-1" v-if="highlighted"></i>
          <span
            :class="{ active: highlighted }"
            @click="highlighted ? clickCallback($event) : null"
            >{{ step?.title }}</span
          >
        </div>
      </template>
      <template #separator="{ highlighted }">
        <i
          class="pi pi-angle-left mr-2 separator"
          :class="{ active: highlighted }"
        ></i>
      </template>
      <template #content="{ nextCallback }">
        <slot name="content" :nextCallback="nextCallback"></slot>
      </template>
    </StepperPanel>
  </Stepper>
</template>
<style lang="scss" src="@/assets/scss/components/cart/payment.scss" scoped />
