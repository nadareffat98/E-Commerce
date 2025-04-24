<script lang="ts">
export default defineComponent({
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  name: "OrderView",
  setup() {
    //👉 Methods
    const badgeColor = (status: string): string => {
      if (status == "initial") return "info";
      else if (status == "inProgress" || status == "pending") return "warning";
      else if (status == "completed" || status == "ready") return "success";
      else return "danger";
    };
    return {
      badgeColor,
    };
  },
});
</script>
<template>
  <Card class="card-inf-container mx-auto w-8 my-4">
    <template #content>
      <div class="flex flex-column gap-3">
        <p>
          رقم الطلب :<span>{{ order.order_number }}</span>
        </p>
        <p>
          التاريخ :<span>{{ order.created_at }}</span>
        </p>
        <p>
          الإجمالي :<span>{{ order.total }} SAR</span>
        </p>
        <p>
          الحالة :
          <span>
            <Badge
              :value="order.order_status"
              :severity="badgeColor(order.order_status_code)"
            ></Badge>
          </span>
        </p>
        <div class="flex flex-column">
          <p>المنتجات :</p>
          <DataView
            :value="order.products"
            class="favorites-container"
            dataKey="products"
          >
            <template #list="slotProps">
              <div class="grid grid-nogutter">
                <div
                  v-for="(item, index) in slotProps.items"
                  :key="index"
                  class="col-12"
                >
                  <div class="md:p-2 px-1 py-3">
                    <div
                      class="flex md:flex-row flex-column justify-content-between align-items-center w-full gap-3"
                    >
                      <img
                        class="border-round"
                        :src="item.image"
                        width="60px"
                        height="60px"
                      />
                      <div class="flex flex-1">
                        <p class="flex-wrap font-medium text-lg">
                          {{ item.name }}
                          <span class="qty-container">
                            x {{ item.quantity }}</span
                          >
                        </p>
                      </div>
                      <div
                        class="flex flex-column justify-content-between gap-2"
                      >
                        <p>
                          سعر القطعه : <span>{{ item.product_price }} SAR</span>
                        </p>
                        <p>
                          السعر الكلي : <span>{{ item.total }} SAR </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </DataView>
        </div>
        <h4>ملخص الدفع :</h4>
        <div class="flex flex-column gap-3 px-2">
          <div
            v-for="total in order.totals"
            :key="total.id"
            class="w-full flex justify-content-between"
          >
            <p>
              {{ total.title }}
              {{ total.code == "shipping_method" ? "(" + total.key + ")" : "" }}
            </p>
            <span :style="{ color: total.code == 'coupon_discount' ? 'red' : '' }">{{ total.value }} SAR</span>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
