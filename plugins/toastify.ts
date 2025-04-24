import Vue3Toasity, { type ToastContainerOptions } from "vue3-toastify";
import { toast, type ToastOptions } from "vue3-toastify";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toasity) as ToastContainerOptions;
  return {
    provide: {
      toastify: (msg: string, type: string) => {
        toast(msg, {
          autoClose: 3000,
          position: toast.POSITION.BOTTOM_RIGHT,
          type: type,
          theme: "colored",
        } as ToastOptions);
      },
    },
  };
});
