import type { ICartItem, ITabbyItem, IPaymentItem } from "@/types/cartData";
export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      cartProducts: Array as any,
      totals: {} as any,
      cubon: "" as string,
      user: useAuthStore().user as any,
      currentDate: new Date(),
    };
  },
  getters: {
    length: (state) => state.cartProducts.length,
    isEmpty: (state) => state.cartProducts.length == 0,
  },
  actions: {
    //👉 get cart items
    getCartItems() {
      $useMyFetch("/cart").then((res: any) => {
        this.cartProducts = res.data.value.data.products;
        this.totals = res.data.value.data.totals;
      });
    },
    // 👉  add item to cart
    addToCart(item: ICartItem) {
      $useMyFetch("/cart", {
        method: "post",
        body: {
          ...item,
        },
      }).then((res: any) => {
        const { $toastify }: any = useNuxtApp();
        if (res.status.value == "error") {
          $toastify(res.error.value.data.message, "error");
        } else {
          this.cartProducts.push(res.data.value.data);
          this.getCartItems();
          $toastify(res.data.value.message, "success");
        }
      });
    },
    // 👉 delete item from cart
    async deleteCartItem(id: number) {
      const { $toastify }: any = useNuxtApp();
      const res: any = await $useMyFetch(`/cart/${id}`, {
        method: "delete",
      });
      if (res.status.value == "error") {
        $toastify(res.error.value.data.message, "error");
      } else {
        this.getCartItems();
        $toastify(res.data.value.message, "success");
      }
    },
    // 👉  add cubon to cart
    addCubon(cubon: string) {
      $useMyFetch("/cart/apply_coupon", {
        method: "post",
        body: {
          code: cubon,
        },
      }).then((res: any) => {
        const { $toastify }: any = useNuxtApp();

        if (res.status.value == "error") {
          $toastify(res.error.value.data.message, "error");
        } else {
          this.cartProducts = res.data.value.data.products;
          this.totals = res.data.value.data.totals;
          this.cubon = cubon;
          $toastify(res.data.value.message, "success");
        }
      });
    },
    // 👉 checkout cart
    async checkout(paymentInf: IPaymentItem): Promise<any> {
      const { $toastify }: any = useNuxtApp();
      localStorage.removeItem("successData");
      paymentInf.coupon = this.cubon;
      if (
        paymentInf.payment_method == "tabby" ||
        paymentInf.payment_method == "payfort" ||
        paymentInf.payment_method == "tamara"
      ) {
        paymentInf.type = "web";
      }
      const checkoutRes: any = await $useMyFetch("/order/checkout", {
        method: "post",
        body: {
          ...paymentInf,
        },
      });
      if (checkoutRes.status.value == "success") {
        this.cubon = "";
        if (paymentInf.payment_method == "payfort")
          return checkoutRes.data.value.data;
        else if (paymentInf.payment_method == "tamara") {
          navigateTo(checkoutRes.data.value.data.checkout_url, {
            external: true,
          });
          return;
        } else if (paymentInf.payment_method == "tabby") {
          await this.handleTabby(
            paymentInf.address_id,
            checkoutRes.data.value.data
          );
          return false;
        }
        $toastify(checkoutRes.data.value.message, "success");
        localStorage.setItem(
          "successData",
          JSON.stringify(checkoutRes.data.value.data)
        );
        return true;
      } else {
        $toastify(checkoutRes.error.value.data.message, "error");
        return false;
      }
    },
    //👉 payment with tabby
    async handleTabby(address_id: number, tabbyPayload: any) {
      const { $toastify }: any = useNuxtApp();
      const globalStore = useGlobalStore();
      const address = await globalStore.fetchSingleAddress(address_id);
      const formattedDate = this.currentDate.toISOString();
      const domain = window.location.origin;
      const payload: ITabbyItem = {
        merchant_code: tabbyPayload.merchant_code,
        merchant_urls: {
          success: `${domain}${tabbyPayload.success_url}`,
          cancel: `${domain}${tabbyPayload.cancel_url}`,
          failure: `${domain}${tabbyPayload.failure_url}`,
        },
        lang: "ar",
        payment: {
          amount: `${tabbyPayload.order_total}`,
          currency: "SAR",
          buyer: {
            name: this.user.name,
            email: this.user.email,
            phone: `${this.user.phone}`,
            dob: null,
          },
          buyer_history: {
            registered_since: `${formattedDate}`,
            loyalty_level: 0,
            wishlist_count: 0,
            is_social_networks_connected: null,
            is_phone_number_verified: null,
            is_email_verified: null,
          },
          shipping_address: {
            city: `${address.city}`,
            address: `${address.address}`,
            zip: address.postal_code,
          },
          order: {
            reference_id: `${tabbyPayload.transaction_id}`,
            shipping_amount: "0",
            tax_amount: "0",
            discount_amount: "0",
            items: [],
          },
          order_history: [],
          description: "",
        },
      };
      const Res: any = await $useMyFetch("api/v2/checkout", {
        baseURL: "https://api.tabby.ai/",
        method: "post",
        headers: {
          Authorization: `Bearer ${tabbyPayload.public_key}`,
        },
        body: { ...payload },
      });
      if (Res.status.value == "success") {
        navigateTo(
          Res.data.value.configuration.available_products.installments[0]
            .web_url,
          { external: true }
        );
      } else {
        $toastify(Res.error.value.data.message, "error");
      }
    },
  },
  persist: true,
});
