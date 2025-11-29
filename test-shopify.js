const fs = require('fs');
const path = require('path');

async function testShopify() {
    try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        if (!fs.existsSync(envPath)) {
            console.error('.env.local not found');
            return;
        }

        const envContent = fs.readFileSync(envPath, 'utf8');
        const env = {};
        envContent.split('\n').forEach(line => {
            const parts = line.split('=');
            if (parts.length >= 2) {
                const key = parts[0].trim();
                const value = parts.slice(1).join('=').trim().replace(/["']/g, '');
                env[key] = value;
            }
        });

        const domain = env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
        const token = env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

        if (!domain || !token) {
            console.error('Missing credentials in .env.local');
            console.log('Found keys:', Object.keys(env));
            return;
        }

        console.log(`Connecting to ${domain}...`);

        const endpoint = `https://${domain}/api/2024-01/graphql.json`;
        const query = `
      {
        products(first: 10) {
          edges {
            node {
              title
              handle
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    `;

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': token,
            },
            body: JSON.stringify({ query }),
        });

        const json = await response.json();

        if (json.errors) {
            console.error('Shopify API Errors:', JSON.stringify(json.errors, null, 2));
        } else {
            console.log('\n✅ Connection Successful! Found products:');
            const products = json.data.products.edges;
            if (products.length === 0) {
                console.log('No products found in the store.');
            } else {
                products.forEach(edge => {
                    const p = edge.node;
                    console.log(`- ${p.title} (${p.priceRange.minVariantPrice.amount} ${p.priceRange.minVariantPrice.currencyCode})`);
                });
            }
        }

    } catch (err) {
        console.error('Script Error:', err);
    }
}

testShopify();
