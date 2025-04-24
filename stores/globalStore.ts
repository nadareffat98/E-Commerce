import type { IStoreData } from "@/types/globalData";

export const useGlobalStore = defineStore("globalStore", {
  state: () => {
    return {
      countries: [] as Array<any>,
      cities: [] as Array<any>,
      sliders: [] as Array<any>,
      categories: [] as Array<any>,
      addresses: [] as Array<any>,
      store: {} as IStoreData,
      socialMedia: [] as Array<any>,
      pages: [] as Array<any>,
      attributes: [] as Array<any>,
      manufactors: [] as Array<any>,
      joinUs: Object as any,
    };
  },
  actions: {
    // 👉 fetch countries
    fetchCountries() {
      $useMyFetch("/countries").then((res: any) => {
        this.countries = res.data.value.data;
      });
    },
    // 👉 fetch cities
    fetchCities() {
      $useMyFetch("/cities").then((res: any) => {
        this.cities = res.data.value.data;
      });
    },
    // 👉 fetch sliders
    fetchSliders() {
      $useMyFetch("/slide").then((res: any) => {
        this.sliders = res.data.value.data;
      });
    },
    // 👉 fetch all addresses
    fetchAddress() {
      $useMyFetch("/address").then((res: any) => {
        if (res.data.value) this.addresses = res.data.value.data;
      });
    },
    // 👉 fetch single address
    async fetchSingleAddress(id: number): Promise<any> {
      const address: any = await $useMyFetch(`/address/${id}`);
      return address.data.value.data;
    },
    // 👉 fetch categories
    fetchCategories() {
      $useMyFetch("/category").then((res: any) => {
        this.categories = res.data.value.data;
      });
    },
    // 👉 fetch store object
    fetchStore() {
      $useMyFetch("/store").then((res: any) => {
        this.store = res.data.value.data;
        this.setStoreData();
      });
    },
    // 👉 fetch social media
    fetchSocialMedia() {
      $useMyFetch("/settings?code=social_media").then((res: any) => {
        this.socialMedia = res.data.value.data;
      });
    },
    // 👉 fetch pages
    fetchPages() {
      $useMyFetch("/page").then((res: any) => {
        this.pages = [
          ...res.data.value.data,
          { title: "اتصل بنا", slug: "contact_us" },
        ];
      });
    },
    // 👉 fetch join us page
    fetchJoinUs() {
      $useMyFetch("page/25", {
        baseURL: "https://cardnet.sa/api/v3/",
      }).then((res: any) => {
        this.joinUs = res.data.value.data;
      });
    },
    // 👉 fetch attributes for system
    fetchAttributes() {
      $useMyFetch("/attributes").then((res: any) => {
        this.attributes = res.data.value.data;
      });
    },
    // 👉 fetch manufactors
    fetchManufactors() {
      $useMyFetch("/manufacturer").then((res: any) => {
        this.manufactors = res.data.value.data;
      });
    },
    // fetch all actions
    async fetchAll() {
      await Promise.all([
        this.fetchCountries(),
        this.fetchCities(),
        this.fetchSliders(),
        this.fetchCategories(),
        this.fetchAddress(),
        this.fetchStore(),
        this.fetchSocialMedia(),
        this.fetchPages(),
        this.fetchJoinUs(),
        this.fetchAttributes(),
        this.fetchManufactors(),
      ]);
    },
    // assign store css variables
    setStoreData() {
      document.documentElement.style.setProperty(
        "--font-family",
        this.store.ar_font_style || '"Tajawal", sans-serif'
      );
      document.documentElement.style.setProperty(
        "--main-color",
        this.store.main_color || "#03bb50"
      );
      document.documentElement.style.setProperty(
        "--second-color",
        this.store.second_color || "#878787"
      );
      document.documentElement.style.setProperty(
        "--font-color",
        this.store.font_color || "#556987"
      );
      document.documentElement.style.setProperty(
        "--main-bg-color",
        this.store.main_bg_color || "#fcfcfc"
      );
    },
  },
  persist: true,
});

// this.store.second_color ||
