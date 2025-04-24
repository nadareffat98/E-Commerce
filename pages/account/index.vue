<script lang="ts">
export default defineComponent({
  name: "account",
  setup() {
    //  👉 Data
    const authStore = useAuthStore();
    const globalStore = useGlobalStore();
    const user = authStore.user;
    const selectedGender = user.gender;
    const countries = globalStore.countries;
    const selectedCountry:any = countries.find(
      (item: any) => item.id == user.country_id
    );
    useHead({
      title: user.name,
    });
    return {
      authStore,
      user,
      countries,
      selectedCountry,
      selectedGender,
    };
  },
});
</script>
<template>
  <Card class="card-container shadow-3">
    <template #title>
      <h3>بيانات حسابي</h3>
    </template>
    <template #content>
      <!-- <form>
        <div class="flex sm:flex-row flex-column gap-4">
          <div class="flex flex-column gap-2 flex-1">
            <label for="username">الاسم الكامل</label>
            <InputText id="username" v-model="user.name" readonly />
          </div>
          <div class="flex flex-column gap-2 flex-1">
            <label for="email">البريد الإلكتروني</label>
            <InputText id="email" v-model="user.email" readonly />
          </div>
        </div>
        <div class="flex flex-column gap-2 mt-4">
          <label for="phone">رقم الهاتف</label>
          <InputGroup id="phone" style="direction: ltr">
            <InputGroupAddon class="p-0">
              <Dropdown
                id="country"
                v-model="selectedCountry"
                :options="countries"
                optionLabel="iso_prefix"
                class="border-none"
                readonly
              />
            </InputGroupAddon>
            <InputText
              :value="selectedCountry.code + user.phone"
              readonly
            />
          </InputGroup>
        </div>
        <div class="mt-4">
          <RadioButton
            :inputId="selectedGender"
            name="dynamic"
            :value="selectedGender"
            readonly
            v-model="selectedGender"
          />
          <label class="mr-3">{{ selectedGender }}</label>
        </div>
      </form> -->
    </template>
  </Card>
</template>
<style scoped lang="scss">
label {
  color: $font-color;
}
</style>
