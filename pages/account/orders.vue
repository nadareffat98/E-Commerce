<script lang="ts" setup>
//👉 Data
const orders = ref();
const ordersRes: any = await $useMyFetch(`/order`);
orders.value = ordersRes.data.value.data;

//👉 Methods
const badgeColor = (status: string): string => {
  if (status == "initial") return "info";
  else if (status == "inProgress" || status == "pending") return "warning";
  else if (status == "completed" || status == "ready") return "success";
  else return "danger";
};
useHead({
  title: "الطلبات",
});
</script>
<template>
  <Card class="card-container shadow-3">
    <template #title>
      <h3>طلباتي</h3>
    </template>
    <template #content>
      <DataView :value="orders" class="orders-container" dataKey="orders">
        <template #list="slotProps">
          <div class="grid grid-nogutter">
            <div
              v-for="(item, index) in slotProps.items"
              :key="index"
              class="col-12"
            >
              <div
                class="sm:px-0 sm:py-4 px-1 py-3"
                :class="{ 'border-top-1 surface-border': index !== 0 }"
              >
                <div
                  class="card-row flex gap-3 justify-content-between align-items-start w-full"
                >
                  <div
                    class="flex flex-column justify-content-start align-items-start gap-2 order-inf"
                  >
                    <p>
                      رقم الطلب:<span>{{ item.order_number }}</span>
                      <Badge
                        :value="item.order_status"
                        :severity="badgeColor(item.order_status_code)"
                      ></Badge>
                    </p>
                    <p>
                      التاريخ:<span>{{ item.created_at }}</span>
                    </p>
                    <p>
                      الإجمالي: <span>{{ item.total }} SAR</span>
                    </p>
                  </div>
                  <NuxtLink :to="'/order/' + item.id" class="btn-link">
                    <Button label="عرض التفاصيل" class="green-btn"></Button>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </template>
  </Card>
</template>
<style
  lang="scss"
  src="@/assets/scss/components/profile/profile-orders.scss"
  scoped
/>
