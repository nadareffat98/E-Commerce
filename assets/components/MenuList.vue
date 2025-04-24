<script setup>
const props = defineProps({
  menuList: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <div class="menu-container">
    <NuxtLink
      v-for="menuItem in menuList"
      :to="menuItem.route"
      :key="menuItem.label"
      :target="menuItem.target || '_self'"
    >
      <Button :label="menuItem.label" text />
    </NuxtLink>
  </div>
</template>
<style lang="scss" src="@/assets/scss/components/menuList.scss" scoped />
