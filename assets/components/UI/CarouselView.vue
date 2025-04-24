<template>
  <!-- <Carousel
      :value="items"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
      :numVisible="numOfItems"
      :showIndicators="false"
      :autoplayInterval="typeCarsoul == 'category' ? 3000 : 0"
      indicatorsContentClass="custom-indicators"
      :draggable="true"
      :class="
        typeCarsoul == 'category' ? 'category-carousel' : 'product-carousel'
      "
    >
      <template #item="slotProps" v-if="typeCarsoul == 'category'">
        <NuxtLink
          class="flex flex-column justify-content-start align-items-center gap-2 no-underline category-container"
          :to="'/category/' + slotProps.data.slug"
        >
          <img
            :src="slotProps.data.image"
            :alt="slotProps.data.name"
            width="60px"
            height="60px"
            style="border-radius: 6px"
          />
          <span>{{ slotProps.data.name }}</span>
        </NuxtLink>
      </template>
      <template #item="slotProps" v-else>
        <ProductView
          :product="slotProps.data"
          @update="
            $emit('updateProduct', {
              updatedProduct: $event,
              productId: slotProps.data.id,
            })
          "
        />
      </template> -->
  <!-- <template #nexticon v-if="typeCarsoul != 'category'">
        <i class="pi pi-arrow-right"></i>
      </template>
      <template #previousicon v-if="typeCarsoul != 'category'">
        <i class="pi pi-arrow-left"></i>
      </template> -->
  <!-- </Carousel> -->
</template>
