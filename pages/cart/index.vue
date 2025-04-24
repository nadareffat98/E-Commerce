<script lang="ts" setup>
import StepperView from "@/assets/components/UI/StepperView.vue";
import ShoppingCart from "@/assets/components/cart/ShoppingCart.vue";
import EmptyCart from "@/assets/components/cart/EmptyCart.vue";

// 👉 Data
const steps = [
  { name: "cart", title: "عربة التسوق" },
  { name: "order-checkout", title: "الدفع" },
  { name: "order-order-completed", title: "عربة تأكيد الطلب" },
];
const cartStore = useCartStore();
useHead({
  title: () => "عربة التسوق",
});
</script>
<template>
  <div class="cart-container">
    <template v-if="cartStore.isEmpty">
      <EmptyCart />
    </template>
    <template v-else>
      <StepperView :steps="steps">
        <template #content="{ nextCallback }">
          <ShoppingCart
            @handlePayment="nextCallback"
            :cartStore="cartStore"
            @addCubon="cartStore.addCubon($event)"
            @deleteItem="cartStore.deleteCartItem($event)"
          />
        </template>
      </StepperView>
    </template>
  </div>
</template>
