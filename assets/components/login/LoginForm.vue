<script lang="ts">
export default defineComponent({
  name: "LoginForm",
  //  👉 Props
  props: {
    loginDesc: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    isEmail: {
      type: Boolean,
      required: true,
    },
  },
  //  👉 Emits
  emits: ["login"],
  setup(props, { emit }) {
    // 👉 Store
    const globalStore = useGlobalStore();

    // 👉 Data
    const countries = globalStore.countries;
    const selectedCountry = countries[0];
    const email = ref("");
    const phone = ref<number>();

    // 👉 Methods
    const handleLogin = () => {
      if (props.isEmail) emit("login", null, null, email.value, props.isEmail);
      else
        emit(
          "login",
          selectedCountry.id,
          `${phone.value}`,
          null,
          props.isEmail
        );
    };

    return {
      handleLogin,
      email,
      phone,
      selectedCountry,
      countries,
    };
  },
});
</script>
<template>
  <div class="flex flex-column justify-content-center align-items-center gap-3">
    <h3 class="title">تسجيل الدخول</h3>
    <p class="login-desc text-center">{{ loginDesc }}</p>
    <div class="flex flex-column justify-content-start gap-2 w-full">
      <label>{{ label }}</label>
      <InputText type="text" v-model="email" v-if="isEmail" />
      <InputGroup style="direction: ltr" v-else>
        <InputGroupAddon class="p-0">
          <Dropdown
            id="country"
            v-model="selectedCountry"
            :options="countries"
            optionLabel="code"
            class="border-none"
          />
        </InputGroupAddon>
        <InputNumber v-model="phone" :useGrouping="false" />
      </InputGroup>
    </div>
  </div>
  <Button label="إرسل رمز التحقق" class="green-btn mt-5" @click="handleLogin" />
</template>
