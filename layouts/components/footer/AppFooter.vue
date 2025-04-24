<script setup lang="ts">
const store = useGlobalStore();
const socialMedia = store.socialMedia;
const pages = store.pages;
const joinUs:any = await $useMyFetch("page/25", {
  baseURL: "https://cardnet.sa/api/v3/",
});
const paymentImgs = [
  { label: "Mada", width: "45", height: "18" },
  { label: "apple", width: "20", height: "18" },
  { label: "Tabby", width: "50", height: "20" },
  { label: "Mastercard", width: "35", height: "20" },
  { label: "Visa", width: "35", height: "15" },
  { label: "Tamara", width: "80", height: "20" },
];
const getUrl = (social: string) => {
  const url = socialMedia.find((obj) => obj.key == social);
  if (social == "snapchat") return `https://snapchat.com/add/${url.value}`;
  else return url.value;
};
</script>
<template>
  <footer class="footer-container">
    <Divider />
    <div
      class="inf-footer-container flex justify-content-start align-items-start py-5"
    >
      <div
        class="right-side flex flex-column align-items-start justify-content-start gap-3"
      >
        <NuxtLink to="/">
          <Image
            alt="cardnet logo"
            :src="store.store.store_logo"
            width="110"
            height="55"
          ></Image>
        </NuxtLink>
        <p class="normal-font-14">
          موقع كارد نت، جزء من شركة ظلال الياسمين للتجارة، يوفر مجموعة واسعة من
          البطاقات الإلكترونية، وهو علامة تجارية مسجلة برقم 1439018301 وسجل
          تجاري برقم 4030249300.
        </p>
        <div class="links-container flex w-full flex-wrap">
          <NuxtLink to="/">
            <Button label="الرئيسية" text />
          </NuxtLink>
          <NuxtLink
            v-for="page in pages"
            :to="{
              name: 'page-slug',
              params: {
                slug: page.slug,
              },
            }"
            :key="page.id"
          >
            <Button :label="page.title" text />
          </NuxtLink>
          <NuxtLink :to="joinUs.data.value.data.slug" target="_blank">
            <Button label="انضم إلينا" text />
          </NuxtLink>
        </div>
      </div>
      <div class="left-side" style="flex: 1">
        <div class="flex justify-content-end gap-2 sm:gap-3 mb-5">
          <InputText type="text" placeholder="اشترك في القائمه البريدية" class="sub-input"/>
          <Button label="اشتراك" class="sub-button" />
        </div>
        <div class="stores-img flex flex-column align-items-end gap-3">
          <NuxtLink
            to="https://play.google.com/store/apps/details?id=sa.hl.cardnet"
            target="_blank"
          >
            <Image
              alt="google play"
              src="/imgs/GooglePlay.png"
              width="150"
              height="45"
            ></Image>
          </NuxtLink>
          <NuxtLink
            to="https://apps.apple.com/eg/app/%D9%83%D8%A7%D8%B1%D8%AF-%D9%86%D8%AA/id1439298607"
            target="_blank"
          >
            <Image
              alt="app store"
              src="/imgs/AppStore.png"
              width="150"
              height="45"
            ></Image>
          </NuxtLink>
        </div>
      </div>
    </div>
    <Divider />
    <div class="social-media-container flex justify-content-between py-4">
      <p class="normal-font-14" style="color: var(--second-color);">جميع الحقوق محفوظه لموقع كارد نت © 2021</p>
      <div class="social-icons flex gap-5">
        <NuxtLink :to="getUrl('whatsapp')" target="_blank">
          <i class="pi pi-whatsapp"></i>
        </NuxtLink>
        <NuxtLink :to="getUrl('instagram')" target="_blank">
          <i class="pi pi-instagram"></i>
        </NuxtLink>
        <ClientOnly>
          <NuxtLink :to="getUrl('snapchat')" target="_blank">
            <FontAwesomeIcon
              :icon="['fab', 'square-snapchat']"
              style="font-size: 1.25rem"
            />
          </NuxtLink>
          <NuxtLink :to="getUrl('twitter')" target="_blank">
            <FontAwesomeIcon :icon="['fab', 'twitter']" />
          </NuxtLink>
          <NuxtLink :to="getUrl('facebook')" target="_blank">
            <FontAwesomeIcon :icon="['fab', 'facebook-f']" />
          </NuxtLink>
        </ClientOnly>
      </div>
    </div>
    <div class="payment-container flex justify-content-between px-8 py-3">
      <span class="text-white normal-font-14 flex align-items-end"
        >© 2024 ، تم بواسطة حل</span
      >
      <div class="payment-methods flex flex-wrap gap-2 justify-content-center">
        <Image
          v-for="img in paymentImgs"
          :alt="img.label"
          :src="`/imgs/${img.label}.png`"
          :key="img.label"
          :width="img.width"
          :height="img.height"
          class="flex align-items-center"
        ></Image>
      </div>
    </div>
  </footer>
</template>
<style lang="scss" src="@/assets/scss/components/footer.scss" scoped />
