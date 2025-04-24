<script lang="ts" setup>
import AddressModal from "@/assets/components/UI/AddressModal.vue";
import ListSkeleton from "@/assets/components/skeleton/ListSkeleton.vue";
//👉 Data
const addresses = ref();
const { $confirmDialog }: any = useNuxtApp();
const openAddressModal = ref(false);
const addressId = ref(-1);
const address = ref();
//👉 Methods
const getAllAdress = async () => {
  const addressesRes: any = await $useMyFetch(`/address`);
  addresses.value = addressesRes.data.value.data;
};
const deleteAddress = (id: number) => {
  $confirmDialog({
    header: "حذف العنوان",
    message:
      " هل أنت متأكد أنك تريد حذف العنوان؟ عند حذف ذلك العنوان لن تتمكن من طلب اي طلبات جيدة على ذلك العنوان مرة اخرى ",
    acceptLabel: "حذف العنوان",
    rejectLabel: "إلغاء",
    accept: async () => {
      await $useMyFetch(`/address/${id}`, {
        method: "delete",
      });
      getAllAdress();
    },
  });
};
const editAddress = (item: any) => {
  addressId.value = item.id;
  address.value = item;
  address.value.city_id = Number(item.city_id);
  openAddressModal.value = true;
};
const createAddress = () => {
  addressId.value = -1;
  address.value = {
    title: "",
    city_id: 0,
    address: "",
    postal_code: "",
    country_id: 0,
  };
  openAddressModal.value = true;
};
await getAllAdress();
useHead({
  title: "عناوين الشحن",
});
</script>
<template>
  <AddressModal
    v-if="openAddressModal"
    @close="openAddressModal = false"
    @getAllAdress="getAllAdress"
    :addressId="addressId"
    :address="address"
  />
  <Card class="card-container shadow-3">
    <template #title>
      <div class="flex justify-content-between">
        <h3>عناويني</h3>
        <Button
          label="اضافة عنوان جديد"
          class="green-btn w-auto sm:text-base text-xs"
          @click="createAddress"
        />
      </div>
    </template>
    <template #content>
      <DataView
        :value="addresses"
        class="address-container"
        dataKey="addresses"
      >
        <template #empty>
          <div>لا يوجد عناوين</div>
        </template>
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
                    class="flex justify-content-start align-items-center text-lg font-bold gap-2 address-inf w-full"
                  >
                   <div class="svg-icon"  style="--icon-url: url(/imgs/svgIcons/fi-rr-location-alt.svg)"></div>
                    <span>{{ item.address }}</span>
                  </div>
                  <div
                    class="flex justify-content-end align-items-stretch gap-2 w-full"
                  >
                    <Button
                      icon="pi pi-trash"
                      class="delete-btn"
                      @click="deleteAddress(item.id)"
                    />
                    <Button
                      label="تعديل العنوان"
                      class="edit-btn"
                      @click="editAddress(item)"
                    />
                  </div>
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
  src="@/assets/scss/components/profile/profile-address.scss"
  scoped
/>
