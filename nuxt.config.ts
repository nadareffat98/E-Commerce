import { NuxtLoadingIndicator } from './.nuxt/components.d';
// https://nuxt.com/docs/api/configuration/nuxt-config
import yaml from "@rollup/plugin-yaml";

export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ["primevue"],
  },
  runtimeConfig: {
    public: {
      // baseURL: process.env.BASE_URL || 'https://cardnet.sa',
      baseURL: process.env.BASE_URL || "https://dev.7lcart.com",
    },
  },

  plugins: [
    "~/plugins/confirmDialog.ts",
    "~/plugins/fontawesome.ts",
    "~/plugins/initGlobalStore.ts",
    "~/plugins/toastify.ts",
    "~/plugins/localStorage.client.ts",
    "~/plugins/previousRouter.ts",
  ],

  modules: [
    "@nuxt/image",
    "nuxt-primevue",
    ["@pinia/nuxt", { autoImports: ["defineStore", "acceptHMRUpdate"] }],
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-swiper",
  ],

  imports: {
    dirs: ["stores", "types"],
  },

  primevue: {
    components: {
      include: "*",
    },
  },
  css: [
    "primevue/resources/themes/aura-light-green/theme.css",
    "primevue/resources/primevue.min.css",
    "primeicons/primeicons.css",
    "/node_modules/primeflex/primeflex.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
    "vue3-toastify/dist/index.css",
    "~/assets/scss/app.scss",
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/utilities/_variables.scss"as *;',
        },
      },
    },
    plugins: [yaml()],
  },
  compatibilityDate: "2024-09-23",
});
