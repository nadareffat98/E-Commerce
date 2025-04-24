<script setup>
import SearchInputVue from "~/assets/components/UI/SearchInput.vue";
import CategoryMenuBar from "~/assets/components/category/CategoryMenuBar.vue";
import MenuList from "~/assets/components/MenuList.vue";

// 👉 Store
const globalStore = useGlobalStore();
const authStore = useAuthStore();
const cartStore = useCartStore();
// 👉 Data
const menuItems = ref([
  { label: "الرئيسية", route: "/" },
  { label: "الطلبات", route: "/account/orders" },
  { label: "تواصل معنا", route: "/page/contact_us" },
  { label: "عن كاردنت", route: `/page/كارد-نت` },
  {
    label: "انضم إلينا",
    target: "_blank",
    route: globalStore.joinUs.slug,
  },
]);
const menuItemsRes = [
  {
    label: "الأقسام ",
    route: "/category",
  },
  ...menuItems.value,
];
const componentsArray = ref([
  {
    name: "SearchInputVue",
    props: {},
  },
]);
const categories = await globalStore.categories.map((category) => ({
  id: category.id,
  label: category.name,
  image: category.icon,
  slug: category.slug,
  items: category.has_children
    ? category.children.map((child) => ({
        id: category.id,
        label: child.name,
        image: child.image,
        slug: child.slug,
      }))
    : null,
}));
const categoryList = ref([
  {
    label: "الأقسام",
    icon: "pi pi-th-large",
    root: true,
    items: [...categories],
  },
]);
// 👉 Computed
const isLogged = computed(() => authStore.isLogged);
</script>
<template>
  <div class="header-container py-3">
    <Menubar :model="componentsArray" class="top-nav px-0 pt-0 pb-3">
      <template #start>
        <NuxtLink to="/">
          <Image
            alt="cardnet logo"
            :src="globalStore.store.store_logo"
            width="110"
            height="55"
            class="header-logo"
          ></Image>
        </NuxtLink>
      </template>
      <template #item>
        <!----------------  Desktop ------------------->
        <SearchInputVue />
        <!----------- responsive  --------------------->
        <MenuList :menuList="menuItemsRes" />
      </template>
      <template #end>
        <NuxtLink to="/account" class="header-icons">
          <i class="pi pi-user icon" />
        </NuxtLink>
        <NuxtLink
          to="/account/notifications"
          class="header-icons"
          v-if="isLogged"
        >
          <i class="pi pi-bell icon" />
        </NuxtLink>
        <NuxtLink to="/cart" class="header-icons">
          <i class="pi pi-shopping-cart icon" v-if="cartStore.isEmpty" />
          <i v-badge.danger class="pi pi-shopping-cart icon" v-else />
        </NuxtLink>
        <Button label="اشتراك" class="sub-button mr-2" />
        <Button
          label="English"
          severity="secondary"
          text
          class="lang-btn mr-2 px-0"
        />
      </template>
    </Menubar>
    <div class="bottom-nav flex align-items-center justify-content-between">
      <!----------- responsive  --------------------->
      <SearchInputVue />
      <!----------------  Desktop ------------------->
      <CategoryMenuBar :categoriesList="categoryList" />
      <MenuList :menuList="menuItems" />
    </div>
  </div>
</template>
<style lang="scss" src="@/assets/scss/components/header.scss" scoped />
