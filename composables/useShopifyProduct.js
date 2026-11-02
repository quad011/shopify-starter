export const useShopifyProduct = handles => {
  return useAsyncData(
    `shopify-products-${JSON.stringify(handles)}`,
    async () => {
      const handleList = Array.isArray(handles) ? handles : [handles];
      const response = await $fetch('/api/shopify-product', {
        method: 'POST',
        body: { handles: handleList },
      });

      return response;
    },
  );
};
