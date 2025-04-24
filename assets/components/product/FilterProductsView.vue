<script lang="ts">
export default defineComponent({
  name: "CategoryProducts",
  //  👉 Props
  props: {
    mainCategory: {
      type: Object as any,
      required: true,
    },
    subCategory: {
      type: Object as any,
      required: true,
    },
  },
  //   👉 Emits
  emits: ["getProduct"],
  async setup(props, { emit }) {
    const globalStore = useGlobalStore();
    const isLoading = useLoadingState();
    const isSubCategory = ref(false);
    const subCategories = ref();
    const selectedCategory = ref([props.subCategory.id]);
    const manufactors: any = await globalStore.manufactors;
    const attributes: any = await globalStore.attributes;
    const selectedManufactor = ref();
    const selectedRate = ref([]);
    const selectedOptions: any = ref({});
    var params: any = {
      "category_ids[0]": props.subCategory.id,
    };

    // Initialize the selectedOptions structure for each attribute
    attributes.value?.forEach((attribute: any) => {
      selectedOptions.value[attribute.id] = [];
    });
    const getSubCategories = async () => {
      if (props.mainCategory.id == props.subCategory.id) {
        subCategories.value = null;
        isSubCategory.value = false;
      } else {
        const res: any = await $useMyFetch(
          `/category/${props.mainCategory.id}/subcategories`
        );
        subCategories.value = res.data.value.data;
        isSubCategory.value = true;
      }
    };
    watchEffect(getSubCategories);
    const getParams = async (selectedData: object, paramName: any) => {
      isLoading.value = true;
      Object.keys(params).forEach((key) => {
        if (key.startsWith(paramName)) {
          delete params[key];
        }
      });

      // Rebuild the parameter array based on the updated selectedData
      Object.values(selectedData).forEach((id: any, index: number) => {
        params[`${paramName}[${index}]`] = id;
      });
      emit("getProduct", params);
    };
    const overlay = ref();

    const toggleOverlay = (event: Event) => {
      overlay.value.toggle(event);
    };
    return {
      subCategories,
      isSubCategory,
      selectedCategory,
      manufactors,
      attributes,
      selectedManufactor,
      selectedRate,
      selectedOptions,
      getParams,
      overlay,
      toggleOverlay,
    };
  },
});
</script>
<template>
  <!-- <Card class="card-filter-container" style="max-width: 300px">
    <template #content> -->
      <Button
        type="button"
        icon="pi pi-ellipsis-v"
        @click="toggleOverlay"
        aria-haspopup="true"
        aria-controls="overlay_panel"
      />
      <OverlayPanel ref="overlay" id="overlay_panel">
        <Accordion :multiple="true">
          <AccordionTab
            :header="mainCategory?.name"
            v-if="mainCategory.id != subCategory.id"
          >
            <div class="flex flex-column gap-3 mt-4" v-if="isSubCategory">
              <div
                v-for="category in subCategories"
                :key="category.id"
                class="flex align-items-center"
              >
                <Checkbox
                  v-model="selectedCategory"
                  :inputId="category.name"
                  name="dynamic"
                  :value="category.id"
                  @change="getParams(selectedCategory, 'category_ids')"
                />
                <label :for="category.name" class="mr-2">{{
                  category.name
                }}</label>
              </div>
            </div>
          </AccordionTab>
          <AccordionTab header="المصنع">
            <div class="flex flex-column gap-3 mt-4">
              <div
                v-for="manufactor in manufactors"
                :key="manufactor.id"
                class="flex align-items-center"
              >
                <Checkbox
                  v-model="selectedManufactor"
                  :inputId="manufactor.name"
                  name="dynamic"
                  :value="manufactor.id"
                  @change="getParams(selectedManufactor, 'manufacturer')"
                />
                <label :for="manufactor.name" class="mr-2">{{
                  manufactor.name
                }}</label>
              </div>
            </div>
          </AccordionTab>
          <AccordionTab header="التقيم">
            <div class="flex flex-column gap-3 mt-4">
              <div
                v-for="(rate, index) in 5"
                :key="index"
                class="flex align-items-center justify-content-between gap-3"
              >
                <div class="flex align-items-center rating">
                  <Checkbox
                    v-model="selectedRate"
                    name="dynamic"
                    :value="rate"
                    @change="getParams(selectedRate, 'rating')"
                  />
                  <label class="mr-2">
                    <Rating :modelValue="rate" readonly :cancel="false" />
                  </label>
                </div>
                <span>{{ "(" + rate + ")" }}</span>
              </div>
            </div>
          </AccordionTab>
          <template v-for="attribute in attributes" :key="attribute.id">
            <AccordionTab :header="attribute.name">
              <div class="flex flex-column gap-3 mt-4">
                <div
                  v-for="option in attribute.options"
                  :key="option.id"
                  class="flex align-items-center"
                >
                  <Checkbox
                    v-model="selectedOptions[attribute.id]"
                    :inputId="`${option.id}`"
                    :name="attribute.name"
                    :value="option.id"
                    @change="
                      getParams(
                        selectedOptions[attribute.id],
                        'attribute_options'
                      )
                    "
                  />
                  <label class="mr-2" :for="option.id"
                    >{{ option.name }}
                  </label>
                </div>
              </div>
            </AccordionTab>
          </template>
        </Accordion>
      </OverlayPanel>
    <!-- </template>
  </Card> -->
</template>
<style
  lang="scss"
  src="@/assets/scss/components/products/filter-products.scss"
  scoped
/>
<style>
.hidden-input-treeselect .p-treeselect-label-container {
  display: none;
}
</style>
