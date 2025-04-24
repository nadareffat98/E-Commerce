export default defineNuxtPlugin((nuxtApp) => {
  const confirm = useConfirm();
  return {
    provide: {
      confirmDialog: (options: any) => {
        confirm.require({
          icon: "pi pi-info-circle",
          rejectClass: "p-button-secondary",
          acceptClass: "p-button accept-button",
          ...options,
        });
      },
    },
  };
});
