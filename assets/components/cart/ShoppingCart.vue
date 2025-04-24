<script lang="ts">
export default defineComponent({
  name: "ShoppingCart",
  emits: ["handlePayment", "addCubon", "deleteItem"],
  props: {
    cartStore:{type:Object as any,required:true}
  },
  setup(props, { emit }) {
    //// 👉 Data
    const cubon = ref();
    const products = props.cartStore.cartProducts;
    const totals = props.cartStore.totals;
    const { $confirmDialog }: any = useNuxtApp();
    //// 👉  Methods
    const submit = () => {
      emit("handlePayment");
    };
    const addCubon = () => {
      emit("addCubon", cubon.value);
    };
    const deleteItem = (id: number) => {
      $confirmDialog({
        header: "حذف المنتج",
        message: "هل تريد حذف المنتج ؟ ",
        acceptLabel: "حذف المنتج",
        rejectLabel: "إلغاء",
        accept: () => {
          emit("deleteItem", id);
        },
      });
    };
    watchEffect(props.cartStore.getCartItems);
    return {
      submit,
      deleteItem,
      addCubon,
      cubon,
      products,
      totals
    };
  },
});
</script>
<template>
  <div
    class="shopping-cart-container flex lg:flex-row flex-column justify-content-between gap-6"
  >
    <div class="right-side-container flex-1">
      <DataTable :value="products" scrollable scrollHeight="400px">
        <Column field="title" header="">
          <template #body="slotProps">
            <div class="flex justify-content-start align-items-center gap-3">
              <img
                class="border-round"
                :src="slotProps.data.image"
                :alt="slotProps.data.title"
                width="80px"
                height="80px"
              />
              <p>{{ slotProps.data.title }}</p>
            </div>
          </template>
        </Column>
        <Column field="price" header="السعر"></Column>
        <Column field="quantity" header="الكمية"></Column>
        <Column field="total" header="الإجمالي"></Column>
        <Column header="">
          <template #body="slotProps">
            <span
              class="pi pi-trash cursor-pointer"
              style="color: red"
              @click.stop="deleteItem(slotProps.data.id)"
            ></span>
          </template>
        </Column>
      </DataTable>
      <div class="cubon-container flex gap-2 mt-3">
        <IconField iconPosition="right" class="flex-1">
          <InputIcon class="pi pi-ticket"> </InputIcon>
          <InputText
            v-model="cubon"
            placeholder="ادخل كود الخصم"
            class="w-full h-full"
          />
        </IconField>
        <Button
          class="green-btn w-auto"
          label="تفعيل الكوبون"
          @click="addCubon"
        />
      </div>
    </div>
    <div class="left-side-container flex-1">
      <Card>
        <template #title>
          <h3>ملخص الطلب</h3>
          <Divider />
        </template>
        <template #content>
          <div class="flex flex-column gap-2">
            <div
              class="price-inf-container"
              v-if="totals && totals.coupon_discount != 0"
            >
              <p>السعر قبل الخصم</p>
              <b>{{ totals.total }} <span>SAR</span></b>
            </div>
            <div class="price-inf-container">
              <p>الخصم</p>
              <b class="discount">
                {{ totals.coupon_discount }} <span>SAR</span></b
              >
            </div>
            <div class="price-inf-container">
              <p>السعر بعدالخصم</p>
              <b> {{ totals.total_after_discount }} <span>SAR</span></b>
            </div>
          </div>
        </template>
        <template #footer>
          <Divider />
          <div class="flex flex-column gap-4 mb-2">
            <div class="flex justify-content-between">
              <h3>الإجمالي</h3>
              <p>
                {{ totals.total_after_discount }}
                <span class="text-sm">SAR</span>
              </p>
            </div>
            <Button
              label="إتمام الشراء"
              class="green-btn"
              @click.stop="submit"
            />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>
<style
  lang="scss"
  src="@/assets/scss/components/cart/shopping-cart.scss"
  scoped
/>
