export const useAuthStore = defineStore({
  id: "auth",
  state: () => {
    return {
      isLogged: false,
      user: "" as any,
      token: "",
    };
  },
  actions: {
    // fast login with email
    loginWithEmail(email: string): Promise<any> {
      return $useMyFetch("send_verification_code_email", {
        method: "post",
        body: {
          email: email,
        },
      });
    },
    // fast login with mobile
    loginWithMobile(countryId: number, mobile: string): Promise<any> {
      return $useMyFetch("send_verification_code_mobile", {
        method: "post",
        body: {
          country_id: countryId,
          phone: mobile,
        },
      });
    },

    // verify code with email
    async verifyWithEmail(email: string, otp: number): Promise<any> {
      const { data, error }: any = await $useMyFetch("verify_email_code", {
        method: "post",
        body: {
          email: email,
          verification_code: otp,
        },
      });
      if (error.value) return error;
      else {
        this.redirectToProfile(data.value.data);
        return false;
      }
    },
    // verify code with mobile
    async verifyWithMobile(
      countryId: number,
      mobile: string,
      otp: number
    ): Promise<any> {
      const { data, error }: any = await $useMyFetch("verify_mobile_code", {
        method: "post",
        body: {
          country_id: countryId,
          phone: mobile,
          mobile_verification_code: otp,
        },
      });
      if (error.value) return error;
      else {
        this.redirectToProfile(data.value.data);
        return false;
      }
    },

    //logout
    logout() {
      this.token = "";
      this.isLogged = false;
      navigateTo("/login");
    },

    // Redirect to profile
    redirectToProfile(data: any) {
      const cartStore = useCartStore();
      cartStore.getCartItems();
      this.user = data;
      this.token = this.user.accessToken;
      this.isLogged = true;
      navigateTo("/account");
    },
  },
  persist: true,
});
