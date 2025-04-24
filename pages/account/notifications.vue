<script lang="ts" setup>
const notifications = ref();
const notificationsRes: any = await $useMyFetch("/notifications");
notifications.value = notificationsRes.data.value.data;

const getLink = (item: any) => {
  if (item.entity == "orders") return "/order/" + item.item_id;
};
useHead({
  title: "الإشعارات",
});
</script>
<template>
  <Card class="card-container shadow-3">
    <template #title>
      <h3>التنبيهات</h3>
    </template>
    <template #content>
      <DataView
        :value="notifications"
        class="notifications-container"
        dataKey="notifications"
      >
        <template #list="slotProps">
          <div class="grid grid-nogutter">
            <div
              v-for="(item, index) in slotProps.items"
              :key="index"
              class="col-12"
            >
              <NuxtLink :to="getLink(item)" class="no-underline">
                <div
                  class="sm:px-0 sm:py-4 px-1 py-3"
                  :class="{ 'border-top-1 surface-border': index !== 0 }"
                >
                  <div
                    class="flex justify-content-between align-items-start w-full gap-3"
                  >
                    <div>
                      <img
                        src="/assets/icons/notification.png"
                        width="60px"
                        height="60px"
                      />
                    </div>
                    <div
                      class="flex flex-column align-items-start flex-1 gap-2"
                    >
                      <div
                        class="flex sm:flex-row flex-column sm:gap-0 gap-2 justify-content-between align-items-start w-full"
                      >
                        <p class="font-bold sm:text-lg text-sm">
                          {{ item.entity }}
                        </p>
                        <span
                          style="color: #878787"
                          class="sm:text-base text-sm"
                          >{{ item.created_at }}</span
                        >
                      </div>
                      <p class="sm:text-sm text-xs">{{ item.message }}</p>
                    </div>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </template>
      </DataView>
    </template>
  </Card>
</template>
<style scoped lang="scss">
@media (max-width: 375px) {
  .notifications-container {
    img {
      width: 35px;
      height: 35px;
    }
  }
}
</style>
