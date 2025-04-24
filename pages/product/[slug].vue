<script lang="ts" setup>
import ProductReviews from "@/assets/components/product/ProductReviews.vue";
import NotifyModal from "@/assets/components/UI/NotifyModal.vue";
import type { ICartItem } from "@/types/cartData.d";
import SectionView from "@/assets/components/UI/SectionView.vue";
import ProductView from "@/assets/components/product/ProductView.vue";
import SwiperView from "@/assets/components/UI/SwiperView.vue";

// 👉 Data
const route = useRoute();
const productSlug = route.params.slug;
const { $lastRoute }: any = useNuxtApp();
const cartStore = useCartStore();
const productStore = useProductStore();
const userStore = useAuthStore();
const product = ref<any>();
const variantId = ref();
const optionsArrays = ref<any>();
const selectedValues = ref<any>();
const optionsLength = ref<number>();
const relatedProducts = ref<any[]>([]);
const quantity = ref<number>(0);
const isLoading = useLoadingState();
const notifyMe = ref(false);
const thumbsSwiper = ref();
const responsiveProductOptions = ref({
  375: { slidesPerView: 2, spaceBetween: 10 },
  768: { slidesPerView: 3, spaceBetween: 20 },
  1200: { slidesPerView: 4, spaceBetween: 40 },
});
const responsiveThumbnailOptions = ref({
  0: {
    direction: "horizontal",
    slidesPerView:3,
    spaceBetween:16,
  },
  769: {
    direction: "vertical",
  },
});

////  👉 methods
// get single product
const fetchProduct = async () => {
  product.value = await productStore.fetchSingleProduct(productSlug as string);
  if (product.value && product.value.attributes) {
    optionsArrays.value = product.value.attributes;
    selectedValues.value = optionsArrays.value.map(() => null);
    optionsLength.value = optionsArrays.value.length;
  }
  if (product.value?.id) {
    fetchRelatedProducts();
  }
};
// get related product
const fetchRelatedProducts = async () => {
  const relatedProductRes: any = await $useMyFetch(
    `/related_products/${product.value?.id}`
  );
  relatedProducts.value = relatedProductRes.data.value.data;
};
await fetchProduct();
// get rating
const getRating = (rate: string) => {
  return Math.round(Number(rate));
};
const getDiscount = (price: any, priceAfterDiscount: any) => {
  return `${Math.round((price - priceAfterDiscount) / (price / 100))} %`;
};
const descreaseQty = () => {
  if (quantity.value == 0) quantity.value = 0;
  else quantity.value -= 1;
};
const increaseQty = (product: any) => {
  if (quantity.value == product.quantity) quantity.value = product.quantity;
  else quantity.value++;
};
// add to or remove from wishlist
const addOrRemove = async (product: any) => {
  isLoading.value = true;
  if (product.is_wishlisted) {
    const res: any = await $useMyFetch(`/wishlist/${product.id}`, {
      method: "delete",
    });
    await fetchProduct();
    isLoading.value = false;
  } else {
    const res: any = await $useMyFetch(`/wishlist`, {
      method: "post",
      body: {
        product_id: product.id,
      },
    });
    await fetchProduct();
    isLoading.value = false;
  }
};
// get variations info of product
const getVariationsInfo = async () => {
  isLoading.value = true;
  const selectedIds = selectedValues.value.map((item: any) => item.id);
  const res: any = await $useMyFetch(
    `/product/${product.value.id}/get-variations-info`,
    {
      method: "post",
      body: {
        options: selectedIds,
      },
    }
  );
  product.value.price = res.data.value.data.price;
  product.value.sale_price = res.data.value.data.sale_price;
  product.value.quantity = res.data.value.data.quantity;
  variantId.value = res.data.value.data.id;
  isLoading.value = false;
};

// add to cart
const addToCart = async (product: any) => {
  if (product.is_available) {
    const cartItem: ICartItem = {
      product_id: product.id,
      qty: quantity.value,
    };

    if (variantId.value !== null) {
      cartItem.variantId = variantId.value;
    }
    cartStore.addToCart(cartItem);
  } else {
    notifyMe.value = true;
  }
};

// update product
const updateProduct = (event: any) => {
  var productIndex = relatedProducts.value?.findIndex(
    (p: any) => p.id === event.productId
  );
  if (productIndex !== -1) {
    relatedProducts.value[productIndex] = event.updatedProduct;
  }
};

////  👉 watch
watch(selectedValues, (newValues) => {
  if (
    newValues.length != 0 &&
    newValues.every((value: any) => value !== null)
  ) {
    getVariationsInfo();
  }
});
////  👉 computed
const breadcrumbItems = computed(() => {
  if ($lastRoute.value.name == "index" || $lastRoute.value.path == route.path) {
    return [
      { label: "الرئيسية", route: "/" },
      { label: product.value.title, route: route.path },
    ];
  } else return [{ label: product.value.title, route: "/" }];
});

const onThumbsSwiper = (swiperInstance: any) => {
  thumbsSwiper.value = swiperInstance;
};
////  👉 head
useHead({
  title: product.value.title,
  meta: [
    { name: "title", content: product.value.title },
    { name: "description", content: product.value.description },
    { name: "keywords", content: product.value.meta.keywords },
    { property: "og:title", content: product.value.title },
    { property: "og:description", content: product.value.description },
    { property: "og:image", content: product.value.featured_image },
  ],
});
</script>

<template>
  <NotifyModal
    v-if="notifyMe"
    @close="notifyMe = false"
    :productId="product.id"
  />
  <div class="single-product-container md:pt-6 pt-0">
    <Breadcrumb :model="breadcrumbItems" class="mb-5">
      <template #item="{ item }">
        <NuxtLink :to="item.route" class="no-underline">{{
          item.label
        }}</NuxtLink>
      </template>
      <template #separator>
        <i class="pi pi-angle-left"></i>
      </template>
    </Breadcrumb>
    <div class="product-inf-container flex align-items-start gap-4 mb-8 w-full">
      <!-- -----------------Product Images ------------------------->
      <div class="product-img flex gap-4 w-6">
        <div class="thumbs-container" v-if="product.images.length > 0">
          <!-- Thumbs Swiper -->
          <SwiperView
            :items="product.images"
            swiper-type="vertical"
            :slides-per-view="3.5"
            :space-between="16"
            :breakpoints="responsiveThumbnailOptions"
            class="thumbnail-swiper"
            @swiper="onThumbsSwiper"
            :watch-overflow="true"
          >
            <template #default="{ item, index }">
              <img
                :src="item"
                :alt="`Thumb ${index}`"
                width="100%"
                height="100%"
              />
            </template>
          </SwiperView>
        </div>
        <div
          class="main-swiper-container"
          :style="product.images.length > 0 ? 'width: 75%' : 'width: 100%'"
        >
          <SwiperView
            :items="product.images"
            :swiper-type="null"
            :thumbs="{ swiper: thumbsSwiper }"
            :slides-per-view="1"
            :space-between="10"
            class="main-swiper"
            :watch-overflow="true"
          >
            <template #default="{ item, index }">
              <img
                :src="item"
                :alt="`Slide ${index}`"
                width="100%"
                height="100%"
              />
            </template>
          </SwiperView>
        </div>
      </div>
      <!------------------------------ Product Inf -------------------->
      <div class="product-desc flex flex-column gap-3 w-6">
        <div
          class="title-container flex justify-content-between align-items-start"
        >
          <div>
            <span style="color: #3575dd" class="font-bold category-title">{{
              product.categories[0]
            }}</span>
            <p>{{ product.title }}</p>
          </div>
          <Button
            v-if="userStore.isLogged"
            :icon="product.is_wishlisted ? 'pi pi-heart-fill' : 'pi pi-heart'"
            class="wishlisted"
            @click="addOrRemove(product)"
          />
        </div>
        <div class="rating flex gap-2">
          <Rating
            :modelValue="getRating(product.rate)"
            readonly
            :cancel="false"
          />
          <span>{{ product.rate }}</span>
        </div>
        <div class="category-res-title flex flex-column">
          <div class="flex gap-1">
            <label>التصنيف :</label>
            <p class="text-sm font-normal">{{ product.categories[0] }}</p>
          </div>
          <!-- <div class="flex gap-1">
            <label> أبعاد الشحنة: </label>
            <p class="text-sm	font-normal">{{ product.dimensions }}</p>
          </div> -->
        </div>
        <div
          class="attributes-container flex flex-column justify-content-start align-items-start gap-3"
          v-if="product && product.attributes.length != 0"
        >
          <div v-for="(option, index) in optionsArrays" :key="index">
            <label>{{ option.name }} :</label>
            <SelectButton
              v-model="selectedValues[index]"
              :options="option.options"
              optionLabel="name"
              :aria-labelledby="`select-button-${index}`"
            />
          </div>
        </div>
        <div class="price-container flex flex-column">
          <span
            v-if="product.sale_price != 0"
            class="vertical-align-sub line-through normal-font-14"
            >{{ product.sale_price }}</span
          >

          <p class="price inline vertical-align-baseline">
            {{ product.price }} س.ر
            <Tag
              class="mr-2"
              :value="getDiscount(product.price, product.sale_price)"
              v-if="product.sale_price != 0 && product.sale_price != null"
            />
          </p>
        </div>
        <div class="quantity-container">
          <label v-if="product.is_available"> كمية : </label>
          <div class="btn-qty-container flex gap-2 mt-2">
            <InputGroup
              style="direction: ltr; width: 35%"
              class="sm:flex-none flex-1"
              v-if="product.is_available"
            >
              <Button icon="pi pi-plus" @click="increaseQty(product)" />
              <InputNumber
                v-model="quantity"
                :min="0"
                :max="product.quantity"
              />
              <Button icon="pi pi-minus" @click="descreaseQty" />
            </InputGroup>
            <Button
              :icon="
                product.is_available ? 'pi pi-shopping-cart' : 'pi pi-bell'
              "
              :label="
                product.is_available
                  ? 'أضف الي العربة'
                  : 'نبهني عند توفر المنتج'
              "
              :class="[
                'add-to-cart w-auto sm:flex-none flex-1',
                product.is_available ? '' : 'notify-me',
              ]"
              style="direction: ltr"
              @click="addToCart(product)"
            />
          </div>
        </div>
        <div class="shipping-way">
          <p>طريقة الشحن: #رقم البطاقة*155* ,ثم إتصال</p>
        </div>
        <div class="rules">
          <p>غير مسموح بارجاع او استبدال تلك البطاقة</p>
          <p>السعر شامل الضريبة</p>
        </div>
      </div>
    </div>
    <div class="product-tabs mb-8">
      <TabView aria-orientation="left">
        <TabPanel header="الوصف">
          <template v-if="product.description">
            <p v-html="product.description"></p>
          </template>
          <template v-else>
            <p>لا يوجد وصف</p>
          </template>
        </TabPanel>
        <TabPanel header="التقييمات">
          <template v-if="product.reviews.length != 0">
            <ProductReviews :reviews="product.reviews" />
          </template>
          <template v-else>
            <p>لا يوجد تقييمات</p>
          </template>
        </TabPanel>
      </TabView>
    </div>
    <!---------------------------------- Related Products  ----------------------------->
    <div class="related-products-container" v-if="relatedProducts.length != 0">
      <SectionView
        title="منتجات مشابهه"
        sectionId="related-products"
        typeSwiper="product"
        class="product-swiper"
        :route="null"
        :breakpoints="responsiveProductOptions"
        :slides-per-view="1.8"
        :items="relatedProducts"
      >
        <template #default="{ item }">
          <ProductView
            :product="item"
            @update="
              updateProduct({
                updatedProduct: $event,
                productId: item.id,
              })
            "
          />
        </template>
      </SectionView>
    </div>
  </div>
</template>
<style
  lang="scss"
  src="@/assets/scss/components/products/single-product.scss"
  scoped
/>
