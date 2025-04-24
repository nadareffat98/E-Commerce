<script lang="ts">
import type { ICartItem } from "@/types/cartData.d";
import NotifyModal from "../UI/NotifyModal.vue";
export default defineComponent({
  name: "ProductView",
  components: { NotifyModal },
  //  👉 Props
  props: {
    product: { type: Object, required: true },
  },
  emits: ["update"],
  setup(props, { emit }) {
    const cartStore = useCartStore();
    const userStore = useAuthStore();
    const productStore = useProductStore();
    const productId = ref();
    const notifyMe = ref(false);
    const isLoading = useLoadingState();
    // 👉 Methods
    const getRating = (rate: any) => {
      return Math.round(Number(rate));
    };
    const getDiscount = (price: number, priceAfterDiscount: number) => {
      return `${Math.round((price - priceAfterDiscount) / (price / 100))} %`;
    };
    const addToCart = async (product: any) => {
      if (product.is_available) {
        const cartItem: ICartItem = {
          product_id: product.id,
          qty: 1,
        };
        await cartStore.addToCart(cartItem);
        const updatedProduct = await productStore.fetchSingleProduct(
          product.slug
        );
        emit("update", updatedProduct);
      } else {
        productId.value = product.id;
        notifyMe.value = true;
      }
    };
    const addOrRemove = async (product: any) => {
      isLoading.value = true;
      if (product.is_wishlisted) {
        await $useMyFetch(`/wishlist/${product.id}`, {
          method: "delete",
        });
      } else {
        await $useMyFetch(`/wishlist`, {
          method: "post",
          body: {
            product_id: product.id,
          },
        });
      }
      // Fetch the updated product data
      const updatedProduct = await productStore.fetchSingleProduct(product.slug);
      // Emit the updated product data
      emit("update", updatedProduct);
      isLoading.value = false;
    };
    return {
      notifyMe,
      productId,
      userStore,
      getRating,
      getDiscount,
      addToCart,
      addOrRemove,
    };
  },
});
</script>
<template>
  <NotifyModal
    v-if="notifyMe"
    @close="notifyMe = false"
    :productId="productId"
  />
  <NuxtLink
    :to="`/product/${product.slug}`"
    class="product-container no-underline h-full"
  >
    <div class="flex flex-column h-full">
      <div class="relative">
        <img
          :src="product.featured_image"
          :alt="product.title"
          class="w-full h-full"
          style="border-radius: 16px 16px 0 0"
        />
        <Tag
          :value="getDiscount(product.price, product.sale_price)"
          class="absolute"
          style="left: 5px; top: 5px"
          v-if="product.sale_price != 0"
        />
      </div>
      <Divider class="mt-1 mb-0" />
      <div
        class="product-inf flex flex-column justify-content-between align-items-start flex-grow-1 gap-2 p-3"
      >
        <div class="rating flex gap-2">
          <Rating
            :modelValue="getRating(product.rate)"
            readonly
            :cancel="false"
          />
          <span>{{ product.rate }}</span>
        </div>
        <p class="title normal-font-14">{{ product.title }}</p>
        <div
          class="surface-overlay"
          style="background-color: transparent !important"
        >
          <p class="price inline vertical-align-baseline">
            {{ product.price }} س.ر
          </p>
          <span
            v-if="product.sale_price != 0"
            class="vertical-align-sub line-through sale-price mr-2"
            >{{ product.sale_price }}</span
          >
        </div>
      </div>
      <div
        class="flex align-items-center justify-content-center button-container gap-2 md:pb-3 pb-2 md:px-3 px-2"
      >
        <Button
          icon="pi pi-heart-fill"
          v-if="product.is_wishlisted && userStore.isLogged"
          class="wishlisted"
          @click.prevent="addOrRemove(product)"
        />
        <Button
          icon="pi pi-heart"
          v-if="!product.is_wishlisted && userStore.isLogged"
          class="wishlisted"
          @click.prevent="addOrRemove(product)"
        />
        <Button
          :icon="product.is_available ? 'pi pi-shopping-cart' : 'pi pi-bell'"
          :label="
            product.is_available ? 'أضف الي العربة' : 'نبهني عند توفر المنتج'
          "
          :class="[
            'add-to-cart flex-grow-1',
            product.is_available ? '' : 'notify-me',
          ]"
          @click.prevent="addToCart(product)"
        />
      </div>
    </div>
  </NuxtLink>
</template>
<style
  lang="scss"
  src="@/assets/scss/components/products/product-view.scss"
  scoped
/>
