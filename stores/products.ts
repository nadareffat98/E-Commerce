import type { INotifyData } from "@/types/productsData";
export const useProductStore = defineStore("products", {
  actions: {
    //👉  fetch Single Product
    async fetchSingleProduct(slug: string): Promise<any> {
      const product: any = await $useMyFetch(`/product-slug/${slug}`);
      return product.data.value.data;
    },
    //👉 notifyMe
    async notifyMe(payload: INotifyData): Promise<any> {
      const { $toastify }: any = useNuxtApp();

      const res: any = await $useMyFetch("/notify-me", {
        method: "post",
        body: {
          ...payload,
        },
      });
      if (res.status.value == "success") {
        $toastify(res.data.value.message, "success");
        return true;
      } else {
        $toastify(res.error.value.data.message, "error");
        return false;
      }
    },
  },
});
