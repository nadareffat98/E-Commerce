<script setup lang="ts">
const props = defineProps({
  categoriesList: {
    type: Array as any,
    required: true,
  },
});
const categoryMenu = ref();
</script>
<template>
  <div class="categories-menu-container">
    <Menubar class="category-menu" :model="categoriesList" ref="categoryMenu">
      <template #item="{ item, props, hasSubmenu }">
        <div class="root-item" v-if="item.root" style="cursor: pointer">
          <i :class="item.icon"></i>
          <span class="mr-2">{{ item.label }}</span>
        </div>
        <NuxtLink
          class="flex align-items-center justify-content-between"
          v-bind="props.action"
          :to="`/category/${item.slug}`"
          v-else
        >
          <div class="flex align-items-center">
            <Avatar :image="item.image"></Avatar>
            <span class="mr-2">{{ item.label }}</span>
          </div>
          <i v-if="hasSubmenu" class="pi pi-angle-left mr-2"></i>
        </NuxtLink>
      </template>
    </Menubar>
  </div>
</template>
<style lang="scss" src="@/assets/scss/components/categoriesList.scss" scoped />
