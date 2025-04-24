export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  const lastRoute = ref();
  router.afterEach((to, from) => {
    if (from.name === null) {
      lastRoute.value = to;
    } else {
      lastRoute.value = from;
    }
  });
  return {
    provide: {
      lastRoute,
    },
  };
});
