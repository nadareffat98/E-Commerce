<script lang="ts">
export default defineComponent({
  name: "Notify Modal",
  //  👉 Emits
  emits: ["close"],
  //  👉 Props
  props: {
    productId: { type: Number, required: true },
  },
  setup(props, { emit }) {
    //  👉 Store
    const productStore = useProductStore();
    const userStore = useAuthStore();
    const user = userStore.user;
    //  👉 Data
    const show = ref(true);
    const qty: any = ref();
    const name = ref<string>("");
    const email = ref<string>("");
    const phone = ref<string>("");
    //  👉 Methods
    const NotifyMe = async () => {
      const res: boolean = await productStore.notifyMe({
        product_id: props.productId,
        required_quantity: qty.value,
        fullname: user ? user.name : name.value,
        email: user ? user.email : email.value,
        phone: user ? user.phone : phone.value,
      });
      if (res) emit("close");
    };
    return {
      show,
      qty,
      name,
      email,
      phone,
      userStore,
      NotifyMe,
    };
  },
});
</script>
<template>
  <Dialog
    v-model:visible="show"
    modal
    header="نهبني عندما يكون هذا المنتج متاح"
    :style="{ width: '30rem' }"
    class="modal-dialog"
    :breakpoints="{ '768px': '25rem', '425px': '20rem', '375px': '18rem' }"
    @hide="$emit('close')"
  >
    <Divider class="mt-0" />
    <div
      v-if="!userStore.isLogged"
      class="flex justify-content-between gap-3 my-2"
    >
      <div class="flex flex-column align-items-start gap-1 flex-1">
        <label for="name" class="w-6rem">الأسم</label>
        <InputText id="name" v-model="name" class="w-full" />
      </div>
      <div class="flex flex-column align-items-start gap-1 flex-1">
        <label for="email" class="w-6rem"
          >البريد الإلكتروني</label
        >
        <InputText id="email" v-model="email" class="w-full" />
      </div>
    </div>
    <div class="flex justify-content-between gap-3 my-2">
      <div
        class="flex flex-column align-items-start gap-1 flex-1"
        v-if="!userStore.isLogged"
      >
        <label for="phone" class="w-6rem">رقم الجوال</label>
        <InputText id="phone" v-model="phone" class="w-full" />
      </div>
      <div class="flex flex-column align-items-start gap-1 flex-1">
        <label for="qty" class="w-6rem">الكمية</label>
        <InputNumber
          id="qty"
          class="w-full"
          v-model="qty"
          :useGrouping="false"
        />
      </div>
    </div>
    <div class="flex justify-content-end gap-2">
      <Button
        type="button"
        label="تأكيد"
        @click="NotifyMe"
        class="accept-button"
      ></Button>
      <Button
        type="button"
        label="تراجع"
        @click="$emit('close')"
        severity="secondary"
      ></Button>
    </div>
  </Dialog>
</template>
<style lang="scss" scoped>
.p-inputnumber :deep(.p-inputtext) {
  width: 100%;
}
@media (max-width: 425px) {
  :global(.modal-dialog .p-dialog-header .p-dialog-title) {
    font-size: 1rem;
  }
  :global(.modal-dialog .p-dialog-header .p-icon) {
    width: 0.8rem;
  }
  :global(.modal-dialog .p-dialog-header) {
    padding: 0.8rem 2rem;
  }
}
</style>
