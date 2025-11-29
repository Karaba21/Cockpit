import { Product } from '@/types';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

const endpoint = `https://${domain}/api/2024-01/graphql.json`;

async function shopifyFetch<T>({ query, variables }: { query: string; variables?: Record<string, unknown> }): Promise<T> {
    const maxRetries = 3;
    let lastError;

    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
                },
                body: JSON.stringify({ query, variables }),
                next: { revalidate: 60 },
            });

            if (!response.ok) {
                throw new Error(`Shopify API error: ${response.statusText}`);
            }

            const json = await response.json();

            if (json.errors) {
                throw new Error(json.errors[0].message);
            }

            return json.data;
        } catch (error) {
            lastError = error;
            // Wait before retrying (exponential backoff: 500ms, 1000ms, 2000ms)
            await new Promise(resolve => setTimeout(resolve, 500 * Math.pow(2, i)));
        }
    }

    throw lastError;
}

function normalizeProduct(shopifyProduct: any): Product {
    const variant = shopifyProduct.variants.edges[0]?.node;

    return {
        id: shopifyProduct.id,
        handle: shopifyProduct.handle,
        title: shopifyProduct.title,
        description: shopifyProduct.description || '',
        price: parseFloat(variant?.price?.amount || '0'),
        compareAtPrice: variant?.compareAtPrice ? parseFloat(variant.compareAtPrice.amount) : undefined,
        images: shopifyProduct.images.edges.map((edge: any) => ({
            url: edge.node.url,
            altText: edge.node.altText || shopifyProduct.title,
        })),
        tags: shopifyProduct.tags,
    };
}

const COLLECTION_QUERY = `
  query getCollection($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      products(first: $first) {
        edges {
          node {
            id
            handle
            title
            description
            tags
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                  }
                  compareAtPrice {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const PRODUCT_QUERY = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      tags
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 1) {
        edges {
          node {
            id
            price {
              amount
            }
            compareAtPrice {
              amount
            }
          }
        }
      }
    }
  }
`;

const ALL_PRODUCTS_QUERY = `
  query getAllProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          tags
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                price {
                  amount
                }
                compareAtPrice {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function getProductsByCollection(collectionHandle: string): Promise<Product[]> {
    try {
        const data = await shopifyFetch<{ collection: { products: { edges: { node: any }[] } } }>({
            query: COLLECTION_QUERY,
            variables: { handle: collectionHandle, first: 20 },
        });

        if (!data.collection) {
            return [];
        }

        return data.collection.products.edges.map((edge) => normalizeProduct(edge.node));
    } catch (error) {
        console.error('Error fetching collection:', error);
        return [];
    }
}

export async function getProductByHandle(handle: string): Promise<Product | undefined> {
    try {
        const data = await shopifyFetch<{ product: any }>({
            query: PRODUCT_QUERY,
            variables: { handle },
        });

        if (!data.product) {
            return undefined;
        }

        return normalizeProduct(data.product);
    } catch (error) {
        console.error('Error fetching product:', error);
        return undefined;
    }
}

export async function getAllProducts(): Promise<Product[]> {
    try {
        const data = await shopifyFetch<{ products: { edges: { node: any }[] } }>({
            query: ALL_PRODUCTS_QUERY,
            variables: { first: 50 },
        });

        return data.products.edges.map((edge) => normalizeProduct(edge.node));
    } catch (error) {
        console.error('Error fetching all products:', error);
        return [];
    }
}
