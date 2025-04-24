<template>
  <div
    class="flex flex-column justify-content-center align-items-center gap-3 my-7"
  >
    <img src="/imgs/empty-cart.png" width="350" />
    <p class="sm:text-xl text-base font-bold">عربة التسوق خاصتك فارغة</p>
    <span class="sm:text-lg text-sm"
      >قم بالعودة لصفحة المنتحات و اضافة منتجات للعربة لإتمام الشراء</span
    >
    <NuxtLink to="/">
      <Button label="العودة للصفحة الرئيسية" class="green-btn mt-3" />
    </NuxtLink>
  </div>
</template>
<style scoped lang="scss">
a .p-button:hover {
  background: var(--main-color);
}
p,
span {
  color: $title-color;
}
@media (max-width: 575px) {
  img {
    width: 240px;
  }
}
</style>
