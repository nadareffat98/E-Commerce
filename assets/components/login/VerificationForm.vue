<script lang="ts">
export default defineComponent({
  name: "VerificationForm",
  //  👉 Props
  props: {
    isEmail: {
      type: Boolean,
      required: true,
    },
    verificationDesc: {
      type: String,
      required: true,
    },
  },
  //  👉 Emits
  emits: ["returnLogin", "confirmVerify"],
  setup(props, { emit }) {
    // 👉 Data
    const otp = ref("");
    // 👉 Methods
    const handleVerify = () => {
      emit("confirmVerify", Number(otp.value));
    };
    return {
      handleVerify,
      otp,
    };
  },
});
</script>
<template>
  <div class="flex flex-column justify-content-center align-items-center gap-3">
    <h3 class="title mt-2">رمز التحقق</h3>
    <p class="login-desc">{{ verificationDesc }}</p>
    <div class="flex flex-column justify-content-start gap-2 w-full">
      <label> رمز التحقق</label>
      <InputOtp v-model="otp" integerOnly dir="ltr" class="mx-auto"> </InputOtp>
    </div>
  </div>
  <Button label="تأكيد" class="green-btn mt-5" @click="handleVerify" />
  <Button
    :label="isEmail ? 'تغير البريد الالكتروني' : 'تغير رقم الهاتف'"
    link
    class="title w-full"
    @click="$emit('returnLogin')"
  ></Button>
</template>
<style scoped lang="scss"></style>
