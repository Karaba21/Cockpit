import { Product } from '@/types';

const domain = process.env.SHOPIFY_STORE_DOMAIN!;
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

  console.log('🔍 FAQ Debug - Raw metafield:', shopifyProduct.metafield);
  console.log('🔍 FAQ Debug - References:', shopifyProduct.metafield?.references);

  return {
    id: shopifyProduct.id,
    handle: shopifyProduct.handle,
    title: shopifyProduct.title,
    description: shopifyProduct.description || '',
    descriptionHtml: shopifyProduct.descriptionHtml || '',
    price: parseFloat(variant?.price?.amount || '0'),
    compareAtPrice: variant?.compareAtPrice ? parseFloat(variant.compareAtPrice.amount) : undefined,
    images: shopifyProduct.media?.edges.map((edge: any) => {
      const node = edge.node;
      if (node.mediaContentType === 'IMAGE' && node.image) {
        return {
          url: node.image.url,
          altText: node.image.altText || shopifyProduct.title,
          mediaType: 'image' as const,
        };
      } else if (node.mediaContentType === 'VIDEO' && node.sources) {
        return {
          url: node.sources[0]?.url || '',
          altText: shopifyProduct.title,
          mediaType: 'video' as const,
          previewImage: node.previewImage?.url,
        };
      } else if (node.mediaContentType === 'EXTERNAL_VIDEO') {
        return {
          url: node.embedUrl,
          altText: shopifyProduct.title,
          mediaType: 'external_video' as const,
          host: node.host,
        };
      }
      return null;
    }).filter(Boolean) || [],
    tags: shopifyProduct.tags,
    productType: shopifyProduct.productType,
    variantId: variant?.id,
    collections: shopifyProduct.collections?.edges.map((edge: any) => edge.node.handle) || [],
    options: shopifyProduct.options?.map((option: any) => ({
      id: option.id,
      name: option.name,
      values: option.values,
    })).filter((option: any) => option.name !== 'Title') || [],
    variants: shopifyProduct.variants.edges.map((edge: any) => ({
      id: edge.node.id,
      title: edge.node.title,
      availableForSale: edge.node.availableForSale,
      selectedOptions: edge.node.selectedOptions,
      price: edge.node.price,
    })) || [],
    faq: shopifyProduct.metafield?.references?.edges.map((edge: any) => ({
      question: edge.node.fields.find((f: any) => f.key === 'pregunta')?.value,
      answer: edge.node.fields.find((f: any) => f.key === 'respuesta')?.value,
    })).filter((item: any) => item.question && item.answer) || [],
  };
};

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
            descriptionHtml
            tags
            productType
            collections(first: 5) {
              edges {
                node {
                  handle
                }
              }
            }
            media(first: 5) {
              edges {
                node {
                  mediaContentType
                  ... on MediaImage {
                    image {
                      url
                      altText
                    }
                  }
                  ... on Video {
                    sources {
                      url
                      mimeType
                    }
                    previewImage {
                      url
                    }
                  }
                  ... on ExternalVideo {
                    embedUrl
                    host
                  }
                }
              }
            }
            options {
              id
              name
              values
            }
            variants(first: 250) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
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
      descriptionHtml
      tags
      productType
      collections(first: 5) {
        edges {
          node {
            handle
          }
        }
      }
      media(first: 10) {
        edges {
          node {
            mediaContentType
            ... on MediaImage {
              image {
                url
                altText
              }
            }
            ... on Video {
              sources {
                url
                mimeType
              }
              previewImage {
                url
              }
            }
            ... on ExternalVideo {
              embedUrl
              host
            }
          }
        }
      }
      options {
        id
        name
        values
      }
      variants(first: 250) {
        edges {
          node {
            id
            title
            availableForSale
            selectedOptions {
              name
              value
            }
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
          }
        }
      }
      metafield(namespace: "custom", key: "preguntas_frecuentes") {
        references(first: 20) {
          edges {
            node {
              ... on Metaobject {
                fields {
                  key
                  value
                }
              }
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
          descriptionHtml
          tags
          productType
          collections(first: 5) {
            edges {
              node {
                handle
              }
            }
          }
          media(first: 5) {
            edges {
              node {
                mediaContentType
                ... on MediaImage {
                  image {
                    url
                    altText
                  }
                }
                ... on Video {
                  sources {
                    url
                    mimeType
                  }
                  previewImage {
                    url
                  }
                }
                ... on ExternalVideo {
                  embedUrl
                  host
                }
              }
            }
          }
          options {
            id
            name
            values
          }
          variants(first: 250) {
            edges {
              node {
                id
                title
                availableForSale
                selectedOptions {
                  name
                  value
                }
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
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

const SEARCH_QUERY = `
  query searchProducts($query: String!, $first: Int!) {
    search(query: $query, first: $first, types: PRODUCT) {
      edges {
        node {
          ... on Product {
            id
            handle
            title
            description
            descriptionHtml
            tags
            productType
            collections(first: 5) {
              edges {
                node {
                  handle
                }
              }
            }
            media(first: 5) {
              edges {
                node {
                  mediaContentType
                  ... on MediaImage {
                    image {
                      url
                      altText
                    }
                  }
                  ... on Video {
                    sources {
                      url
                      mimeType
                    }
                    previewImage {
                      url
                    }
                  }
                  ... on ExternalVideo {
                    embedUrl
                    host
                  }
                }
              }
            }
            options {
              id
              name
              values
            }
            variants(first: 250) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
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

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const data = await shopifyFetch<{ search: { edges: { node: any }[] } }>({
      query: SEARCH_QUERY,
      variables: { query, first: 20 },
    });

    return data.search.edges.map((edge) => normalizeProduct(edge.node));
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}

const RELATED_PRODUCTS_QUERY = `
  query getRelatedProducts($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      products(first: $first) {
        edges {
          node {
            id
            handle
            title
            description
            descriptionHtml
            tags
            productType
            collections(first: 5) {
              edges {
                node {
                  handle
                }
              }
            }
            media(first: 2) {
              edges {
                node {
                  mediaContentType
                  ... on MediaImage {
                    image {
                      url
                      altText
                    }
                  }
                  ... on Video {
                    sources {
                      url
                      mimeType
                    }
                    previewImage {
                      url
                    }
                  }
                  ... on ExternalVideo {
                    embedUrl
                    host
                  }
                }
              }
            }
            options {
              id
              name
              values
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                  title
                  availableForSale
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function getRelatedProducts(collectionHandle: string, currentProductId: string): Promise<Product[]> {
  try {
    const data = await shopifyFetch<{ collection: { products: { edges: { node: any }[] } } }>({
      query: RELATED_PRODUCTS_QUERY,
      variables: { handle: collectionHandle, first: 8 }, // Fetch a few more to allow filtering
    });

    if (!data.collection) {
      return [];
    }

    const allProducts = data.collection.products.edges.map((edge) => normalizeProduct(edge.node));
    const filteredProducts = allProducts.filter((p) => p.id !== currentProductId);

    return filteredProducts.slice(0, 6);
  } catch (error) {
    // Silently fail for related products to avoid breaking the page
    console.error('Error fetching related products:', error);
    return [];
  }
}

// Cart Mutations and Queries

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_ADD_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_REMOVE_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_QUERY = `
  query cart($id: ID!) {
    cart(id: $id) {
      id
      checkoutUrl
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
              }
            }
          }
        }
      }
    }
  }
`;

export async function createCart(lines: { merchandiseId: string; quantity: number }[]): Promise<{ cartId: string; checkoutUrl: string } | null> {
  try {
    const data = await shopifyFetch<{ cartCreate: { cart: any; userErrors: any[] } }>({
      query: CART_CREATE_MUTATION,
      variables: {
        input: {
          lines,
        },
      },
    });

    if (data.cartCreate.userErrors.length > 0) {
      console.error('Cart creation errors:', data.cartCreate.userErrors);
      return null;
    }

    return {
      cartId: data.cartCreate.cart.id,
      checkoutUrl: data.cartCreate.cart.checkoutUrl,
    };
  } catch (error) {
    console.error('Error creating cart:', error);
    return null;
  }
}

export async function addToShopifyCart(cartId: string, merchandiseId: string, quantity: number = 1): Promise<boolean> {
  try {
    const data = await shopifyFetch<{ cartLinesAdd: { cart: any; userErrors: any[] } }>({
      query: CART_LINES_ADD_MUTATION,
      variables: {
        cartId,
        lines: [
          {
            merchandiseId,
            quantity,
          },
        ],
      },
    });

    if (data.cartLinesAdd.userErrors.length > 0) {
      console.error('Add to cart errors:', data.cartLinesAdd.userErrors);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return false;
  }
}

export async function updateShopifyCartLine(cartId: string, lineId: string, quantity: number): Promise<boolean> {
  try {
    const data = await shopifyFetch<{ cartLinesUpdate: { cart: any; userErrors: any[] } }>({
      query: CART_LINES_UPDATE_MUTATION,
      variables: {
        cartId,
        lines: [
          {
            id: lineId,
            quantity,
          },
        ],
      },
    });

    if (data.cartLinesUpdate.userErrors.length > 0) {
      console.error('Update cart errors:', data.cartLinesUpdate.userErrors);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error updating cart:', error);
    return false;
  }
}

export async function removeFromShopifyCart(cartId: string, lineId: string): Promise<boolean> {
  try {
    const data = await shopifyFetch<{ cartLinesRemove: { cart: any; userErrors: any[] } }>({
      query: CART_LINES_REMOVE_MUTATION,
      variables: {
        cartId,
        lineIds: [lineId],
      },
    });

    if (data.cartLinesRemove.userErrors.length > 0) {
      console.error('Remove from cart errors:', data.cartLinesRemove.userErrors);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error removing from cart:', error);
    return false;
  }
}

export async function getShopifyCart(cartId: string): Promise<{ checkoutUrl: string; lines: any[] } | null> {
  try {
    const data = await shopifyFetch<{ cart: any }>({
      query: CART_QUERY,
      variables: { id: cartId },
    });

    if (!data.cart) {
      return null;
    }

    return {
      checkoutUrl: data.cart.checkoutUrl,
      lines: data.cart.lines.edges.map((edge: any) => edge.node),
    };
  } catch (error) {
    console.error('Error fetching cart:', error);
    return null;
  }
}
