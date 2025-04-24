<script lang="ts">
export default defineComponent({
  name: "AccountMenu",
  setup() {
    //  👉 Data
    const authStore = useAuthStore();
    const { $confirmDialog }: any = useNuxtApp();
    // const user = authStore.user;
    const links = [
      { label: "بيانات حسابي", icon: "fi-rr-user", route: "/account" },
      { label: "طلباتي", icon: "fi-rr-list", route: "/account/orders" },
      {
        label: "عناويني",
        icon: "fi-rr-home-location",
        route: "/account/address",
      },
      { label: "المفضلة", icon: "fi-rr-heart", route: "/account/wishlist" },
      {
        label: "التنبيهات",
        icon: "fi-rr-bell",
        route: "/account/notifications",
      },
      {
        label: "رأيك بالمتجر",
        icon: "fi-rr-document-signed",
        route: "/account/testimonials",
      },
    ];

    //  👉 Computed
    // const getName = computed(() => {
    //   return user.name
    //     .split(" ")
    //     .map(
    //       (word: any) =>
    //         word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    //     )
    //     .join(" ");
    // });
    //  👉 Methods
    const logout = () => {
      $confirmDialog({
        header: "تسجيل الخروج",
        message:
          " هل أنت متأكد أنك تريد تسجيل الخروج؟ بتسجيل الخروج، لن تتمكن من الوصول إلى حسابك مرة أخرى إلا من خلال إعادة تسجيل الدخول ",
        acceptLabel: "تسجيل الخروج",
        rejectLabel: "إلغاء",
        accept: () => {
          authStore.logout();
        },
      });
    };
    return {
      // user,
      links,
      // getName,
      logout,
    };
  },
});
</script>
<template>
  <div
    class="profile-menu-container flex lg:flex-column flex-column-reverse justify-content-start lg:align-items-start align-items-center lg:gap-5 gap-4 w-full"
  >
    <!-- <div class="flex flex-column lg:align-items-start align-items-center gap-2">
      <Avatar :image="user.photo" shape="circle" />
      <h3 class="profile-name">{{ getName }}</h3>
    </div> -->
    <div
      class="scroll-container flex lg:flex-column justify-content-start align-items-start w-full gap-2"
    >
      <NuxtLink
        v-for="link in links"
        :key="link.label"
        :to="link.route"
        class="no-underline flex lg:justify-content-start align-items-center justify-content-center gap-2"
      >
        <div
          class="svg-icon"
          :style="{ '--icon-url': `url(/imgs/profile/${link.icon}.svg)` }"
        ></div>
        <span>{{ link.label }}</span>
      </NuxtLink>
      <NuxtLink
        class="no-underline flex lg:justify-content-start align-items-center justify-content-center gap-2"
        @click="logout"
      >
        <div
          class="svg-icon"
          style="--icon-url: url(/imgs/profile/fi-rr-sign-out.svg)"
        ></div>
        <span> تسجيل الخروج </span>
      </NuxtLink>
    </div>
  </div>
</template>
<style
  lang="scss"
  src="@/assets/scss/components/profile/profile-menu.scss"
  scoped
/>
