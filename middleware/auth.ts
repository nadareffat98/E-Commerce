export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  const isLogged = await authStore.isLogged;

  if (isLogged && to.name === "login") {
    return navigateTo("/account");
  } else if (!isLogged && to.name !== "login") {
    return navigateTo("/login");
  }
});
