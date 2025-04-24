export const useLoadingState = () => {
  return useState("isLoading", () => false);
};

