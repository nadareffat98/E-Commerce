import { useGlobalStore } from "@/stores/globalStore";

export default defineNuxtPlugin(async () => {
  const globalStore = useGlobalStore();
  const cartStore = useCartStore();
  await globalStore.fetchAll();
  await cartStore.getCartItems();
});
