<script lang="ts" setup>
import StepperView from "@/assets/components/UI/StepperView.vue";
import PaymentView from "@/assets/components/cart/PaymentView.vue";
import type { IPaymentItem, IPaymentPayfort } from "@/types/cartData.d";

//// 👉 Data
const isLoading = useLoadingState();
const steps = [
  { name: "cart", title: "عربة التسوق" },
  { name: "order-checkout", title: "الدفع" },
  { name: "order-order-completed", title: "عربة تأكيد الطلب" },
];
const cartStore = useCartStore();
const payfortReturnedData = ref<IPaymentPayfort>();

//// 👉 Methods
const checkout = async (paymentInf: IPaymentItem, nextCallback: Function) => {
  isLoading.value = true;
  const res: any = await cartStore.checkout(paymentInf);
  if (res) {
    if (paymentInf.payment_method == "payfort") {
      isLoading.value = false;
      payfortReturnedData.value = res;
      return;
    } else if (paymentInf.payment_method == "tabby") {
      isLoading.value = false;
      return;
    }
    nextCallback();
  }
  isLoading.value = false;
};
watchEffect(useGlobalStore().fetchAddress);
useHead({
  title: () => "إتمام الدفع",
});
</script>
<template>
  <StepperView :steps="steps">
    <template #content="{ nextCallback }">
      <PaymentView
        :totals="cartStore.totals"
        @checkout="checkout($event, nextCallback)"
        :payfortData="payfortReturnedData"
      />
    </template>
  </StepperView>
</template>
