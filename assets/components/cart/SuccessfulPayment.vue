<script lang="ts">
export default defineComponent({
  name: "SuccessfulPayment",
  props: {
    successData: {
      type: Object as any,
      required: true,
    },
  },
  setup(props) {
    // Data
    const router = useRouter();

    //Methods
    const goToOrders = () => {
      navigateTo("/account/orders");
      localStorage.removeItem("successData");
    };
    return {
      goToOrders,
    };
  },
});
</script>
<template>
  <div
    class="flex flex-column justify-content-center align-items-center gap-4 my-4 w-4"
  >
    <div class="flex align-items-center gap-3">
      <i
        class="pi pi-check border-circle ml-1 p-2 text-white"
        style="background: var(--main-color)"
      ></i>
      <h3 style="color: #556987">تم تأكيد طلبك بنجاح</h3>
    </div>
    <ul
      class="flex flex-column justify-content-center align-items-center gap-3"
      v-if="successData"
    >
      <li>رقم الطلب: {{ successData.order_number }}</li>
      <li>التاريخ: {{ successData.created_at }}</li>
      <li>الإجمالي: {{ successData.total }}</li>
      <li>طريقة الدفع: {{ successData.active_payment_method }}</li>
    </ul>
    <Button label="ملخص الطلبات" class="green-btn" @click="goToOrders" />
  </div>
</template>
<style scoped lang="scss">
a .p-button:hover {
  background: var(--main-color);
}
li {
  color: $title-color;
  font-weight: 700;
  font-size: 18px;
}
</style>
