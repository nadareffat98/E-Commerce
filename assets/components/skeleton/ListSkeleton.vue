<script lang="ts">
export default defineComponent({ name: "ListSkeleton" });
</script>
<template>
  <div v-for="i in 3" :key="i" class="col-12">
    <div
      class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4"
      :class="{ 'border-top-1 surface-border': i !== 0 }"
    >
      <Skeleton
        class="w-9 sm:w-16rem xl:w-10rem h-6rem block xl:block mx-auto border-round"
      />
      <div
        class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
      >
        <div
          class="flex flex-column align-items-center sm:align-items-start gap-3"
        >
          <Skeleton class="w-8rem border-round h-2rem" />
          <Skeleton class="w-6rem border-round h-1rem" />
          <div class="flex align-items-center gap-3">
            <Skeleton class="w-6rem border-round h-1rem" />
            <Skeleton class="w-3rem border-round h-1rem" />
          </div>
        </div>
        <div
          class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2"
        >
          <Skeleton class="w-4rem border-round h-2rem" />
          <Skeleton shape="circle" class="w-3rem h-3rem" />
        </div>
      </div>
    </div>
  </div>
</template>
