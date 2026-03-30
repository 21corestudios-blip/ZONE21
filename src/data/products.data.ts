export type Region = 'EU' | 'US';

export type Provider = 'gelato' | 'printify' | 'interne';

export type ProductCollection = 'classic' | 'urban' | 'heritage' | 'studio';

export type ProductCategory = 't-shirt' | 'hoodie' | 'casquette' | 'accessoire';

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'UNIQUE';

export interface RegionalInfo {
  price: number;
  currency: string;
  providerId: string;
  provider: Provider;
  isFulfillmentReady: boolean;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  image: string;
  collection: ProductCollection;
  category: ProductCategory;
  isNew?: boolean;
  availableSizes: ProductSize[];
  isActive: boolean;
  regions: Record<Region, RegionalInfo>;
}

export const DEFAULT_REGION: Region = 'EU';

export const PRODUCT_SIZES_BY_CATEGORY: Record<ProductCategory, ProductSize[]> = {
  't-shirt': ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  hoodie: ['S', 'M', 'L', 'XL', 'XXL'],
  casquette: ['UNIQUE'],
  accessoire: ['UNIQUE'],
};

const PROVIDER_VARIANTS = {
  clsTeeSignature: {
    EU: {
      price: 45,
      currency: 'EUR',
      providerId: 'GELATO-EU-TEE-001',
      provider: 'gelato',
      isFulfillmentReady: false,
    },
    US: {
      price: 49,
      currency: 'USD',
      providerId: 'GELATO-US-TEE-001',
      provider: 'gelato',
      isFulfillmentReady: false,
    },
  },
  urbHoodie01: {
    EU: {
      price: 85,
      currency: 'EUR',
      providerId: 'GELATO-EU-HOOD-001',
      provider: 'gelato',
      isFulfillmentReady: false,
    },
    US: {
      price: 89,
      currency: 'USD',
      providerId: 'GELATO-US-HOOD-001',
      provider: 'gelato',
      isFulfillmentReady: false,
    },
  },
  herCap01: {
    EU: {
      price: 35,
      currency: 'EUR',
      providerId: 'PRINTIFY-EU-CAP-001',
      provider: 'printify',
      isFulfillmentReady: false,
    },
    US: {
      price: 35,
      currency: 'USD',
      providerId: 'PRINTIFY-US-CAP-001',
      provider: 'printify',
      isFulfillmentReady: false,
    },
  },
  stdTee01: {
    EU: {
      price: 65,
      currency: 'EUR',
      providerId: 'GELATO-EU-STUDIO-001',
      provider: 'gelato',
      isFulfillmentReady: false,
    },
    US: {
      price: 70,
      currency: 'USD',
      providerId: 'GELATO-US-STUDIO-001',
      provider: 'gelato',
      isFulfillmentReady: false,
    },
  },
} as const satisfies Record<
  string,
  Record<
    Region,
    {
      price: number;
      currency: string;
      providerId: string;
      provider: Provider;
      isFulfillmentReady: boolean;
    }
  >
>;

export const wearProducts: Product[] = [
  {
    id: 'cls-tee-signature',
    sku: '21W-CLS-TEE-SIGNATURE',
    name: 'T-Shirt Signature Classic',
    image: '/images/brands/21-wear/01_classic_collection.jpg',
    collection: 'classic',
    category: 't-shirt',
    isNew: true,
    availableSizes: PRODUCT_SIZES_BY_CATEGORY['t-shirt'],
    isActive: true,
    regions: PROVIDER_VARIANTS.clsTeeSignature,
  },
  {
    id: 'urb-hoodie-01',
    sku: '21W-URB-HOODIE-01',
    name: 'Hoodie Urban Oversize',
    image: '/images/brands/21-wear/02_urban_collection.jpg',
    collection: 'urban',
    category: 'hoodie',
    isNew: true,
    availableSizes: PRODUCT_SIZES_BY_CATEGORY.hoodie,
    isActive: true,
    regions: PROVIDER_VARIANTS.urbHoodie01,
  },
  {
    id: 'her-cap-01',
    sku: '21W-HER-CAP-01',
    name: 'Casquette Vintage Heritage',
    image: '/images/brands/21-wear/03_heritage_collection.jpg',
    collection: 'heritage',
    category: 'casquette',
    availableSizes: PRODUCT_SIZES_BY_CATEGORY.casquette,
    isActive: true,
    regions: PROVIDER_VARIANTS.herCap01,
  },
  {
    id: 'std-tee-01',
    sku: '21W-STD-TEE-01',
    name: 'T-Shirt Concept Studio',
    image: '/images/brands/21-wear/03_studio_collection.jpg',
    collection: 'studio',
    category: 't-shirt',
    isNew: true,
    availableSizes: PRODUCT_SIZES_BY_CATEGORY['t-shirt'],
    isActive: true,
    regions: PROVIDER_VARIANTS.stdTee01,
  },
];

export function getProductById(productId: string): Product | undefined {
  return wearProducts.find((product) => product.id === productId);
}

export function getRegionalInfo(product: Product, region: Region): RegionalInfo {
  return product.regions[region] ?? product.regions[DEFAULT_REGION];
}

export function normalizeProductSize(size: string): ProductSize | null {
  const normalized = size.trim().toUpperCase();

  if (
    normalized === 'XS' ||
    normalized === 'S' ||
    normalized === 'M' ||
    normalized === 'L' ||
    normalized === 'XL' ||
    normalized === 'XXL' ||
    normalized === 'UNIQUE'
  ) {
    return normalized;
  }

  return null;
}

export function isSupportedProductSize(product: Product, size: string): boolean {
  const normalizedSize = normalizeProductSize(size);

  if (!normalizedSize) {
    return false;
  }

  return product.availableSizes.includes(normalizedSize);
}

export function isProductAvailableForRegion(product: Product, region: Region): boolean {
  return Boolean(product.isActive && product.regions[region]);
}

export function isProductFulfillmentReady(product: Product, region: Region): boolean {
  const regionalInfo = product.regions[region] ?? product.regions[DEFAULT_REGION];

  return Boolean(product.isActive && regionalInfo?.isFulfillmentReady && regionalInfo.providerId);
}