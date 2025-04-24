<script setup lang="ts">
import LoginForm from "@/assets/components/login/LoginForm.vue";
import VerificationForm from "@/assets/components/login/VerificationForm.vue";
definePageMeta({
  middleware: "auth",
  layout: "default",
});
useHead({
  title: "تسجيل الدخول",
});

// 👉 Store
const globalStore = useGlobalStore();
const authStore = useAuthStore();
const store = globalStore.store;
const { $toastify }: any = useNuxtApp();
const isLoading = useLoadingState();

// 👉 Data
const verifyVisible = ref(false);
const emailVisible = ref(true);
const verificationDesc = ref("");
const user = ref<any>();

//  👉 Methods
const handleLogin = async (
  countryId: number,
  phone: string,
  email: string,
  isEmail: boolean
) => {
  isLoading.value = true;
  if (isEmail) {
    emailVisible.value = true;
    verificationDesc.value =
      "قم بإدخال رمز التحقق المكون من 6 أرقام الذي تم ارساله على" + email;
    user.value = { email };
    loginWithEmail(email);
  } else {
    emailVisible.value = false;
    verificationDesc.value =
      "قم بإدخال رمز التحقق المكون من 6 أرقام الذي تم ارساله على" + phone;
    user.value = { countryId, phone };
    loginWithMobile(countryId, phone);
  }
};
const handleVerify = async (otp: number) => {
  isLoading.value = true;
  if (emailVisible.value) verifyWithEmail(otp);
  else verifyWithMobile(otp);
};
// login
const loginWithMobile = async (countryId: number, phone: string) => {
  const { data, error } = await authStore.loginWithMobile(
    countryId,
    `${phone}`
  );
  if (error.value) $toastify(error.value.data.message, "error");
  else verifyVisible.value = true;
  isLoading.value = false;
};

const loginWithEmail = async (email: string) => {
  const { data, error } = await authStore.loginWithEmail(email);
  if (error.value) $toastify(error.value.data.message, "error");
  else verifyVisible.value = true;
  isLoading.value = false;
};

// verify
const verifyWithMobile = async (otp: number) => {
  const res = await authStore.verifyWithMobile(
    user.value.countryId,
    `${user.value.phone}`,
    otp
  );
  if (res) {
    $toastify(res.value.data.message, "error");
  }
  isLoading.value = false;
};
const verifyWithEmail = async (otp: number) => {
  const res = await authStore.verifyWithEmail(user.value.email, otp);
  if (res) {
    $toastify(res.value.data.message, "error");
  }
  isLoading.value = false;
};
</script>
<template>
  <div
    class="flex md:flex-row flex-column md:align-items-stretch align-items-end justify-content-between login-container"
  >
    <div class="login-form md:my-8 my-0 md:mr-4 mx-auto">
      <Card style="max-width: 400px">
        <template #header>
          <img
            alt="cardnet logo"
            :src="store.store_logo"
            width="120px"
            height="60px"
          />
        </template>
        <template #content>
          <TabView
            v-if="!verifyVisible"
            :class="{
              'hide-header':
                store.login_with_email_only == 0 ||
                store.login_with_mobile_only == 0,
            }"
          >
            <TabPanel
              header="البريد الإلكتروني"
              v-if="store.login_with_email_only == 1"
            >
              <LoginForm
                :label="'البريد الإلكتروني'"
                :loginDesc="'ادخل بريدك الإلكتروني و سنقوم بإرسل رمز التحقق الخاص بك لتتمكن من إتمام عملية الشراء'"
                :isEmail="true"
                @login="handleLogin"
              />
            </TabPanel>
            <TabPanel header="رقم الجوال">
              <LoginForm
                :label="'رقم الجوال'"
                :loginDesc="'ادخل رقم هاتفك و سنقوم بإرسل رمز التحقق الخاص بك لتتمكن من اتمام عملية الشراء'"
                :isEmail="false"
                @login="handleLogin"
              />
            </TabPanel>
          </TabView>
          <div class="verification-container" v-else>
            <VerificationForm
              :isEmail="emailVisible"
              :verificationDesc="verificationDesc"
              @returnLogin="verifyVisible = false"
              @confirmVerify="handleVerify"
            />
          </div>
        </template>
      </Card>
    </div>
    <div class="left-side">
      <img src="/imgs/login-logo.png" height="100%" />
    </div>
  </div>
</template>
<style lang="scss" src="@/assets/scss/components/login/login.scss" scoped />
