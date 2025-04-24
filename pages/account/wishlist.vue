<script lang="ts" setup>
import type { ICartItem } from "@/types/cartData.d";
import NotifyModal from "@/assets/components/UI/NotifyModal.vue";
// // 👉 Store
const cartStore = useCartStore();
const productStore = useProductStore();
const store = useGlobalStore().store;

// // 👉 Data
const favorites = ref();
const notifyMe = ref(false);
const productId = ref();
const isLoading = useLoadingState();

// // 👉 Methods
// fetch favorites
const fetchFavorites = async () => {
  const favoritesRes: any = await $useMyFetch("/wishlist");
  favorites.value = favoritesRes.data.value.data;
  isLoading.value = false;
};
const addOrRemove = async (product: any) => {
  isLoading.value = true;
  if (product.is_wishlisted) {
    const res: any = await $useMyFetch(`/wishlist/${product.id}`, {
      method: "delete",
    });
    fetchFavorites();
  } else {
    const res: any = await $useMyFetch(`/wishlist`, {
      method: "post",
      body: {
        product_id: product.id,
      },
    });
    fetchFavorites();
  }
};

const addToCart = async (product: any) => {
  if (product.is_available) {
    isLoading.value = true;
    const cartItem: ICartItem = {
      product_id: product.id,
      qty: 1,
    };
    await cartStore.addToCart(cartItem);
    fetchFavorites();
    isLoading.value = false;
  } else {
    productId.value = product.id;
    notifyMe.value = true;
  }
};
await fetchFavorites();
useHead({
  title: "قوائم الأمنيات",
});
</script>
<template>
  <NotifyModal
    v-if="notifyMe"
    @close="notifyMe = false"
    :productId="productId"
  />
  <Card class="card-container shadow-3">
    <template #title>
      <h3>المفضلة</h3>
    </template>
    <template #content>
      <DataView
        :value="favorites"
        class="favorites-container"
        dataKey="favorites"
      >
        <template #list="slotProps">
          <div class="grid grid-nogutter">
            <div
              v-for="(item, index) in slotProps.items"
              :key="index"
              class="col-12"
            >
              <div
                class="md:px-0 md:py-4 px-1 py-3"
                :class="{ 'border-top-1 surface-border': index !== 0 }"
              >
                <div
                  class="card-row flex justify-content-between align-items-start w-full gap-3"
                >
                  <NuxtLink
                    :to="'/product/' + item.slug"
                    class="flex justify-content-start align-items-start gap-3 no-underline"
                  >
                    <img
                      class="border-round"
                      :src="item.featured_image"
                      width="100px"
                      height="100px"
                    />
                    <div class="flex flex-column product-inf gap-3">
                      <div
                        class="flex flex-column justify-content-between align-items-start flex-1 gap-2"
                      >
                        <p class="title">{{ item.title }}</p>
                        <div class="rating flex gap-2">
                          <Rating
                            :modelValue="item.rate"
                            readonly
                            :cancel="false"
                          />
                          <span>{{ item.rate }}</span>
                        </div>
                      </div>
                      <div
                        class="surface-overlay"
                        style="background-color: transparent !important"
                      >
                        <p class="price inline vertical-align-baseline">
                          {{
                            (item.sale_price != 0
                              ? item.sale_price
                              : item.price) +
                            " " +
                            store.currency
                          }}
                        </p>
                        <span
                          class="vertical-align-sub line-through mr-2"
                          v-if="item.sale_price != 0"
                          >{{ item.price }}</span
                        >
                      </div>
                    </div>
                  </NuxtLink>
                  <div
                    class="flex justify-content-end align-items-stretch gap-2 button-container"
                  >
                    <Button
                      icon="pi pi-heart-fill"
                      class="wishlisted"
                      @click="addOrRemove(item)"
                    />
                    <Button
                      :icon="
                        item.is_available ? 'pi pi-shopping-cart' : 'pi pi-bell'
                      "
                      :label="
                        item.is_available
                          ? 'أضف الي العربة'
                          : 'نبهني عند توفر المنتج'
                      "
                      :class="[
                        'add-to-cart',
                        item.is_available ? '' : 'notify-me',
                      ]"
                      style="direction: ltr;"
                      @click.prevent="addToCart(item)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </template>
  </Card>
</template>
<style scoped lang="scss">
@media (max-width: 768px) {
  .button-container {
    width: 100%;
  }
}
@media (max-width: 375px) {
  .favorites-container {
    img {
      width: 75px;
      height: 75px;
    }
  }
}
</style>
