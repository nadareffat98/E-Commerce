<script lang="ts">
export default defineComponent({
  name: "ContactUsModal",
  setup() {
    // 👉 Store
    const globalStore = useGlobalStore();
    // 👉 Data
    const countries = globalStore.countries;
    const selectedCountry = countries[0];
    const formData = ref({
      name: "",
      email: "",
      message: "",
      phone: null,
    });
    return {
      countries,
      selectedCountry,
      formData,
    };
  },
});
</script>

<template>
  <div class="flex justify-content-start align-items-center">
    <Card class="card-container contact-us-card shadow-3">
      <template #title>
        <h3>تواصل معنا</h3>
      </template>
      <template #content>
        <div
          class="flex sm:flex-row flex-column justify-content-between gap-4 mb-3"
        >
          <div class="flex flex-column gap-2 flex-1">
            <label for="name">الاسم</label>
            <InputText
              id="name"
              v-model="formData.name"
              placeholder="الاسم"
              class="w-full"
            />
          </div>
          <div class="flex flex-column gap-2 flex-1">
            <label for="email">البريد الإلكتروني</label>
            <InputText
              id="email"
              v-model="formData.email"
              placeholder="البريد الإلكتروني"
              class="w-full"
            />
          </div>
        </div>
        <div class="flex flex-column gap-2 mb-3">
          <label for="phone"> رقم الهاتف </label>
          <InputGroup style="direction: ltr">
            <InputGroupAddon class="p-0">
              <Dropdown
                id="country"
                v-model="selectedCountry"
                :options="countries"
                optionLabel="code"
                class="border-none"
              />
            </InputGroupAddon>
            <InputNumber v-model="formData.phone" :useGrouping="false" />
          </InputGroup>
        </div>
        <div class="flex flex-column gap-2 mb-3">
          <label for="msg"> الرسالة</label>
          <Textarea
            v-model="formData.message"
            id="msg"
            rows="5"
            cols="30"
            :autoResize="true"
          />
        </div>
      </template>
      <template #footer>
        <Button label="إرسال" class="green-btn" />
      </template>
    </Card>
  </div>
</template>
<style scoped lang="scss">
.p-card p,
span,
label {
  color: $font-color;
}
.contact-us-card {
  width: 100%;
}
@media (min-width: 900px) {
  .contact-us-card {
    width: 600px;
  }
}
@media (max-width: 575px) {
  .contact-us-card {
    :deep(.p-card-body) {
      gap: 1.5rem;
      padding: 1.5rem !important;
    }
  }
}
</style>
