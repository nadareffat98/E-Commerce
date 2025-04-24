<script lang="ts">
import type { IPaymentItem, IPaymentPayfort } from "@/types/cartData.d";
import type { IShippingMethod } from "@/types/globalData.d";
export default defineComponent({
  name: "PaymentView",
  emits: ["confirmPayment", "checkout"],
  props: {
    totals: { type: Object as any, required: true },
    payfortData: { type: Object as any, required: true },
  },
  setup(props, { emit }) {
    //// 👉 Data
    const authStore = useAuthStore();
    const user = authStore.user;
    const globalStore = useGlobalStore();
    const addresses = globalStore.addresses;
    const paymentInf = ref<IPaymentItem>({
      full_name: user.name,
      email: user.email,
      phone: user.phone,
      coupon: "",
      address_id: 0,
      country_id: 0,
      payment_method: "",
      shipping_method: "",
    });
    const selectedAddress = ref();
    const shippingMethods = ref();
    const selectedShipping = ref<IShippingMethod>();
    const paymentMethods = ref();
    const selectedPayment = ref();
    const banks = ref();
    const selectedBank = ref();
    const fileInput = ref();
    const bankFile = ref();
    const fileChoosen = ref();
    const isLoading = useLoadingState();
    const responseMessage = ref();
    const payfortDataForm = ref<IPaymentPayfort>({
      service_command: "",
      access_code: "",
      merchant_identifier: "",
      merchant_reference: "",
      return_url: "",
      language: "",
      merchant_extra1: 0,
      merchant_extra2: "",
      signature: "",
      url: "",
    });
    const cardNumber = ref<string>();
    const convertedDate = ref<string>();
    const cardCvv = ref<string>();
    const cardHolderName = ref<string>();

    //// 👉 Methods
    // fetch shipping methods
    const getShippingMethods = async () => {
      isLoading.value = true;
      const shippingRes: any = await $useMyFetch("/order/shipping_methods", {
        method: "post",
        body: {
          city_id: selectedAddress.value.city_id,
        },
      });
      if (shippingRes.status.value == "success") {
        shippingMethods.value = shippingRes.data.value.data;
        isLoading.value = false;
        paymentInf.value.address_id = selectedAddress.value.id;
        paymentInf.value.country_id = selectedAddress.value.country_id;
      }
    };
    // fetch shipping methods
    const getPaymentMethods = async () => {
      isLoading.value = true;
      const paymentRes: any = await $useMyFetch("/order/payment_methods", {
        method: "post",
        body: {
          shipping_method: selectedShipping.value?.code,
          city_id: selectedAddress.value.city_id,
          branch_id: selectedShipping.value?.branch_id ?? null,
        },
      });
      if (paymentRes.status.value == "success") {
        paymentMethods.value = paymentRes.data.value.data;
        isLoading.value = false;
        paymentInf.value.shipping_method = selectedShipping.value?.code || "";
      }
    };
    const getPaymentInfo = async () => {
      paymentInf.value.payment_method = selectedPayment.value.code;
      if (selectedPayment.value.code == "bank_transfer") {
        const banksRes: any = await $useMyFetch("/banks");
        banks.value = banksRes.data.value.data;
      } else if (selectedPayment.value.code == "payfort") {
        emit("checkout", paymentInf.value);
      }
    };
    // upload bank file
    const triggerFileUpload = () => {
      if (fileInput.value) fileInput.value.click();
    };
    const handleFileChange = async (event: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        bankFile.value = reader.result;
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };
      fileChoosen.value = event.target.files[0].name;
    };
    // handle checkout
    const handlePayment = async () => {
      if (selectedPayment.value.code == "bank_transfer") {
        paymentInf.value.bank_account_id = selectedBank.value.id;
        paymentInf.value.bank_transfer_file = bankFile.value;
      } else if (selectedPayment.value.code == "payfort") {
        window.open(
          payfortDataForm.value.url,
          "result",
          "width=500,height=500"
        );
        const form: any = await document.getElementById("payfortForm");
        form?.submit();
        return;
      }
      emit("checkout", paymentInf.value);
    };
    const updatePayfortDataForm = (newVal: any) => {
      const keysToUpdate = [
        "service_command",
        "access_code",
        "merchant_identifier",
        "merchant_reference",
        "return_url",
        "language",
        "merchant_extra1",
        "merchant_extra2",
        "signature",
        "url",
      ];
      if (newVal) {
        keysToUpdate.forEach((key) => {
          if (newVal[key] !== undefined) {
            (payfortDataForm.value as any)[key] = newVal[key];
          }
        });
      }
    };
    watchEffect(globalStore.fetchAddress);
    watch(
      () => props.payfortData,
      (newVal) => {
        updatePayfortDataForm(newVal);
      },
      { immediate: true }
    );
    return {
      handlePayment,
      getShippingMethods,
      getPaymentMethods,
      getPaymentInfo,
      triggerFileUpload,
      handleFileChange,
      addresses,
      selectedAddress,
      shippingMethods,
      selectedShipping,
      paymentMethods,
      selectedPayment,
      banks,
      selectedBank,
      fileInput,
      fileChoosen,
      payfortDataForm,
      cardNumber,
      convertedDate,
      cardCvv,
      cardHolderName,
      responseMessage,
    };
  },
});
</script>
<template>
  <iframe
    id="paymentFrame"
    name="paymentFrame"
    style="display: none; width: 100%; height: 500px"
  ></iframe>
  <div class="payment-container flex justify-content-between gap-7 mt-2">
    <div class="right-side-container" style="flex-basis: 55%">
      <Card class="mb-5">
        <template #title>
          <h3>عنوان الشحن</h3>
          <Divider />
        </template>
        <template #content>
          <div class="flex flex-column gap-2 mb-3">
            <label for="addressName">اختر العنوان</label>
            <Dropdown
              id="address"
              v-model="selectedAddress"
              :options="addresses"
              option-label="address"
              placeholder="اختر العنوان"
              panelClass="address-dropdown"
              @change="getShippingMethods"
            >
              <template #option="slotProps">
                {{
                  slotProps.option.address +
                  " , " +
                  slotProps.option.country +
                  ", " +
                  slotProps.option.city
                }}
              </template>
            </Dropdown>
            <div
              class="flex justify-content-start align-items-center gap-2 w-full mt-3"
              style="color: var(--font-color)"
              v-if="selectedAddress"
            >
              <div class="svg-icon" style="--icon-url: url(/imgs/svgIcons/fi-rr-home-location-alt.svg)"></div>
              <span>{{
                selectedAddress.country + " , " + selectedAddress.city
              }}</span>
            </div>
          </div>
        </template>
      </Card>
      <Card class="shipping-method mb-3" v-if="shippingMethods">
        <template #title>
          <h3>طريقة الشحن</h3>
          <Divider />
        </template>
        <template #content>
          <div class="flex flex-column gap-3">
            <div
              v-for="method in shippingMethods"
              :key="method.name"
              class="flex align-items-center"
            >
              <RadioButton
                v-model="selectedShipping"
                :inputId="method.name"
                name="dynamic"
                :value="method"
                @update:model-value="getPaymentMethods"
              />
              <label :for="method.name" class="mr-2"
                >{{ method.name }}
                {{
                  method.from_date != 0
                    ? " ( " +
                      method.from_date +
                      "-" +
                      method.to_date +
                      " يوم  ) "
                    : ""
                }}
                <span class="mr-1" v-if="method.cost != 0"
                  >+ {{ method.cost }} ر.س</span
                ></label
              >
            </div>
          </div>
        </template>
      </Card>
      <Card class="payment-method mb-3" v-if="paymentMethods">
        <template #title>
          <h3>طريقة الدفع</h3>
          <Divider />
        </template>
        <template #content>
          <div class="flex flex-column gap-3">
            <div
              v-for="method in paymentMethods"
              :key="method.name"
              class="flex align-items-center"
            >
              <RadioButton
                v-model="selectedPayment"
                :inputId="method.name"
                name="dynamic"
                :value="method"
                @update:model-value="getPaymentInfo"
              />
              <img
                :src="method.logo"
                class="mr-2"
                width="20px"
                height="20px"
                style="border-radius: 3px"
              />
              <label :for="method.name" class="mr-2"
                >{{ method.name }}
                <span class="mr-1" v-if="method.fees != 0"
                  >+ {{ method.fees }} ر.س</span
                ></label
              >
            </div>
            <div
              class="bank-transfer-container flex flex-column justify-content-start align-items-start mr-4 mt-3"
              v-if="selectedPayment && selectedPayment.code == 'bank_transfer'"
            >
              <label> بيانات البنك : </label>
              <div class="flex sm:flex-row flex-column gap-4 w-full mt-2">
                <div class="flex flex-column gap-2 flex-1">
                  <label for="bankName" class="text-base"> اسم البنك </label>
                  <Dropdown
                    id="bankName"
                    v-model="selectedBank"
                    :options="banks"
                    optionLabel="name"
                  />
                </div>
                <div class="flex flex-column gap-2 flex-1">
                  <label for="photo" class="text-base"> صورة من الإيداع </label>
                  <input
                    type="file"
                    ref="fileInput"
                    @change="handleFileChange"
                    style="display: none"
                  />
                  <IconField iconPosition="left" @click="triggerFileUpload">
                    <InputIcon class="pi pi-paperclip"> </InputIcon>
                    <InputText
                      placeholder="اختر صورة"
                      v-model="fileChoosen"
                      class="w-full"
                    />
                  </IconField>
                </div>
              </div>
            </div>
            <div
              v-if="
                selectedPayment &&
                payfortData &&
                selectedPayment.code == 'payfort'
              "
            >
              <form
                :action="payfortDataForm?.url"
                id="payfortForm"
                method="POST"
                target="result"
              >
                <input
                  type="hidden"
                  name="service_command"
                  :value="payfortDataForm?.service_command"
                /><input
                  type="hidden"
                  name="access_code"
                  :value="payfortDataForm?.access_code"
                /><input
                  type="hidden"
                  name="merchant_identifier"
                  :value="payfortDataForm?.merchant_identifier"
                />
                <input
                  type="hidden"
                  name="merchant_reference"
                  :value="payfortDataForm?.merchant_reference"
                /><input
                  type="hidden"
                  name="return_url"
                  :value="payfortDataForm?.return_url"
                />
                <input
                  type="hidden"
                  name="language"
                  :value="payfortDataForm?.language"
                />
                <input
                  type="hidden"
                  name="merchant_extra1"
                  :value="payfortDataForm?.merchant_extra1"
                />
                <input
                  type="hidden"
                  name="merchant_extra2"
                  :value="payfortDataForm?.merchant_extra2"
                />
                <input
                  type="hidden"
                  name="signature"
                  :value="payfortDataForm?.signature"
                />
                <div class="flex gap-3 mt-3">
                  <div class="flex flex-column gap-1 flex-1">
                    <label>رقم البطاقة </label>
                    <InputMask
                      name="card_number"
                      v-model="cardNumber"
                      mask="9999999999999999"
                      placeholder="0000 0000 0000 0000"
                    />
                  </div>
                  <div class="flex flex-column gap-1 flex-1">
                    <label>تاريخ الإنتهاء </label>
                    <InputText v-model:="convertedDate" name="expiry_date" />
                  </div>
                </div>
                <div class="flex gap-3 mt-3">
                  <div class="flex flex-column gap-1 flex-1">
                    <label> CVV </label>
                    <InputMask
                      name="card_security_code"
                      v-model="cardCvv"
                      mask="999"
                      placeholder="CVV"
                    />
                  </div>
                  <div class="flex flex-column gap-1 flex-1">
                    <label> اسم حامل البطاقة</label>
                    <InputText
                      id="card_holder_name"
                      v-model="cardHolderName"
                      placeholder="اسم حامل البطاقة"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </template>
      </Card>
    </div>
    <div class="left-side-container" style="flex-basis: 35%">
      <Card>
        <template #title>
          <h3>الطلب الخاص بك</h3>
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
              label="تأكيد الطلب الآن"
              class="green-btn"
              @click.stop="handlePayment"
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
