<template>
  <NuxtLayout>
    <div
      class="flex flex-column justify-content-center align-items-center gap-2 my-7"
    >
      <img src="/imgs/Error.png" width="350" />
      <p class="sm:text-xl text-base font-bold">الصفحة غير موجودة</p>
      <span class="sm:text-lg text-sm"
        >عذرًا ، يبدو أن الصفحة غير موجودة أو تم حذفها من الموقع</span
      >
      <NuxtLink to="/">
        <Button label="العودة للصفحة الرئيسية" class="green-btn mt-3" />
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>
<style scoped lang="scss">
a .p-button:hover {
  background: var(--main-color);
}
p,
span {
  color: $font-color;
}
@media (max-width: 575px) {
  img {
    width: 240px;
  }
}
</style>
