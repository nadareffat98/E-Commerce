<script lang="ts" setup>
import OrderView from "@/assets/components/order/OrderView.vue";
//👉 Data
const { id } = useRoute().params;
const order = ref();
const orderRes: any = await $useMyFetch(`/order/show/${id}`);
order.value = orderRes.data.value.data;
useHead({
  title: order.value.order_number,
});
</script>
<template>
  <div class="order-container flex flex-column justify-content-center align-items-center">
    <h3>الطلب #{{ order.order_number }}</h3>
    <OrderView :order="order"/>
  </div>
</template>
<style lang="scss" src="@/assets/scss/components/order/show.scss" scoped />
