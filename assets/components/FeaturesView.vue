<script lang="ts">
export default defineComponent({
  name: "FeaturesView",
  setup() {
    const features = ref([
      { label: "سرعة في الشحن", desc: "تتلقى شحنتك سريعا", img: "shipping" },
      { label: "طرق دفع آمنه", desc: "آمنه 100%", img: "payment" },
      {
        label: "مرونة في الدفع",
        desc: "بطاقة الدفع, نقدي أو تحويل بنكي",
        img: "flexible",
      },
      { label: "دعم فني", desc: "24/7 في خدمتك", img: "support" },
    ]);
    return {
      features,
    };
  },
});
</script>
<template>
  <div class="md:pt-8 pt-5">
    <div class="features-list flex flex-wrap justify-content-between">
      <div
        v-for="(feature, index) in features"
        :key="feature.label"
        class="feature-container flex"
        :style="
          index != features.length - 1 ? 'border-left: 1px solid #d1d1d1' : ''
        "
      >
        <div
          class="individual-feature flex align-items-start  gap-3"
        >
          <img :src="`/imgs/${feature.img}.png`" width="40px" height="40px" />
          <div class="feature-content flex flex-column gap-2">
            <p>{{ feature.label }}</p>
            <span>{{ feature.desc }}</span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="features-inf flex flex-column justify-content-center align-items-center gap-4 pb-0 pt-6 md:mt-8 mt-5"
    >
      <p>حمل تطبيقنا و استفد من المزايا</p>
      <span class="text-center"
        >حمل تطبيقنا و استفد من مزايانا و احصل على اشعارات بأحدث بأحدث العروض و
        كل ما تحتاجه</span
      >
      <div class="flex gap-4">
        <NuxtLink
          to="https://play.google.com/store/apps/details?id=sa.hl.cardnet"
          target="_blank"
        >
          <Image
            alt="google play"
            src="/imgs/GooglePlay.png"
            width="150"
            height="45"
            class="stores-img"
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
            class="stores-img"
          ></Image>
        </NuxtLink>
      </div>
      <Image class="mobile-img" src="/imgs/mobile.png"></Image>
    </div>
  </div>
</template>
<style lang="scss" src="@/assets/scss/components/features.scss" scoped />
