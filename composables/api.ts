export function $useMyFetch<T>(
  request: Parameters<typeof useFetch<T>>[0],
  opts?: Parameters<typeof useFetch<T>>[1]
) {
  const auth = useAuthStore();
  const config = useRuntimeConfig();
  return useFetch<T>(request, {
    baseURL: config.public.baseURL + "/api/v3/",
    headers: {
      version: "8.3",
      Authorization: auth.isLogged ? `Bearer ${auth.token}` : "",
      Accept: "application/json",
      "content-type": "application/json",
      ...opts?.headers,
    },
    ...opts,
  });
}

// export function $useAsyncFetch<T>(
//   request: string, // The API endpoint as a string
//   opts?: Parameters<typeof $fetch>[1] // Optional fetch configuration
// ) {
//   const auth = useAuthStore();
//   const config = useRuntimeConfig();

//   // Return the result of useAsyncData for Nuxt to track the loading state
//   return useAsyncData<T>(request, () =>
//     $fetch<T>(request, {
//       baseURL: config.public.baseURL + "/api/v3/",
//       headers: {
//         version: "8.3",
//         Authorization: auth.isLogged ? `Bearer ${auth.token}` : "",
//         Accept: "application/json",
//         "content-type": "application/json",
//         ...opts?.headers,
//       },
//       ...opts,
//     }).catch((error) => {
//       console.error("Error fetching data:", error);
//       throw error;
//     })
//   );
// }
