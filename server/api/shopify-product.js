// server/api/shopify-product.js
export default defineEventHandler(async event => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const { handles } = body;

  if (!handles || handles.length === 0) return [];

  const handleList = Array.isArray(handles) ? handles : [handles];

  const results = await Promise.all(
    handleList.map(async handle => {
      try {
        const res = await $fetch(
          `https://${config.public.shopifyDomain}/api/2023-10/graphql.json`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Shopify-Storefront-Access-Token': config.public.shopifyToken,
            },
            body: {
              query: `
                  {
                    productByHandle(handle: "${handle}") {
                      title
                      description
                      handle
                      images(first: 1) {
                        edges {
                          node {
                            url
                          }
                        }
                      }
                      variants(first: 10) {
                        edges {
                          node {
                            id
                            title
                            availableForSale
                            price {
                              amount
                              currencyCode
                            }
                            selectedOptions {
                              name
                              value
                            }
                          }
                        }
                      }
                    }
                  }
                `,
            },
          },
        );

        return res?.data?.productByHandle ?? null;
      } catch (e) {
        console.error(`Error fetching Shopify product:`, e);
        return null;
      }
    }),
  );

  return results.filter(Boolean);
});
