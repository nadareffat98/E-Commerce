<script lang="ts">
export default defineComponent({
  name: "Address Modal",
  //  👉 Emits
  emits: ["close", "getAllAdress"],
  //  👉 Props
  props: {
    address: { type: Object, required: true },
    addressId: { type: Number, required: true },
  },

  setup(props, { emit }) {
    // 👉 Store
    const globalStore = useGlobalStore();

    //  👉 Data
    const show = ref(true);
    const addressInf = ref({ ...props.address });
    const countries = globalStore.countries;
    const cities = globalStore.cities;
    const { $toastify }: any = useNuxtApp();
    const isDisabled = ref(false);

    //  👉 Methods

    const modifyAddress = () => {
      isDisabled.value = true;
      if (props.addressId == -1) {
        addAddress();
      } else {
        editAddress();
      }
    };

    // add new address
    const addAddress = async () => {
      const res: any = await $useMyFetch(`/address`, {
        method: "post",
        body: {
          ...addressInf.value,
        },
      });
      if (res.status.value == "success") {
        successMessage(res.data.value.message);
      } else {
        $toastify(res.error.value.data.message, "error");
      }
      isDisabled.value = false;
    };
    // edit address
    const editAddress = async () => {
      const res: any = await $useMyFetch(`/address/${props.addressId}`, {
        method: "put",
        body: { ...addressInf.value },
      });
      if (res.status.value == "success") {
        successMessage(res.data.value.message);
      } else {
        $toastify(res.error.value.data.message, "error");
      }
      isDisabled.value = false;
    };
    const successMessage = (message: string) => {
      $toastify(message, "success");
      emit("getAllAdress");
      emit("close");
    };
    // 👉 Computed
    const getButtonName = computed(() => {
      return props.addressId != -1 ? "تعديل العنوان" : "اضافة عنوان";
    });
    return {
      show,
      addressInf,
      countries,
      cities,
      modifyAddress,
      getButtonName,
      isDisabled,
    };
  },
});
</script>
<template>
  <div class="card flex justify-content-center">
    <Dialog
      v-model:visible="show"
      modal
      header="عنوان الشحن"
      class="modal-dialog"
      :style="{ width: '30rem' }"
      :breakpoints="{ '768px': '25rem', '425px': '20rem', '375px': '18rem' }"
      @hide="$emit('close')"
    >
      <Divider class="mt-0" />
      <div class="flex flex-column align-items-start gap-1 flex-1">
        <label for="addressNamme" class="w-6rem"> اسم العنوان </label>
        <InputText
          id="addressNamme"
          v-model="addressInf.title"
          class="w-full"
          placeholder="ادخل اسم العنوان العمل او المنزل على سبيل المثال"
        />
      </div>
      <div class="flex justify-content-between gap-3 my-3">
        <div class="flex flex-column align-items-start gap-1 flex-1">
          <label for="country" class="w-6rem"> الدولة </label>
          <Dropdown
            id="country"
            v-model="addressInf.country_id"
            :options="countries"
            optionLabel="name"
            option-value="id"
            class="w-full"
            placeholder="اختر الدولة"
          />
        </div>
        <div class="flex flex-column align-items-start gap-1 flex-1">
          <label for="city" class="w-6rem"> المدينة </label>
          <Dropdown
            id="city"
            v-model="addressInf.city_id"
            :options="cities"
            optionLabel="name"
            option-value="id"
            class="w-full"
            filter
            placeholder="اختر المدينة"
          />
        </div>
      </div>
      <div class="flex flex-column align-items-start gap-1 flex-1 my-2">
        <label for="address" class="w-6rem"> العنوان </label>
        <Textarea
          id="address"
          v-model="addressInf.address"
          rows="5"
          cols="30"
          :autoResize="true"
          class="w-full"
          placeholder="اكتب عنوانك بالتفصيل..."
        />
      </div>
      <div class="flex flex-column align-items-start gap-1 flex-1 my-3">
        <label for="postal_code" class="w-6rem"> الرقم البريدي </label>
        <InputText
          id="postal_code"
          v-model="addressInf.postal_code"
          class="w-full"
          placeholder="ادخل رقمك البريدي"
        />
      </div>
      <Button
        type="button"
        :label="getButtonName"
        @click="modifyAddress"
        class="green-btn"
        :disabled="isDisabled"
      ></Button>
    </Dialog>
  </div>
</template>
<style>
.p-dropdown-panel .p-dropdown-header .p-dropdown-filter {
  margin-right: 0 !important;
}
</style>
