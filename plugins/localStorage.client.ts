import type { ISuccessData } from "@/types/globalData.d";
export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    const storedData = localStorage.getItem("successData");
    const successData: ISuccessData | null = storedData
      ? JSON.parse(storedData)
      : null;
    nuxtApp.provide("successData", successData);
  }
});
