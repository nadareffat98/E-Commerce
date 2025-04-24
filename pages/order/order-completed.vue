<script lang="ts" setup>
import StepperView from "@/assets/components/UI/StepperView.vue";
import SuccessfulPayment from "@/assets/components/cart/SuccessfulPayment.vue";
import type { ISuccessData } from "@/types/globalData.d";

// 👉 Data
const steps = [
  { name: "cart", title: "عربة التسوق" },
  { name: "order-checkout", title: "الدفع" },
  { name: "order-order-completed", title: "عربة تأكيد الطلب" },
];
const successData = ref<ISuccessData>();
const orderNum = ref();
if (import.meta.client) {
  const storedData = localStorage.getItem("successData");
  successData.value = storedData ? JSON.parse(storedData) : null;
  orderNum.value = successData.value?.order_number;
}

useHead({
  title: () => orderNum.value,
});
</script>
<template>
  <StepperView :steps="steps">
    <template #content>
      <div class="flex justify-content-center">
        <SuccessfulPayment :successData="successData" />
      </div>
    </template>
  </StepperView>
</template>
